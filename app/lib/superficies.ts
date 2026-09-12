// Constantes compartidas entre el proxy y los guards.
//
// Viven aparte de app/lib/auth.ts a propósito: ese módulo importa
// `server-only`, `next/headers` y el cliente de Supabase, y el proxy no
// necesita nada de eso — importarlo desde ahí metería todo ese árbol en el
// bundle del proxy, que se ejecuta en cada petición.

/** Cabecera con la que el proxy indica cómo llegó la petición. */
export const HEADER_BASE = "x-superficie-base";

/** Subdominio → prefijo interno de ruta. */
export const SUPERFICIES = [
  { sub: "app", prefijo: "/admin" },
  { sub: "ventas", prefijo: "/ventas" },
] as const;
