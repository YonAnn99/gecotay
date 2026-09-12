import type { Metadata } from "next";
import FormularioVentas from "./FormularioVentas";

export const metadata: Metadata = { title: "Entrar" };

export default async function VentasLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        Grupo Gecotay
      </p>
      <h1 className="mt-2 mb-6 text-2xl font-semibold">Ventas</h1>

      {motivo === "sin-permiso" && (
        <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tu cuenta no tiene permiso para esta sección.
        </p>
      )}

      {motivo === "sin-acceso" && (
        <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tu cuenta ya no tiene acceso. Pide a un administrador que te vuelva a
          invitar.
        </p>
      )}

      <FormularioVentas />
    </main>
  );
}
