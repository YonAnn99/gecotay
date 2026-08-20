import { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros – 50 años de experiencia | GECOTAY",
  description: "Conoce la historia, valores y certificaciones de GECOTAY, fabricantes de mobiliario de oficina y contract desde 1974.",
  openGraph: {
    title: "Nosotros – 50 años de experiencia | GECOTAY",
    description: "Historia, hitos, valores y certificaciones de GECOTAY.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros – 50 años de experiencia | GECOTAY",
    description: "Historia, hitos, valores y certificaciones de GECOTAY.",
  },
  robots: { index: true, follow: true },
};

export default function NosotrosLayout() {
  return <NosotrosPage />;
}