"use client";

import Link from "next/link";

interface NavLinksProps {
  items: { href: string; label: string }[];
}

export default function NavLinks({ items }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
      <ul className="flex items-center gap-6">
        {items.map((item) => (
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