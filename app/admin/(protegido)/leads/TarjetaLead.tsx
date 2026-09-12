"use client";

import { useState } from "react";
import { actualizarLead } from "@/app/actions/leads-admin";
import { ESTADOS_LEAD } from "@/app/lib/leads";

export interface DatosLead {
  id: string;
  tabla: "contactos" | "cotizaciones";
  nombre: string;
  email: string | null;
  telefono: string | null;
  empresa: string | null;
  estado: string;
  notas: string | null;
  created_at: string;
  /** Pares etiqueta/valor específicos de cada formulario. */
  detalles: { etiqueta: string; valor: string }[];
  /** Cuerpo largo: el mensaje de contacto o la descripción del proyecto. */
  cuerpo: string;
}

const COLOR_ESTADO: Record<string, string> = {
  nuevo: "bg-amber-50 text-amber-800 border-amber-200",
  contactado: "bg-blue-50 text-blue-800 border-blue-200",
  cotizado: "bg-violet-50 text-violet-800 border-violet-200",
  ganado: "bg-green-50 text-green-800 border-green-200",
  perdido: "bg-gray-100 text-gray-600 border-gray-200",
};

function fecha(valor: string) {
  return new Date(valor).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TarjetaLead({ lead }: { lead: DatosLead }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <li className="rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-3 p-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{lead.nombre}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                COLOR_ESTADO[lead.estado] ?? COLOR_ESTADO.perdido
              }`}
            >
              {lead.estado}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {lead.tabla === "cotizaciones" ? "Cotización" : "Contacto"}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {fecha(lead.created_at)}
            {lead.empresa && ` · ${lead.empresa}`}
          </p>

          {/* Canales de respuesta: lo primero que se necesita al abrir un lead. */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="text-gray-700 underline underline-offset-2">
                {lead.email}
              </a>
            )}
            {lead.telefono && (
              <a
                href={`https://wa.me/52${lead.telefono.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline underline-offset-2"
              >
                {lead.telefono}
              </a>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          {abierto ? "Cerrar" : "Ver detalle"}
        </button>
      </div>

      {abierto && (
        <div className="border-t border-gray-100 p-5">
          {lead.detalles.length > 0 && (
            <dl className="mb-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {lead.detalles.map((d) => (
                <div key={d.etiqueta} className="text-sm">
                  <dt className="text-gray-500">{d.etiqueta}</dt>
                  <dd className="text-gray-900">{d.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mb-5">
            <p className="text-sm text-gray-500">
              {lead.tabla === "cotizaciones" ? "Descripción del proyecto" : "Mensaje"}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-900">{lead.cuerpo}</p>
          </div>

          {/* Un solo formulario para estado y notas: son lo que el vendedor
              toca a la vez tras hablar con el cliente. */}
          <form action={actualizarLead} className="space-y-3 border-t border-gray-100 pt-5">
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="tabla" value={lead.tabla} />

            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor={`estado-${lead.id}`} className="text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id={`estado-${lead.id}`}
                name="estado"
                defaultValue={lead.estado}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {ESTADOS_LEAD.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`notas-${lead.id}`} className="text-sm font-medium text-gray-700">
                Notas de seguimiento
              </label>
              <textarea
                id={`notas-${lead.id}`}
                name="notas"
                rows={3}
                defaultValue={lead.notas ?? ""}
                maxLength={4000}
                placeholder="Qué se habló, próximos pasos…"
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Guardar
            </button>
          </form>
        </div>
      )}
    </li>
  );
}
