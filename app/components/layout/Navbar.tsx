"use client";

import { useState, useEffect } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import MobileMenuButton, { MobileMenuProvider } from "./MobileMenuButton";
import MobileDrawer from "./MobileDrawer";

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
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <NavBrand />
              <NavLinks />
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavBrand />
            <NavLinks />
            <MobileMenuButton />
          </div>
          <MobileDrawer />
        </div>
      </header>
    </MobileMenuProvider>
  );
}