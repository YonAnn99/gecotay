"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/app/lib/i18n";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

interface LocaleSwitcherProps {
  locale: string;
  onNavigate?: () => void;
}

// Swaps the leading locale segment of the current path, so the visitor stays
// on the same page when switching. The NEXT_LOCALE cookie is httpOnly and
// cannot be written from here — that is fine: proxy.ts rewrites it on every
// locale-prefixed request, so simply navigating is what persists the choice.
function withLocale(pathname: string, next: string) {
  const segments = pathname.split("/");
  // ["", "<locale>", ...rest]
  if (LOCALES.some((l) => l.code === segments[1])) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export default function LocaleSwitcher({ locale, onNavigate }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5">
      <span className="text-xs uppercase tracking-wider text-white/50">
        {t(locale, "nav.idioma")}
      </span>
      <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5">
        {LOCALES.map(({ code, label }) => {
          const isActive = code === locale;
          return (
            <Link
              key={code}
              href={withLocale(pathname, code)}
              hrefLang={code}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${
                isActive ? "bg-white text-ink" : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
