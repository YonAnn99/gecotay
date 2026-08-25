import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/CookieBanner";
import WhatsAppFloat from "../components/ui/WhatsAppFloat";
import GrainientBackground from "../components/ui/GrainientBackground";
import SplashScreen from "../components/ui/SplashScreen";
import { EMPRESA, CONTACTO } from "../data/empresa";
import "../globals.css";

const locales = ["es", "en"];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(EMPRESA.url),
  title: {
    default: "Grupo Gecotay | Fabricación y venta de mobiliario de oficina",
    template: "%s | Grupo Gecotay",
  },
  description:
    "Grupo Gecotay S.A.S. de C.V. Fabricación, distribución y venta de mobiliario de oficina, sillería, recepciones, salas de juntas y sistemas de almacenamiento en Ecatepec, Estado de México. Envíos a CDMX y área metropolitana.",
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
  "@type": "LocalBusiness",
  name: "Grupo Gecotay S.A.S. de C.V.",
  legalName: "GRUPO GECOTAY S.A.S. de C.V.",
  slogan: "Su espacio en nuestras manos...",
  url: EMPRESA.url,
  logo: `${EMPRESA.url}/images/logo/logo-horizontal-color.webp`,
  image: `${EMPRESA.url}/images/logo/logo-horizontal-color.webp`,
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

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Static splash: paints with the first server byte, before any JS.
            SplashScreen (client) controls its lifecycle via DOM. */}
        <div id="splash" className="splash-overlay" role="status" aria-label="Cargando">
          <div className="splash-glow" aria-hidden="true" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <Image
              src="/images/logo/logo-horizontal-white.webp"
              alt="Grupo Gecotay"
              width={436}
              height={280}
              priority
              className="splash-logo w-44 sm:w-56 h-auto"
            />
            <p className="splash-text mt-7 mr-[-0.35em] sm:mr-[-0.45em] text-lg sm:text-2xl font-medium text-white/90 tracking-[0.35em] sm:tracking-[0.45em] uppercase">
              Bienvenido
            </p>
            <div
              className="mt-7 h-[2px] w-40 sm:w-56 overflow-hidden rounded-full bg-white/10"
              aria-hidden="true"
            >
              <div
                id="splash-bar"
                className="h-full w-full origin-center rounded-full bg-primary will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
        <SplashScreen />
        <GrainientBackground />
        <Navbar locale={locale} />
        <WhatsAppFloat />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <CookieBanner locale={locale} />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
