import { Metadata } from "next";
import ProductosPage from "./ProductosPage";

export const metadata: Metadata = {
  title: "Catálogo de productos | GECOTAY",
  description: "Explora nuestro catálogo de mobiliario de oficina, contract y colectividades. Mesas, sillas, almacenaje y soluciones a medida con entrega e instalación.",
  openGraph: {
    title: "Catálogo de productos | GECOTAY",
    description: "Explora nuestro catálogo de mobiliario de oficina, contract y colectividades.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de productos | GECOTAY",
    description: "Explora nuestro catálogo de mobiliario de oficina, contract y colectividades.",
  },
  robots: { index: true, follow: true },
};

export default function ProductosLayout() {
  return <ProductosPage />;
}