"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  guardarProducto,
  borrarProducto,
  agregarImagenProducto,
  borrarImagenProducto,
} from "@/app/actions/contenido";
import { resolverImagenConRespaldo } from "@/app/lib/imagenes";
import { CATEGORIAS_PRODUCTO, type CategoriaProducto } from "@/app/data/categorias";
import { CAMPO, ETIQUETA, BOTON_PRIMARIO, BOTON_SECUNDARIO, TARJETA } from "../ui";

export interface ImagenGaleria {
  id: string;
  url: string;
  alt: string | null;
}

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  precio_desde: number | null;
  es_nuevo: boolean;
  categoria: CategoriaProducto;
  publicado: boolean;
  orden: number;
  galeria: ImagenGaleria[];
}

/**
 * Editor que sirve para crear y para editar.
 *
 * Cuando `producto` es null está en modo alta: no se muestran ni la galería ni
 * el borrado, porque ninguna de las dos cosas tiene sentido hasta que la fila
 * existe y tiene id.
 */
export default function EditorProducto({
  producto,
  alCerrar,
}: {
  producto: Producto | null;
  alCerrar?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();

  function enviar(formData: FormData) {
    iniciar(async () => {
      const r = await guardarProducto(formData);
      if (!r.ok) setError(r.error);
      else {
        setError(null);
        alCerrar?.();
      }
    });
  }

  return (
    <div className="space-y-6">
      <form action={enviar} className="space-y-4">
        {producto && <input type="hidden" name="id" value={producto.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`nombre-${producto?.id ?? "nuevo"}`} className={ETIQUETA}>
              Nombre *
            </label>
            <input
              id={`nombre-${producto?.id ?? "nuevo"}`}
              name="nombre"
              required
              defaultValue={producto?.nombre ?? ""}
              className={CAMPO}
            />
          </div>

          <div>
            <label htmlFor={`precio-${producto?.id ?? "nuevo"}`} className={ETIQUETA}>
              Precio desde (MXN)
            </label>
            <input
              id={`precio-${producto?.id ?? "nuevo"}`}
              name="precio_desde"
              inputMode="numeric"
              defaultValue={producto?.precio_desde ?? ""}
              className={CAMPO}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`categoria-${producto?.id ?? "nuevo"}`} className={ETIQUETA}>
            Categoría *
          </label>
          {/* Sin opción preseleccionada al crear: obliga a elegir en vez de
              dejar que todo caiga en la primera categoría por descuido. */}
          <select
            id={`categoria-${producto?.id ?? "nuevo"}`}
            name="categoria"
            required
            defaultValue={producto?.categoria ?? ""}
            className={CAMPO}
          >
            <option value="" disabled>
              Elige dónde aparece en el catálogo
            </option>
            {CATEGORIAS_PRODUCTO.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-gray-500">
            Es el filtro de la página de productos en el que se mostrará.
          </p>
        </div>

        <div>
          <label htmlFor={`desc-${producto?.id ?? "nuevo"}`} className={ETIQUETA}>
            Descripción *
          </label>
          <textarea
            id={`desc-${producto?.id ?? "nuevo"}`}
            name="descripcion"
            required
            rows={4}
            defaultValue={producto?.descripcion ?? ""}
            className={CAMPO}
          />
        </div>

        <div>
          <label htmlFor={`img-${producto?.id ?? "nuevo"}`} className={ETIQUETA}>
            Imagen de portada
          </label>
          <input
            id={`img-${producto?.id ?? "nuevo"}`}
            name="imagen"
            defaultValue={producto?.imagen ?? ""}
            placeholder="/images/products/… o un enlace de Medios"
            className={CAMPO}
          />
          <p className="mt-1.5 text-xs text-gray-500">
            Es la foto principal: <strong className="font-medium">sustituye</strong> a la
            que hubiera. Vale una ruta del sitio o un enlace copiado de Medios.
          </p>
        </div>

        {!producto && (
          <div>
            <label htmlFor="slug-nuevo" className={ETIQUETA}>
              Identificador en la URL
            </label>
            <input
              id="slug-nuevo"
              name="slug"
              placeholder="Se genera del nombre si lo dejas vacío"
              className={CAMPO}
            />
            <p className="mt-1.5 text-xs text-gray-500">
              No se puede cambiar después: es la dirección pública del producto.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="publicado"
              defaultChecked={producto?.publicado ?? true}
              className="h-4 w-4 rounded border-gray-300"
            />
            Visible en el sitio
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="es_nuevo"
              defaultChecked={producto?.es_nuevo ?? false}
              className="h-4 w-4 rounded border-gray-300"
            />
            Marcar como novedad
          </label>

          <label className="flex items-center gap-2 text-sm">
            Orden
            <input
              name="orden"
              inputMode="numeric"
              defaultValue={producto?.orden ?? 0}
              className="w-20 rounded-xl border border-gray-200 px-3 py-1.5 text-sm"
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={pendiente} className={BOTON_PRIMARIO}>
            {pendiente ? "Guardando…" : producto ? "Guardar cambios" : "Crear producto"}
          </button>
          {alCerrar && (
            <button type="button" onClick={alCerrar} className={BOTON_SECUNDARIO}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {producto && (
        <>
          <section className={`${TARJETA} p-5`}>
            <h3 className="font-medium">Galería ({producto.galeria.length})</h3>

            {producto.galeria.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {producto.galeria.map((img) => (
                  <li key={img.id} className="group relative">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={resolverImagenConRespaldo(img.url)}
                        alt={img.alt ?? ""}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <form action={borrarImagenProducto} className="mt-1.5">
                      <input type="hidden" name="id" value={img.id} />
                      <button
                        type="submit"
                        className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
                      >
                        Quitar
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}

            {/* Único campo del panel que AÑADE en vez de reemplazar, así que es
                el que más necesita decirlo. */}
            <p className="mt-4 text-xs text-gray-500">
              La galería <strong className="font-medium">acumula</strong>: cada imagen
              que añadas se suma al final, no sustituye a las anteriores. Para
              retirar una, usa «Quitar» en su miniatura.
            </p>

            <form action={agregarImagenProducto} className="mt-2 flex flex-wrap gap-3">
              <input type="hidden" name="linea_id" value={producto.id} />
              <input
                name="url"
                required
                placeholder="/images/products/… o un enlace de Medios"
                aria-label="Ruta o enlace de la imagen"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
              />
              <input
                name="alt"
                placeholder="Texto alternativo"
                aria-label="Texto alternativo"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
              />
              <button type="submit" className={BOTON_SECUNDARIO}>
                Añadir
              </button>
            </form>
          </section>

          <form
            action={borrarProducto}
            onSubmit={(e) => {
              // Confirmación nativa: borrar arrastra la galería y las
              // asociaciones a promociones por ON DELETE CASCADE.
              if (!confirm(`¿Borrar "${producto.nombre}" y sus ${producto.galeria.length} imágenes?`)) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="id" value={producto.id} />
            <button
              type="submit"
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-50"
            >
              Borrar producto
            </button>
          </form>
        </>
      )}
    </div>
  );
}
