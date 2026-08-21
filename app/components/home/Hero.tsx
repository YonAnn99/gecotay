"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CircularGallery from "../ui/CircularGallery";
import { carouselItems } from "./carousel-data";

// CircularGallery only needs an image + label per slide (it's a canvas/WebGL
// gallery, not individual DOM nodes), so the richer CarouselItem data
// (id/href) from carousel-data.ts is mapped down to that shape here.
const galleryItems = carouselItems.map(({ image, title, href }) => ({
  image,
  text: title,
  href,
}));

export default function Hero() {
  const router = useRouter();
  const handleNavigate = useCallback((href: string) => router.push(href), [router]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="w-full flex-1 flex flex-col relative z-10">
        {/* Circular Gallery - moved to top */}
        <motion.div
          className="w-full h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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