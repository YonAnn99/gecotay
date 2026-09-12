import Link from "next/link";

/**
 * 404 del módulo de ventas.
 *
 * Root layout propio, así que necesita la suya (ver app/admin/not-found.tsx).
 * Aquí es especialmente visible: un producto despublicado desde el panel deja
 * de existir para RLS y su ficha cae en este 404 — el texto lo dice en vez de
 * dejar al vendedor pensando que la herramienta falló.
 */
export default function VentasNotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Grupo Gecotay · Ventas
        </p>
        <p aria-hidden="true" className="mt-6 text-6xl font-bold text-gray-200">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">No encontramos eso</h1>
        <p className="mt-3 text-gray-600">
          El producto pudo haberse despublicado desde el panel, o la dirección
          tiene una errata.
        </p>
        <Link
          href="/ventas"
          className="mt-8 inline-block rounded-xl bg-ink px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}
