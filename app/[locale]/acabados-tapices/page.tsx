import { Metadata } from "next";
import AcabadosPage from "./AcabadosPage";
import GrainientBackground from "../../components/ui/GrainientBackground";

export const metadata: Metadata = {
  title: "Acabados y tapices | Grupo Gecotay",
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
};

export default function AcabadosLayout() {
  return (
    <>
      <GrainientBackground />
      <AcabadosPage />
    </>
  );
}