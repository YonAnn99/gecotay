import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTO } from "../../data/empresa";

export const metadata: Metadata = {
  // Just the page-specific part: the root layout's title.template appends
  // " | Grupo Gecotay" for this (child) segment automatically.
  title: "Descargas",
  description:
    "Descarga el catálogo 2026 de Grupo Gecotay y las cartas de colores de telas, melaminas y metales.",
  alternates: {
    languages: { es: "/es/descargas", en: "/en/descargas" },
  },
};

const descargas = [
  {
    titulo: "Catálogo Grupo Gecotay 2026",
    descripcion:
      "Catálogo completo de líneas de mobiliario de oficina, hogar, recepciones, sillería y más.",
    archivo: "/docs/gecotay-catalogo-2026.pdf",
    tamano: "~8.9 MB",
  },
  {
    titulo: "Colores de melaminas",
    descripcion: "Carta de colores de melamina para mobiliario de oficina y hogar.",
    archivo: "/docs/colores-melaminas.pdf",
    tamano: "~0.7 MB",
  },
  {
    titulo: "Colores metálicos",
    descripcion: "Carta de colores metálicos para estructuras y lacados.",
    archivo: "/docs/colores-metales.pdf",
    tamano: "~0.7 MB",
  },
  ...["kansas", "adisson", "alessia", "cancun", "malla", "matisse", "microespacial", "office", "olimpy", "tactopiel"].map(
    (tela) => ({
      titulo: `Colores de tela ${tela.charAt(0).toUpperCase()}${tela.slice(1)}`,
      descripcion: "Carta de colores de tela para tapicería de mobiliario.",
      archivo: `/docs/tela-${tela}.pdf`,
      tamano: "PDF",
    })
  ),
];

export default function DescargasPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">
            Área de <span className="text-primary">descargas</span>
          </h1>
          <p className="text-xl text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] max-w-2xl mx-auto">
            Catálogo de productos y cartas de colores para elegir tus acabados.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-8">Catálogo y colores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {descargas.map((d) => (
              <a
                key={d.archivo}
                href={d.archivo}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19h6m-6-4l3-3 3 3" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{d.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{d.descripcion}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Descargar PDF ({d.tamano})
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">¿Necesitas una carta de colores específica?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Escríbenos y te enviamos la información de acabados que necesites.
          </p>
          <Link
            href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent("Hola Grupo Gecotay, necesito información sobre acabados y colores.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Consultar por WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}