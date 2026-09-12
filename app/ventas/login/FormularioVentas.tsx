"use client";

import { useActionState, useState } from "react";
import { canjearInvitacion, iniciarSesionVentas, type EstadoCanje } from "./actions";

const campo =
  "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function FormularioVentas() {
  // Primera visita → canjear invitación. Las siguientes → entrar normal.
  const [modo, setModo] = useState<"canjear" | "entrar">("canjear");

  const [estadoCanje, accionCanje, canjeando] = useActionState<EstadoCanje, FormData>(
    canjearInvitacion,
    undefined
  );
  const [estadoLogin, accionLogin, entrando] = useActionState<EstadoCanje, FormData>(
    iniciarSesionVentas,
    undefined
  );

  const esCanje = modo === "canjear";
  const estado = esCanje ? estadoCanje : estadoLogin;
  const enviando = esCanje ? canjeando : entrando;

  return (
    <div>
      <div className="mb-6 flex rounded-xl bg-gray-100 p-1 text-sm" role="tablist">
        {(["canjear", "entrar"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={modo === m}
            onClick={() => setModo(m)}
            className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
              modo === m ? "bg-white font-medium shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {m === "canjear" ? "Tengo un código" : "Ya tengo cuenta"}
          </button>
        ))}
      </div>

      <form action={esCanje ? accionCanje : accionLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
          <input id="email" name="email" type="email" autoComplete="username" required className={campo} />
        </div>

        {esCanje && (
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
              Código de invitación
            </label>
            <input
              id="codigo"
              name="codigo"
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              maxLength={8}
              required
              className={`${campo} font-mono uppercase tracking-[0.25em]`}
            />
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {esCanje ? "Elige tu contraseña" : "Contraseña"}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={esCanje ? "new-password" : "current-password"}
            minLength={esCanje ? 8 : undefined}
            required
            className={campo}
          />
          {esCanje && <p className="mt-1.5 text-xs text-gray-500">Mínimo 8 caracteres.</p>}
        </div>

        {esCanje && (
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
              Repite la contraseña
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className={campo}
            />
          </div>
        )}

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
          {enviando ? "Un momento…" : esCanje ? "Activar mi acceso" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
