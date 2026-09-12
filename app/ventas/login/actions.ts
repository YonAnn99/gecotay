"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/app/lib/supabase/server";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { baseDeSuperficie } from "@/app/lib/auth";

const MAX_INTENTOS = 10;
const MIN_PASSWORD = 8;

export type EstadoCanje = { error: string } | undefined;

/** Comparación en tiempo constante, para no filtrar el código carácter a carácter. */
function codigosCoinciden(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Canjea una invitación: valida correo + código y deja la cuenta lista.
 *
 * Corre con `service_role` porque quien canjea todavía no tiene sesión, así
 * que es un endpoint público sin autenticar: cada rama valida en servidor y
 * los errores son deliberadamente genéricos, para no revelar qué correos
 * están invitados ni si el fallo fue del correo o del código.
 *
 * El colaborador **elige su propia contraseña** aquí. La alternativa —generar
 * una interna y solo dejarle la cookie de sesión— lo dejaría sin forma de
 * volver a entrar cuando esa sesión caducara, obligando a reinvitarlo cada
 * vez. Con contraseña, a partir del canje es una cuenta normal.
 */
export async function canjearInvitacion(
  _previo: EstadoCanje,
  formData: FormData
): Promise<EstadoCanje> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const codigo = String(formData.get("codigo") ?? "").trim().toUpperCase().slice(0, 8);
  const password = String(formData.get("password") ?? "");
  const password2 = String(formData.get("password2") ?? "");

  if (!email || !codigo) return { error: "Escribe tu correo y el código." };
  if (password.length < MIN_PASSWORD) {
    return { error: `La contraseña necesita al menos ${MIN_PASSWORD} caracteres.` };
  }
  if (password !== password2) return { error: "Las contraseñas no coinciden." };

  const generico = { error: "Correo o código incorrectos." };
  const db = createServiceClient();

  const { data: inv } = await db
    .from("invitaciones")
    .select("id, codigo, rol, expira_en, intentos_fallidos")
    .eq("email", email)
    .eq("estado", "pendiente")
    .maybeSingle();

  if (!inv || !inv.codigo) return generico;

  if (inv.intentos_fallidos >= MAX_INTENTOS) {
    await db.from("invitaciones").update({ estado: "revocada", codigo: null }).eq("id", inv.id);
    return { error: "Demasiados intentos. Pide una invitación nueva." };
  }

  if (new Date(inv.expira_en) < new Date()) {
    await db.from("invitaciones").update({ estado: "expirada", codigo: null }).eq("id", inv.id);
    return { error: "La invitación caducó. Pide una nueva." };
  }

  if (!codigosCoinciden(codigo, inv.codigo)) {
    await db
      .from("invitaciones")
      .update({ intentos_fallidos: inv.intentos_fallidos + 1 })
      .eq("id", inv.id);
    return generico;
  }

  // Código válido. Crear la cuenta en Auth (o reutilizarla si ya existía, por
  // ejemplo si se le revocó el acceso y se le vuelve a invitar).
  const { data: creado, error: errCrear } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  let userId = creado?.user?.id;

  if (errCrear) {
    const { data: existentes } = await db.auth.admin.listUsers();
    const previo = existentes?.users.find((u) => u.email?.toLowerCase() === email);
    if (!previo) {
      console.error("[canje] no se pudo crear la cuenta:", errCrear.message);
      return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
    }
    // Ya existía: reestablecemos la contraseña que acaba de elegir.
    await db.auth.admin.updateUserById(previo.id, { password, email_confirm: true });
    userId = previo.id;
  }

  if (!userId) return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };

  const { error: errPerfil } = await db
    .from("perfiles")
    .upsert({ id: userId, email, rol: inv.rol, activo: true }, { onConflict: "id" });

  if (errPerfil) {
    console.error("[canje] no se pudo crear el perfil:", errPerfil.message);
    return { error: "No se pudo habilitar el acceso. Avisa a un administrador." };
  }

  // Quemar la invitación. La restricción `invitacion_coherente` exige que una
  // 'usada' tenga usada_en y codigo NULL: a partir de aquí el código deja de
  // existir en la base.
  await db
    .from("invitaciones")
    .update({ estado: "usada", codigo: null, usada_en: new Date().toISOString(), perfil_id: userId })
    .eq("id", inv.id);

  const supabase = await createSessionClient();
  const { error: errSesion } = await supabase.auth.signInWithPassword({ email, password });
  if (errSesion) {
    console.error("[canje] cuenta lista pero falló el inicio de sesión:", errSesion.message);
    return { error: "Tu cuenta quedó lista. Vuelve a entrar con tu correo y contraseña." };
  }

  await db.from("perfiles").update({ ultimo_acceso: new Date().toISOString() }).eq("id", userId);

  redirect(`${await baseDeSuperficie()}/`);
}

/** Acceso normal, una vez canjeada la invitación. */
export async function iniciarSesionVentas(
  _previo: EstadoCanje,
  formData: FormData
): Promise<EstadoCanje> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Escribe tu correo y contraseña." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("[ventas/login] fallo de autenticación:", error.message);
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect(`${await baseDeSuperficie()}/`);
}
