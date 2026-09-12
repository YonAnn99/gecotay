"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { baseDeSuperficie } from "@/app/lib/auth";

export type EstadoLogin = { error: string } | undefined;

/**
 * Inicia sesión de administrador con correo y contraseña.
 *
 * Se ejecuta en el servidor: el token nunca pasa por JavaScript del cliente,
 * y `createSessionClient` lo deja en una cookie httpOnly. Por eso no hace
 * falta cliente de navegador ni abrir `connect-src` en la CSP.
 */
export async function iniciarSesion(
  _estadoPrevio: EstadoLogin,
  formData: FormData
): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Escribe tu correo y contraseña." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Mensaje deliberadamente genérico: distinguir "no existe esa cuenta" de
    // "contraseña incorrecta" le confirmaría a un atacante qué correos son
    // válidos en el sistema.
    console.error("[admin/login] fallo de autenticación:", error.message);
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect(`${await baseDeSuperficie()}/`);
}

export async function cerrarSesion(): Promise<void> {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect(`${await baseDeSuperficie()}/login`);
}
