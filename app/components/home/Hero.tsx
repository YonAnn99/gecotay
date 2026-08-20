"use client";

import { motion } from "framer-motion";
import CircularGallery from "../ui/CircularGallery";
import { carouselItems } from "./carousel-data";

// CircularGallery only needs an image + label per slide (it's a canvas/WebGL
// gallery, not individual DOM nodes), so the richer CarouselItem data
// (id/href) from carousel-data.ts is mapped down to that shape here.
const galleryItems = carouselItems.map(({ image, title }) => ({
  image,
  text: title
}));

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/hero/hero-main.webp')] bg-cover bg-center opacity-5" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        {/* Circular Gallery - moved to top */}
        <motion.div
          className="w-full h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CircularGallery items={galleryItems} bend={3} borderRadius={0.05} textColor="#171717" />
        </motion.div>
      </div>
    </section>
  );
}