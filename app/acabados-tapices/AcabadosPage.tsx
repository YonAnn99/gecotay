"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const finishes = [
  {
    id: "telas",
    title: "Telas",
    description: "Amplia colección de tejidos ignífugos, antimanchas y de alta resistencia para sillas y paneles.",
    image: "/images/finishes/telas.webp",
    alt: "Muestra de telas para tapizado de oficina en varios colores y texturas",
    features: ["Ignífugas (UNE-EN 1021)", "Alta abrasión Martindale > 80.000", "Ecológicas certificadas OEKO‑TEX"],
  },
  {
    id: "maderas",
    title: "Maderas",
    description: "Chapas naturales y laminados de alta presión para superficies de trabajo y frentes de almacenamiento.",
    image: "/images/finishes/maderas.webp",
    alt: "Tableros de roble, nogal y laminados en tonos claros y oscuros",
    features: ["FSC® y PEFC", "Laminados HPL 0,8 mm", "Bordes ABS a juego"],
  },
  {
    id: "metales",
    title: "Metales",
    description: "Acabados en acero, aluminio y epoxi para estructuras, patas y herrajes.",
    image: "/images/finishes/metales.webp",
    alt: "Perfiles de acero pintados en colores RAL y acabados cromados",
    features: ["Pintura epoxi libre de COV", "Tratamiento anticorrosión", "Colores RAL personalizados"],
  },
  {
    id: "superficies",
    title: "Superficies sólidas",
    description: "Compactos fenólicos, Corian® y HPL para encimeras de alta exigencia.",
    image: "/images/finishes/superficies.webp",
    alt: "Encimeras blancas y de colores en material compacto",
    features: ["Antibacterianas", "Resistentes a impacto y calor", "Reparablijes in situ"],
  },
];

const faqs = [
  {
    q: "¿Puedo solicitar muestras físicas de los acabados?",
    a: "Sí, enviamos hasta 5 muestras gratuitas a tu oficina o estudio. Solo tienes que indicarnos los códigos de los acabados que te interesan.",
  },
  {
    q: "¿Los tejidos cumplen la normativa de reacción al fuego?",
    a: "Todos nuestros tejidos de oficina superan la norma UNE‑EN 1021‑1/2 (clase M1) y están certificados para contract.",
  },
  {
    q: "¿Ofrecen acabados personalizados a medida?",
    a: "Contamos con servicio de color match y laminados a medida bajo pedido mínimo. Consulta a nuestro equipo técnico.",
  },
  {
    q: "¿Qué certificaciones medioambientales tienen los materiales?",
    a: "Madera FSC®/PEFC, tejidos OEKO‑TEX Standard 100, pinturas sin COV y compactos con certificación Greenguard Gold.",
  },
];

export default function AcabadosPage() {
  // JSON‑LD for FAQ
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

  // JSON‑LD LocalBusiness (could be in layout, but include here for completeness)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GECOTAY",
    image: "/images/logo/logo-horizontal-color.webp",
    url: "https://gecotay.com",
    telephone: "+34 96 123 45 67",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Industria 42",
      addressLocality: "Paterna",
      addressRegion: "Valencia",
      postalCode: "46980",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.505,
      longitude: -0.433,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    priceRange: "€€",
  };

  return (
    <>
      <Script
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Acabados y <span className="text-primary">Tapices</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Más de 120 referencias en telas, maderas, metales y superficies técnicas para personalizar
            cualquier proyecto de mobiliario de oficina, contract o colectividades.
          </p>

          {/* CTA after first paragraph */}
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200 shadow-lg shadow-primary/25"
          >
            Solicitar muestras gratis
          </Link>
        </div>
      </section>

      {/* TL;DR / Key Takeaways */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5" aria-labelledby="tldr-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="tldr-heading" className="sr-only">
            Resumen rápido
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">120+</strong>
              <span className="text-gray-600">Referencias en stock</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">4</strong>
              <span className="text-gray-600">Familias de acabados</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">✔</strong>
              <span className="text-gray-600">Certificados FSC, OEKO‑TEX, Greenguard</span>
            </li>
            <li className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">🚚</strong>
              <span className="text-gray-600">Muestras gratis en 48 h</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Families grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Familias de <span className="text-primary">acabados</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada familia está diseñada para cubrir necesidades técnicas, estéticas y normativas distintas.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {finishes.map((f, idx) => (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 mb-4">{f.description}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {f.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-600">
              Resolvemos tus dudas más comunes sobre acabados, certificaciones y pedidos.
            </p>
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

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ¿Listo para definir los acabados de tu proyecto?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Nuestro equipo técnico te asesora sin compromiso y te envía las muestras que necesites.
        </p>
        <Link
          href="/cotizar"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
        >
          Pedir asesoría y muestras
        </Link>
      </section>
    </>
  );
}