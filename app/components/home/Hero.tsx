"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
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

            <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto lg:mx-0">
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

          <div className="relative">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20">
              <Image
                src="/images/hero/hero-main.webp"
                alt="Showroom GECOTAY - Mobiliario de oficina"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Garantía 5 años</p>
                  <p className="text-sm text-gray-500">En todos nuestros productos</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-light/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Diseño a medida</p>
                  <p className="text-sm text-gray-500">Proyectos personalizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}