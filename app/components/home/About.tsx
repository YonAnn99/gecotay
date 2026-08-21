"use client";

import { motion } from "framer-motion";
import { t } from "@/app/lib/i18n";
import { NOSOTROS } from "@/app/data/empresa";

interface AboutProps {
  locale: string;
}

export default function About({ locale }: AboutProps) {
  return (
    <section id="quienes-somos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t(locale, "about.title")}
          </h2>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-3xl mx-auto text-gray-700 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p>{NOSOTROS.quienesSomos}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t(locale, "about.mission"), text: NOSOTROS.mision },
            { title: t(locale, "about.vision"), text: NOSOTROS.vision },
            { title: t(locale, "about.warranty"), text: NOSOTROS.garantia },
          ].map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="p-6 bg-gray-50 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}