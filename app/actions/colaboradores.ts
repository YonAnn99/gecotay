"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requerirPerfil } from "@/app/lib/auth";
import { createServiceClient } from "@/app/lib/supabase/server";
import { enviarCorreo, plantillaAcceso } from "@/app/lib/correo";

// Sin I, O, 0 ni 1: el admin dicta este código por teléfono cuando el correo
// no llega, y esos cuatro son los que siempre se confunden al oído.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LONGITUD = 10;

// Ruta INTERNA. El subdominio la sirve sin el prefijo, pero revalidatePath
// opera sobre el árbol de rutas real.
const RUTA_COLABORADORES = "/admin/colaboradores";

/**
 * Genera el código de acceso.
 *
 * `randomInt` (CSPRNG) y no `Math.random`: esto no es un identificador, es la
 * contraseña con la que el colaborador entra. Con 10 caracteres de un alfabeto
 * de 32 son ~1.1 × 10¹⁵ combinaciones, y Supabase Auth limita los intentos de
 * inicio de sesión.
 */
function generarCodigo(): string {
  let codigo = "";
  for (let i = 0; i < LONGITUD; i++) codigo += ALFABETO[randomInt(ALFABETO.length)];
  return codigo;
}

function normalizarEmail(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const email = valor.trim().toLowerCase().slice(0, 200);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : null;
}

function enviarAcceso(email: string, codigo: string) {
  return enviarCorreo({
    para: email,
    asunto: "Tu acceso al módulo de ventas — Grupo Ecotay",
    ...plantillaAcceso(codigo, `${process.env.NEXT_PUBLIC_URL_VENTAS ?? "https://ventas.gecotay.com"}/login`),
  });
}

export type ResultadoAcceso =
  | { ok: true; email: string; codigo: string; correoEnviado: boolean; motivoCorreo?: string }
  | { ok: false; error: string };

/**
 * Da de alta a un colaborador de ventas con su código de acceso.
 *
 * Crea la cuenta completa de una vez: el código **es** la contraseña en
 * `auth.users`, así que el colaborador puede entrar en cuanto reciba el correo,
 * sin pasos intermedios ni elegir nada.
 *
 * Solo admin: una Server Action es un endpoint POST alcanzable sin pasar por la
 * UI, así que la comprobación va aquí dentro y no basta con no pintar el botón.
 */
export async function altaColaborador(
  _previo: ResultadoAcceso | undefined,
  formData: FormData
): Promise<ResultadoAcceso> {
  const admin = await requerirPerfil(["admin"]);

  const email = normalizarEmail(formData.get("email"));
  if (!email) return { ok: false, error: "Escribe un correo válido." };

  const db = createServiceClient();

  const { data: existente } = await db
    .from("perfiles")
    .select("id, activo, rol")
    .eq("email", email)
    .maybeSingle();

  if (existente) {
    return {
      ok: false,
      error: existente.activo
        ? "Esa persona ya tiene acceso. Si olvidó su código, búscalo en la lista de abajo."
        : "Esa cuenta existe pero está desactivada. Reactívala desde la lista.",
    };
  }

  const codigo = generarCodigo();

  // Primero Auth, luego la tabla. Si la tabla falla, se deshace el alta en
  // Auth: mismo patrón que `subirMedio` en app/actions/medios.ts, donde un
  // fallo tardío borra lo ya subido para no dejar restos invisibles.
  const { data: creado, error: errAuth } = await db.auth.admin.createUser({
    email,
    password: codigo,
    email_confirm: true,
  });

  if (errAuth || !creado?.user) {
    console.error("[colaboradores] alta en Auth:", errAuth?.message);
    return { ok: false, error: "No se pudo crear la cuenta." };
  }

  const { error: errPerfil } = await db.from("perfiles").insert({
    id: creado.user.id,
    email,
    rol: "ventas",
    activo: true,
    codigo_acceso: codigo,
    codigo_actualizado_en: new Date().toISOString(),
    creado_por: admin.id,
  });

  if (errPerfil) {
    await db.auth.admin.deleteUser(creado.user.id);
    console.error("[colaboradores] alta del perfil:", errPerfil.message);
    return { ok: false, error: "No se pudo habilitar el acceso." };
  }

  const envio = await enviarAcceso(email, codigo);

  revalidatePath(RUTA_COLABORADORES);
  // El código se devuelve SIEMPRE, salga o no el correo: es lo que permite al
  // admin dictarlo. También queda visible en la lista, porque ya no caduca.
  return { ok: true, email, codigo, correoEnviado: envio.enviado, motivoCorreo: envio.motivo };
}

export type ResultadoReenvio = { enviado: boolean; motivo?: string };

/**
 * Vuelve a mandar el correo de acceso con el código vigente.
 *
 * Para cuando el primer envío falló o el colaborador lo borró. No cambia el
 * código: si lo que pasa es que se filtró, eso es `regenerarCodigo`.
 */
export async function reenviarAcceso(
  _previo: ResultadoReenvio | undefined,
  formData: FormData
): Promise<ResultadoReenvio> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return { enviado: false, motivo: "sin-colaborador" };

  const db = createServiceClient();
  const { data: perfil } = await db
    .from("perfiles")
    .select("email, codigo_acceso, rol")
    .eq("id", id)
    .maybeSingle();

  if (perfil?.rol !== "ventas" || !perfil.codigo_acceso) {
    return { enviado: false, motivo: "sin-colaborador" };
  }

  return enviarAcceso(perfil.email, perfil.codigo_acceso);
}

/**
 * Cambia el código de un colaborador.
 *
 * Es la respuesta a un código comprometido, no a uno olvidado: para lo segundo
 * basta con mirarlo en la lista. Actualiza las **dos** caras de la credencial
 * —la contraseña en Auth y la copia legible en `perfiles`—, que deben
 * mantenerse idénticas o el colaborador se queda fuera.
 */
export async function regenerarCodigo(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = createServiceClient();
  const codigo = generarCodigo();

  const { error: errAuth } = await db.auth.admin.updateUserById(id, { password: codigo });
  if (errAuth) {
    console.error("[colaboradores] no se pudo cambiar la contraseña:", errAuth.message);
    return;
  }

  const { error: errPerfil } = await db
    .from("perfiles")
    .update({ codigo_acceso: codigo, codigo_actualizado_en: new Date().toISOString() })
    .eq("id", id)
    .eq("rol", "ventas");

  if (errPerfil) {
    // Auth ya tiene el código nuevo pero la tabla conserva el viejo: el admin
    // vería un código que no funciona. Se avisa en el log para poder repetirlo.
    console.error("[colaboradores] Auth actualizado pero `perfiles` no:", errPerfil.message);
  }

  revalidatePath(RUTA_COLABORADORES);
}

export async function cambiarAccesoColaborador(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  const activo = formData.get("activo") === "true";
  if (!id) return;

  const db = createServiceClient();
  // `eq("rol", "ventas")` evita que un admin se desactive a sí mismo —o a otro
  // admin— desde esta pantalla y se quede sin forma de entrar al panel.
  await db.from("perfiles").update({ activo }).eq("id", id).eq("rol", "ventas");
  revalidatePath(RUTA_COLABORADORES);
}

/**
 * Elimina a un colaborador por completo.
 *
 * Borra la cuenta de Auth; `perfiles` se va en cascada por la FK. Distinto de
 * desactivar: esto no deja rastro, así que para revocar acceso conservando el
 * histórico de accesos hay que usar `cambiarAccesoColaborador`.
 */
export async function eliminarColaborador(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = createServiceClient();
  const { data: perfil } = await db.from("perfiles").select("rol").eq("id", id).maybeSingle();
  if (perfil?.rol !== "ventas") return;

  await db.auth.admin.deleteUser(id);
  revalidatePath(RUTA_COLABORADORES);
}
