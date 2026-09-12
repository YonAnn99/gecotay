import Link from "next/link";
import { cerrarSesion } from "../login/actions";

const enlaces = [
  { href: "", etiqueta: "Inicio" },
  { href: "/leads", etiqueta: "Leads" },
  { href: "/productos", etiqueta: "Productos" },
  { href: "/servicios", etiqueta: "Servicios" },
  { href: "/promociones", etiqueta: "Promociones" },
  { href: "/medios", etiqueta: "Medios" },
  { href: "/colaboradores", etiqueta: "Colaboradores" },
];

/**
 * Barra del panel. Recibe `base` desde el layout porque los enlaces tienen que
 * conservar el prefijo cuando se navega por ruta directa (`/admin/...`), que es
 * como se usa en dev y en los previews mientras el dominio no esté conectado.
 */
export default function NavAdmin({ base, email }: { base: string; email: string }) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Gecotay · Admin
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
        <div className="ml-auto flex items-center gap-4 text-sm">
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
