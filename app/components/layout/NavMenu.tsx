"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// All the links that previously lived split across the two desktop nav
// groups + the mobile drawer now live in this single list, since the menu
// is one unified toggle+dropdown at every breakpoint.
const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/acabados-tapices", label: "Acabados y tapices" },
  { href: "/contacto", label: "Contacto" },
];

function getActiveLabel(pathname: string) {
  const exact = navItems.find((item) => item.href === pathname);
  if (exact) return exact.label;
  // Fall back to the closest matching section for nested routes
  // (e.g. /productos/ceri -> "Productos").
  const nested = navItems
    .filter((item) => item.href !== "/" && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return nested?.label ?? "Menú";
}

// Right floating "island" — shows the current section label next to a
// toggle button that expands into a dropdown listing every nav item.
export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLabel = getActiveLabel(pathname);

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
    <div ref={containerRef} className="fixed top-4 right-4 z-50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="nav-menu-panel"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="flex items-center gap-3 rounded-full bg-gray-900/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 pl-5 pr-2 py-2 text-white transition-colors duration-200 hover:bg-gray-900/95"
      >
        <span className="text-sm font-medium">{activeLabel}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nav-menu-panel"
            role="navigation"
            aria-label="Navegación principal"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">{activeLabel}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {navItems.map((item) => {
                const isActive = item.label === activeLabel;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
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
    </div>
  );
}