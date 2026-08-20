"use client";

import Image from "next/image";
import Link from "next/link";

const milestones = [
  { year: "1974", title: "Fundación", desc: "Taller de carpintería familiar en Valencia" },
  { year: "1985", title: "Primera fábrica", desc: "2.000 m² y mecanización de procesos" },
  { year: "1998", title: "Certificación ISO 9001", desc: "Sistema de gestión de calidad" },
  { year: "2005", title: "División Contract", desc: "Hoteles, colectividades y proyectos llave en mano" },
  { year: "2012", title: "Nueva planta 5.000 m²", desc: "CNC 5 ejes, lacado al agua, I+D" },
  { year: "2020", title: "ISO 14001 y sello PYME Innovadora", desc: "Compromiso medioambiental y digitalización" },
  { year: "2024", title: "50 aniversario", desc: "2.000+ proyectos, exportación a 12 países" },
];

const values = [
  { title: "Calidad sin atajos", desc: "Controlamos cada fase: diseño, materia prima, producción, instalación.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { title: "Diseño útil", desc: "Estética que resuelve: ergonomía, durabilidad, mantenibilidad.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg> },
  { title: "Sostenibilidad real", desc: "Madera FSC, lacados al agua, energía solar, economía circular.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
  { title: "Cerca de ti", desc: "Equipo propio en 4 delegaciones. Sin intermediarios.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.09 5.014 17.657 6.657a8 8 0 11-11.314 11.314z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Gestión de calidad", logo: "9001" },
  { name: "ISO 14001:2015", desc: "Gestión ambiental", logo: "14001" },
  { name: "UNE-EN 1335", desc: "Sillas oficina", logo: "1335" },
  { name: "FSC® C123456", desc: "Madera responsable", logo: "FSC" },
  { name: "PEFC", desc: "Cadena custodia", logo: "PEFC" },
  { name: "Sello PYME Innovadora", desc: "Ministerio Ciencia", logo: "INN" },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                50 años creando <span className="text-primary">espacios que funcionan</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Desde 1974, en GECOTAY combinamos tradición artesanal y tecnología industrial
                para fabricar mobiliario que dura generaciones. Somos fabricantes, no intermediarios.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cotizar" className="px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">
                  Hablar con un experto
                </Link>
                <Link href="/descargas" className="px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors">
                  Catálogo empresa
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-24 h-24 mx-auto text-primary/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  <p className="text-primary font-semibold text-xl">Imagen de fábrica</p>
                  <p className="text-primary/60">Galería próximamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestra <span className="text-primary">historia</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Más de medio siglo evolucionando con vosotros</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center z-10 ${i % 2 === 0 ? 'sm:order-1' : 'sm:order-3'}`}>
                    <span className="text-primary font-bold text-sm">{m.year}</span>
                  </div>
                  <div className={`w-full sm:w-1/2 px-6 ${i % 2 === 0 ? 'text-right sm:order-2' : 'sm:order-2'}`}>
                    <h3 className="text-xl font-semibold text-gray-900">{m.title}</h3>
                    <p className="text-gray-600 mt-1">{m.desc}</p>
                  </div>
                  <div className="w-full sm:w-1/2 ${i % 2 === 0 ? 'sm:order-3' : 'sm:order-1'}"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestros <span className="text-primary">valores</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Principios que guían cada decisión</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <article key={i} className="p-6 bg-white rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{v.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Certificaciones <span className="text-primary">y estándares</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Garantías auditadas por entidades independientes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">{c.logo}</div>
                <h3 className="font-semibold text-gray-900 text-center mb-1">{c.name}</h3>
                <p className="text-sm text-gray-600 text-center">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Querés trabajar con nosotros?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Buscamos talento en diseño, producción, instalación y gestión de proyectos.</p>
          <Link href="/trabaja-con-nosotros" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-white hover:bg-gray-100 rounded-xl transition-colors">
            Ver ofertas
          </Link>
        </div>
      </section>
    </>
  );
}