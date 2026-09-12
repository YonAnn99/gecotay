import Link from "next/link";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { baseDeSuperficie } from "@/app/lib/auth";
import { ESTADOS_LEAD } from "@/app/lib/leads";
import { TARJETA } from "./ui";

/**
 * Fecha en la zona del negocio.
 *
 * El servidor de Vercel va en UTC: sin fijar la zona, entre las 18:00 y la
 * medianoche de México el panel mostraría el día siguiente.
 */
const ZONA = "America/Mexico_City";

function hoyEnTexto(): string {
  return new Date().toLocaleDateString("es-MX", {
    timeZone: ZONA,
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function cuandoEnTexto(iso: string): string {
  return new Date(iso).toLocaleString("es-MX", {
    timeZone: ZONA,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Chevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-gray-300 transition-colors group-hover:text-primary"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default async function AdminHome() {
  const base = await baseDeSuperficie();
  const supabase = await createSessionClient();

  // `head: true` con `count: exact` pide solo el conteo: no trae ni una fila.
  const OPCIONES = { count: "exact", head: true } as const;

  // Las tablas sin filtro pasan por el helper; las de leads van sueltas porque
  // filtran por `estado`, y un helper genérico sobre varias tablas estrecha el
  // tipo a las columnas que TODAS comparten — `estado` no sobreviviría.
  const cuenta = (tabla: "lineas_producto" | "servicios" | "promociones" | "media") =>
    supabase.from(tabla).select("*", OPCIONES);

  // El desglose del embudo: por cada estado hacen falta las dos tablas, porque
  // la bandeja las mezcla. Se piden en el mismo `Promise.all` que el resto.
  const porEstado = ESTADOS_LEAD.flatMap((e) => [
    supabase.from("cotizaciones").select("*", OPCIONES).eq("estado", e),
    supabase.from("contactos").select("*", OPCIONES).eq("estado", e),
  ]);

  // Última escritura del catálogo: una fila por tabla, solo su `updated_at`.
  const ultimaDe = (tabla: "lineas_producto" | "servicios" | "promociones") =>
    supabase
      .from(tabla)
      .select("updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

  const [
    cotiz,
    cont,
    productos,
    servicios,
    promos,
    medios,
    colaboradores,
    ultProductos,
    ultServicios,
    ultPromos,
    ...conteosEstado
  ] = await Promise.all([
    supabase.from("cotizaciones").select("*", OPCIONES),
    supabase.from("contactos").select("*", OPCIONES),
    cuenta("lineas_producto"),
    cuenta("servicios"),
    cuenta("promociones"),
    cuenta("media"),
    supabase.from("perfiles").select("*", OPCIONES).eq("rol", "ventas"),
    ultimaDe("lineas_producto"),
    ultimaDe("servicios"),
    ultimaDe("promociones"),
    ...porEstado,
  ]);

  // Los conteos llegan en pares (cotizaciones, contactos) en el orden de
  // ESTADOS_LEAD: se recomponen sumando cada par.
  const embudo = ESTADOS_LEAD.map((estado, i) => ({
    estado,
    total:
      (conteosEstado[i * 2]?.count ?? 0) + (conteosEstado[i * 2 + 1]?.count ?? 0),
  }));

  const sinAtender = embudo.find((e) => e.estado === "nuevo")?.total ?? 0;
  const totalLeads = (cotiz.count ?? 0) + (cont.count ?? 0);

  // El embudo se enseña sin "perdido": en un vistazo interesa lo que sigue
  // vivo. El total de arriba sí los incluye.
  const embudoVisible = embudo.filter((e) => e.estado !== "perdido");

  const ultimoCambio = [ultProductos, ultServicios, ultPromos]
    .map((r) => r.data?.updated_at)
    .filter((v): v is string => Boolean(v))
    .sort()
    .at(-1);

  const secciones = [
    { href: "/productos", titulo: "Productos", dato: `${productos.count ?? 0}`, detalle: "líneas en catálogo" },
    { href: "/servicios", titulo: "Servicios", dato: `${servicios.count ?? 0}`, detalle: "publicables" },
    { href: "/promociones", titulo: "Promociones", dato: `${promos.count ?? 0}`, detalle: "creadas" },
    { href: "/medios", titulo: "Medios", dato: `${medios.count ?? 0}`, detalle: "imágenes subidas" },
    {
      href: "/colaboradores",
      titulo: "Colaboradores",
      dato: `${colaboradores.count ?? 0}`,
      detalle: "con acceso a ventas",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl space-y-5 px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Panel de administración</h1>
          {/* `first-letter` y no `capitalize`: es-MX devuelve «sábado, 12 de
              septiembre» y `capitalize` pondría mayúscula en «De» y en el mes. */}
          <p className="mt-1.5 text-[15px] text-gray-600 first-letter:uppercase">
            {hoyEnTexto()}
          </p>
        </div>

        {sinAtender > 0 && (
          <div className={`flex items-center gap-3 ${TARJETA} border-l-[3px] border-l-primary px-5 py-3.5`}>
            <span className="text-[28px] font-semibold leading-none">{sinAtender}</span>
            <span className="text-[13px] leading-tight text-gray-600">
              solicitudes
              <br />
              sin atender
            </span>
          </div>
        )}
      </div>

      {/* Los leads son lo único que cuesta dinero si se desatiende, así que
          salen de la rejilla y ocupan el ancho completo con su embudo. */}
      <Link
        href={`${base}/leads`}
        className={`group relative block overflow-hidden ${TARJETA} px-7 py-6 transition-colors hover:border-primary/50`}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-primary-dark" />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
              Leads
            </p>
            <p className="mt-2 text-[40px] font-semibold leading-none tracking-tight">
              {totalLeads}
            </p>
            <p className="mt-1.5 text-sm text-gray-600">
              cotizaciones y contactos recibidos
            </p>
          </div>

          <div className="hidden w-px self-stretch bg-gray-200 sm:block" />

          <div className="flex flex-1 flex-wrap gap-x-7 gap-y-3">
            {embudoVisible.map((e) => (
              <div key={e.estado}>
                <p
                  className={`text-[22px] font-semibold leading-none ${
                    e.estado === "nuevo" && e.total > 0 ? "text-primary-dark" : ""
                  }`}
                >
                  {e.total}
                </p>
                <p className="mt-1 text-[13px] capitalize text-gray-500">{e.estado}</p>
              </div>
            ))}
          </div>

          <span className="rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white transition-opacity group-hover:opacity-90">
            Ver bandeja
          </span>
        </div>
      </Link>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {secciones.map((s) => (
          <li key={s.href}>
            <Link
              href={`${base}${s.href}`}
              className={`group block ${TARJETA} px-6 py-5 transition-colors hover:border-primary/50`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">{s.titulo}</p>
                <Chevron />
              </div>
              <p className="mt-3.5 text-[32px] font-semibold leading-none tracking-tight">
                {s.dato}
              </p>
              <p className="mt-1.5 text-[13px] text-gray-500">{s.detalle}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="pt-3 text-[13px] text-gray-500">
        {/* Sin punto tras la fecha: es-MX ya cierra la hora con «p. m.» y
            quedaban dos puntos seguidos. */}
        {ultimoCambio
          ? `Última actualización del catálogo: ${cuandoEnTexto(ultimoCambio)}`
          : "Todavía no se ha editado nada del catálogo"}
        {" · "}
        Los cambios se reflejan en el sitio al guardar.
      </p>
    </main>
  );
}
