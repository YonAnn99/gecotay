"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      role="status"
      aria-label="Cargando"
    >
      <div className="text-center">
        <Image
          src="/images/logo/logo-horizontal-color.webp"
          alt="Grupo Gecotay"
          width={280}
          height={81}
          priority
          className="mx-auto mb-6"
        />
        <p className="text-2xl font-medium text-gray-900 tracking-wide">
          BIENVENIDO
        </p>
      </div>
    </div>
  );
}