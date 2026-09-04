"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import CircularGallery from "../ui/CircularGallery";
import { carouselItems } from "./carousel-data";
import { t } from "@/app/lib/i18n";

interface HeroProps {
  locale: string;
}

// CircularGallery only needs an image + label per slide (it's a canvas/WebGL
// gallery, not individual DOM nodes), so the richer CarouselItem data
// (id/href) from carousel-data.ts is mapped down to that shape here.
const galleryItems = carouselItems.map(({ image, title, href }) => ({
  image,
  text: title,
  href,
}));

export default function Hero({ locale }: HeroProps) {
  const router = useRouter();
  const handleNavigate = useCallback(
    (href: string) => router.push(`/${locale}${href}`),
    [router, locale]
  );

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="w-full flex-1 flex flex-col relative z-10">
        {/* Hero text content */}
        <header className="relative z-20 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">
              {t(locale, "hero.title")}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary/90 font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mb-6 max-w-3xl mx-auto">
              {t(locale, "hero.subtitle")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mb-8 max-w-2xl mx-auto leading-relaxed">
              {t(locale, "hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/cotizar`}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition"
              >
                {t(locale, "hero.ctaQuote")}
              </Link>
              <Link
                href={`/${locale}/productos`}
                className="px-6 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-primary hover:bg-white/10 transition"
              >
                {t(locale, "hero.ctaProducts")}
              </Link>
            </div>
          </motion.div>
        </header>

        {/* Circular Gallery - moved below hero text */}
        <motion.div
          className="w-full h-[45vh] md:h-[55vh] min-h-[350px] md:min-h-[450px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            textColor="#f5f5f4"
            onNavigate={handleNavigate}
          />
        </motion.div>
      </div>
    </section>
  );
}