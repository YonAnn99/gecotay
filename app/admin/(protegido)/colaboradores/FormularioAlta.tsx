"use client";

import { useActionState } from "react";
import { altaColaborador, type ResultadoAcceso } from "@/app/actions/colaboradores";
import { CAMPO, BOTON_PRIMARIO, TARJETA } from "../ui";

export default function FormularioAlta() {
  const [estado, accion, enviando] = useActionState<ResultadoAcceso | undefined, FormData>(
    altaColaborador,
    undefined
  );

  return (
    <div className={`${TARJETA} p-6`}>
      <h2 className="text-lg font-semibold">Dar acceso a un colaborador</h2>
      <p className="mt-1 text-sm text-gray-600">
        Se le crea la cuenta al momento y recibe su código por correo. Ese código
        es su contraseña: no caduca y tú puedes consultarlo aquí cuando lo olvide.
      </p>

      <form action={accion} className="mt-5 flex flex-wrap gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="correo@ejemplo.com"
          aria-label="Correo del colaborador"
          className={`${CAMPO} mt-0 min-w-0 flex-1`}
        />
        <button type="submit" disabled={enviando} className={BOTON_PRIMARIO}>
          {enviando ? "Creando…" : "Dar acceso"}
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
            Acceso creado para {estado.email}.{" "}
            {estado.correoEnviado
              ? "El código ya va en camino por correo."
              : "El correo no salió, así que pásaselo tú:"}
          </p>
          {!estado.correoEnviado && estado.motivoCorreo === "sin-proveedor" && (
            <p className="mt-1 text-sm text-gray-600">
              Falta configurar el proveedor de correo (RESEND_API_KEY).
            </p>
          )}
          <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.2em]">
            {estado.codigo}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            También queda visible en la lista de abajo.
          </p>
        </div>
      )}
    </div>
  );
}
