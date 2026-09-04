import { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Gecotay" for this (child) segment automatically.
  title: "Nosotros",
  description:
    "Conoce a Grupo Gecotay S.A.S. de C.V.: quiénes somos, nuestra misión, visión y valores. Fabricación de mobiliario en Ecatepec, Estado de México.",
  openGraph: {
    title: "Nosotros | Grupo Gecotay",
    description: "Misión, visión y valores de Grupo Gecotay S.A.S. de C.V.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Grupo Gecotay",
    description: "Misión, visión y valores de Grupo Gecotay.",
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: { es: "/es/nosotros", en: "/en/nosotros" },
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