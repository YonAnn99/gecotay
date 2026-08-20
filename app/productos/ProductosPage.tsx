"use client";

import Image from "next/image";
import Link from "next/link";
import KeyTakeaways from "../components/ui/KeyTakeaways";
import EarlyCTA from "../components/ui/EarlyCTA";
import FAQSection from "../components/ui/FAQSection";
import { LINEAS_PRODUCTO, CONTACTO } from "../data/empresa";

const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const takeaways = [
  { label: "Líneas de producto", value: "20" },
  { label: "Garantía", value: "1 año" },
  { label: "Envíos", value: "2–15 días" },
  { label: "Fabricación", value: "Nacional e importada" },
];

const faqs = [
  { q: "¿Puedo solicitar una cotización de una línea?", a: "Sí, escribe al WhatsApp " + CONTACTO.whatsapp + " o a " + CONTACTO.correos.ventas + " indicando la línea y tus medidas." },
  { q: "¿Cuál es el tiempo de fabricación?", a: "Los envíos tardan de 2 a 15 días hábiles dependiendo del tipo de producto y stock; los tiempos se especifican al momento de la compra." },
  { q: "¿Los precios incluyen envío?", a: "Los precios publicados incluyen flete y maniobras solo dentro de la CDMX y área metropolitana, con entrega en planta baja. Todo es más el 16% de IVA." },
  { q: "¿Fabricas a medida?", a: "Sí, gran parte de nuestro mobiliario se fabrica a medida según las necesidades del cliente." },
];

export default function ProductosPage() {
  const destacadas = LINEAS_PRODUCTO.slice(0, 4);
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Catálogo de <span className="text-primary">productos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            20 líneas de mobiliario de oficina, hogar y espacios de trabajo, con fabricación nacional
            e importada. Precios desde {formatMXN(LINEAS_PRODUCTO[LINEAS_PRODUCTO.length - 2].precioDesde)} MXN + IVA.
          </p>
        </div>
      </section>

      <KeyTakeaways items={takeaways} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <EarlyCTA label="Solicitar catálogo completo" href="/descargas" variant="primary" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {LINEAS_PRODUCTO.map((linea) => (
              <Link
                key={linea.slug}
                href={`/productos/${linea.slug}`}
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
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Líneas destacadas</h2>
            <Link href="/descargas" className="text-primary font-medium hover:underline">
              Descargar catálogo 2026 →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destacadas.map((linea) => (
              <Link
                key={linea.slug}
                href={`/productos/${linea.slug}`}
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">¿No encontraste lo que buscas?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Fabricamos a medida según tus especificaciones. Contáctanos para tu cotización.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Solicitar proyecto a medida
          </Link>
        </div>
      </section>
    </>
  );
}