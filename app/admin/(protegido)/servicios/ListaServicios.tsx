"use client";

import { useState, useTransition } from "react";
import { guardarServicio, borrarServicio } from "@/app/actions/contenido";
import { CAMPO, ETIQUETA, BOTON_PRIMARIO, BOTON_SECUNDARIO, TARJETA } from "../ui";

export interface Servicio {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  publicado: boolean;
  orden: number;
}

function Editor({
  servicio,
  alCerrar,
}: {
  servicio: Servicio | null;
  alCerrar: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();
  const k = servicio?.id ?? "nuevo";

  function enviar(formData: FormData) {
    iniciar(async () => {
      const r = await guardarServicio(formData);
      if (!r.ok) setError(r.error);
      else {
        setError(null);
        alCerrar();
      }
    });
  }

  return (
    <form action={enviar} className="space-y-4">
      {servicio && <input type="hidden" name="id" value={servicio.id} />}

      <div>
        <label htmlFor={`titulo-${k}`} className={ETIQUETA}>Título *</label>
        <input id={`titulo-${k}`} name="titulo" required defaultValue={servicio?.titulo ?? ""} className={CAMPO} />
      </div>

      <div>
        <label htmlFor={`desc-${k}`} className={ETIQUETA}>Descripción *</label>
        <textarea id={`desc-${k}`} name="descripcion" required rows={4} defaultValue={servicio?.descripcion ?? ""} className={CAMPO} />
      </div>

      <div>
        <label htmlFor={`img-${k}`} className={ETIQUETA}>Imagen</label>
        <input id={`img-${k}`} name="imagen" defaultValue={servicio?.imagen ?? ""} placeholder="/images/services/… o una URL de Storage" className={CAMPO} />
      </div>

      {!servicio && (
        <div>
          <label htmlFor="slug-nuevo-servicio" className={ETIQUETA}>Identificador en la URL</label>
          <input id="slug-nuevo-servicio" name="slug" placeholder="Se genera del título si lo dejas vacío" className={CAMPO} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="publicado" defaultChecked={servicio?.publicado ?? true} className="h-4 w-4 rounded border-gray-300" />
          Visible en el sitio
        </label>
        <label className="flex items-center gap-2 text-sm">
          Orden
          <input name="orden" inputMode="numeric" defaultValue={servicio?.orden ?? 0} className="w-20 rounded-xl border border-gray-200 px-3 py-1.5 text-sm" />
        </label>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pendiente} className={BOTON_PRIMARIO}>
          {pendiente ? "Guardando…" : servicio ? "Guardar cambios" : "Crear servicio"}
        </button>
        <button type="button" onClick={alCerrar} className={BOTON_SECUNDARIO}>Cancelar</button>
      </div>
    </form>
  );
}

export default function ListaServicios({ servicios }: { servicios: Servicio[] }) {
  const [editando, setEditando] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  return (
    <div className="space-y-4">
      {creando ? (
        <section className={`${TARJETA} p-5`}>
          <h2 className="mb-4 font-semibold">Nuevo servicio</h2>
          <Editor servicio={null} alCerrar={() => setCreando(false)} />
        </section>
      ) : (
        <button type="button" onClick={() => setCreando(true)} className={BOTON_PRIMARIO}>
          Nuevo servicio
        </button>
      )}

      <ul className="space-y-3">
        {servicios.map((s) => {
          const abierto = editando === s.id;
          return (
            <li key={s.id} className={TARJETA}>
              <div className="flex flex-wrap items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{s.titulo}</p>
                    {!s.publicado && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">Borrador</span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-500">/{s.slug}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditando(abierto ? null : s.id)}
                  aria-expanded={abierto}
                  className={BOTON_SECUNDARIO}
                >
                  {abierto ? "Cerrar" : "Editar"}
                </button>

                <form
                  action={borrarServicio}
                  onSubmit={(e) => {
                    if (!confirm(`¿Borrar el servicio "${s.titulo}"?`)) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={s.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-50"
                  >
                    Borrar
                  </button>
                </form>
              </div>

              {abierto && (
                <div className="border-t border-gray-100 p-5">
                  <Editor servicio={s} alCerrar={() => setEditando(null)} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
