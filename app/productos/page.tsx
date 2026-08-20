import { Metadata } from "next";
import ProductosPage from "./ProductosPage";

export const metadata: Metadata = {
  title: "Catálogo de productos | Grupo Ecotay",
  description:
    "20 líneas de mobiliario de oficina, hogar y espacios de trabajo de Grupo Ecotay: escritorios, sillería, recepciones, salas de juntas y almacenamiento. Envíos a CDMX y área metropolitana.",
  openGraph: {
    title: "Catálogo de productos | Grupo Ecotay",
    description: "20 líneas de mobiliario de oficina y hogar con fabricación nacional e importada.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Ecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de productos | Grupo Ecotay",
    description: "20 líneas de mobiliario de oficina y hogar.",
  },
  robots: { index: true, follow: true },
};

export default function ProductosLayout() {
  return <ProductosPage />;
}