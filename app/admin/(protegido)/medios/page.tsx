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
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Medios</h1>
        <p className="mt-1 text-gray-600">
          Aquí se guardan las imágenes, pero{" "}
          <strong className="font-medium text-gray-900">subirlas no las publica</strong> en
          ninguna parte: se muestran cuando las asignas a un producto, un servicio
          o una promoción.
        </p>

        {/* Los tres pasos escritos. Esta pantalla solo guarda archivos y
            devuelve su enlace; el vínculo con el catálogo lo hace la persona
            pegándolo. Sin esto no hay forma de deducirlo desde la interfaz. */}
        <ol className="mt-4 space-y-1.5 text-sm text-gray-600">
          {[
            "Sube la imagen aquí abajo.",
            "Copia su enlace con el botón «Copiar URL».",
            "Pégalo en el producto, servicio o promoción donde quieras que aparezca.",
          ].map((paso, i) => (
            <li key={paso} className="flex gap-2.5">
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary-dark">
                {i + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
      </div>

      <GaleriaMedios medios={(data ?? []) as Medio[]} />
    </main>
  );
}
