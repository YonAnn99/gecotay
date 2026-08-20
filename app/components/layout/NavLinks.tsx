"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/acabados-y-tapices", label: "Acabados y tapices" },
  { href: "/contacto", label: "Contacto" },
];

export default function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}