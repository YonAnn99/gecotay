import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import ProductosPage from "./ProductosPage";
import { obtenerProductos } from "../../lib/contenido";

// Red de seguridad por si se pierde una invalidación del panel.
export const revalidate = 3600;

/**
 * Metadata con el conteo real del catálogo.
 *
 * Era `export const metadata` con un "20" escrito a mano. Al pasar el catálogo
 * al CMS ese número quedó desfasado en cuanto el admin despublicó una línea:
 * el cuerpo de la página decía 19 y la meta description seguía diciendo 20
 * —detectado al despublicar "ceri" durante las pruebas—. Ahora se calcula.
 */
export async function generateMetadata(): Promise<Metadata> {
  const lineas = await obtenerProductos();
  const n = lineas.length;

  return {
    // Just the page-specific part: the root layout's title.template appends
    // " | Grupo Ecotay" for this (child) segment automatically.
    title: "Catálogo de productos",
    description: `${n} líneas de mobiliario de oficina, hogar y espacios de trabajo de Grupo Ecotay: escritorios, sillería, recepciones, salas de juntas y almacenamiento. Envíos a CDMX y área metropolitana.`,
    openGraph: {
      ...OG_BASE,
      title: "Catálogo de productos | Grupo Ecotay",
      description: `${n} líneas de mobiliario de oficina y hogar con fabricación nacional e importada.`,
    },
    twitter: {
      ...TWITTER_BASE,
      title: "Catálogo de productos | Grupo Ecotay",
      description: `${n} líneas de mobiliario de oficina y hogar.`,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: "/es/productos",
      languages: { es: "/es/productos", "x-default": "/es/productos" },
    },
  };
}

export default async function ProductosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lineas = await obtenerProductos();
  return <ProductosPage locale={locale} lineas={lineas} />;
}