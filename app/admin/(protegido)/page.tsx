import Link from "next/link";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { baseDeSuperficie } from "@/app/lib/auth";
import { TARJETA } from "./ui";

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

  const [cotiz, cont, nuevasCotiz, nuevosCont, productos, servicios, promos, medios] =
    await Promise.all([
      supabase.from("cotizaciones").select("*", OPCIONES),
      supabase.from("contactos").select("*", OPCIONES),
      supabase.from("cotizaciones").select("*", OPCIONES).eq("estado", "nuevo"),
      supabase.from("contactos").select("*", OPCIONES).eq("estado", "nuevo"),
      cuenta("lineas_producto"),
      cuenta("servicios"),
      cuenta("promociones"),
      cuenta("media"),
    ]);

  const sinAtender = (nuevasCotiz.count ?? 0) + (nuevosCont.count ?? 0);
  const totalLeads = (cotiz.count ?? 0) + (cont.count ?? 0);

  const secciones = [
    {
      href: "/leads",
      titulo: "Leads",
      dato: `${totalLeads}`,
      detalle: sinAtender > 0 ? `${sinAtender} sin atender` : "todo atendido",
      destacar: sinAtender > 0,
    },
    { href: "/productos", titulo: "Productos", dato: `${productos.count ?? 0}`, detalle: "líneas en catálogo" },
    { href: "/servicios", titulo: "Servicios", dato: `${servicios.count ?? 0}`, detalle: "publicables" },
    { href: "/promociones", titulo: "Promociones", dato: `${promos.count ?? 0}`, detalle: "creadas" },
    { href: "/medios", titulo: "Medios", dato: `${medios.count ?? 0}`, detalle: "imágenes subidas" },
    { href: "/colaboradores", titulo: "Colaboradores", dato: "", detalle: "accesos al módulo de ventas" },
  ];

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Panel de administración</h1>
        <p className="mt-1 text-gray-600">
          {sinAtender > 0
            ? `Tienes ${sinAtender} solicitud(es) sin atender.`
            : "No hay solicitudes pendientes."}
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {secciones.map((s) => (
          <li key={s.href}>
            <Link
              href={`${base}${s.href}`}
              className={`block ${TARJETA} p-5 transition-colors hover:border-primary/50 ${
                s.destacar ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <p className="text-sm font-medium text-gray-700">{s.titulo}</p>
              {s.dato && <p className="mt-2 text-3xl font-semibold">{s.dato}</p>}
              <p className={`${s.dato ? "mt-1" : "mt-2"} text-sm text-gray-500`}>{s.detalle}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
