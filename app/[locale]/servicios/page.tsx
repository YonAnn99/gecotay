import { Metadata } from "next";
import ServiciosPage from "./ServiciosPage";
import GrainientBackground from "../../components/ui/GrainientBackground";

export const metadata: Metadata = {
  title: "Servicios integrales | Grupo Gecotay",
  description:
    "Servicios de Grupo Gecotay: atención personalizada, post-venta, planeación de espacios, entrega e instalación, mantenimiento, carpintería, ebanistería, tapicería, transporte, herrería y comidas empresariales.",
  openGraph: {
    title: "Servicios integrales | Grupo Gecotay",
    description: "11 servicios integrales de Grupo Gecotay para mobiliario y espacios de trabajo.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Gecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios integrales | Grupo Gecotay",
    description: "11 servicios integrales de Grupo Gecotay.",
  },
  robots: { index: true, follow: true },
};

export default function ServiciosLayout() {
  return (
    <>
      <GrainientBackground />
      <ServiciosPage />
    </>
  );
}