"use client";

import Image from "next/image";
import Link from "next/link";
import KeyTakeaways from "../components/ui/KeyTakeaways";
import EarlyCTA from "../components/ui/EarlyCTA";
import FAQSection from "../components/ui/FAQSection";
import { EMPRESA, NOSOTROS, VALORES, CONTACTO } from "../data/empresa";

const valoresIcons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg key="6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg key="7" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.09 5.014 17.657 6.657a8 8 0 11-11.314 11.314z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  <svg key="8" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
];

const takeaways = [
  { label: "Líneas de producto", value: "20" },
  { label: "Servicios integrales", value: "11" },
  { label: "Garantía", value: "1 año" },
  { label: "Envíos", value: "2–15 días" },
];

const faqs = [
  { q: "¿Qué es Grupo Ecotay?", a: "Es un grupo de empresas de diferentes sectores dedicado a la fabricación, distribución y comercialización de mobiliario de excelente calidad y servicios integrales." },
  { q: "¿Dónde se encuentra la empresa?", a: "En Cda. de San Luis Potosí Mz. 2 Lt. 2, Col. Ejidos de Tulpetlac, Ecatepec de Morelos, Estado de México, C.P. 55114." },
  { q: "¿Qué garantía tienen sus productos?", a: "Todos los productos fabricados y distribuidos cuentan con 1 año de garantía contra defectos de fabricación, y en productos de gama alta hasta 60 meses." },
  { q: "¿Puedo solicitar una cotización?", a: "Sí, escríbenos por WhatsApp al " + CONTACTO.whatsapp + " o a " + CONTACTO.correos.ventas + "." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6 leading-tight">
                {EMPRESA.nombre.split(" de C.V.")[0]}
              </h1>
              <p className="text-lg text-gray-300 mb-8">{NOSOTROS.quienesSomos}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cotizar" className="px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">
                  Solicitar cotización
                </Link>
                <Link href="/productos" className="px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors">
                  Ver productos
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/images/products/recepciones-portada.webp"
                alt="Mobiliario Grupo Ecotay"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <KeyTakeaways items={takeaways} />
          <div className="mt-8 text-center">
            <EarlyCTA label="Hablar con un ejecutivo" href="/contacto" variant="primary" />
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <Link href="/productos" className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Productos</h3>
              <p className="text-sm text-gray-600">20 líneas de mobiliario</p>
            </Link>
            <Link href="/servicios" className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Servicios</h3>
              <p className="text-sm text-gray-600">Soluciones integrales</p>
            </Link>
            <Link href="/acabados-tapices" className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Acabados y tapices</h3>
              <p className="text-sm text-gray-600">Materiales a tu elección</p>
            </Link>
            <Link href="/contacto" className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Contacto</h3>
              <p className="text-sm text-gray-600">Estamos para ayudarte</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Nuestra <span className="text-primary">misión y visión</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Misión</h3>
              <p className="text-gray-600">{NOSOTROS.mision}</p>
            </article>
            <article className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visión</h3>
              <p className="text-gray-600">{NOSOTROS.vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestros <span className="text-primary">valores</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde el comienzo de nuestra historia hemos identificado valores que día con día ponemos en marcha para el buen funcionamiento de nuestra empresa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALORES.map((v, i) => (
              <article key={v.nombre} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{valoresIcons[i % valoresIcons.length]}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.nombre}</h3>
                <p className="text-gray-600 text-sm">{v.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-2xl border border-primary/20 bg-primary/5">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 text-center">Nuestro <span className="text-primary">compromiso de calidad</span></h2>
            <p className="text-gray-300 text-center text-lg leading-relaxed">
              {NOSOTROS.garantia}
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre Grupo Ecotay" />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Buscas mobiliario para tu espacio?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Escríbenos por WhatsApp al {CONTACTO.whatsapp} o a {CONTACTO.correos.ventas} y cotiza sin compromiso.
          </p>
          <Link
            href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent("Hola Grupo Ecotay, me gustaría recibir atención de ventas.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-white hover:bg-gray-100 rounded-xl transition-colors"
          >
            Escríbenos por WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}