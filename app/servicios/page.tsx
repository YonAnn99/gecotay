import { Metadata } from "next";
import ServiciosPage from "./ServiciosPage";
import AuroraBackground from "../components/ui/AuroraBackground";

export const metadata: Metadata = {
  title: "Servicios integrales | Grupo Ecotay",
  description:
    "Servicios de Grupo Ecotay: atención personalizada, post-venta, planeación de espacios, entrega e instalación, mantenimiento, carpintería, ebanistería, tapicería, transporte, herrería y comidas empresariales.",
  openGraph: {
    title: "Servicios integrales | Grupo Ecotay",
    description: "11 servicios integrales de Grupo Ecotay para mobiliario y espacios de trabajo.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Ecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios integrales | Grupo Ecotay",
    description: "11 servicios integrales de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
};

export default function ServiciosLayout() {
  return (
    <>
      <AuroraBackground />
      <ServiciosPage />
    </>
  );
}