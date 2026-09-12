"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { subirMedio, borrarMedio, type ResultadoSubida } from "@/app/actions/medios";
import { CAMPO, ETIQUETA, BOTON_PRIMARIO, BOTON_SECUNDARIO, TARJETA } from "../ui";

export interface Medio {
  id: string;
  path: string;
  url: string;
  mime: string | null;
  bytes: number | null;
  alt: string | null;
  created_at: string;
}

function peso(bytes: number | null) {
  if (!bytes) return "—";
  return bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

export default function GaleriaMedios({ medios }: { medios: Medio[] }) {
  const [estado, accion, subiendo] = useActionState<ResultadoSubida | undefined, FormData>(
    subirMedio,
    undefined
  );
  const [copiada, setCopiada] = useState<string | null>(null);

  async function copiar(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiada(url);
      setTimeout(() => setCopiada(null), 2000);
    } catch {
      // Sin permiso de portapapeles (o contexto no seguro): el campo de solo
      // lectura de abajo sigue permitiendo seleccionar y copiar a mano.
    }
  }

  return (
    <div className="space-y-6">
      <section className={`${TARJETA} p-5`}>
        <h2 className="font-semibold">Subir imagen</h2>
        <p className="mt-1 text-sm text-gray-600">
          WebP, JPG, PNG, AVIF o SVG. Máximo 10 MB.
        </p>

        <form action={accion} className="mt-4 space-y-4">
          <div>
            <label htmlFor="archivo" className={ETIQUETA}>Archivo</label>
            <input
              id="archivo"
              name="archivo"
              type="file"
              required
              accept="image/webp,image/jpeg,image/png,image/avif,image/svg+xml"
              className={`${CAMPO} file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm`}
            />
          </div>

          <div>
            <label htmlFor="alt" className={ETIQUETA}>Texto alternativo</label>
            <input id="alt" name="alt" placeholder="Qué se ve en la imagen" className={CAMPO} />
            <p className="mt-1.5 text-xs text-gray-500">
              Lo leen los lectores de pantalla y cuenta para el SEO.
            </p>
          </div>

          <button type="submit" disabled={subiendo} className={BOTON_PRIMARIO}>
            {subiendo ? "Subiendo…" : "Subir"}
          </button>
        </form>

        {estado && !estado.ok && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {estado.error}
          </p>
        )}
        {estado?.ok && (
          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
            {/* Este es el momento en que la interfaz parecía terminada y no lo
                estaba: el archivo ya está guardado, pero no se ve en ningún
                sitio hasta que su enlace se pega en un registro. Decirlo aquí
                evita la pregunta «¿y ahora dónde elijo dónde se muestra?». */}
            <p className="text-sm font-medium">Imagen guardada — todavía no se muestra en ninguna parte.</p>
            <p className="mt-1 text-sm text-gray-600">
              Para que aparezca, copia este enlace y pégalo en el campo de imagen
              de un producto, un servicio o una promoción.
            </p>
            {/* El campo de solo lectura se queda como respaldo: si el
                portapapeles no está disponible, sigue pudiéndose seleccionar
                y copiar a mano. */}
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                readOnly
                value={estado.url}
                onFocus={(e) => e.currentTarget.select()}
                aria-label="Enlace de la imagen"
                className="min-w-0 flex-1 rounded-lg bg-white px-3 py-2 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => copiar(estado.url)}
                className={`${BOTON_SECUNDARIO} shrink-0 bg-white`}
              >
                {copiada === estado.url ? "¡Copiada!" : "Copiar URL"}
              </button>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-semibold">En la biblioteca ({medios.length})</h2>

        {!medios.length ? (
          <p className={`${TARJETA} px-6 py-10 text-center text-sm text-gray-500`}>
            Todavía no has subido nada. Las imágenes que ya usa el sitio viven en el repositorio
            y no aparecen aquí.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {medios.map((m) => (
              <li key={m.id} className={`${TARJETA} overflow-hidden`}>
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={m.url}
                    alt={m.alt ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <p className="truncate text-sm" title={m.path}>
                    {m.path.split("/").pop()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {peso(m.bytes)} · {m.mime?.replace("image/", "") ?? "?"}
                  </p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => copiar(m.url)} className={`${BOTON_SECUNDARIO} flex-1`}>
                      {copiada === m.url ? "¡Copiada!" : "Copiar URL"}
                    </button>
                    <form
                      action={borrarMedio}
                      onSubmit={(e) => {
                        if (!confirm("¿Borrar esta imagen? Si algún producto la usa, se quedará sin foto."))
                          e.preventDefault();
                      }}
                    >
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="path" value={m.path} />
                      <button
                        type="submit"
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-50"
                      >
                        Borrar
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
