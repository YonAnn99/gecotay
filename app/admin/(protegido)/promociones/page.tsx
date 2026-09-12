import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import ListaPromociones, { type Promocion } from "./ListaPromociones";

export const metadata: Metadata = { title: "Promociones" };

export default async function PromocionesAdminPage() {
  const supabase = await createSessionClient();

  // La política de lectura deja ver al admin también las que no están
  // vigentes, que es justo lo que hace falta para poder programarlas.
  const { data } = await supabase
    .from("promociones")
    .select("id, titulo, descripcion, imagen, tipo, valor, inicia_en, termina_en, activa")
    .order("inicia_en", { ascending: false });

  const promociones = (data ?? []) as Promocion[];

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Promociones</h1>
        <p className="mt-1 text-gray-600">
          El módulo de ventas solo muestra las vigentes: activas y dentro de su rango de fechas.
        </p>
      </div>

      <ListaPromociones promociones={promociones} />
    </main>
  );
}
