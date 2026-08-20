import { Metadata } from "next";
import AcabadosPage from "./AcabadosPage";

export const metadata: Metadata = {
  title: "Acabados y Tapices | GECOTAY",
  description: "Descubre nuestra amplia gama de acabados y tapices para mobiliario de oficina y contract: telas, maderas, metales y superficies personalizables. Calidad certificada y sostenibilidad.",
  openGraph: {
    title: "Acabados y Tapices | GECOTAY",
    description: "Catálogo de acabados y tapices para mobiliario profesional. Personaliza tus proyectos con materiales de alta calidad.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acabados y Tapices | GECOTAY",
    description: "Catálogo de acabados y tapices para mobiliario profesional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AcabadosLayout() {
  return <AcabadosPage />;
}