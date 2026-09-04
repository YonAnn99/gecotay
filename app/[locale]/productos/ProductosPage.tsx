"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KeyTakeaways from "../../components/ui/KeyTakeaways";
import EarlyCTA from "../../components/ui/EarlyCTA";
import FAQSection from "../../components/ui/FAQSection";
import { LINEAS_PRODUCTO, CONTACTO } from "../../data/empresa";

const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const takeaways = [
  { label: "Líneas de producto", value: "20" },
  { label: "Garantía", value: "1 año" },
  { label: "Envíos", value: "2–15 días" },
  { label: "Fabricación", value: "Nacional e importada" },
];

// Agrupación editorial por tipo de mueble — no existe un campo "categoría" en
// LINEAS_PRODUCTO, así que se infiere de la descripción de cada línea. Fácil
// de ajustar aquí si el negocio prefiere otra agrupación.
interface Categoria {
  id: string;
  label: string;
  slugs: string[];
}

const CATEGORIAS: Categoria[] = [
  { id: "silleria", label: "Sillería", slugs: ["ceri", "silver", "crome-b", "crome-z", "alf", "silleria"] },
  { id: "escritorios", label: "Escritorios", slugs: ["desk-tech", "nova", "deskan", "gecotay", "gecot"] },
  { id: "espacios", label: "Sistemas y espacios de trabajo", slugs: ["sim", "workspace", "salas-juntas", "recepciones"] },
  { id: "almacenamiento", label: "Almacenamiento y accesorios", slugs: ["almacenamiento", "accesorios"] },
  { id: "hogar", label: "Hogar y otros", slugs: ["home", "distribuciones", "servicios"] },
];

interface RangoPrecio {
  id: string;
  label: string;
  test: (precio: number) => boolean;
}

const RANGOS_PRECIO: RangoPrecio[] = [
  { id: "hasta-2000", label: "Hasta $2,000", test: (p) => p <= 2000 },
  { id: "2000-5000", label: "$2,000 – $5,000", test: (p) => p > 2000 && p <= 5000 },
  { id: "5000-8000", label: "$5,000 – $8,000", test: (p) => p > 5000 && p <= 8000 },
  { id: "mas-8000", label: "Más de $8,000", test: (p) => p > 8000 },
];

const faqs = [
  { q: "¿Puedo solicitar una cotización de una línea?", a: "Sí, escribe al WhatsApp " + CONTACTO.whatsapp + " o a " + CONTACTO.correos.ventas + " indicando la línea y tus medidas." },
  { q: "¿Cuál es el tiempo de fabricación?", a: "Los envíos tardan de 2 a 15 días hábiles dependiendo del tipo de producto y stock; los tiempos se especifican al momento de la compra." },
  { q: "¿Los precios incluyen envío?", a: "Los precios publicados incluyen flete y maniobras solo dentro de la CDMX y área metropolitana, con entrega en planta baja. Todo es más el 16% de IVA." },
  { q: "¿Fabricas a medida?", a: "Sí, gran parte de nuestro mobiliario se fabrica a medida según las necesidades del cliente." },
];

interface ProductosPageProps {
  locale: string;
}

export default function ProductosPage({ locale }: ProductosPageProps) {
  const destacadas = LINEAS_PRODUCTO.slice(0, 4);
  const precioDesde = Math.min(...LINEAS_PRODUCTO.map((l) => l.precioDesde));

  const [categoria, setCategoria] = useState<string | null>(null);
  const [rangoPrecio, setRangoPrecio] = useState<string | null>(null);
  const [soloNuevas, setSoloNuevas] = useState(false);

  const lineasFiltradas = useMemo(() => {
    const categoriaActiva = CATEGORIAS.find((c) => c.id === categoria);
    const rangoActivo = RANGOS_PRECIO.find((r) => r.id === rangoPrecio);
    return LINEAS_PRODUCTO.filter((linea) => {
      if (categoriaActiva && !categoriaActiva.slugs.includes(linea.slug)) return false;
      if (rangoActivo && !rangoActivo.test(linea.precioDesde)) return false;
      if (soloNuevas && !linea.esNuevo) return false;
      return true;
    });
  }, [categoria, rangoPrecio, soloNuevas]);

  const hayFiltrosActivos = categoria !== null || rangoPrecio !== null || soloNuevas;

  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">
            Catálogo de <span className="text-primary">productos</span>
          </h1>
          <p className="text-xl text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
            20 líneas de mobiliario de oficina, hogar y espacios de trabajo, con fabricación nacional
            e importada. Precios desde {formatMXN(precioDesde)} MXN + IVA.
          </p>
        </div>
      </section>

      <KeyTakeaways items={takeaways} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <EarlyCTA label="Solicitar catálogo completo" href={`/${locale}/descargas`} variant="primary" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategoria(null)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                  categoria === null
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                Todas las categorías
              </button>
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoria(categoria === cat.id ? null : cat.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                    categoria === cat.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mr-1">Precio:</span>
              <button
                type="button"
                onClick={() => setRangoPrecio(null)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                  rangoPrecio === null
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                }`}
              >
                Todos
              </button>
              {RANGOS_PRECIO.map((rango) => (
                <button
                  key={rango.id}
                  type="button"
                  onClick={() => setRangoPrecio(rangoPrecio === rango.id ? null : rango.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                    rangoPrecio === rango.id
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                  }`}
                >
                  {rango.label}
                </button>
              ))}
              <label className="flex items-center gap-2 ml-2 px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-primary/50">
                <input
                  type="checkbox"
                  checked={soloNuevas}
                  onChange={(e) => setSoloNuevas(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                Solo nuevas
              </label>
              {hayFiltrosActivos && (
                <button
                  type="button"
                  onClick={() => {
                    setCategoria(null);
                    setRangoPrecio(null);
                    setSoloNuevas(false);
                  }}
                  className="text-sm font-medium text-primary hover:underline ml-1"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {lineasFiltradas.length === 0 ? (
            <div className="text-center py-16 text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)]">
              <p className="mb-4">Ninguna línea coincide con los filtros seleccionados.</p>
              <button
                type="button"
                onClick={() => {
                  setCategoria(null);
                  setRangoPrecio(null);
                  setSoloNuevas(false);
                }}
                className="text-primary font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lineasFiltradas.map((linea) => (
              <Link
                key={linea.slug}
                href={`/${locale}/productos/${linea.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={linea.imagen}
                    alt={linea.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-primary/90 text-white rounded-full">
                    Desde {formatMXN(linea.precioDesde)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{linea.nombre}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{linea.descripcion}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver galería
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Líneas destacadas</h2>
            <Link href={`/${locale}/descargas`} className="text-primary font-medium hover:underline">
              Descargar catálogo 2026 →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destacadas.map((linea) => (
              <Link
                key={linea.slug}
                href={`/${locale}/productos/${linea.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={linea.imagen}
                    alt={linea.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{linea.nombre}</h3>
                  <span className="text-primary font-bold">Desde {formatMXN(linea.precioDesde)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre productos" />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">¿No encontraste lo que buscas?</h2>
          <p className="text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mb-8 max-w-xl mx-auto">
            Fabricamos a medida según tus especificaciones. Contáctanos para tu cotización.
          </p>
          <Link
            href={`/${locale}/cotizar`}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Solicitar proyecto a medida
          </Link>
        </div>
      </section>
    </>
  );
}