"use client";

import { useActionState } from "react";
import { iniciarSesionVentas, type EstadoLogin } from "./actions";

const campo =
  "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

/**
 * Un solo formulario: correo y código.
 *
 * Antes había dos pestañas —canjear invitación / entrar con cuenta— y cuatro
 * campos, porque el código servía una vez y había que elegir contraseña. Ahora
 * el código es la contraseña permanente, así que sobra todo lo demás: quien usa
 * esto lo abre en el móvil frente a un cliente y necesita entrar de un tirón.
 */
export default function FormularioVentas() {
  const [estado, accion, entrando] = useActionState<EstadoLogin, FormData>(
    iniciarSesionVentas,
    undefined
  );

  return (
    // Columna que ocupa el alto disponible: así la nota del final se apoya en
    // el borde inferior de la pantalla en vez de quedar pegada al botón.
    <form action={accion} className="flex flex-1 flex-col gap-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          className={campo}
        />
      </div>

      <div>
        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
          Tu código
        </label>
        <input
          id="codigo"
          name="codigo"
          type="text"
          // El código solo tiene mayúsculas y dígitos: se le pide al teclado
          // móvil que entre en mayúsculas y no autocorrija.
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="current-password"
          maxLength={10}
          required
          className={`${campo} font-mono uppercase tracking-[0.2em]`}
        />
        <p className="mt-1.5 text-xs text-gray-500">
          El que recibiste por correo. Es tu contraseña y no caduca.
        </p>
      </div>

      {estado?.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {estado.error}
        </p>
      )}

      <button
        type="submit"
        disabled={entrando}
        className="w-full rounded-xl bg-ink px-4 py-3.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {entrando ? "Entrando…" : "Entrar"}
      </button>

      <p className="mt-auto pt-6 text-center text-sm leading-relaxed text-gray-500">
        ¿No lo tienes o lo perdiste?
        <br />
        Pídeselo a tu administrador.
      </p>
    </form>
  );
}
