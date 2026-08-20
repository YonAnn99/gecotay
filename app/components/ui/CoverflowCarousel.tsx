"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export interface CarouselItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

interface CoverflowCarouselProps {
  items: CarouselItem[];
  height?: string;
}

export default function CoverflowCarousel({ items, height = "h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px]" }: CoverflowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    const deltaX = e.touches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  return (
    <div
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden`}
      role="region"
      aria-label="Carrusel de líneas de producto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center perspective-[1000px]">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const isCenter = offset === 0;

          // Circular offset calculation
          let relativeOffset = offset;
          if (offset > items.length / 2) relativeOffset -= items.length;
          if (offset < -items.length / 2) relativeOffset += items.length;

          const absOffset = Math.abs(relativeOffset);
          const direction = Math.sign(relativeOffset);

          // Only render center and 2 on each side for performance
          if (absOffset > 2) return null;

          return (
            <motion.div
              key={item.id}
              className="absolute w-[280px] sm:w-[350px] md:w-[450px] h-[300px] sm:h-[400px] md:h-[450px] rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
              initial={false}
              animate={{
                x: `${direction * absOffset * 65}%`,
                scale: 1 - absOffset * 0.12,
                rotateY: -direction * absOffset * 20,
                zIndex: 10 - absOffset,
                opacity: 1 - absOffset * 0.15,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => !isCenter && setCurrentIndex(index)}
            >
              {!isCenter && (
                <div className="absolute inset-0 bg-black/40 z-10 transition-colors hover:bg-black/20" />
              )}

              <Link href={item.href} className="block w-full h-full pointer-events-auto" aria-label={`Ver ${item.title}`}>
                <div className="relative w-full h-full bg-gray-200 group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 450px"
                  />
                  {/* Gradient overlay and text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wider">{item.title}</h3>
                    <p className="text-primary mt-2 text-sm font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      VER LÍNEA →
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 md:bottom-8 flex gap-4 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}