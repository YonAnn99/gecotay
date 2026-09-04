import { Metadata } from "next";
import CotizarPage from "./CotizarPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Gecotay" for this (child) segment automatically.
  title: "Solicita tu presupuesto",
  description:
    "Completa el formulario en 4 pasos y envía tu solicitud de presupuesto por WhatsApp o correo a Grupo Gecotay.",
  openGraph: {
    title: "Solicita tu presupuesto | Grupo Gecotay",
    description: "Presupuesto personalizado de mobiliario de oficina y hogar.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solicita tu presupuesto | Grupo Gecotay",
    description: "Presupuesto personalizado de mobiliario.",
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: { es: "/es/cotizar", en: "/en/cotizar" },
  },
};

export default async function CotizarLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CotizarPage locale={locale} />;
}