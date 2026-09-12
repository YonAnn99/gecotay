import type { Metadata } from "next";
import Link from "next/link";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { baseDeSuperficie } from "@/app/lib/auth";
import { ESTADOS_LEAD } from "@/app/lib/leads";
import TarjetaLead, { type DatosLead } from "./TarjetaLead";

export const metadata: Metadata = { title: "Leads" };

/** Omite los campos vacíos para no pintar filas "—" sin información. */
function detalle(etiqueta: string, valor: string | null | undefined) {
  return valor ? [{ etiqueta, valor }] : [];
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const base = await baseDeSuperficie();
  const filtro = ESTADOS_LEAD.includes(estado as never) ? estado : null;

  // Cliente de sesión: estas lecturas pasan por las políticas RLS de admin.
  const supabase = await createSessionClient();

  let qCotizaciones = supabase
    .from("cotizaciones")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  let qContactos = supabase
    .from("contactos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (filtro) {
    qCotizaciones = qCotizaciones.eq("estado", filtro as never);
    qContactos = qContactos.eq("estado", filtro as never);
  }

  const [{ data: cotizaciones }, { data: contactos }] = await Promise.all([
    qCotizaciones,
    qContactos,
  ]);

  const leads: DatosLead[] = [
    ...(cotizaciones ?? []).map((c) => ({
      id: c.id,
      tabla: "cotizaciones" as const,
      nombre: c.nombre,
      email: c.email,
      telefono: c.telefono,
      empresa: c.empresa,
      estado: c.estado,
      notas: c.notas,
      created_at: c.created_at,
      cuerpo: c.descripcion,
      detalles: [
        ...detalle("Cargo", c.cargo),
        ...detalle("Tipo de proyecto", c.tipo_proyecto),
        ...detalle("Ubicación", c.ubicacion),
        ...detalle("Superficie", c.superficie ? `${c.superficie} m²` : null),
        ...detalle("Plazo", c.plazo),
        ...detalle("Presupuesto", c.presupuesto),
        ...detalle("Servicios", c.servicios.length ? c.servicios.join(", ") : null),
        ...detalle("Observaciones", c.observaciones),
      ],
    })),
    ...(contactos ?? []).map((c) => ({
      id: c.id,
      tabla: "contactos" as const,
      nombre: c.nombre,
      email: c.email,
      telefono: c.telefono,
      empresa: c.empresa,
      estado: c.estado,
      notas: c.notas,
      created_at: c.created_at,
      cuerpo: c.mensaje,
      detalles: detalle("Asunto", c.asunto),
    })),
  // Las dos tablas se mezclan en una sola bandeja ordenada por fecha: a quien
  // atiende le importa qué llegó primero, no de qué formulario vino.
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const nuevos = leads.filter((l) => l.estado === "nuevo").length;

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="mt-1 text-gray-600">
          Solicitudes de cotización y mensajes de contacto, más recientes primero.
          {nuevos > 0 && ` ${nuevos} sin atender.`}
        </p>
      </div>

      <nav className="flex flex-wrap gap-2" aria-label="Filtrar por estado">
        <Link
          href={`${base}/leads`}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            !filtro
              ? "border-ink bg-ink text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Todos
        </Link>
        {ESTADOS_LEAD.map((e) => (
          <Link
            key={e}
            href={`${base}/leads?estado=${e}`}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
              filtro === e
                ? "border-ink bg-ink text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {e}
          </Link>
        ))}
      </nav>

      {!leads.length ? (
        <p className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
          {filtro
            ? `No hay leads en estado "${filtro}".`
            : "Todavía no ha llegado ninguna solicitud."}
        </p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <TarjetaLead key={`${lead.tabla}-${lead.id}`} lead={lead} />
          ))}
        </ul>
      )}
    </main>
  );
}
