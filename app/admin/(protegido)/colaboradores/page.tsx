import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { regenerarCodigo, cambiarAccesoColaborador, eliminarColaborador } from "@/app/actions/colaboradores";
import FormularioAlta from "./FormularioAlta";
import { BOTON_SECUNDARIO, TARJETA } from "../ui";

export const metadata: Metadata = { title: "Colaboradores" };

const FORMATO: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function fecha(valor: string | null) {
  return valor ? new Date(valor).toLocaleString("es-MX", FORMATO) : "nunca";
}

export default async function ColaboradoresPage() {
  // Cliente de SESIÓN, no service_role: así esta lectura pasa por las políticas
  // RLS de verdad. Si una política se rompiera, la pantalla se queda vacía en
  // vez de seguir funcionando por privilegio y esconder el fallo.
  const supabase = await createSessionClient();

  const { data: colaboradores } = await supabase
    .from("perfiles")
    .select("id, email, nombre, activo, ultimo_acceso, created_at, codigo_acceso, codigo_actualizado_en")
    .eq("rol", "ventas")
    .order("created_at", { ascending: false });

  const activos = colaboradores?.filter((c) => c.activo).length ?? 0;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Colaboradores</h1>
        <p className="mt-1 text-gray-600">
          Quién puede entrar al módulo de ventas. {colaboradores?.length ?? 0} en total
          {activos !== (colaboradores?.length ?? 0) && `, ${activos} con acceso activo`}.
        </p>
      </div>

      <FormularioAlta />

      <section className={TARJETA}>
        <h2 className="border-b border-gray-200 px-6 py-4 font-semibold">
          Accesos ({colaboradores?.length ?? 0})
        </h2>

        {!colaboradores?.length ? (
          <p className="px-6 py-8 text-sm text-gray-500">
            Todavía no has dado acceso a nadie.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {colaboradores.map((c) => (
              <li key={c.id} className="px-6 py-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-medium">{c.email}</p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          c.activo ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.activo ? "Activo" : "Sin acceso"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Último acceso: {fecha(c.ultimo_acceso)}
                    </p>
                  </div>

                  {/* El código se muestra siempre: es el punto del modelo, que
                      el admin pueda dictárselo a quien lo olvide. */}
                  <code className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-lg tracking-[0.15em]">
                    {c.codigo_acceso ?? "—"}
                  </code>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <form action={cambiarAccesoColaborador}>
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="activo" value={String(!c.activo)} />
                    <button type="submit" className={BOTON_SECUNDARIO}>
                      {c.activo ? "Quitar acceso" : "Reactivar"}
                    </button>
                  </form>

                  <form action={regenerarCodigo}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className={BOTON_SECUNDARIO}>
                      Cambiar código
                    </button>
                  </form>

                  <form action={eliminarColaborador}>
                    <input type="hidden" name="id" value={c.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-sm text-gray-500">
        <strong className="font-medium text-gray-700">Quitar acceso</strong> conserva
        la cuenta y su histórico, y corta la entrada de inmediato aunque el código
        siga siendo correcto. <strong className="font-medium text-gray-700">Cambiar
        código</strong> es para cuando uno se haya filtrado: el anterior deja de
        funcionar al instante.
      </p>
    </main>
  );
}
