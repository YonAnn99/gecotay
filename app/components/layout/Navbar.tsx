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
  { href: "/acabados-tapices", label: "Acabados y tapices" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBase = "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 sm:px-6 lg:px-8";
  const islandBase = "mx-auto mt-4 rounded-2xl transition-all duration-300 ease-out";
  const initialStyle = "bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 ring-1 ring-inset ring-white/10";
  const scrolledStyle = "bg-white/95 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/5 ring-1 ring-inset ring-primary/10";

  return (
    <MobileMenuProvider>
      <header className={headerBase}>
        <div className={`${islandBase} ${scrolled ? scrolledStyle : initialStyle}`}>
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