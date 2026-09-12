import type { Metadata } from "next";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { revocarInvitacion, cambiarAccesoColaborador } from "@/app/actions/invitaciones";
import FormularioInvitar from "./FormularioInvitar";

export const metadata: Metadata = { title: "Colaboradores" };

const FORMATO_FECHA: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function fecha(valor: string | null) {
  return valor ? new Date(valor).toLocaleString("es-MX", FORMATO_FECHA) : "—";
}

const ESTILO_ESTADO: Record<string, string> = {
  pendiente: "bg-amber-50 text-amber-800",
  usada: "bg-green-50 text-green-800",
  expirada: "bg-gray-100 text-gray-600",
  revocada: "bg-gray-100 text-gray-600",
};

export default async function ColaboradoresPage() {
  // Lectura con el cliente de SESIÓN, no con service_role: así estas consultas
  // pasan por las políticas RLS de verdad. Si algún día una política se rompe,
  // esta pantalla se queda vacía en vez de seguir funcionando por privilegio.
  const supabase = await createSessionClient();

  const [{ data: colaboradores }, { data: invitaciones }] = await Promise.all([
    supabase
      .from("perfiles")
      .select("id, email, nombre, activo, ultimo_acceso, created_at")
      .eq("rol", "ventas")
      .order("created_at", { ascending: false }),
    supabase
      .from("invitaciones")
      .select("id, email, codigo, estado, expira_en, usada_en, intentos_fallidos, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Colaboradores</h1>
        <p className="mt-1 text-gray-600">
          Quién tiene acceso al módulo de ventas y qué invitaciones siguen vivas.
        </p>
      </div>

      <FormularioInvitar />

      <section className="rounded-2xl border border-gray-200 bg-white">
        <h2 className="border-b border-gray-200 px-6 py-4 font-semibold">
          Con acceso ({colaboradores?.length ?? 0})
        </h2>

        {!colaboradores?.length ? (
          <p className="px-6 py-8 text-sm text-gray-500">
            Todavía nadie ha activado su acceso.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {colaboradores.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{c.email}</p>
                  <p className="text-sm text-gray-500">
                    Último acceso: {fecha(c.ultimo_acceso)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    c.activo ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.activo ? "Activo" : "Sin acceso"}
                </span>

                <form action={cambiarAccesoColaborador}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="activo" value={String(!c.activo)} />
                  <button
                    type="submit"
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {c.activo ? "Revocar acceso" : "Reactivar"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white">
        <h2 className="border-b border-gray-200 px-6 py-4 font-semibold">Invitaciones</h2>

        {!invitaciones?.length ? (
          <p className="px-6 py-8 text-sm text-gray-500">Sin invitaciones todavía.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {invitaciones.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{inv.email}</p>
                  <p className="text-sm text-gray-500">
                    {inv.estado === "pendiente"
                      ? `Caduca el ${fecha(inv.expira_en)}`
                      : inv.estado === "usada"
                        ? `Activada el ${fecha(inv.usada_en)}`
                        : `Creada el ${fecha(inv.created_at)}`}
                    {inv.intentos_fallidos > 0 && ` · ${inv.intentos_fallidos} intento(s) fallido(s)`}
                  </p>
                </div>

                {/* El código solo existe en la base mientras la invitación está
                    pendiente: al canjearse o revocarse pasa a NULL. */}
                {inv.codigo && (
                  <code className="rounded-lg bg-gray-50 px-3 py-1.5 font-mono tracking-[0.2em]">
                    {inv.codigo}
                  </code>
                )}

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    ESTILO_ESTADO[inv.estado] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {inv.estado}
                </span>

                {inv.estado === "pendiente" && (
                  <form action={revocarInvitacion}>
                    <input type="hidden" name="id" value={inv.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Revocar
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
