"use client";

import { useActionState } from "react";
import { iniciarSesion, type EstadoLogin } from "./actions";
// Las clases del panel valen aquí: el login es la misma superficie. El grupo
// de rutas `(protegido)` no afecta a las importaciones, solo a la URL.
import { CAMPO, ETIQUETA } from "../(protegido)/ui";

export default function FormularioLogin() {
  const [estado, accion, enviando] = useActionState<EstadoLogin, FormData>(
    iniciarSesion,
    undefined
  );

  return (
    <form action={accion} className="space-y-5">
      <div>
        <label htmlFor="email" className={ETIQUETA}>
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={CAMPO}
        />
      </div>

      <div>
        <label htmlFor="password" className={ETIQUETA}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={CAMPO}
        />
      </div>

      {estado?.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {estado.error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-xl bg-ink px-4 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
