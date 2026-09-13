import type { Metadata } from "next";
import { EMPRESA } from "../data/empresa";

/**
 * Partes compartidas de `openGraph` y `twitter`.
 *
 * NO es una preferencia de estilo: en Next, los campos anidados de `metadata`
 * se **sobrescriben enteros** por el último segmento que los define, no se
 * fusionan (ver `generate-metadata.md`, sección "Merging": *"metadata with
 * nested fields such as openGraph and robots that are defined in an earlier
 * segment are overwritten by the last segment to define them"*). Así que poner
 * algo común en el root layout no llega a ninguna página que declare su propio
 * `openGraph` — y siete lo hacen. Los propios docs recomiendan esta salida:
 * sacar lo compartido a una variable y esparcirla en cada página.
 *
 * La IMAGEN también va aquí, y esto costó descubrirlo: el archivo
 * `app/[locale]/opengraph-image.tsx` solo alimenta a **su propio segmento**
 * (los docs: *"set Open Graph and Twitter images for a route segment"*). La
 * home la recibía, pero las ocho páginas hijas que declaran `openGraph` la
 * perdían por la misma regla de sobrescritura de arriba. Declararla aquí es
 * lo que hace que la tarjeta llegue a todas.
 *
 * Se apunta a la ruta del generador sin el hash de caché que Next le añade:
 * el hash cambia con el contenido y no se puede escribir a mano. Se fija en
 * `/es` porque la tarjeta está en español y `/en` va `noindex`, así que no
 * hace falta una por idioma.
 *
 * Las páginas de producto declaran su propia `images` con la foto de la
 * línea, y al hacerlo sustituyen esta tarjeta — que es lo que se busca.
 */
export const OG_IMAGEN = {
  url: "/es/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${EMPRESA.nombreCorto} — Mobiliario de oficina`,
} as const;

export const OG_BASE = {
  type: "website",
  locale: "es_MX",
  siteName: EMPRESA.nombreCorto,
  images: [OG_IMAGEN],
} as const satisfies Metadata["openGraph"];

export const TWITTER_BASE = {
  card: "summary_large_image",
  images: [OG_IMAGEN.url],
} as const satisfies Metadata["twitter"];
