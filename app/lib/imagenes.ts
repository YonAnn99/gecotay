/**
 * Resolución de rutas de imagen.
 *
 * Conviven dos orígenes a propósito:
 *
 *  1. Las 489 imágenes que ya existían viven en `public/images` y se referencian
 *     con rutas absolutas del sitio (`/images/products/ceri/01.webp`). NO se
 *     migraron a Storage: son 27 MB que ya se sirven bien desde el CDN de
 *     Vercel, y moverlas obligaría a reescribir cada referencia del repo sin
 *     ganar nada.
 *  2. Lo que el admin sube desde el panel va a Supabase Storage y se guarda
 *     como URL absoluta.
 *
 * Ambos casos acaban en el mismo `<Image>`, así que estas funciones son las que
 * evitan repartir condicionales por todas las plantillas.
 */

/** ¿Es una URL absoluta (Storage) en vez de una ruta local de `public/`? */
export function esRemota(valor: string): boolean {
  return /^https?:\/\//i.test(valor);
}

/**
 * Devuelve el `src` listo para `next/image`.
 *
 * Acepta ambos formatos y normaliza la ruta local para que siempre empiece por
 * "/", que es lo que `next/image` exige para un archivo de `public/`.
 */
export function resolverImagen(valor: string | null | undefined): string | null {
  if (!valor) return null;
  const limpio = valor.trim();
  if (!limpio) return null;
  if (esRemota(limpio)) return limpio;
  return limpio.startsWith("/") ? limpio : `/${limpio}`;
}

/**
 * `src` con respaldo, para cuando falte la imagen de un registro.
 *
 * El catálogo lo edita una persona desde el panel, así que un producto sin
 * foto es cuestión de tiempo. Mejor un marcador consistente que un `<Image>`
 * roto o un hueco en la cuadrícula.
 */
export const IMAGEN_RESPALDO = "/images/logo/logo-horizontal-color.webp";

export function resolverImagenConRespaldo(valor: string | null | undefined): string {
  return resolverImagen(valor) ?? IMAGEN_RESPALDO;
}

/**
 * URL pública de un objeto del bucket `contenido`.
 *
 * Se construye a mano en vez de llamar a `getPublicUrl()` del SDK para poder
 * usarla también desde código que no tiene un cliente a mano (scripts, plantillas).
 */
export function urlPublicaStorage(path: string, bucket = "contenido"): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL.");
  const limpio = path.replace(/^\/+/, "");
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${limpio}`;
}
