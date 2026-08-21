"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { FINISHES, CONTACTO } from "../../data/empresa";

const faqs = [
  {
    q: "¿Puedo solicitar muestras físicas de los acabados?",
    a: "Sí, escríbenos por WhatsApp al " + CONTACTO.whatsapp + " o a " + CONTACTO.correos.ventas + " indicando los códigos de los acabados que te interesan y te las enviamos.",
  },
  {
    q: "¿Cuántos colores de tela tienen disponibles?",
    a: "Contamos con 10 familias de telas (Kansas, Addison, Alessia, Cancún, Malla, Matisse, Micro espacial, Office, Olimpy y Tactopiel) con una amplia variedad de colores.",
  },
  {
    q: "¿Ofrecen acabados personalizados a medida?",
    a: "Sí, trabajamos melamina, MDF, triplay y madera natural con acabados en cortes rectos o curvos según la línea y las necesidades del cliente.",
  },
  {
    q: "¿Las telas y vinilos tienen garantía?",
    a: "En telas, mallas, viniles, pieles, hule espuma y madera natural no hay garantía; consulta las políticas completas en nuestra página de contacto.",
  },
];

export default function AcabadosPage() {
  const [activa, setActiva] = useState(FINISHES.familias[0].slug);
  const familia = FINISHES.familias.find((f) => f.slug === activa) ?? FINISHES.familias[0];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <Script
        id="acabados-faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Acabados y <span className="text-primary">tapices</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Telas, melaminas, metales y superficies para personalizar cualquier proyecto de mobiliario.
            Amplia variedad de colores y texturas para darle el acabado perfecto a tu espacio.
          </p>
          <Link
            href="/descargas"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200 shadow-lg shadow-primary/25"
          >
            Descargar cartas de colores
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5" aria-labelledby="tldr-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="tldr-heading" className="sr-only">Resumen rápido</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">10</strong>
              <span className="text-gray-600">Familias de telas</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">17</strong>
              <span className="text-gray-600">Colores de melamina</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">18</strong>
              <span className="text-gray-600">Colores metálicos</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">4</strong>
              <span className="text-gray-600">Familias de acabados</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
<h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
              Familias de <span className="text-primary">acabados</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Selecciona una familia para ver sus muestras de color y textura.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FINISHES.familias.map((f) => (
              <button
                key={f.slug}
                onClick={() => setActiva(f.slug)}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                  activa === f.slug
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {f.nombre}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <article className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={familia.imagen}
                  alt={familia.nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{familia.nombre}</h3>
                <p className="text-gray-600">{familia.descripcion}</p>
              </div>
            </article>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {familia.muestras.map((muestra) => (
                  <div key={muestra.nombre} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-2 gap-0.5">
                      {muestra.imagenes.slice(0, 4).map((img, i) => (
                        <div key={i} className="relative aspect-square bg-gray-100">
                          <Image
                            src={img}
                            alt={`${familia.nombre} - ${muestra.nombre} muestra ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="p-3 text-sm font-medium text-gray-700 text-center">{muestra.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
            <p className="text-gray-600">Resolvemos tus dudas más comunes sobre acabados y pedidos.</p>
          </motion.div>

          <dl className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <dt className="text-lg font-semibold text-gray-900 mb-2">{f.q}</dt>
                <dd className="text-gray-600 leading-relaxed">{f.a}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">¿Listo para definir los acabados de tu proyecto?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Escríbenos por WhatsApp y descarga las cartas de colores para elegir tus materiales.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent("Hola Grupo Ecotay, me gustaría asesoría sobre acabados y tapices.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Pedir asesoría por WhatsApp
          </Link>
          <Link
            href="/descargas"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors duration-200"
          >
            Descargar cartas de colores
          </Link>
        </div>
      </section>
    </>
  );
}