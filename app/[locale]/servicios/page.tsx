import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import ServiciosPage from "./ServiciosPage";
import { obtenerServicios } from "../../lib/contenido";

// Red de seguridad por si se pierde una invalidación del panel.
export const revalidate = 3600;

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Ecotay" for this (child) segment automatically.
  title: "Servicios integrales",
  description:
    "Servicios de Grupo Ecotay: atención personalizada, post-venta, planeación de espacios, entrega e instalación, mantenimiento, carpintería, ebanistería, tapicería, transporte, herrería y comidas empresariales.",
  openGraph: {
    ...OG_BASE,
    title: "Servicios integrales | Grupo Ecotay",
    description: "11 servicios integrales de Grupo Ecotay para mobiliario y espacios de trabajo.",
  },
  twitter: {
    ...TWITTER_BASE,
    title: "Servicios integrales | Grupo Ecotay",
    description: "11 servicios integrales de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/es/servicios",
    languages: { es: "/es/servicios", "x-default": "/es/servicios" },
  },
};

export default async function ServiciosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const servicios = await obtenerServicios();
  return <ServiciosPage locale={locale} servicios={servicios} />;
}