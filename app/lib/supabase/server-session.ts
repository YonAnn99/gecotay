import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Cliente de Supabase ligado a las cookies de la petición.
 *
 * Usa la clave **publicable**, no la de servicio: todo lo que haga queda
 * sujeto a RLS y al rol del usuario que tenga la sesión. Para las escrituras
 * que deben saltar RLS (canjear una invitación, guardar un lead) existe
 * `createServiceClient()` en ./server.ts — son clientes distintos a propósito.
 */
export async function createSessionClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Un Server Component no puede escribir cookies. Se puede ignorar
          // porque el proxy ya refresca la sesión en cada petición a las
          // superficies internas (ver ./proxy-session.ts).
        }
      },
    },
  });
}
