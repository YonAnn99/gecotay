import { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros | Grupo Gecotay",
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
};

export default function NosotrosLayout() {
  return <NosotrosPage />;
}