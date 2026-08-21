"use client";

import { motion } from "framer-motion";
import { t } from "@/app/lib/i18n";
import { ShieldIcon, TruckIcon, UsersIcon, MapPinIcon } from "@/app/components/ui/Icons";

interface WhyChooseProps {
  locale: string;
}

const items = [
  { icon: ShieldIcon, titleKey: "whyChoose.warranty", descKey: "whyChoose.warrantyDesc" },
  { icon: TruckIcon, titleKey: "whyChoose.delivery", descKey: "whyChoose.deliveryDesc" },
  { icon: UsersIcon, titleKey: "whyChoose.support", descKey: "whyChoose.supportDesc" },
  { icon: MapPinIcon, titleKey: "whyChoose.coverage", descKey: "whyChoose.coverageDesc" },
];

export default function WhyChoose({ locale }: WhyChooseProps) {
  return (
    <section id="por-que-elegirnos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t(locale, "whyChoose.title")}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.article
              key={item.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {t(locale, item.titleKey)}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(locale, item.descKey)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}