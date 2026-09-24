import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import ContactoPage from "./ContactoPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Ecotay" for this (child) segment automatically.
  title: "Contacto",
  description:
    "Contacta a Grupo Ecotay en Ecatepec, Estado de México. Teléfonos 55 5027 0661, 55 1562 0103 y 55 7676 5844. WhatsApp 55 4152 2017. ventas@gecotay.com",
  openGraph: {
    ...OG_BASE,
    title: "Contacto | Grupo Ecotay",
    description: "Canales directos de contacto de Grupo Ecotay: teléfono, WhatsApp, correo y ubicación.",
  },
  twitter: {
    ...TWITTER_BASE,
    title: "Contacto | Grupo Ecotay",
    description: "Teléfono, WhatsApp y correo de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/es/contacto",
    languages: { es: "/es/contacto", "x-default": "/es/contacto" },
  },
};

export default async function ContactoLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ContactoPage locale={locale} />;
}