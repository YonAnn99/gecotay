"use client";

import Image from "next/image";
import Link from "next/link";
import CoverflowCarousel from "../ui/CoverflowCarousel";
import { carouselItems } from "./carousel-data";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Hero Content */}
        <div className="text-center lg:text-left mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/30 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nuevo catálogo 2024 disponible
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Mobiliario que
            <span className="block text-primary"> transforma espacios</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
            Diseñamos y fabricamos mobiliario de oficina, contract y equipamiento integral.
            Calidad, ergonomía y diseño a medida para tu proyecto.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
            <Link
              href="/cotizar"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/productos"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-xl transition-all duration-200"
            >
              Ver catálogo
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto lg:mx-0 mb-16">
            <div className="text-center p-4 rounded-xl bg-gray-50/50">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-gray-600">Años de experiencia</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-50/50">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">2.000+</div>
              <div className="text-sm text-gray-600">Proyectos entregados</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-50/50">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">ISO 9001</div>
              <div className="text-sm text-gray-600">Certificado calidad</div>
            </div>
          </div>
        </div>

        {/* Coverflow Carousel */}
        <div className="w-full">
          <CoverflowCarousel items={carouselItems} />
        </div>
      </div>
    </section>
  );
}