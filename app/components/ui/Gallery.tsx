"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery({ imagenes, alt }: { imagenes: string[]; alt: string }) {
  const [seleccionada, setSeleccionada] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagenes.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setSeleccionada(i)}
            className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
            aria-label={`Ver imagen ${i + 1} de ${imagenes.length}`}
          >
            <Image
              src={img}
              alt={`${alt} - imagen ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {seleccionada !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSeleccionada(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ${seleccionada + 1} de ${imagenes.length}`}
        >
          <button
            type="button"
            onClick={() => setSeleccionada(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSeleccionada((s) => (s === null ? s : (s - 1 + imagenes.length) % imagenes.length));
            }}
            className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2"
            aria-label="Imagen anterior"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSeleccionada((s) => (s === null ? s : (s + 1) % imagenes.length));
            }}
            className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2"
            aria-label="Imagen siguiente"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="relative max-w-5xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imagenes[seleccionada]}
              alt={`${alt} - imagen ${seleccionada + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-6 text-white/80 text-sm">
            {seleccionada + 1} / {imagenes.length}
          </p>
        </div>
      )}
    </>
  );
}