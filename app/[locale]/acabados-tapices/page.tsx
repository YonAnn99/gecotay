import { Metadata } from "next";
import AcabadosPage from "./AcabadosPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Gecotay" for this (child) segment automatically.
  title: "Acabados y tapices",
  description:
    "Acabados y tapices de Grupo Gecotay: telas, melaminas, metales y superficies para personalizar tu mobiliario. Descarga las cartas de colores.",
  openGraph: {
    title: "Acabados y tapices | Grupo Gecotay",
    description: "Telas, melaminas, metales y superficies para tu mobiliario.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acabados y tapices | Grupo Gecotay",
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