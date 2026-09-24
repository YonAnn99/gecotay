import type { Metadata, Viewport } from "next";
import { fontVariables } from "../lib/fonts";
import "../globals.css";

// ROOT LAYOUT del panel de administración (app.gecotay.com).
//
// Es un root layout por derecho propio: no existe `app/layout.tsx`, y según
// los docs de Next ("Any layout without a layout.js above it is a root
// layout" — node_modules/next/dist/docs/01-app/03-api-reference/
// 03-file-conventions/layout.md), cada árbol de primer nivel aporta el suyo.
// Por eso define su propio <html>/<body> y NO hereda nada del sitio público:
// ni Navbar, ni Footer, ni SplashScreen, ni el fondo WebGL.
export const metadata: Metadata = {
  title: {
    default: "Administración | Grupo Ecotay",
    template: "%s | Administración Ecotay",
  },
  // Herramienta interna: fuera de los buscadores, por si el subdominio queda
  // expuesto. El header X-Robots-Tag en next.config.ts es el refuerzo.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10140d",
};

export default function AdminRootLayout({
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
