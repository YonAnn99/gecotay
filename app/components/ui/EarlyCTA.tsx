"use client";

import Link from "next/link";

interface EarlyCTAProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export default function EarlyCTA({ label, href, variant = "primary" }: EarlyCTAProps) {
  const base = "inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-colors duration-200";
  const primary = "text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/25";
  const secondary = "text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200";

  return (
    <Link
      href={href}
      className={`${base} ${variant === "primary" ? primary : secondary}`}
    >
      {label}
    </Link>
  );
}