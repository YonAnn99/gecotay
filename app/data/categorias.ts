import type { Database } from "../lib/supabase/types";

export type CategoriaProducto = Database["public"]["Enums"]["categoria_producto"];

/**
 * Categorías del catálogo, en el orden en que salen en el filtro de
 * /productos y en el selector del panel.
 *
 * Los `id` son los valores del enum `categoria_producto` en la base: añadir
 * una aquí exige una migración con `alter type ... add value`.
 */
export const CATEGORIAS_PRODUCTO: { id: CategoriaProducto; label: string }[] = [
  { id: "silleria", label: "Sillería" },
  { id: "escritorios", label: "Escritorios" },
  { id: "espacios", label: "Sistemas y espacios de trabajo" },
  { id: "almacenamiento", label: "Almacenamiento y accesorios" },
  { id: "hogar", label: "Hogar y otros" },
];

export function esCategoriaProducto(valor: unknown): valor is CategoriaProducto {
  return CATEGORIAS_PRODUCTO.some((c) => c.id === valor);
}
