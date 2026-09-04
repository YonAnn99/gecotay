import { Metadata } from "next";
import ProductosPage from "./ProductosPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Gecotay" for this (child) segment automatically.
  title: "Catálogo de productos",
  description:
    "20 líneas de mobiliario de oficina, hogar y espacios de trabajo de Grupo Gecotay: escritorios, sillería, recepciones, salas de juntas y almacenamiento. Envíos a CDMX y área metropolitana.",
  openGraph: {
    title: "Catálogo de productos | Grupo Gecotay",
    description: "20 líneas de mobiliario de oficina y hogar con fabricación nacional e importada.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de productos | Grupo Gecotay",
    description: "20 líneas de mobiliario de oficina y hogar.",
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: { es: "/es/productos", en: "/en/productos" },
  },
};

export default async function ProductosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ProductosPage locale={locale} />;
}