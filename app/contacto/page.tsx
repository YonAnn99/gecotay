import { Metadata } from "next";
import ContactoPage from "./ContactoPage";
import AuroraBackground from "../components/ui/AuroraBackground";

export const metadata: Metadata = {
  title: "Contacto | Grupo Ecotay",
  description:
    "Contacta a Grupo Ecotay en Ecatepec, Estado de México. Teléfonos 55 5027 0661, 55 1562 0103 y 55 7676 5844. WhatsApp 55 4152 2017. ventas@gecotay.com",
  openGraph: {
    title: "Contacto | Grupo Ecotay",
    description: "Canales directos de contacto de Grupo Ecotay: teléfono, WhatsApp, correo y ubicación.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Ecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Grupo Ecotay",
    description: "Teléfono, WhatsApp y correo de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
};

export default function ContactoLayout() {
  return (
    <>
      <AuroraBackground />
      <ContactoPage />
    </>
  );
}