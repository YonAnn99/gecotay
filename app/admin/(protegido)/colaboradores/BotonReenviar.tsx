"use client";

import { useActionState } from "react";
import { reenviarAcceso, type ResultadoReenvio } from "@/app/actions/colaboradores";
import { BOTON_SECUNDARIO } from "../ui";
import { explicarMotivoCorreo } from "./motivoCorreo";

export default function BotonReenviar({ id }: { id: string }) {
  const [estado, accion, enviando] = useActionState<ResultadoReenvio | undefined, FormData>(
    reenviarAcceso,
    undefined
  );

  return (
    <form action={accion} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={enviando} className={BOTON_SECUNDARIO}>
        {enviando ? "Enviando…" : "Reenviar correo"}
      </button>
      {estado && (
        <span role="status" className={`text-sm ${estado.enviado ? "text-green-700" : "text-red-700"}`}>
          {estado.enviado ? "Enviado." : explicarMotivoCorreo(estado.motivo)}
        </span>
      )}
    </form>
  );
}
