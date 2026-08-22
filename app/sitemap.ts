import type { MetadataRoute } from "next";
import { EMPRESA, LINEAS_PRODUCTO } from "./data/empresa";

const locales = ["es", "en"] as const;

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${EMPRESA.url}/es${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${EMPRESA.url}/${l}${path}`])),
    },
  }));

  const products: MetadataRoute.Sitemap = LINEAS_PRODUCTO.map((linea) => ({
    url: `${EMPRESA.url}/es/productos/${linea.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${EMPRESA.url}/${l}/productos/${linea.slug}`])
      ),
    },
  }));

  return [...pages, ...products];
}
