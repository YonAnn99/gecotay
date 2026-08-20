"use client";

import Link from "next/link";
import KeyTakeaways from "../components/ui/KeyTakeaways";
import EarlyCTA from "../components/ui/EarlyCTA";
import FAQSection from "../components/ui/FAQSection";

const servicesDetail = [
  {
    slug: "diseno",
    title: "Diseño a medida",
    short: "Creamos mobiliario adaptado a tus espacios, necesidades y identidad de marca.",
    full: "Nuestro equipo de diseñadores industriales trabaja codo a codo contigo desde el concepto inicial hasta el detalle constructivo. Usamos herramientas BIM/CAD y renderizado fotorrealista para que veas el resultado antes de fabricar.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
    ),
    features: ["Space planning y layout", "Diseño 3D y renders", "Selección de acabados", "Prototipado rápido"],
  },
  {
    slug: "fabricacion",
    title: "Fabricación propia",
    short: "Control total de calidad en nuestra fábrica con materiales certificados y procesos sostenibles.",
    full: "Contamos con 5.000 m² de planta productiva equipada con maquinaria CNC de última generación, líneas de lacado al agua, tapicería industrial y control numérico. Certificados ISO 9001 e ISO 14001.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    ),
    features: ["CNC 5 ejes y nesting", "Lacado al agua ecológico", "Tapicería certificada", "Control calidad 100%"],
  },
  {
    slug: "instalacion",
    title: "Instalación y montaje",
    short: "Equipo técnico especializado para entrega, montaje y puesta en marcha en tu ubicación.",
    full: "Nuestros montadores propios (no subcontratados) garantizan instalación limpia, rápida y sin daños. Incluye nivelación, anclaje, conexión de electrificación y retirada de embalajes. Servicio peninsular e islas.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    features: ["Montadores propios", "Nivelación láser", "Gestión de residuos", "Entrega en planta"],
  },
  {
    slug: "ergonomia",
    title: "Ergonomía certificada",
    short: "Productos que cumplen normativas UNE-EN 1335 y promueven la salud laboral.",
    full: "Asesoramos en evaluación de puestos de trabajo según RD 488/1997 y UNE-EN ISO 9241. Nuestras sillas superan tests de durabilidad (400k ciclos) y apoyan certificaciones WELL y LEED.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
    ),
    features: ["Certificación UNE-EN 1335", "Test 400k ciclos", "Aporta créditos LEED/WELL", "Asesoría PRL incluida"],
  },
  {
    slug: "contract",
    title: "Contract & Proyectos",
    short: "Gestión integral de proyectos para oficinas, hoteles, espacios públicos y colectividades.",
    full: "Llave en mano: desde medición in situ, proyecto ejecutivo, fabricación, logística, instalación y post-venta. Experiencia en hoteles 4/5*, edificios administrativos, universidades y hospitales.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
    ),
    features: ["Project manager dedicado", "Cronograma Gantt", "Coordinación gremios", "Documentación as-built"],
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento post-venta",
    short: "Servicio técnico, repuestos y garantía extendida para alargar la vida de tu inversión.",
    full: "Garantía estándar 5 años (estructura) y 2 años (tapices/mecanismos). Contratos de mantenimiento preventivo anual: revisión, apriete, lubricación, sustitución de piezas de desgaste. Stock permanente de repuestos.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    features: ["Garantía 5+2 años", "Contratos preventivos", "Repuestos 10 años", "SLA 48h península"],
  },
];

const takeaways = [
  { label: "Servicios integrales", value: "6" },
  { label: "Años de experiencia", value: "50+" },
  { label: "Proyectos al año", value: "200+" },
  { label: "Cobertura", value: "Península + islas" },
];

const faqs = [
  { q: "¿Cuánto tarda un proyecto llave en mano?", a: "Entre 8 y 16 semanas según alcance." },
  { q: "¿Ofrecen mantenimiento preventivo?", a: "Sí, contratos anuales con SLA 48 h." },
  { q: "¿Certifican ergonomía?", a: "Todos nuestros asientos cumplen UNE‑EN 1335." },
  { q: "¿Trabajan fuera de España?", a: "Exportamos a 12 países y gestionamos logística internacional." },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nuestros <span className="text-primary">servicios</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompañamos todo el ciclo de vida de tu proyecto: desde el concepto hasta el mantenimiento.
          </p>
        </div>
      </section>

      <KeyTakeaways items={takeaways} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <EarlyCTA label="Solicitar llamada de asesoría" href="/cotizar" variant="primary" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {servicesDetail.map((svc, i) => (
                <article
                  key={svc.slug}
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {svc.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{svc.title}</h3>
                      <p className="text-gray-600 mb-3">{svc.short}</p>
                      <ul className="flex flex-wrap gap-2 mb-3">
                        {svc.features.map((f, j) => (
                          <li key={j} className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-100">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/servicios/${svc.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Ver más
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitás asesoría técnica?</h3>
                <p className="text-gray-600 mb-5">Nuestro equipo de proyecto te llama en 24h laborables.</p>
                <Link
                  href="/cotizar"
                  className="block w-full text-center px-6 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                >
                  Solicitar llamada
                </Link>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Catálogo técnico</h3>
                <p className="text-gray-600 mb-5">Descargá fichas técnicas, certificados y bloques BIM/CAD.</p>
                <Link
                  href="/descargas"
                  className="block w-full text-center px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl transition-colors"
                >
                  Área de descargas
                </Link>
              </div>
              <div className="p-6 bg-primary text-white rounded-2xl">
                <h3 className="text-lg font-semibold mb-2">50+ años fabricando</h3>
                <p className="opacity-90 mb-4">Más de 2.000 proyectos avalan nuestra experiencia en mobiliario contract y oficina.</p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  Conocé nuestra historia
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre servicios" />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Cada proyecto es único
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Contanos tu idea y la convertimos en realidad. Sin compromiso.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Empezar proyecto
          </Link>
        </div>
      </section>
    </>
  );
}