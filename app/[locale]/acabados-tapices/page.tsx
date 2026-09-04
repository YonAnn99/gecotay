import { Metadata } from "next";
import AcabadosPage from "./AcabadosPage";
import GrainientBackground from "../../components/ui/GrainientBackground";

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
    languages: { es: "/es/acabados-tapices", en: "/en/acabados-tapices" },
  },
};

export default async function AcabadosLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <GrainientBackground />
      <AcabadosPage locale={locale} />
    </>
  );
}