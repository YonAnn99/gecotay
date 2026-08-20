"use client";

import Link from "next/link";
import { useMobileMenu } from "./MobileMenuButton";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/acabados-tapices", label: "Acabados y tapices" },
  { href: "/cotizar", label: "Cotizar" },
  { href: "/contacto", label: "Contacto" },
];

export default function MobileDrawer() {
  const { isOpen, toggle } = useMobileMenu();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={toggle}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        className="fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out translate-x-0"
        role="navigation"
        aria-label="Menú móvil"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={toggle}
                    className="block text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}