import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { obtenerProducto, obtenerPromociones } from "@/app/lib/contenido";
import { baseDeSuperficie } from "@/app/lib/auth";
import { IMAGEN_RESPALDO } from "@/app/lib/imagenes";
import Gallery from "@/app/components/ui/Gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);
  return { title: producto?.nombre ?? "Producto" };
}

export default async function ProductoVentasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [producto, promociones, base] = await Promise.all([
    obtenerProducto(slug),
    obtenerPromociones(),
    baseDeSuperficie(),
  ]);

  // La política de RLS ya filtra los borradores, así que un producto
  // despublicado llega aquí como null y cae en el 404 igual que uno inexistente.
  if (!producto) notFound();

  const promocionesDelProducto = promociones.filter((p) =>
    p.productos.some((l) => l.slug === producto.slug)
  );

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-5 py-8">
      <Link href={base || "/"} className="text-sm text-gray-500 underline underline-offset-2">
        ← Volver al catálogo
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold">{producto.nombre}</h1>
          {producto.esNuevo && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-ink">
              Nuevo
            </span>
          )}
        </div>
        <p className="mt-2 text-lg">
          {producto.precioDesde != null ? (
            <>
              Desde{" "}
              <strong className="font-semibold">
                ${producto.precioDesde.toLocaleString("es-MX")}
              </strong>{" "}
              <span className="text-sm text-gray-500">MXN</span>
            </>
          ) : (
            <span className="text-gray-500">Precio a consultar</span>
          )}
        </p>
      </div>

      {promocionesDelProducto.length > 0 && (
        <ul className="space-y-2">
          {promocionesDelProducto.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm"
            >
              <strong className="font-semibold">{p.titulo}</strong>
              {p.valor && ` — ${p.valor}`}
            </li>
          ))}
        </ul>
      )}

      {/* Reutiliza el visor del sitio público: mismo comportamiento de
          ampliación que ya se usa en /es/productos/[linea]. */}
      {producto.galeria.length > 0 ? (
        <Gallery imagenes={producto.galeria} alt={producto.nombre} />
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={producto.imagen ?? IMAGEN_RESPALDO}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div>
        <h2 className="font-semibold">Descripción</h2>
        <p className="mt-2 whitespace-pre-wrap text-gray-700">{producto.descripcion}</p>
      </div>
    </main>
  );
}
