import type { Metadata } from "next";
import Image from "next/image";
import FormularioVentas from "./FormularioVentas";

export const metadata: Metadata = { title: "Entrar" };

// Pensado para el móvil: el vendedor entra de pie, frente al cliente. La
// franja de marca ocupa la parte de arriba —el mismo degradado del splash y
// del login de admin— y el formulario cae debajo sobre la superficie clara.
// En pantallas grandes todo se centra en una columna estrecha en vez de
// estirarse: es una pantalla de teléfono aunque se abra en un portátil.
export default async function VentasLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <div className="marca-fondo relative overflow-hidden px-7 pb-9 pt-16 sm:pt-20">
        <div className="marca-halo pointer-events-none absolute left-1/2 top-[30%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <Image
          src="/images/logo/logo-vertical-white.webp"
          alt="Grupo Ecotay"
          width={62}
          height={62}
          priority
          className="relative w-[62px]"
        />
        <p className="relative mt-5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Ventas
        </p>
        <p className="relative mt-2 text-[22px] font-semibold tracking-tight text-[#f5f5f4]">
          El catálogo, a la mano
        </p>
      </div>

      <main className="flex flex-1 flex-col px-7 pb-7 pt-8">
        {motivo === "sin-permiso" && (
          <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Tu cuenta no tiene permiso para esta sección.
          </p>
        )}

        {motivo === "sin-acceso" && (
          <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Tu cuenta ya no tiene acceso. Pide a un administrador que te lo
            reactive.
          </p>
        )}

        <FormularioVentas />
      </main>
    </div>
  );
}
