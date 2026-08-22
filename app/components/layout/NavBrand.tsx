"use client";

import Image from "next/image";
import Link from "next/link";

interface NavBrandProps {
  locale: string;
}

// Left floating "island" — brand mark only, mirroring the logo pill from
// the reference design.
export default function NavBrand({ locale }: NavBrandProps) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="GECOTAY - Inicio"
      className="fixed top-5 left-4 z-50
        flex items-center justify-center
        w-28 max-[379px]:w-24 h-12
        sm:top-10 sm:left-30 sm:w-40 sm:h-16
        rounded-2xl
        bg-ink/75
        backdrop-blur-2xl
        border border-white/10
        shadow-2xl shadow-black/30
        transition-colors duration-200
        hover:bg-ink/90"
    >
      <Image
        src="/images/logo/logo-horizontal-white.webp"
        alt=""
        width={436}
        height={280}
        priority
        className="h-8 w-auto sm:h-10 scale-220"
      />
    </Link>
  );
}
