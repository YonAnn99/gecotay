import type { Metadata } from "next";
import Image from "next/image";
import { obtenerServicios } from "@/app/lib/contenido";
import { IMAGEN_RESPALDO } from "@/app/lib/imagenes";

export const metadata: Metadata = { title: "Servicios" };

export default async function ServiciosVentasPage() {
  const servicios = await obtenerServicios();

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-5 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Servicios</h1>
        <p className="mt-1 text-gray-600">
          Lo que se puede ofrecer además del mobiliario.
        </p>
      </div>

      {!servicios.length ? (
        <p className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
          No hay servicios publicados.
        </p>
      ) : (
        <ul className="space-y-3">
          {servicios.map((s) => (
            <li
              key={s.id}
              className="flex gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={s.imagen ?? IMAGEN_RESPALDO}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium">{s.titulo}</p>
                <p className="mt-1 text-sm text-gray-600">{s.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
