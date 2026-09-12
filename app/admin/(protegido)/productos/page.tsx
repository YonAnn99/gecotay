import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import ListaProductos from "./ListaProductos";
import type { Producto } from "./EditorProducto";

export const metadata: Metadata = { title: "Productos" };

export default async function ProductosAdminPage() {
  const supabase = await createSessionClient();

  // Una sola consulta con la galería embebida, en vez de N+1: PostgREST
  // resuelve la relación por la FK `linea_imagenes.linea_id`.
  const { data } = await supabase
    .from("lineas_producto")
    .select("*, linea_imagenes(id, url, alt, orden)")
    .order("orden", { ascending: true })
    .order("nombre", { ascending: true });

  const productos: Producto[] = (data ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    nombre: p.nombre,
    descripcion: p.descripcion,
    imagen: p.imagen,
    precio_desde: p.precio_desde,
    es_nuevo: p.es_nuevo,
    publicado: p.publicado,
    orden: p.orden,
    galeria: (p.linea_imagenes ?? [])
      .slice()
      .sort((a, b) => a.orden - b.orden)
      .map((i) => ({ id: i.id, url: i.url, alt: i.alt })),
  }));

  const publicados = productos.filter((p) => p.publicado).length;

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Productos</h1>
        <p className="mt-1 text-gray-600">
          {productos.length} líneas · {publicados} visibles en el sitio.
        </p>
      </div>

      <ListaProductos productos={productos} />
    </main>
  );
}
