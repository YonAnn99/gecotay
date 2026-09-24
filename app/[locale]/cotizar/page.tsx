import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import CotizarPage from "./CotizarPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Ecotay" for this (child) segment automatically.
  title: "Solicita tu presupuesto",
  description:
    "Completa el formulario en 4 pasos y envía tu solicitud de presupuesto por WhatsApp o correo a Grupo Ecotay.",
  openGraph: {
    ...OG_BASE,
    title: "Solicita tu presupuesto | Grupo Ecotay",
    description: "Presupuesto personalizado de mobiliario de oficina y hogar.",
  },
  twitter: {
    ...TWITTER_BASE,
    title: "Solicita tu presupuesto | Grupo Ecotay",
    description: "Presupuesto personalizado de mobiliario.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/es/cotizar",
    languages: { es: "/es/cotizar", "x-default": "/es/cotizar" },
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