import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Script from "next/script";
import { EMPRESA, CONTACTO } from "./data/empresa";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grupo Ecotay | Fabricación y venta de mobiliario de oficina",
  description:
    "Grupo Ecotay S.A.S. de C.V. Fabricación, distribución y venta de mobiliario de oficina, sillería, recepciones, salas de juntas y sistemas de almacenamiento en Ecatepec, Estado de México. Envíos a CDMX y área metropolitana.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#AAC637",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo Ecotay S.A.S. de C.V.",
  legalName: "GRUPO ECOTAY S.A.S. de C.V.",
  slogan: "Su espacio en nuestras manos...",
  url: EMPRESA.url,
  logo: "/images/logo/logo-horizontal-color.webp",
  image: "/images/logo/logo-horizontal-color.webp",
  taxID: EMPRESA.rfc,
  telephone: "+525550270661",
  email: CONTACTO.correos.ventas,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cda. de San Luis Potosí Mz. 2 Lt. 2, Col. Ejidos de Tulpetlac",
    addressLocality: "Ecatepec de Morelos",
    addressRegion: "Estado de México",
    postalCode: CONTACTO.cp,
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACTO.geo.lat,
    longitude: CONTACTO.geo.lng,
  },
  areaServed: ["México", "Ciudad de México", "Área metropolitana"],
  priceRange: "$$",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+525550270661",
      contactType: "ventas",
      areaServed: "MX",
      availableLanguage: "Spanish",
    },
    {
      "@type": "ContactPoint",
      telephone: "+525541522017",
      contactType: "whatsapp",
      areaServed: "MX",
      availableLanguage: "Spanish",
    },
  ],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}