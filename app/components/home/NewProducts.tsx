"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { t } from "@/app/lib/i18n";
import { LINEAS_PRODUCTO } from "@/app/data/empresa";

interface NewProductsProps {
  locale: string;
}

// Choose 6 lines flagged as new (esNuevo) or fallback to latest few
const NEW_PRODUCT_LINES = LINEAS_PRODUCTO.filter((l) => (l as any).esNuevo).slice(0, 6);

export default function NewProducts({ locale }: NewProductsProps) {
  return (
    <section id="nuevos-productos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t(locale, "newProducts.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Link
              href={`/${locale}/productos`}
              className="text-primary font-semibold hover:underline"
            >
              {t(locale, "newProducts.viewAll")}
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {NEW_PRODUCT_LINES.map((line, index) => (
            <motion.article
              key={line.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={line.imagen}
                  alt={line.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary text-white rounded">
                  {t(locale, "newProducts.newBadge")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{line.nombre}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{line.descripcion}</p>
                <Link
                  href={`/${locale}/productos/${line.slug}`}
                  className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                >
                  {t(locale, "newProducts.viewDetails")}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}