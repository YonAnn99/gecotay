import { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros | Grupo Ecotay",
  description:
    "Conoce a Grupo Ecotay S.A.S. de C.V.: quiénes somos, nuestra misión, visión y valores. Fabricación de mobiliario en Ecatepec, Estado de México.",
  openGraph: {
    title: "Nosotros | Grupo Ecotay",
    description: "Misión, visión y valores de Grupo Ecotay S.A.S. de C.V.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Ecotay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Grupo Ecotay",
    description: "Misión, visión y valores de Grupo Ecotay.",
  },
  robots: { index: true, follow: true },
};

export default function NosotrosLayout() {
  return <NosotrosPage />;
}