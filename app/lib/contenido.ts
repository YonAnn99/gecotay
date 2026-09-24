import "server-only";

import { createPublicClient } from "./supabase/public";
import { resolverImagen } from "./imagenes";
import type { CategoriaProducto } from "../data/categorias";

/**
 * Lectura del catálogo publicado, para el sitio público y el módulo de ventas.
 *
 * Usa `createPublicClient()` —sin cookies— **a propósito**: en cuanto un
 * componente de servidor toca `cookies()`, Next marca la ruta como dinámica y
 * el sitio perdería sus 60 rutas estáticas. Como actúa con el rol `anon`, las
 * políticas devuelven exactamente lo que debe ver un visitante: lo publicado y
 * las promociones vigentes.
 *
 * Ventas obtiene lo mismo, y es correcto: un colaborador con rol `ventas`
 * tampoco es admin, así que su visibilidad bajo RLS es idéntica a la anónima.
 * El panel de administración NO pasa por aquí — tiene sus propias consultas
 * con el cliente de sesión, que es lo que le deja ver los borradores.
 */

export interface ProductoPublico {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  precioDesde: number | null;
  esNuevo: boolean;
  categoria: CategoriaProducto;
  galeria: string[];
}

export interface ServicioPublico {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string | null;
}

export interface PromocionPublica {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen: string | null;
  tipo: string;
  valor: string | null;
  terminaEn: string | null;
  productos: { slug: string; nombre: string }[];
}

export async function obtenerProductos(): Promise<ProductoPublico[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("lineas_producto")
    .select("id, slug, nombre, descripcion, imagen, precio_desde, es_nuevo, categoria, linea_imagenes(url, orden)")
    .order("orden", { ascending: true })
    .order("nombre", { ascending: true });

  if (error) {
    console.error("[contenido] productos:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    nombre: p.nombre,
    descripcion: p.descripcion,
    imagen: resolverImagen(p.imagen),
    precioDesde: p.precio_desde,
    esNuevo: p.es_nuevo,
    categoria: p.categoria,
    galeria: (p.linea_imagenes ?? [])
      .slice()
      .sort((a, b) => a.orden - b.orden)
      .map((i) => resolverImagen(i.url))
      .filter((u): u is string => u !== null),
  }));
}

export async function obtenerProducto(slug: string): Promise<ProductoPublico | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("lineas_producto")
    .select("id, slug, nombre, descripcion, imagen, precio_desde, es_nuevo, categoria, linea_imagenes(url, orden)")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: resolverImagen(data.imagen),
    precioDesde: data.precio_desde,
    esNuevo: data.es_nuevo,
    categoria: data.categoria,
    galeria: (data.linea_imagenes ?? [])
      .slice()
      .sort((a, b) => a.orden - b.orden)
      .map((i) => resolverImagen(i.url))
      .filter((u): u is string => u !== null),
  };
}

export async function obtenerServicios(): Promise<ServicioPublico[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("servicios")
    .select("id, slug, titulo, descripcion, imagen")
    .order("orden", { ascending: true })
    .order("titulo", { ascending: true });

  if (error) {
    console.error("[contenido] servicios:", error.message);
    return [];
  }

  return (data ?? []).map((s) => ({
    id: s.id,
    slug: s.slug,
    titulo: s.titulo,
    descripcion: s.descripcion,
    imagen: resolverImagen(s.imagen),
  }));
}

/**
 * Promociones vigentes.
 *
 * No hace falta filtrar por fecha aquí: la política
 * `promociones: lectura de las vigentes` ya excluye las inactivas y las fuera
 * de rango para quien no sea admin. Repetir el filtro en el código duplicaría
 * la regla en dos sitios que podrían desincronizarse.
 */
export async function obtenerPromociones(): Promise<PromocionPublica[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("promociones")
    .select("id, titulo, descripcion, imagen, tipo, valor, termina_en, promocion_lineas(lineas_producto(slug, nombre))")
    .order("inicia_en", { ascending: false });

  if (error) {
    console.error("[contenido] promociones:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id,
    titulo: p.titulo,
    descripcion: p.descripcion,
    imagen: resolverImagen(p.imagen),
    tipo: p.tipo,
    valor: p.valor,
    terminaEn: p.termina_en,
    productos: (p.promocion_lineas ?? [])
      .map((pl) => pl.lineas_producto)
      .filter((l): l is { slug: string; nombre: string } => l !== null),
  }));
}
