import type { Metadata, Viewport } from "next";
import { fontVariables } from "../lib/fonts";
import "../globals.css";

// ROOT LAYOUT del módulo de ventas (ventas.gecotay.com).
// Herramienta interna del equipo comercial: mismo razonamiento que
// app/admin/layout.tsx — root layout propio, sin el chrome del sitio público.
export const metadata: Metadata = {
  title: {
    default: "Ventas | Grupo Gecotay",
    template: "%s | Ventas Gecotay",
  },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10140d",
};

export default function VentasRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-superficie="interna"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
