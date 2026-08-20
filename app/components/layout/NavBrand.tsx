"use client";

import Image from "next/image";
import Link from "next/link";

// Left floating "island" — brand mark only, mirroring the logo pill from
// the reference design.
export default function NavBrand() {
  return (
    <Link
      href="/"
      aria-label="GECOTAY - Inicio"
      className="fixed top-4 left-4 z-50 flex items-center rounded-2xl bg-ink/75 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/30 px-6 py-4 transition-colors duration-200 hover:bg-ink/90"
    >
      <Image
        src="/images/logo/logo-horizontal-white.webp"
        alt=""
        width={200}
        height={58}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
