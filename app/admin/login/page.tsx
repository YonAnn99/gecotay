import type { Metadata } from "next";
import Image from "next/image";
import FormularioLogin from "./FormularioLogin";

export const metadata: Metadata = { title: "Entrar" };

// Vive FUERA del grupo (protegido): si estuviera dentro, el guard redirigiría
// aquí una página que a su vez exige sesión, y el navegador entraría en bucle.
//
// Dos mitades: la marca a la izquierda sobre el degradado del splash, el
// formulario a la derecha sobre la superficie clara del panel. Bajo `lg` la
// mitad oscura se oculta —no cabe sin comerse el formulario— y el eyebrow de
// marca pasa a la columna del formulario para no perder la identidad.
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;

  return (
    <div className="flex min-h-dvh">
      <aside className="marca-fondo relative hidden w-[38%] max-w-[560px] shrink-0 flex-col justify-between overflow-hidden p-14 lg:flex">
        {/* El halo verde va en un hijo aparte y no en el fondo del panel:
            así se centra sobre el texto sin depender del tamaño del aside. */}
        <div className="marca-halo pointer-events-none absolute left-1/2 top-[42%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <Image
          src="/images/logo/logo-vertical-white.webp"
          alt="Grupo Gecotay"
          width={92}
          height={92}
          priority
          className="relative w-[92px] shrink-0"
        />

        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Panel interno
          </p>
          <p className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f5f4] text-pretty">
            Aquí se gobierna
            <br />
            lo que ve el cliente.
          </p>
          <p className="mt-4 max-w-[360px] text-[15px] leading-relaxed text-[#f5f5f4]/60 text-pretty">
            Catálogo, servicios, promociones y las solicitudes que llegan por el
            sitio.
          </p>
        </div>

        <p className="relative text-[13px] text-[#f5f5f4]/40">
          Grupo Gecotay S.A.S. de C.V.
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary lg:hidden">
            Grupo Gecotay
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight lg:mt-0">
            Entrar al panel
          </h1>
          <p className="mb-8 mt-2 text-[15px] text-gray-600">
            Con tu correo y contraseña de administrador.
          </p>

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
        </div>
      </main>
    </div>
  );
}
