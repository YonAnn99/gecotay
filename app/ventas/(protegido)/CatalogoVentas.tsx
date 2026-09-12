"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGEN_RESPALDO } from "@/app/lib/imagenes";

export interface ProductoCatalogo {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  precioDesde: number | null;
  esNuevo: boolean;
  fotos: number;
}

/** Normaliza para buscar sin que los acentos estorben al teclear rápido. */
function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function CatalogoVentas({
  productos,
  base,
}: {
  productos: ProductoCatalogo[];
  base: string;
}) {
  const [busqueda, setBusqueda] = useState("");
  const [soloNuevos, setSoloNuevos] = useState(false);

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return productos.filter((p) => {
      if (soloNuevos && !p.esNuevo) return false;
      if (!q) return true;
      // Busca también en la descripción: frente al cliente se pregunta por
      // características ("con ducto pasacable"), no solo por el nombre.
      return normalizar(`${p.nombre} ${p.descripcion}`).includes(q);
    });
  }, [productos, busqueda, soloNuevos]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o característica…"
          aria-label="Buscar en el catálogo"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={() => setSoloNuevos((v) => !v)}
          aria-pressed={soloNuevos}
          className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
            soloNuevos
              ? "border-ink bg-ink text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Novedades
        </button>
      </div>

      <p className="text-sm text-gray-500">
        {filtrados.length} de {productos.length} líneas
      </p>

      {!filtrados.length ? (
        <p className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
          Nada coincide con esa búsqueda.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <li key={p.slug}>
              <Link
                href={`${base}/producto/${p.slug}`}
                className="block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-primary/50"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={p.imagen ?? IMAGEN_RESPALDO}
                    alt={p.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {p.esNuevo && (
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-ink">
                      Nuevo
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium">{p.nombre}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {p.precioDesde != null
                      ? `Desde $${p.precioDesde.toLocaleString("es-MX")}`
                      : "Precio a consultar"}
                    {p.fotos > 0 && ` · ${p.fotos} fotos`}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
