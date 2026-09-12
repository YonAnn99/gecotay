import Link from "next/link";
import { cerrarSesion } from "@/app/admin/login/actions";

const enlaces = [
  { href: "", etiqueta: "Catálogo" },
  { href: "/servicios", etiqueta: "Servicios" },
  { href: "/promociones", etiqueta: "Promociones" },
];

/**
 * Barra del módulo de ventas.
 *
 * Reutiliza `cerrarSesion` de admin: es la misma operación —terminar la sesión
 * de Supabase y volver al login de la superficie actual— y `baseDeSuperficie()`
 * ya resuelve a cuál, así que duplicarla no aportaría nada.
 */
export default function NavVentas({ base, email }: { base: string; email: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Gecotay · Ventas
        </p>
        <nav className="flex gap-5 text-sm">
          {enlaces.map(({ href, etiqueta }) => (
            <Link
              key={href}
              href={`${base}${href}` || "/"}
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              {etiqueta}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="hidden text-gray-500 sm:inline">{email}</span>
          <form action={cerrarSesion}>
            <button
              type="submit"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
