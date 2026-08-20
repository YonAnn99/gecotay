import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Script from "next/script";
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
  title: "GECOTAY - Soluciones en Muebles y Equipamiento",
  description: "Fabricantes de mobiliario de oficina, contract y equipamiento integral. Calidad, diseño y funcionalidad.",
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
  themeColor: "#166534",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GECOTAY",
  image: "/images/logo/logo-horizontal-color.webp",
  url: "https://gecotay.com",
  telephone: "+34 96 123 45 67",
  address: {
    "@type": "PostalAddress",
    streetAddress: "C/ Industria 42",
    addressLocality: "Paterna",
    addressRegion: "Valencia",
    postalCode: "46980",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.505,
    longitude: -0.433,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "15:00",
    },
  ],
  priceRange: "€€",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <Script
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
