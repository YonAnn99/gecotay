import type { Metadata } from "next";
import { obtenerProductos, obtenerPromociones } from "@/app/lib/contenido";
import { baseDeSuperficie } from "@/app/lib/auth";
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
          vendedor necesita tener en la cabeza al abrir el catálogo. */}
      {promociones.length > 0 && (
        <Link
          href={`${base}/promociones`}
          className="block rounded-2xl border border-primary/40 bg-primary/5 px-5 py-4 transition-colors hover:border-primary"
        >
          <p className="font-medium">
            {promociones.length} promoción{promociones.length === 1 ? "" : "es"} vigente
            {promociones.length === 1 ? "" : "s"}
          </p>
          <p className="mt-0.5 text-sm text-gray-600">
            {promociones
              .slice(0, 3)
              .map((p) => (p.valor ? `${p.titulo} (${p.valor})` : p.titulo))
              .join(" · ")}
          </p>
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
