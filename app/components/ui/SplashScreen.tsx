"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MIN_SHOW_MS = 2500;
const MAX_SHOW_MS = 7000;
const FADE_MS = 500;
const BAR_FILL_MS = 300;

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [full, setFull] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const raf = requestAnimationFrame(() => setMounted(true));

    let loaded = document.readyState === "complete";
    let minElapsed = false;
    let revealing = false;

    const tryReveal = () => {
      if (revealing || !minElapsed || !loaded) return;
      revealing = true;
      setFull(true);
      setTimeout(() => setExiting(true), BAR_FILL_MS);
      setTimeout(() => setGone(true), BAR_FILL_MS + FADE_MS);
    };

    const onLoad = () => {
      loaded = true;
      tryReveal();
    };
    if (loaded) tryReveal();
    else window.addEventListener("load", onLoad);

    // The page may already be fully loaded before the brand minimum elapses:
    // the overlay waits for it, then reveals.
    const minTimer = setTimeout(tryReveal, MIN_SHOW_MS);
    // Never trap the user behind the splash if something keeps loading.
    const maxTimer = setTimeout(() => {
      minElapsed = true;
      loaded = true;
      tryReveal();
    }, MAX_SHOW_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center splash-overlay ${
        exiting ? "splash-overlay-out" : ""
      }`}
      role="status"
      aria-label="Cargando"
      aria-hidden={exiting}
    >
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
          <div
            className="h-full w-full origin-left rounded-full bg-primary transition-transform ease-out will-change-transform"
            style={{
              transform: full ? "scaleX(1)" : `scaleX(${mounted ? 0.85 : 0})`,
              transitionDuration: full ? `${BAR_FILL_MS}ms` : "1800ms",
              transitionTimingFunction: full ? "ease-out" : "linear",
              boxShadow: "0 0 12px rgba(170, 198, 55, 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
