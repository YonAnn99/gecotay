import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Ecotay" for this (child) segment automatically.
  title: "Nosotros",
  description:
    "Conoce a Grupo Ecotay S.A.S. de C.V.: quiénes somos, nuestra misión, visión y valores. Fabricación de mobiliario en Ecatepec, Estado de México.",
  openGraph: {
    ...OG_BASE,
    title: "Nosotros | Grupo Ecotay",
    description: "Misión, visión y valores de Grupo Ecotay S.A.S. de C.V.",
  },
  twitter: {
    ...TWITTER_BASE,
    title: "Nosotros | Grupo Ecotay",
    description: "Misión, visión y valores de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/es/nosotros",
    languages: { es: "/es/nosotros", "x-default": "/es/nosotros" },
  },
};

export default async function NosotrosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <NosotrosPage locale={locale} />;
}