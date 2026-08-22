import { Metadata } from "next";
import CotizarPage from "./CotizarPage";

export const metadata: Metadata = {
  title: "Solicita tu presupuesto | Grupo Gecotay",
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
};

export default async function CotizarLayout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CotizarPage locale={locale} />;
}