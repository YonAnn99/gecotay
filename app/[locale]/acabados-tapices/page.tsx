import { Metadata } from "next";
import { OG_BASE, TWITTER_BASE } from "@/app/lib/metadatos";
import AcabadosPage from "./AcabadosPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Ecotay" for this (child) segment automatically.
  title: "Acabados y tapices",
  description:
    "Acabados y tapices de Grupo Ecotay: telas, melaminas, metales y superficies para personalizar tu mobiliario. Descarga las cartas de colores.",
  openGraph: {
    ...OG_BASE,
    title: "Acabados y tapices | Grupo Ecotay",
    description: "Telas, melaminas, metales y superficies para tu mobiliario.",
  },
  twitter: {
    ...TWITTER_BASE,
    title: "Acabados y tapices | Grupo Ecotay",
    description: "Telas, melaminas, metales y superficies para tu mobiliario.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/es/acabados-tapices",
    languages: { es: "/es/acabados-tapices", "x-default": "/es/acabados-tapices" },
  },
};

export default async function AcabadosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AcabadosPage locale={locale} />;
}