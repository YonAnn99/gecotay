"use client";

import { useState, useTransition } from "react";
import { guardarPromocion, borrarPromocion } from "@/app/actions/contenido";
import { CAMPO, ETIQUETA, BOTON_PRIMARIO, BOTON_SECUNDARIO, TARJETA } from "../ui";

export interface Promocion {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen: string | null;
  tipo: "descuento" | "paquete" | "liquidacion";
  valor: string | null;
  inicia_en: string;
  termina_en: string | null;
  activa: boolean;
}

const TIPOS = [
  { valor: "descuento", etiqueta: "Descuento" },
  { valor: "paquete", etiqueta: "Paquete" },
  { valor: "liquidacion", etiqueta: "Liquidación" },
] as const;

/** ISO → valor para `datetime-local`, que espera hora local sin zona. */
function paraInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

/** Una promoción está vigente si está activa y hoy cae dentro de su ventana. */
export function estaVigente(p: Promocion): boolean {
  const ahora = Date.now();
  if (!p.activa) return false;
  if (new Date(p.inicia_en).getTime() > ahora) return false;
  if (p.termina_en && new Date(p.termina_en).getTime() <= ahora) return false;
  return true;
}

function Editor({ promo, alCerrar }: { promo: Promocion | null; alCerrar: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();
  const k = promo?.id ?? "nueva";

  function enviar(formData: FormData) {
    iniciar(async () => {
      const r = await guardarPromocion(formData);
      if (!r.ok) setError(r.error);
      else {
        setError(null);
        alCerrar();
      }
    });
  }

  return (
    <form action={enviar} className="space-y-4">
      {promo && <input type="hidden" name="id" value={promo.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`titulo-${k}`} className={ETIQUETA}>Título *</label>
          <input id={`titulo-${k}`} name="titulo" required defaultValue={promo?.titulo ?? ""} className={CAMPO} />
        </div>
        <div>
          <label htmlFor={`tipo-${k}`} className={ETIQUETA}>Tipo</label>
          <select id={`tipo-${k}`} name="tipo" defaultValue={promo?.tipo ?? "descuento"} className={CAMPO}>
            {TIPOS.map((t) => (
              <option key={t.valor} value={t.valor}>{t.etiqueta}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`valor-${k}`} className={ETIQUETA}>Valor</label>
        <input id={`valor-${k}`} name="valor" defaultValue={promo?.valor ?? ""} placeholder="20%, 2x1, $5,000 menos…" className={CAMPO} />
        <p className="mt-1.5 text-xs text-gray-500">Texto libre: se muestra tal cual.</p>
      </div>

      <div>
        <label htmlFor={`desc-${k}`} className={ETIQUETA}>Descripción</label>
        <textarea id={`desc-${k}`} name="descripcion" rows={3} defaultValue={promo?.descripcion ?? ""} className={CAMPO} />
      </div>

      <div>
        <label htmlFor={`img-${k}`} className={ETIQUETA}>Imagen</label>
        <input id={`img-${k}`} name="imagen" defaultValue={promo?.imagen ?? ""} className={CAMPO} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`inicia-${k}`} className={ETIQUETA}>Inicia</label>
          <input id={`inicia-${k}`} name="inicia_en" type="datetime-local" defaultValue={paraInput(promo?.inicia_en ?? null)} className={CAMPO} />
        </div>
        <div>
          <label htmlFor={`termina-${k}`} className={ETIQUETA}>Termina</label>
          <input id={`termina-${k}`} name="termina_en" type="datetime-local" defaultValue={paraInput(promo?.termina_en ?? null)} className={CAMPO} />
          <p className="mt-1.5 text-xs text-gray-500">Vacío = sin fecha de fin.</p>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="activa" defaultChecked={promo?.activa ?? true} className="h-4 w-4 rounded border-gray-300" />
        Activa
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pendiente} className={BOTON_PRIMARIO}>
          {pendiente ? "Guardando…" : promo ? "Guardar cambios" : "Crear promoción"}
        </button>
        <button type="button" onClick={alCerrar} className={BOTON_SECUNDARIO}>Cancelar</button>
      </div>
    </form>
  );
}

export default function ListaPromociones({ promociones }: { promociones: Promocion[] }) {
  const [editando, setEditando] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div className="space-y-4">
      {creando ? (
        <section className={`${TARJETA} p-5`}>
          <h2 className="mb-4 font-semibold">Nueva promoción</h2>
          <Editor promo={null} alCerrar={() => setCreando(false)} />
        </section>
      ) : (
        <button type="button" onClick={() => setCreando(true)} className={BOTON_PRIMARIO}>
          Nueva promoción
        </button>
      )}

      {!promociones.length ? (
        <p className={`${TARJETA} px-6 py-10 text-center text-sm text-gray-500`}>
          Todavía no hay promociones.
        </p>
      ) : (
        <ul className="space-y-3">
          {promociones.map((p) => {
            const abierto = editando === p.id;
            const vigente = estaVigente(p);
            return (
              <li key={p.id} className={TARJETA}>
                <div className="flex flex-wrap items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{p.titulo}</p>
                      {p.valor && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-dark">
                          {p.valor}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          vigente ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {vigente ? "Vigente" : p.activa ? "Fuera de fecha" : "Inactiva"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {p.tipo} · {fmt(p.inicia_en)} → {fmt(p.termina_en)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditando(abierto ? null : p.id)}
                    aria-expanded={abierto}
                    className={BOTON_SECUNDARIO}
                  >
                    {abierto ? "Cerrar" : "Editar"}
                  </button>

                  <form
                    action={borrarPromocion}
                    onSubmit={(e) => {
                      if (!confirm(`¿Borrar la promoción "${p.titulo}"?`)) e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="id" value={p.id} />
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
                    <Editor promo={p} alCerrar={() => setEditando(null)} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
