import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionClient } from "./supabase/server-session";
import type { Database } from "./supabase/types";
import { HEADER_BASE } from "./superficies";

export type Rol = Database["public"]["Enums"]["rol_usuario"];
export type Perfil = Database["public"]["Tables"]["perfiles"]["Row"];

/**
 * Prefijo con el que construir enlaces internos.
 *
 * Vacío cuando la petición entró por subdominio (`app.gecotay.com/login`), y
 * `/admin` o `/ventas` cuando entró por ruta directa, que es como se navegan
 * estas superficies en dev y en los previews de Vercel mientras el dominio no
 * esté conectado. Sin esto, un `redirect("/login")` desde el modo ruta
 * mandaría al sitio público, donde esa ruta no existe.
 */
export async function baseDeSuperficie(): Promise<string> {
  return (await headers()).get(HEADER_BASE) ?? "";
}

/**
 * Exige una sesión válida con uno de los roles indicados.
 *
 * Verifica con `getClaims()`, que valida la firma del JWT, y no con
 * `getSession()`, cuyo objeto de usuario sale de la cookie y por tanto es
 * falsificable. Después confirma contra `perfiles` que la cuenta siga activa:
 * el JWT puede seguir siendo válido después de que un admin revoque el acceso,
 * así que el rol nunca se lee del token.
 *
 * Redirige al login en vez de lanzar, para que un enlace caducado lleve a
 * iniciar sesión y no a una pantalla de error.
 */
export async function requerirPerfil(rolesPermitidos: Rol[]): Promise<Perfil> {
  const base = await baseDeSuperficie();
  const supabase = await createSessionClient();

  const { data, error } = await supabase.auth.getClaims();
  const uid = data?.claims?.sub;
  if (error || !uid) redirect(`${base}/login`);

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", uid)
    .maybeSingle();

  // Sin perfil: existe en Auth pero nadie le dio acceso. Es el caso que evita
  // que un alta accidental en Auth se convierta en acceso (por eso tampoco hay
  // trigger que autocree perfiles).
  if (!perfil || !perfil.activo) redirect(`${base}/login?motivo=sin-acceso`);

  // Rol insuficiente: hay que mandar al LOGIN, no a la raíz de la superficie.
  // La raíz también está protegida, así que redirigir ahí haría que el guard
  // rechazara otra vez y el navegador entrara en un bucle
  // (ERR_TOO_MANY_REDIRECTS) — verificado con una sesión de `ventas` pidiendo
  // /admin. El login queda fuera del guard, así que corta el ciclo y además
  // permite entrar con la cuenta correcta.
  if (!rolesPermitidos.includes(perfil.rol)) redirect(`${base}/login?motivo=sin-permiso`);

  return perfil;
}

/** Igual que `requerirPerfil` pero sin redirigir: para pintar UI condicional. */
export async function perfilActual(): Promise<Perfil | null> {
  const supabase = await createSessionClient();
  const { data } = await supabase.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) return null;

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", uid)
    .maybeSingle();

  return perfil?.activo ? perfil : null;
}
