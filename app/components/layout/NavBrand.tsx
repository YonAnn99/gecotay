"use client";

import Image from "next/image";
import Link from "next/link";

// Left floating "island" — brand mark only, mirroring the compact logo pill
// from the reference design.
export default function NavBrand() {
  return (
    <Link
      href="/"
      aria-label="GECOTAY - Inicio"
      className="fixed top-4 left-4 z-50 flex items-center rounded-full bg-gray-900/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 px-5 py-3 transition-colors duration-200 hover:bg-gray-900/95"
    >
      <Image
        src="/images/logo/logo-horizontal-white.webp"
        alt=""
        width={140}
        height={40}
        priority
        className="h-6 w-auto sm:h-7"
      />
    </Link>
  );
}