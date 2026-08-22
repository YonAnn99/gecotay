"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "@/app/lib/i18n";

interface NavMenuProps {
  locale: string;
}

// All the links that previously lived split across the two desktop nav
// groups + the mobile drawer now live in this single list, since the menu
// is one unified toggle+dropdown at every breakpoint.
const navItems = [
  { href: "/", key: "nav.inicio" },
  { href: "/productos", key: "nav.productos" },
  { href: "/servicios", key: "nav.servicios" },
  { href: "/nosotros", key: "nav.nosotros" },
  { href: "/acabados-tapices", key: "nav.acabados" },
  { href: "/contacto", key: "nav.contacto" },
];

function getActiveLabel(pathname: string, locale: string) {
  const prefixedItems = navItems.map(item => ({
    ...item,
    href: `/${locale}${item.href}`,
    label: t(locale, item.key)
  }));
  const exact = prefixedItems.find((item) => item.href === pathname);
  if (exact) return exact.label;
  const nested = prefixedItems
    .filter((item) => item.href !== `/${locale}/` && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return nested?.label ?? t(locale, "nav.menu");
}

// Right floating "island" — shows the current section label next to a
// toggle button that expands into a dropdown listing every nav item.
export default function NavMenu({ locale }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLabel = getActiveLabel(pathname, locale);
  const labeledItems = navItems.map((item) => ({ ...item, label: t(locale, item.key) }));

  // Close the dropdown on navigation (including back/forward) without doing
  // it inside a useEffect: adjusting state during render in response to a
  // changed prop is the pattern React recommends for this case.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed top-5 right-4 z-50 sm:top-10 sm:right-30">
      <motion.div
        layout
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-48 max-[379px]:w-40 sm:w-60 overflow-hidden rounded-2xl bg-ink/75 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/30"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="nav-menu-panel"
          aria-label={isOpen ? t(locale, "nav.cerrar") : t(locale, "nav.abrir")}
          className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-white transition-colors duration-200 hover:bg-white/5"
        >
          <span className="hidden min-[420px]:inline text-sm font-medium">{activeLabel}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
            <svg
              className={`h-4 w-4 transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="nav-menu-panel"
              id="nav-menu-panel"
              role="navigation"
              aria-label={t(locale, "nav.navegacion")}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 border-t border-white/10 px-5 pt-4 pb-5">
                {labeledItems.map((item) => {
                  const isActive = item.label === activeLabel;
                  const href = `/${locale}${item.href}`;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`block text-sm transition-colors duration-200 ${
                          isActive ? "text-white underline underline-offset-4" : "text-white/70 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}