"use client";

import { useState, useEffect } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import MobileMenuButton, { MobileMenuProvider } from "./MobileMenuButton";
import MobileDrawer from "./MobileDrawer";

const leftItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
];

const rightItems = [
  { href: "/acabados-y-tapices", label: "Acabados y tapices" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <MobileMenuProvider>
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/10 transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
              <NavLinks items={leftItems} />
              <NavBrand />
              <NavLinks items={rightItems} />
              <MobileMenuButton />
            </div>
            <MobileDrawer />
          </div>
        </header>
      </MobileMenuProvider>
    );
  }

  return (
    <MobileMenuProvider>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto mt-4 rounded-2xl transition-all duration-300 ease-out ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl shadow-black/10 ring-1 ring-inset ring-gray-200/50"
              : "bg-white/80 backdrop-blur-md border border-white/20 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/10"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <NavLinks items={leftItems} />
            <NavBrand />
            <NavLinks items={rightItems} />
            <MobileMenuButton />
          </div>
          <MobileDrawer />
        </div>
      </header>
    </MobileMenuProvider>
  );
}