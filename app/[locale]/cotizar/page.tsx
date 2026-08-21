import { Metadata } from "next";
import CotizarPage from "./CotizarPage";

export const metadata: Metadata = {
  title: "Solicita tu presupuesto | Grupo Ecotay",
  description:
    "Completa el formulario en 4 pasos y envía tu solicitud de presupuesto por WhatsApp o correo a Grupo Ecotay.",
  openGraph: {
    title: "Solicita tu presupuesto | Grupo Ecotay",
    description: "Presupuesto personalizado de mobiliario de oficina y hogar.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Ecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solicita tu presupuesto | Grupo Ecotay",
    description: "Presupuesto personalizado de mobiliario.",
  },
  robots: { index: true, follow: true },
};

export default function CotizarLayout() {
  return <CotizarPage />;
}