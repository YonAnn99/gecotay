import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import GaleriaMedios, { type Medio } from "./GaleriaMedios";

export const metadata: Metadata = { title: "Medios" };

export default async function MediosPage() {
  const supabase = await createSessionClient();
  const { data } = await supabase
    .from("media")
    .select("id, path, url, mime, bytes, alt, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Medios</h1>
        <p className="mt-1 text-gray-600">
          Imágenes subidas desde el panel. Copia su URL y pégala en un producto,
          servicio o promoción.
        </p>
      </div>

      <GaleriaMedios medios={(data ?? []) as Medio[]} />
    </main>
  );
}
