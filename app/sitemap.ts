import type { MetadataRoute } from "next";
import { EMPRESA } from "./data/empresa";
import { obtenerProductos } from "./lib/contenido";

// Only Spanish is advertised to search engines. The /en routes still exist and
// are reachable from the navbar language switcher, but their page content is
// not actually translated yet (see .agents/skills/CONTEXT.md), so listing them
// here with hreflang would hand Google ~30 duplicate URLs claiming to be
// English. They are also served with `X-Robots-Tag: noindex` (see
// next.config.ts). Re-add the `en` alternates once the catalogs are complete.
const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/acabados-tapices", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cotizar", priority: 0.9, changeFrequency: "monthly" },
  { path: "/descargas", priority: 0.5, changeFrequency: "yearly" },
  { path: "/aviso-privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${EMPRESA.url}/es${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // Solo las líneas publicadas: la política de RLS ya excluye los borradores,
  // así que un producto despublicado desde el panel desaparece del sitemap sin
  // que haya que acordarse de filtrarlo aquí.
  const lineas = await obtenerProductos();
  const products: MetadataRoute.Sitemap = lineas.map((linea) => ({
    url: `${EMPRESA.url}/es/productos/${linea.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...products];
}
