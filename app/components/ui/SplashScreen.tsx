"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOW_MS = 5000;
const FADE_MS = 500;

export default function SplashScreen() {
  const [state, setState] = useState<"hidden" | "visible" | "fading">("hidden");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const raf = requestAnimationFrame(() => setState("visible"));
    const showTimer = setTimeout(() => setState("fading"), SHOW_MS);
    const fadeTimer = setTimeout(() => setState("hidden"), SHOW_MS + FADE_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center splash-overlay ${
        state === "fading" ? "splash-overlay-out" : ""
      }`}
      role="status"
      aria-label="Cargando"
      aria-hidden={state === "fading"}
    >
      {/* Radial brand glow behind the logo */}
      <div className="splash-glow" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <Image
          src="/images/logo/logo-horizontal-white.webp"
          alt="Grupo Gecotay"
          width={436}
          height={280}
          priority
          className="splash-logo w-44 sm:w-56 h-auto"
        />
        <p className="splash-text mt-8 text-lg sm:text-2xl font-medium text-white/90 tracking-[0.35em] sm:tracking-[0.45em] uppercase">
          Bienvenido
        </p>
        <div
          className="mt-8 h-[2px] w-40 sm:w-56 overflow-hidden rounded-full bg-white/10"
          aria-hidden="true"
        >
          <div className="splash-bar h-full w-full origin-left rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
