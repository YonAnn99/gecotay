"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requerirPerfil } from "@/app/lib/auth";
import { createServiceClient } from "@/app/lib/supabase/server";
import { enviarCorreo, plantillaInvitacion } from "@/app/lib/correo";

// Sin I, O, 0 ni 1: el admin va a dictar este código por teléfono cuando el
// correo no llegue, y esos cuatro son los que siempre se confunden.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LONGITUD = 8;

// Ruta INTERNA. El subdominio la sirve como /colaboradores, pero
// revalidatePath opera sobre el árbol de rutas real, no sobre la URL visible.
const RUTA_COLABORADORES = "/admin/colaboradores";

function generarCodigo(): string {
  let codigo = "";
  // randomInt (CSPRNG) y no Math.random: este código es una credencial.
  for (let i = 0; i < LONGITUD; i++) codigo += ALFABETO[randomInt(ALFABETO.length)];
  return codigo;
}

function normalizarEmail(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const email = valor.trim().toLowerCase().slice(0, 200);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : null;
}

export type ResultadoInvitacion =
  | { ok: true; codigo: string; correoEnviado: boolean; motivoCorreo?: string }
  | { ok: false; error: string };

/**
 * Crea una invitación para el módulo de ventas y manda el código por correo.
 *
 * Solo admin: una Server Action es un endpoint POST alcanzable sin pasar por
 * la UI, así que la comprobación va aquí dentro y no basta con no pintar el
 * botón (ver node_modules/next/dist/docs/01-app/02-guides/server-actions.md).
 */
export async function invitarColaborador(
  _previo: ResultadoInvitacion | undefined,
  formData: FormData
): Promise<ResultadoInvitacion> {
  const admin = await requerirPerfil(["admin"]);

  const email = normalizarEmail(formData.get("email"));
  if (!email) return { ok: false, error: "Escribe un correo válido." };

  const db = createServiceClient();

  // Si ya tiene acceso activo, invitar otra vez no aporta nada.
  const { data: yaTiene } = await db
    .from("perfiles")
    .select("id, activo")
    .eq("email", email)
    .maybeSingle();
  if (yaTiene?.activo) {
    return { ok: false, error: "Esa persona ya tiene acceso." };
  }

  // Una invitación pendiente previa se revoca: solo debe haber un código vivo
  // por persona, o revocar el acceso dejaría puertas abiertas sin darse cuenta.
  await db
    .from("invitaciones")
    .update({ estado: "revocada", codigo: null })
    .eq("email", email)
    .eq("estado", "pendiente");

  const codigo = generarCodigo();
  const { error } = await db.from("invitaciones").insert({
    email,
    codigo,
    rol: "ventas",
    creada_por: admin.id,
  });

  if (error) {
    console.error("[invitaciones] no se pudo crear:", error.message);
    return { ok: false, error: "No se pudo crear la invitación." };
  }

  const base = process.env.NEXT_PUBLIC_URL_VENTAS ?? "https://ventas.gecotay.com";
  const { html, texto } = plantillaInvitacion(codigo, `${base}/login`);
  const envio = await enviarCorreo({
    para: email,
    asunto: "Tu acceso al módulo de ventas — Grupo Gecotay",
    html,
    texto,
  });

  revalidatePath(RUTA_COLABORADORES);
  // El código se devuelve SIEMPRE, haya salido el correo o no: es lo que
  // permite al admin dictarlo si el envío falla. Mientras la invitación siga
  // pendiente también es visible en el listado.
  return { ok: true, codigo, correoEnviado: envio.enviado, motivoCorreo: envio.motivo };
}

export async function revocarInvitacion(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = createServiceClient();
  await db
    .from("invitaciones")
    .update({ estado: "revocada", codigo: null })
    .eq("id", id)
    .eq("estado", "pendiente");
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
