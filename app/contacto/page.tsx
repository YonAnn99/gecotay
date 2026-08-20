import { Metadata } from "next";
import ContactoPage from "./ContactoPage";

export const metadata: Metadata = {
  title: "Contacto – GECOTAY",
  description: "Ponte en contacto con GECOTAY: formulario, teléfono, email y delegaciones. Respuesta en menos de 24 h laborables.",
  openGraph: {
    title: "Contacto – GECOTAY",
    description: "Formulario, teléfono, email y delegaciones de GECOTAY.",
    type: "website",
    locale: "es_ES",
    siteName: "GECOTAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto – GECOTAY",
    description: "Formulario, teléfono, email y delegaciones de GECOTAY.",
  },
  robots: { index: true, follow: true },
};

export default function ContactoLayout() {
  return <ContactoPage />;
}