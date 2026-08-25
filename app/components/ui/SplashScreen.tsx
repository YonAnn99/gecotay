"use client";

import { useEffect, useSyncExternalStore } from "react";

const MIN_SHOW_MS = 2500;
const MAX_SHOW_MS = 7000;
const FADE_MS = 500;
const BAR_FILL_MS = 300;

// Hydration gate: this component renders null on the server AND on the
// first client render. The splash itself lives in the SSR HTML (see the
// locale layout) so it paints with the first byte; this component only
// controls its lifecycle via DOM once mounted.
const emptySubscribe = () => () => {};
const getHydrated = () => true;
const getNotHydrated = () => false;

export default function SplashScreen() {
  const hydrated = useSyncExternalStore(emptySubscribe, getHydrated, getNotHydrated);

  useEffect(() => {
    if (!hydrated) return;

    const splash = document.getElementById("splash");
    if (!splash) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      splash.remove();
      return;
    }

    const bar = document.getElementById("splash-bar");
    let loaded = document.readyState === "complete";
    let minElapsed = false;
    let revealing = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const reveal = () => {
      if (revealing) return;
      revealing = true;

      if (bar) {
        bar.style.transitionDuration = `${BAR_FILL_MS}ms`;
        bar.style.transitionTimingFunction = "ease-out";
        bar.style.transform = "scaleX(1)";
      }
      timers.push(setTimeout(() => splash.classList.add("splash-overlay-out"), BAR_FILL_MS));
      timers.push(setTimeout(() => splash.remove(), BAR_FILL_MS + FADE_MS));
    };

    const tryReveal = () => {
      if (!revealing && minElapsed && loaded) reveal();
    };

    // Start the bar creep once mounted (transition instead of keyframes so
    // JS can retarget it when the page finishes loading).
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.transitionDuration = "1800ms";
        bar.style.transitionTimingFunction = "linear";
        bar.style.transform = "scaleX(0.85)";
      });
    }

    const onLoad = () => {
      loaded = true;
      tryReveal();
    };
    if (loaded) tryReveal();
    else window.addEventListener("load", onLoad);

    timers.push(
      setTimeout(() => {
        minElapsed = true;
        tryReveal();
      }, MIN_SHOW_MS),
      // Never trap the user behind the splash if something keeps loading.
      setTimeout(() => {
        minElapsed = true;
        loaded = true;
        tryReveal();
      }, MAX_SHOW_MS)
    );

    return () => {
      window.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
    };
  }, [hydrated]);

  return null;
}
