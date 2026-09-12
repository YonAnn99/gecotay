import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import ListaServicios, { type Servicio } from "./ListaServicios";

export const metadata: Metadata = { title: "Servicios" };

export default async function ServiciosAdminPage() {
  const supabase = await createSessionClient();
  const { data } = await supabase
    .from("servicios")
    .select("id, slug, titulo, descripcion, imagen, publicado, orden")
    .order("orden", { ascending: true })
    .order("titulo", { ascending: true });

  const servicios = (data ?? []) as Servicio[];
  const publicados = servicios.filter((s) => s.publicado).length;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Servicios</h1>
        <p className="mt-1 text-gray-600">
          {servicios.length} servicios · {publicados} visibles en el sitio.
        </p>
      </div>

      <ListaServicios servicios={servicios} />
    </main>
  );
}
