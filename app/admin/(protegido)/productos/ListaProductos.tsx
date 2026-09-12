"use client";

import { useState } from "react";
import Image from "next/image";
import { alternarPublicadoProducto } from "@/app/actions/contenido";
import { resolverImagenConRespaldo } from "@/app/lib/imagenes";
import EditorProducto, { type Producto } from "./EditorProducto";
import { BOTON_SECUNDARIO, BOTON_PRIMARIO, TARJETA } from "../ui";

export default function ListaProductos({ productos }: { productos: Producto[] }) {
  const [editando, setEditando] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  return (
    <div className="space-y-4">
      {creando ? (
        <section className={`${TARJETA} p-5`}>
          <h2 className="mb-4 font-semibold">Nuevo producto</h2>
          <EditorProducto producto={null} alCerrar={() => setCreando(false)} />
        </section>
      ) : (
        <button type="button" onClick={() => setCreando(true)} className={BOTON_PRIMARIO}>
          Nuevo producto
        </button>
      )}

      <ul className="space-y-3">
        {productos.map((p) => {
          const abierto = editando === p.id;
          return (
            <li key={p.id} className={TARJETA}>
              <div className="flex flex-wrap items-center gap-4 p-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={resolverImagenConRespaldo(p.imagen)}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{p.nombre}</p>
                    {p.es_nuevo && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-dark">
                        Novedad
                      </span>
                    )}
                    {!p.publicado && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        Borrador
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    /{p.slug}
                    {p.precio_desde != null && ` · desde $${p.precio_desde.toLocaleString("es-MX")}`}
                    {` · ${p.galeria.length} foto(s)`}
                  </p>
                </div>

                <form action={alternarPublicadoProducto}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="publicado" value={String(!p.publicado)} />
                  <button type="submit" className={BOTON_SECUNDARIO}>
                    {p.publicado ? "Despublicar" : "Publicar"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setEditando(abierto ? null : p.id)}
                  aria-expanded={abierto}
                  className={BOTON_SECUNDARIO}
                >
                  {abierto ? "Cerrar" : "Editar"}
                </button>
              </div>

              {abierto && (
                <div className="border-t border-gray-100 p-5">
                  <EditorProducto producto={p} alCerrar={() => setEditando(null)} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
