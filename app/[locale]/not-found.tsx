import Link from "next/link";
import Image from "next/image";
import { EMPRESA, CONTACTO } from "../data/empresa";

/**
 * 404 del sitio público.
 *
 * Los enlaces van **sin prefijo de locale** a propósito: `not-found.tsx` no
 * recibe `params`, así que no puede saber si el visitante venía de /es o /en.
 * Al dejarlos sin prefijo, el proxy los resuelve con la cookie `NEXT_LOCALE`
 * y cada quien aterriza en su idioma.
 *
 * El fondo se deja transparente para que se vea el WebGL de Grainient que ya
 * monta el layout raíz; escribir aquí un `bg-*` de Tailwind no funcionaría
 * porque la regla `body` de globals.css va sin capa y gana a las utilidades.
 */

const DESTINOS = [
  { href: "/productos", titulo: "Productos", detalle: "Catálogo de mobiliario" },
  { href: "/servicios", titulo: "Servicios", detalle: "Instalación, tapicería y más" },
  { href: "/acabados-tapices", titulo: "Acabados", detalle: "Telas, melaminas y metales" },
  { href: "/cotizar", titulo: "Cotizar", detalle: "Presupuesto sin compromiso" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center px-5 py-24">
      <div className="w-full max-w-3xl text-center">
        <Image
          src="/images/logo/logo-vertical-white.webp"
          alt={EMPRESA.nombreCorto}
          width={312}
          height={278}
          priority
          className="mx-auto mb-10 h-auto w-24 sm:w-28"
        />

        <p
          aria-hidden="true"
          className="bg-gradient-to-b from-primary to-primary-dark bg-clip-text text-7xl font-bold leading-none text-transparent sm:text-8xl"
        >
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] sm:text-4xl">
          Esta página no está en su lugar
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-lg text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)]">
          {EMPRESA.lema} Puede que el enlace haya cambiado o que la dirección
          tenga una errata. Te dejamos por dónde seguir.
        </p>

        <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Secciones principales">
          {DESTINOS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 text-left backdrop-blur-xl transition-colors hover:border-primary/50"
            >
              <p className="font-semibold text-gray-100 transition-colors group-hover:text-primary">
                {d.titulo}
              </p>
              <p className="mt-0.5 text-sm text-gray-400">{d.detalle}</p>
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-primary px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-primary-dark hover:text-white"
          >
            Volver al inicio
          </Link>
          <Link
            href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent(
              "Hola Grupo Ecotay, no encuentro lo que busco en el sitio."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-gray-200 transition-colors hover:border-primary/50 hover:text-primary"
          >
            Escríbenos por WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}
