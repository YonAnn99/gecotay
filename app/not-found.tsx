import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fontVariables } from "./lib/fonts";
import { EMPRESA } from "./data/empresa";
import "./globals.css";

/**
 * 404 global: la que se sirve cuando una URL no casa con NINGUNA ruta.
 *
 * `app/[locale]/not-found.tsx` solo cubre los `notFound()` lanzados dentro de
 * ese segmento (por ejemplo un producto despublicado). Una dirección suelta
 * como /cualquier-cosa no llega hasta allí y, sin este archivo, Next servía su
 * 404 en blanco y negro con el texto en inglés "This page could not be found".
 *
 * Como el proyecto no tiene `app/layout.tsx` —cada superficie aporta su propio
 * root layout—, esta página **debe** renderizar su `<html>` y `<body>`: no hay
 * ningún layout por encima que los ponga.
 *
 * Los enlaces van sin prefijo de locale para que el proxy los resuelva con la
 * cookie `NEXT_LOCALE` del visitante.
 */
// Sin layout por encima no hay `title.template` que herede: la 404 global
// tiene que declarar su propio título o el navegador muestra la URL cruda.
export const metadata: Metadata = {
  title: "Página no encontrada | Grupo Ecotay",
  robots: { index: false, follow: true },
};

export default function NotFoundGlobal() {
  return (
    <html lang="es" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <main className="flex min-h-dvh items-center justify-center px-5 py-16">
          <div className="w-full max-w-md text-center">
            <Image
              src="/images/logo/logo-vertical-white.webp"
              alt={EMPRESA.nombreCorto}
              width={312}
              height={278}
              priority
              className="mx-auto mb-8 h-auto w-24"
            />

            <p
              aria-hidden="true"
              className="bg-gradient-to-b from-primary to-primary-dark bg-clip-text text-7xl font-bold leading-none text-transparent"
            >
              404
            </p>

            <h1 className="mt-6 text-2xl font-bold text-gray-100 sm:text-3xl">
              Esta dirección no existe
            </h1>

            <p className="mt-4 text-gray-400">
              Revisa el enlace o vuelve al inicio para seguir navegando.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-primary px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-primary-dark hover:text-white"
            >
              Ir al inicio
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
