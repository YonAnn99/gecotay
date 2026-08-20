import { Metadata } from "next";
import CotizarPage from "./CotizarPage";

export const metadata: Metadata = {
  title: "Solicita tu presupuesto – GECOTAY",
  description: "Completa el formulario en 4 pasos y recibe una propuesta técnica y económica sin compromiso en 24‑48 h.",
  openGraph: {
    title: "Solicita tu presupuesto – GECOTAY",
    description: "Presupuesto personalizado de mobiliario de oficina y contract.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solicita tu presupuesto – GECOTAY",
    description: "Presupuesto personalizado de mobiliario de oficina y contract.",
  },
  robots: { index: true, follow: true },
};

export default function CotizarLayout() {
  return <CotizarPage />;
}