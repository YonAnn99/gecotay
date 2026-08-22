"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOW_MS = 1500;
const FADE_MS = 400;

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-[400ms] ease-out"
      style={{ opacity: state === "fading" ? 0 : 1 }}
      role="status"
      aria-label="Cargando"
      aria-hidden={state === "fading"}
    >
      <div className="text-center">
        <Image
          src="/images/logo/logo-horizontal-color.webp"
          alt="Grupo Gecotay"
          width={436}
          height={280}
          priority
          className="mx-auto mb-6 w-56 h-auto"
        />
        <p className="text-2xl font-medium text-gray-900 tracking-wide">BIENVENIDO</p>
      </div>
    </div>
  );
}
