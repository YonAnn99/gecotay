import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { obtenerPromociones } from "@/app/lib/contenido";
import { baseDeSuperficie } from "@/app/lib/auth";
import { diasRestantes } from "@/app/lib/promociones";

export const metadata: Metadata = { title: "Promociones" };

export default async function PromocionesVentasPage() {
  const [promociones, base] = await Promise.all([obtenerPromociones(), baseDeSuperficie()]);

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-5 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Promociones vigentes</h1>
        <p className="mt-1 text-gray-600">
          Solo aparecen las activas y dentro de su rango de fechas.
        </p>
      </div>

      {!promociones.length ? (
        <p className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
          Ahora mismo no hay ninguna promoción vigente.
        </p>
      ) : (
        <ul className="space-y-4">
          {promociones.map((p) => {
            const restan = diasRestantes(p.terminaEn);
            return (
              <li key={p.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {p.imagen && (
                  <div className="relative aspect-[16/7] bg-gray-100">
                    <Image
                      src={p.imagen}
                      alt={p.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{p.titulo}</h2>
                    {p.valor && (
                      <span className="rounded-full bg-primary px-2.5 py-1 text-sm font-semibold text-ink">
                        {p.valor}
                      </span>
                    )}
                    {restan && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                        {restan}
                      </span>
                    )}
                  </div>

                  {p.descripcion && (
                    <p className="mt-2 whitespace-pre-wrap text-gray-700">{p.descripcion}</p>
                  )}

                  {p.productos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Aplica a:</p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {p.productos.map((prod) => (
                          <Link
                            key={prod.slug}
                            href={`${base}/producto/${prod.slug}`}
                            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:border-primary/50"
                          >
                            {prod.nombre}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
