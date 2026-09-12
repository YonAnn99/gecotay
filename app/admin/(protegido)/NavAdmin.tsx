"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/app/components/ui/PillNav";
import { cerrarSesion } from "../login/actions";

const enlaces = [
  { label: "Inicio", href: "" },
  { label: "Leads", href: "/leads" },
  { label: "Productos", href: "/productos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Promociones", href: "/promociones" },
  { label: "Medios", href: "/medios" },
  { label: "Colaboradores", href: "/colaboradores" },
];

/**
 * Barra del panel, sobre PillNav de ReactBits.
 *
 * LA ALTURA Y EL `relative` NO SON DECORATIVOS. La raíz de PillNav es
 * `position: absolute; top: 1em`: el componente está pensado como barra
 * flotante sobre una página, no como hijo de un flex. Metido en un flex normal
 * se sale del flujo y empuja fuera lo que tenga al lado — en la primera
 * versión el botón de Salir desapareció de la pantalla. Así que la cabecera
 * hace de bloque contenedor con altura propia (16px de `top` + 42px de nav +
 * 16px de aire) y los controles de la derecha se posicionan aparte.
 *
 * De paso encaja con la identidad: el sitio público ya usa islas flotantes.
 *
 * Es componente de cliente porque PillNav anima con GSAP y necesita refs. El
 * `base` llega del servidor (lo resuelve el proxy según la petición venga por
 * subdominio o por ruta directa); el resaltado activo se calcula aquí con
 * `usePathname`, donde antes cada pantalla marcaba el suyo a mano.
 */
export default function NavAdmin({ base, email }: { base: string; email: string }) {
  const pathname = usePathname();

  const items = enlaces.map(({ label, href }) => ({
    label,
    href: `${base}${href}` || "/",
  }));

  // Gana el más largo que case, para que /productos no marque Inicio también.
  const activo =
    items
      .filter((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? items[0].href;

  return (
    // El <header> no lleva estilos: es solo el envoltorio semántico. Cualquier
    // fondo o borde aquí vuelve a dibujar la barra que se quiso quitar.
    <header>
      {/* Contenedor fijo y SIN ALTURA: no pinta nada ni ocupa espacio, solo da
          el sistema de coordenadas a las dos islas, que cuelgan en absoluto.
          `mx-auto max-w-7xl` las alinea con el ancho del contenido; `fixed`
          hace que no se vayan al desplazarse. Es el mismo patrón que el sitio
          público (ver el comentario de app/components/layout/Navbar.tsx).
          El hueco superior lo repone el layout, no esta barra. */}
      <div className="fixed inset-x-0 top-0 z-50 mx-auto h-0 max-w-7xl px-6">
        <PillNav
          logo="/images/logo/logo-vertical-white.webp"
          logoAlt="Grupo Gecotay"
          items={items}
          activeHref={activo}
          // `--base` gobierna el círculo del logo, el relleno que sube al pasar
          // el ratón y el punto de activo: es por donde entra el verde de marca.
          // El texto sobre verde va en ink — #AAC637 es claro (L≈0.79) y con
          // blanco encima no pasa AA.
          baseColor="#aac637"
          pillColor="#ffffff"
          pillTextColor="#10140d"
          hoveredPillTextColor="#10140d"
          ease="power3.easeOut"
        />

        {/* Segunda isla, a juego con la del nav: el sitio público ya usa ese
            patrón de dos islas flotantes.

            AQUÍ NO VA EL CORREO, y no es una preferencia. Medido con el DOM ya
            asentado: PillNav con siete secciones ocupa 964px y la isla con el
            correo dentro, 278px. En un contenedor max-w-7xl con px-6 quedan
            1232px útiles, así que faltan 10px — y como el contenedor tiene
            ancho máximo, ese déficit NO mejora por mucho que crezca la
            pantalla. Solo con el botón "Salir" (110px) el hueco es de 158px.
            Si hace falta mostrar la cuenta, hay que acortar etiquetas, agrupar
            secciones o sacarla a un menú propio.

            (Cuidado al re-medir: PillNav anima su entrada durante ~8s. Medir
            antes de que asiente da 633px y lleva a conclusiones falsas.)

            En móvil PillNav pasa a hamburguesa y ocupa los últimos ~73px del
            borde derecho, así que la isla se aparta para no quedar debajo. */}
        <div className="absolute right-[76px] top-[1em] flex h-[42px] items-center rounded-full border border-[#10140d] bg-white p-1.5 text-sm md:right-6">
          <form action={cerrarSesion}>
            {/* El correo viaja en el title/aria-label en vez de ocupar ancho:
                saber en qué cuenta estás importa —las cookies se comparten
                entre puertos del mismo host, así que en local es fácil acabar
                operando con otra sesión sin darte cuenta— pero no justifica
                romper la barra. */}
            <button
              type="submit"
              title={`Cerrar la sesión de ${email}`}
              aria-label={`Cerrar la sesión de ${email}`}
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
