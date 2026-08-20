"use client";

import CoverflowCarousel from "../ui/CoverflowCarousel";
import { carouselItems } from "./carousel-data";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Coverflow Carousel - moved to top */}
        <div className="w-full">
          <CoverflowCarousel items={carouselItems} />
        </div>
      </div>
    </section>
  );
}