import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Cliente de solo lectura para el contenido público.
 *
 * La diferencia con `createSessionClient()` es que **no toca cookies**, y eso
 * es exactamente lo que permite que las páginas del sitio sigan siendo
 * estáticas: en cuanto un componente de servidor llama a `cookies()`, Next
 * marca la ruta como dinámica y se pierde el SSG de las 60 rutas.
 *
 * Usa la clave publicable, así que actúa como `anon`: las políticas le
 * devuelven solo lo publicado y las promociones vigentes. Es la misma
 * visibilidad que tendría un visitante, que es justo lo que debe renderizarse.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
