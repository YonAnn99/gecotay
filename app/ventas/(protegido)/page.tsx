import type { Metadata } from "next";
import { obtenerProductos, obtenerPromociones } from "@/app/lib/contenido";
import { baseDeSuperficie } from "@/app/lib/auth";
import { diasRestantes } from "@/app/lib/promociones";
import CatalogoVentas from "./CatalogoVentas";
import Link from "next/link";

export const metadata: Metadata = { title: "Catálogo" };

export default async function VentasHome() {
  const [productos, promociones, base] = await Promise.all([
    obtenerProductos(),
    obtenerPromociones(),
    baseDeSuperficie(),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-5 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Catálogo</h1>
        <p className="mt-1 text-gray-600">
          Líneas de mobiliario con precio de referencia y fotos para enseñar al cliente.
        </p>
      </div>

      {/* Aviso, no listado: las promociones vigentes son lo primero que un
          vendedor necesita tener en la cabeza al abrir el catálogo. Se enseña
          la primera con su valor y su cuenta atrás; el resto se resume, que
          para eso está la pantalla de Promociones. */}
      {promociones.length > 0 && (
        <Link
          href={`${base}/promociones`}
          className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/[0.09] px-4 py-3 transition-colors hover:border-primary"
        >
          {promociones[0].valor && (
            <span className="shrink-0 rounded-lg bg-primary px-2.5 py-1.5 text-[13px] font-semibold text-ink">
              {promociones[0].valor}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{promociones[0].titulo}</p>
            <p className="mt-0.5 text-xs text-gray-600">
              Vigente
              {diasRestantes(promociones[0].terminaEn) &&
                ` · ${diasRestantes(promociones[0].terminaEn)?.toLowerCase()}`}
              {promociones.length > 1 &&
                ` · y ${promociones.length - 1} más`}
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="ml-auto shrink-0 text-gray-500"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      )}

      <CatalogoVentas
        base={base}
        productos={productos.map((p) => ({
          slug: p.slug,
          nombre: p.nombre,
          descripcion: p.descripcion,
          imagen: p.imagen,
          precioDesde: p.precioDesde,
          esNuevo: p.esNuevo,
          fotos: p.galeria.length,
        }))}
      />
    </main>
  );
}
