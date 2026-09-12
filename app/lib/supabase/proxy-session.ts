import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Refresca el token de sesión durante el proxy.
 *
 * Los Server Components no pueden escribir cookies, así que si nadie renueva
 * el access token los usuarios acaban expulsados en momentos aleatorios. Esta
 * función se ejecuta antes que la lógica de enrutado y devuelve una forma de
 * aplicar las cookies renovadas a la respuesta que el proxy termine emitiendo
 * —sea `next()`, un `rewrite()` o un `redirect()`—, para que el refresco
 * sobreviva a la reescritura por subdominio.
 *
 * Se llama SOLO para las superficies internas: el sitio público es estático y
 * no tiene sesión, así que ahorrarle esta verificación en cada petición.
 */
export async function refrescarSesion(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Sin configuración no hay sesión que refrescar; el guard se encargará de
  // mandar al login. No reventamos el proxy por esto.
  if (!url || !key) return (response: NextResponse) => response;

  const pendientes: { name: string; value: string; options?: object }[] = [];

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          // Sobre la petición, para que los Server Components de esta misma
          // pasada ya vean el token nuevo y no intenten refrescarlo otra vez.
          request.cookies.set(name, value);
          pendientes.push({ name, value, options });
        }
      },
    },
  });

  // No meter código entre createServerClient y getClaims: los docs de Supabase
  // advierten que cualquier cosa en medio provoca cierres de sesión aleatorios
  // muy difíciles de depurar.
  await supabase.auth.getClaims();

  return function aplicarCookies(response: NextResponse) {
    for (const { name, value, options } of pendientes) {
      response.cookies.set(name, value, options);
    }
    return response;
  };
}
