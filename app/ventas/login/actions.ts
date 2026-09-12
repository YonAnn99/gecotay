"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { createServiceClient } from "@/app/lib/supabase/server";
import { baseDeSuperficie } from "@/app/lib/auth";

export type EstadoLogin = { error: string } | undefined;

/**
 * Acceso al módulo de ventas con correo y código.
 *
 * El código **es** la contraseña en `auth.users`, así que esto es un
 * `signInWithPassword` normal: no hay canje, ni caducidad, ni tabla de
 * intentos propia. El límite de intentos lo aplica Supabase Auth.
 *
 * Se normaliza a mayúsculas porque el alfabeto del código solo las usa y en
 * móvil es fácil que el teclado mande minúsculas.
 */
export async function iniciarSesionVentas(
  _previo: EstadoLogin,
  formData: FormData
): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const codigo = String(formData.get("codigo") ?? "").trim().toUpperCase().slice(0, 40);

  if (!email || !codigo) return { error: "Escribe tu correo y tu código." };

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: codigo,
  });

  if (error || !data.user) {
    // Mensaje genérico a propósito: distinguir "ese correo no existe" de
    // "código incorrecto" confirmaría qué correos tienen acceso.
    console.error("[ventas/login] fallo de autenticación:", error?.message);
    return { error: "Correo o código incorrectos." };
  }

  // Sello de último acceso: es lo que el admin mira para saber quién usa de
  // verdad la herramienta. Va con service_role porque la política de `perfiles`
  // solo deja escribir al admin, y quien entra aquí es `ventas`.
  await createServiceClient()
    .from("perfiles")
    .update({ ultimo_acceso: new Date().toISOString() })
    .eq("id", data.user.id);

  redirect(`${await baseDeSuperficie()}/`);
}
