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
        {/* La lupa va dentro del campo, no al lado: es la pista de que ahí se
            escribe. El texto se queda a 16px — por debajo, iOS hace zoom al
            enfocar y descuadra la pantalla. */}
        <div className="relative min-w-0 flex-1">
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
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o característica…"
            aria-label="Buscar en el catálogo"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
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
        // Dos por fila ya en el teléfono: se usa de pie y frente al cliente,
        // y con una sola columna cada línea obliga a desplazarse una pantalla
        // entera. Las tarjetas siguen siendo tocables a 390px.
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
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
                <div className="px-3 pb-3.5 pt-2.5 sm:px-4 sm:pb-4">
                  <p className="text-sm font-medium leading-tight sm:text-base">{p.nombre}</p>
                  <p className="mt-1.5 text-[13px] text-gray-600 sm:text-sm">
                    {p.precioDesde != null
                      ? `Desde $${p.precioDesde.toLocaleString("es-MX")}`
                      : "Precio a consultar"}
                  </p>
                  {p.fotos > 0 && (
                    <p className="mt-0.5 text-xs text-gray-500">{p.fotos} fotos</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
