"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/app/components/ui/PillNav";
import { cerrarSesion } from "@/app/admin/login/actions";

const enlaces = [
  { label: "Catálogo", href: "" },
  { label: "Servicios", href: "/servicios" },
  { label: "Promociones", href: "/promociones" },
];

/**
 * Barra del módulo de ventas, sobre el mismo PillNav que el panel.
 *
 * Reutiliza `cerrarSesion` de admin: es la misma operación —terminar la sesión
 * de Supabase y volver al login de la superficie actual— y `baseDeSuperficie()`
 * ya resuelve a cuál.
 *
 * `sticky` se mantiene del diseño anterior: esta pantalla se usa desplazándose
 * por el catálogo en el móvil, y perder la navegación al bajar molesta. La
 * altura fija y el `relative` son los mismos que en NavAdmin, y por la misma
 * razón: la raíz de PillNav va en `position: absolute`.
 */
export default function NavVentas({ base, email }: { base: string; email: string }) {
  const pathname = usePathname();

  const items = enlaces.map(({ label, href }) => ({
    label,
    href: `${base}${href}` || "/",
  }));

  const activo =
    items
      .filter((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? items[0].href;

  return (
    // Envoltorio semántico y nada más. El `sticky`, el fondo translúcido y el
    // `backdrop-blur` que había aquí eran propiedades de la BARRA; al quitarla
    // se van con ella — las islas ya traen su propio fondo sólido.
    <header>
      {/* Contenedor fijo y sin altura: solo posiciona las dos islas. Mismo
          patrón que el panel y que el sitio público. */}
      <div className="fixed inset-x-0 top-0 z-50 mx-auto h-0 max-w-7xl px-5">
        <PillNav
          logo="/images/logo/logo-vertical-white.webp"
          logoAlt="Grupo Ecotay"
          items={items}
          activeHref={activo}
          // Mismos colores que el panel: `--base` gobierna el círculo del
          // logo, el relleno que sube al pasar el ratón y el punto de activo.
          // Sobre el verde el texto va en ink — con blanco no pasaría AA.
          baseColor="#aac637"
          pillColor="#ffffff"
          pillTextColor="#10140d"
          hoveredPillTextColor="#10140d"
          ease="power3.easeOut"
        />

        {/* Aquí el correo sí cabe desde lg: ventas solo tiene tres secciones,
            así que el nav ocupa bastante menos que el del panel.

            En móvil PillNav se convierte en hamburguesa y ocupa los últimos
            ~73px del borde derecho (medido en el navegador), así que la isla se
            aparta para no quedar debajo. */}
        <div className="absolute right-[76px] top-[1em] flex h-[42px] items-center gap-3 rounded-full border border-[#10140d] bg-white pl-4 pr-1.5 text-sm md:right-5">
          <span className="hidden max-w-[220px] truncate text-gray-500 lg:inline">{email}</span>
          <form action={cerrarSesion}>
            <button
              type="submit"
              className="rounded-full bg-[#10140d] px-4 py-1.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
