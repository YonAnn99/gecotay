import Link from "next/link";

/**
 * 404 del panel de administración.
 *
 * Necesita existir por separado porque `app/admin/layout.tsx` es un root
 * layout propio: sin este archivo, un 404 dentro de /admin caería en el del
 * sitio público, que trae el chrome y el fondo WebGL que estas superficies no
 * heredan.
 *
 * Enlaza sin prefijo a `/` porque bajo el subdominio esa es la raíz del panel;
 * en modo ruta directa el proxy no reescribe, así que se añade el fallback.
 */
export default function AdminNotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Grupo Gecotay · Admin
        </p>
        <p aria-hidden="true" className="mt-6 text-6xl font-bold text-gray-200">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">Esta sección no existe</h1>
        <p className="mt-3 text-gray-600">
          El enlace puede estar desactualizado, o no tienes permiso para verla.
        </p>
        <Link
          href="/admin"
          className="mt-8 inline-block rounded-xl bg-ink px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Ir al panel
        </Link>
      </div>
    </main>
  );
}
