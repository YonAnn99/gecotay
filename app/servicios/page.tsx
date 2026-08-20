import { Metadata } from "next";
import ServiciosPage from "./ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios integrales de mobiliario | GECOTAY",
  description: "Diseño a medida, fabricación propia, instalación, ergonomía certificada, contract y mantenimiento post‑venta. Acompañamos todo el ciclo de tu proyecto.",
  openGraph: {
    title: "Servicios integrales de mobiliario | GECOTAY",
    description: "Diseño, fabricación, instalación y mantenimiento de mobiliario profesional.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios integrales de mobiliario | GECOTAY",
    description: "Diseño, fabricación, instalación y mantenimiento de mobiliario profesional.",
  },
  robots: { index: true, follow: true },
};

export default function ServiciosLayout() {
  return <ServiciosPage />;
}