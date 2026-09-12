import type { Metadata } from "next";
import FormularioLogin from "./FormularioLogin";

export const metadata: Metadata = { title: "Entrar" };

// Vive FUERA del grupo (protegido): si estuviera dentro, el guard redirigiría
// aquí una página que a su vez exige sesión, y el navegador entraría en bucle.
export default async function AdminLoginPage({
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
      <h1 className="mt-2 mb-8 text-2xl font-semibold">Administración</h1>

      {motivo === "sin-permiso" && (
        <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tu cuenta no tiene permiso para el panel de administración. Entra con una cuenta de administrador.
        </p>
      )}

      {motivo === "sin-acceso" && (
        <p role="alert" className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tu cuenta existe pero no tiene acceso al panel. Pide a un
          administrador que te lo habilite.
        </p>
      )}

      <FormularioLogin />
    </main>
  );
}
