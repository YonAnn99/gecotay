/**
 * Clases compartidas por los formularios del panel.
 *
 * Son cadenas de Tailwind que se repetían literalmente en cada pantalla; en un
 * panel interno con muchos formularios parecidos, centralizarlas evita que se
 * vayan desincronizando campo a campo.
 */
export const CAMPO =
  "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export const ETIQUETA = "block text-sm font-medium text-gray-700";

export const BOTON_PRIMARIO =
  "rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60";

export const BOTON_SECUNDARIO =
  "rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50";

export const TARJETA = "rounded-2xl border border-gray-200 bg-white";

export const FECHA_CORTA: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};
