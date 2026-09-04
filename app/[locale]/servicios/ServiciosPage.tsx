"use client";

import Image from "next/image";
import Link from "next/link";
import KeyTakeaways from "../../components/ui/KeyTakeaways";
import EarlyCTA from "../../components/ui/EarlyCTA";
import FAQSection from "../../components/ui/FAQSection";
import { SERVICIOS, CONTACTO } from "../../data/empresa";

const takeaways = [
  { label: "Servicios integrales", value: "11" },
  { label: "Áreas de atención", value: "Ventas, calidad y quejas" },
  { label: "Garantía", value: "1 año" },
  { label: "Envíos", value: "2–15 días" },
];

const faqs = [
  { q: "¿Qué servicios ofrece Grupo Gecotay?", a: "Atención personalizada, post-venta, planeación de espacios, entrega e instalación, mantenimiento, carpintería, ebanistería, tapicería, transporte, herrería y aluminio, y comidas empresariales." },
  { q: "¿Entregan el mobiliario ensamblado?", a: "Sí. Todos nuestros productos en área metropolitana se entregan ya ensamblados y sin costo alguno en planta baja." },
  { q: "¿Realizan mantenimiento preventivo?", a: "Sí, nuestros colaboradores realizan mantenimientos preventivos y correctivos para alargar la vida de su mobiliario." },
  { q: "¿Ofrecen servicios de carpintería y tapicería?", a: "Sí, contamos con servicios generales de carpintería, barnices, ebanistería con tallas y chapas, y tapicería en telas, vinilos y pieles naturales." },
];

interface ServiciosPageProps {
  locale: string;
}

export default function ServiciosPage({ locale }: ServiciosPageProps) {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Nuestros <span className="text-primary">servicios</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Grupo Gecotay es un grupo de empresas profesionales que engloba varios sectores; brindamos
            servicios de diferentes índoles siempre con el respaldo de excelente servicio.
          </p>
        </div>
      </section>

      <KeyTakeaways items={takeaways} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <EarlyCTA label="Solicitar asesoría" href={`/${locale}/cotizar`} variant="primary" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICIOS.map((svc) => (
              <article
                key={svc.slug}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={svc.imagen}
                    alt={svc.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{svc.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitas asesoría técnica?</h3>
              <p className="text-gray-600 mb-5">
                Un ejecutivo de ventas te atenderá por WhatsApp o correo para tu cotización.
              </p>
              <Link
                href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent("Hola Grupo Gecotay, me gustaría asesoría sobre sus servicios.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
              >
                Escríbenos por WhatsApp
              </Link>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Catálogo de productos</h3>
              <p className="text-gray-600 mb-5">
                Descarga nuestro catálogo 2026 y las cartas de colores de telas, melaminas y metales.
              </p>
              <Link
                href={`/${locale}/descargas`}
                className="block w-full text-center px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors"
              >
                Área de descargas
              </Link>
            </div>
            <div className="p-6 bg-primary text-white rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">Su espacio en nuestras manos</h3>
              <p className="opacity-90 mb-4">
                Somos un grupo de empresas de diferentes sectores al servicio de tus necesidades.
              </p>
              <Link
                href={`/${locale}/nosotros`}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Conoce más sobre nosotros
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre servicios" />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4">Cada proyecto es único</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Cuéntanos tu idea y la convertimos en realidad. Sin compromiso.
          </p>
          <Link
            href={`/${locale}/cotizar`}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Solicitar presupuesto
          </Link>
        </div>
      </section>
    </>
  );
}