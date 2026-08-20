"use client";

import { useState, createContext, useContext, ReactNode } from "react";

const MobileMenuContext = createContext<{ isOpen: boolean; toggle: () => void } | null>(null);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <MobileMenuContext.Provider value={{ isOpen, toggle }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) throw new Error("useMobileMenu must be used within MobileMenuProvider");
  return context;
}

export default function MobileMenuButton() {
  const { isOpen, toggle } = useMobileMenu();

  return (
    <button
      onClick={toggle}
      className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
}