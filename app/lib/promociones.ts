/**
 * Ayudas de presentación para las promociones.
 *
 * Vive aparte porque lo usan dos pantallas del módulo de ventas: el listado
 * de promociones y el aviso que abre el catálogo. Tenerlo en una sola parte
 * evita que una diga «Quedan 2 días» y la otra «2 días restantes».
 */

/**
 * Cuánto le queda a una promoción, en texto.
 *
 * Devuelve `null` cuando no hay fecha de fin (promoción abierta) o cuando ya
 * pasó: en ninguno de los dos casos hay una cuenta atrás que enseñar.
 */
export function diasRestantes(iso: string | null): string | null {
  if (!iso) return null;
  const dias = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (dias <= 0) return null;
  if (dias === 1) return "Último día";
  return `Quedan ${dias} días`;
}
