"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavBrand() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="GECOTAY - Inicio">
      <Image
        src="/images/logo/logo-horizontal-color.webp"
        alt=""
        width={200}
        height={60}
        priority
        className="h-14 w-auto"
      />
    </Link>
  );
}