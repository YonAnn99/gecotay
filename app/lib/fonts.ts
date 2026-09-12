import { Geist, Geist_Mono } from "next/font/google";

// Compartidas por los tres root layouts (sitio público, admin y ventas).
// `next/font` exige que la llamada viva en el ámbito del módulo, así que
// centralizarlas aquí evita instanciar la misma familia tres veces.
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Clases que cada root layout aplica a su `<html>`. */
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
