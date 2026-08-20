"use client";

import { motion } from "framer-motion";
import CoverflowCarousel from "../ui/CoverflowCarousel";
import { carouselItems } from "./carousel-data";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/hero/hero-main.webp')] bg-cover bg-center opacity-5" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        {/* Coverflow Carousel - moved to top */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CoverflowCarousel items={carouselItems} />
        </motion.div>
      </div>
    </section>
  );
}