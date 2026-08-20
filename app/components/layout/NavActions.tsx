"use client";

import Link from "next/link";

export default function NavActions() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/contacto"
        className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
      >
        Contacto
      </Link>
      <Link
        href="/cotizar"
        className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors duration-200"
      >
        Cotizar
      </Link>
    </div>
  );
}