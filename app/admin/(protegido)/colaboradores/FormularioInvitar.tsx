"use client";

import { useActionState } from "react";
import { invitarColaborador, type ResultadoInvitacion } from "@/app/actions/invitaciones";

export default function FormularioInvitar() {
  const [estado, accion, enviando] = useActionState<ResultadoInvitacion | undefined, FormData>(
    invitarColaborador,
    undefined
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Invitar a un colaborador</h2>
      <p className="mt-1 text-sm text-gray-600">
        Recibirá un código para activar su acceso al módulo de ventas.
      </p>

      <form action={accion} className="mt-5 flex flex-wrap gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="correo@ejemplo.com"
          aria-label="Correo del colaborador"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={enviando}
          className="rounded-xl bg-ink px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {enviando ? "Enviando…" : "Invitar"}
        </button>
      </form>

      {estado && !estado.ok && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {estado.error}
        </p>
      )}

      {estado?.ok && (
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm font-medium">
            {estado.correoEnviado
              ? "Invitación enviada por correo."
              : "Invitación creada, pero el correo no salió."}
          </p>
          {!estado.correoEnviado && (
            <p className="mt-1 text-sm text-gray-600">
              {estado.motivoCorreo === "sin-proveedor"
                ? "Falta configurar el proveedor de correo. Pásale el código tú mismo:"
                : "Hubo un problema al enviarlo. Pásale el código tú mismo:"}
            </p>
          )}
          <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.25em]">
            {estado.codigo}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            El código sirve una sola vez y caduca en 7 días. También aparece
            abajo mientras la invitación siga pendiente.
          </p>
        </div>
      )}
    </div>
  );
}
