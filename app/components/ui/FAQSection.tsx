"use client";

import Script from "next/script";
import { motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({ items, title = "Preguntas frecuentes" }: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="py-20 bg-gray-50/30" aria-labelledby="faq-heading">
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </motion.div>

        <dl className="space-y-4">
          {items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-100 p-6"
            >
              <dt className="text-lg font-semibold text-gray-900 mb-2">{f.q}</dt>
              <dd className="text-gray-600 leading-relaxed">{f.a}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}