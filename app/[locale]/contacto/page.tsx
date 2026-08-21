import { Metadata } from "next";
import ContactoPage from "./ContactoPage";
import GrainientBackground from "../../components/ui/GrainientBackground";

export const metadata: Metadata = {
  title: "Contacto | Grupo Gecotay",
  description:
    "Contacta a Grupo Gecotay en Ecatepec, Estado de México. Teléfonos 55 5027 0661, 55 1562 0103 y 55 7676 5844. WhatsApp 55 4152 2017. ventas@gecotay.com",
  openGraph: {
    title: "Contacto | Grupo Gecotay",
    description: "Canales directos de contacto de Grupo Gecotay: teléfono, WhatsApp, correo y ubicación.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Grupo Gecotay",
    description: "Teléfono, WhatsApp y correo de Grupo Gecotay.",
  },
  robots: { index: true, follow: true },
};

export default function ContactoLayout() {
  return (
    <>
      <GrainientBackground />
      <ContactoPage />
    </>
  );
}