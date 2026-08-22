"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "../lib/i18n";

const CONSENT_KEY = "gecotay-cookie-consent";

type Consent = "accepted" | "rejected" | null;

function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setConsent(value: "accepted" | "rejected") {
  window.localStorage.setItem(CONSENT_KEY, value);
  listeners.forEach((listener) => listener());
}

interface CookieBannerProps {
  locale: string;
}

export default function CookieBanner({ locale }: CookieBannerProps) {
  const consent = useSyncExternalStore(subscribe, getConsent, () => null);

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        role="dialog"
        aria-live="polite"
        aria-label={t(locale, "cookies.titulo")}
        className="fixed bottom-4 inset-x-4 z-50 sm:left-auto sm:right-4 sm:w-96 sm:inset-x-auto"
      >
        <div className="rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 p-6">
          <div className="flex items-start gap-3 mb-3">
            <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-base font-semibold text-white">{t(locale, "cookies.titulo")}</h2>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            {t(locale, "cookies.mensaje")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="flex-1 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              {t(locale, "cookies.aceptar")}
            </button>
            <button
              type="button"
              onClick={() => setConsent("rejected")}
              className="flex-1 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-200"
            >
              {t(locale, "cookies.rechazar")}
            </button>
            <Link
              href={`/${locale}/aviso-privacidad`}
              className="text-xs text-white/70 hover:text-white underline underline-offset-2 transition-colors duration-200"
            >
              {t(locale, "cookies.aviso")}
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}