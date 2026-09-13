import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "../../../components/ui/Gallery";
import { CONTACTO } from "../../../data/empresa";
import { obtenerProducto, obtenerProductos } from "../../../lib/contenido";
import { IMAGEN_RESPALDO, resolverImagen } from "../../../lib/imagenes";
import { OG_BASE, TWITTER_BASE } from "../../../lib/metadatos";

const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

// Red de seguridad: aunque el panel invalida estas rutas al guardar
// (`revalidatePath` en app/actions/contenido.ts), esto garantiza que el
// contenido nunca se quede rancio más de una hora si una invalidación se pierde.
export const revalidate = 3600;

/**
 * Slugs conocidos en tiempo de build.
 *
 * Si la base no responde durante el build devuelve una lista vacía en vez de
 * reventar: con `dynamicParams` (activo por defecto) las rutas se generan
 * bajo demanda en la primera visita, así que un fallo temporal de Supabase
 * degrada el despliegue en vez de impedirlo.
 */
export async function generateStaticParams() {
  const productos = await obtenerProductos();
  return productos.map((p) => ({ linea: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; linea: string }> }): Promise<Metadata> {
  const { linea } = await params;
  const producto = await obtenerProducto(linea);
  if (!producto) return {};

  const precio = producto.precioDesde != null
    ? ` Precios desde ${formatMXN(producto.precioDesde)} MXN + IVA.`
    : "";

  const titulo = `${producto.nombre} | Grupo Gecotay`;
  const resumen = `${producto.descripcion}${precio}`;

  // La portada de la línea, cuando la hay, en vez de la tarjeta de marca: son
  // las páginas que un vendedor comparte por WhatsApp, y ahí la foto del
  // mueble vende más que el logo. `resolverImagen` acepta tanto una ruta del
  // repositorio como una URL de Storage; `metadataBase` (en el root layout)
  // convierte la ruta relativa en absoluta, que es lo que exige Open Graph.
  // Si el producto no tiene portada no se declara `images` y entonces sí
  // hereda `opengraph-image.tsx`.
  const portada = resolverImagen(producto.imagen);
  const imagenes = portada ? { images: [{ url: portada, alt: producto.nombre }] } : {};

  return {
    // Just the page-specific part: the root layout's title.template appends
    // " | Grupo Gecotay" for this (child) segment automatically.
    title: producto.nombre,
    description: resumen,
    openGraph: { ...OG_BASE, title: titulo, description: resumen, ...imagenes },
    twitter: { ...TWITTER_BASE, title: titulo, description: resumen, ...imagenes },
    alternates: {
      canonical: `/es/productos/${producto.slug}`,
      languages: {
        es: `/es/productos/${producto.slug}`,
        "x-default": `/es/productos/${producto.slug}`,
      },
    },
  };
}

export default async function LineaPage({ params }: { params: Promise<{ locale: string; linea: string }> }) {
  const { locale, linea } = await params;

  const [producto, todos] = await Promise.all([obtenerProducto(linea), obtenerProductos()]);

  // La política de RLS ya excluye los borradores, así que un producto
  // despublicado desde el panel llega aquí como null y devuelve 404, igual que
  // un slug inexistente. Es el comportamiento correcto: deja de ser público.
  if (!producto) notFound();

  const otras = todos.filter((l) => l.slug !== producto.slug).slice(0, 4);

  return (
    <>
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Migas de pan">
            <Link href={`/${locale}`} className="hover:text-primary">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/productos`} className="hover:text-primary">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] font-medium">{producto.nombre}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={producto.imagen ?? IMAGEN_RESPALDO}
                alt={producto.nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">{producto.nombre}</h1>
              <p className="text-lg text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mb-6">{producto.descripcion}</p>
              {producto.precioDesde != null ? (
                <>
                  <p className="text-2xl font-bold text-primary mb-2">Desde {formatMXN(producto.precioDesde)} MXN + IVA</p>
                  <p className="text-sm text-gray-400 mb-6">
                    Precios orientativos; incluyen flete dentro de CDMX y área metropolitana (planta baja).
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-primary mb-6">Precio a consultar</p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent(`Hola Grupo Gecotay, me interesa cotizar la ${producto.nombre}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                >
                  Cotizar por WhatsApp
                </Link>
                <Link
                  href={`/${locale}/cotizar`}
                  className="px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors"
                >
                  Solicitar presupuesto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {producto.galeria.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Galería</h2>
            <Gallery imagenes={producto.galeria} alt={producto.nombre} />
          </div>
        </section>
      )}

      {otras.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Otras líneas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otras.map((l) => (
                <Link
                  key={l.slug}
                  href={`/${locale}/productos/${l.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={l.imagen ?? IMAGEN_RESPALDO}
                      alt={l.nombre}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{l.nombre}</h3>
                    {l.precioDesde != null && (
                      <p className="text-sm text-primary font-medium">Desde {formatMXN(l.precioDesde)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
