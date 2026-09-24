"use server";

import { revalidatePath } from "next/cache";
import { requerirPerfil } from "@/app/lib/auth";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { esCategoriaProducto } from "@/app/data/categorias";

// Rutas INTERNAS del panel. El subdominio las sirve sin el prefijo, pero
// revalidatePath opera sobre el árbol de rutas real.
const RUTA_PRODUCTOS = "/admin/productos";
const RUTA_SERVICIOS = "/admin/servicios";
const RUTA_PROMOCIONES = "/admin/promociones";

/**
 * Invalida el panel Y el sitio público.
 *
 * Las páginas públicas leen del CMS pero siguen siendo estáticas (ISR con
 * `revalidate = 3600` como red de seguridad); sin esto, un cambio del admin
 * tardaría hasta una hora en verse. El patrón con segmento dinámico exige el
 * segundo argumento `"page"` — ver
 * node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidatePath.md
 *
 * El layout raíz también se invalida porque el buscador del navbar consume el
 * catálogo y vive ahí: sin ello, seguiría ofreciendo una línea ya borrada.
 */
function revalidarSitioPublico() {
  revalidatePath("/[locale]", "layout");
  revalidatePath("/[locale]/productos", "page");
  revalidatePath("/[locale]/productos/[linea]", "page");
  revalidatePath("/[locale]/servicios", "page");
  revalidatePath("/sitemap.xml");
}

const LIMITES = {
  nombre: 160,
  titulo: 200,
  descripcion: 4000,
  slug: 120,
  imagen: 500,
  valor: 80,
} as const;

export type Resultado = { ok: true } | { ok: false; error: string };

function texto(valor: FormDataEntryValue | null, max: number): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.replace(/[ \t]+/g, " ").trim().slice(0, max);
  return limpio || null;
}

/** Normaliza a slug: minúsculas, sin acentos, separado por guiones. */
function aSlug(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITES.slug);
}

function entero(valor: FormDataEntryValue | null): number | null {
  if (typeof valor !== "string" || !valor.trim()) return null;
  const n = Number.parseInt(valor.replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

// ─── Líneas de producto ─────────────────────────────────────────────────────

export async function guardarProducto(formData: FormData): Promise<Resultado> {
  await requerirPerfil(["admin"]);

  const id = texto(formData.get("id"), 40);
  const nombre = texto(formData.get("nombre"), LIMITES.nombre);
  const descripcion = texto(formData.get("descripcion"), LIMITES.descripcion);
  if (!nombre || !descripcion) {
    return { ok: false, error: "El nombre y la descripción son obligatorios." };
  }

  const categoria = formData.get("categoria");
  if (!esCategoriaProducto(categoria)) {
    return { ok: false, error: "Elige la categoría en la que aparece el producto." };
  }

  // El slug solo se deriva al crear. Cambiarlo después rompería las URLs ya
  // publicadas y cualquier enlace que apunte a ellas.
  const slugPedido = texto(formData.get("slug"), LIMITES.slug);
  const fila = {
    nombre,
    descripcion,
    imagen: texto(formData.get("imagen"), LIMITES.imagen),
    precio_desde: entero(formData.get("precio_desde")),
    es_nuevo: formData.get("es_nuevo") === "on",
    publicado: formData.get("publicado") === "on",
    orden: entero(formData.get("orden")) ?? 0,
    categoria,
  };

  const supabase = await createSessionClient();

  if (id) {
    const { error } = await supabase.from("lineas_producto").update(fila).eq("id", id);
    if (error) {
      console.error("[admin/productos] update:", error.message);
      return { ok: false, error: "No se pudo guardar." };
    }
  } else {
    const slug = aSlug(slugPedido || nombre);
    if (!slug) return { ok: false, error: "No se pudo generar un identificador válido." };

    const { error } = await supabase.from("lineas_producto").insert({ ...fila, slug });
    if (error) {
      console.error("[admin/productos] insert:", error.message);
      return {
        ok: false,
        error: error.code === "23505" ? "Ya existe un producto con ese identificador." : "No se pudo crear.",
      };
    }
  }

  revalidatePath(RUTA_PRODUCTOS);
  revalidarSitioPublico();
  return { ok: true };
}

export async function alternarPublicadoProducto(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  const publicado = formData.get("publicado") === "true";
  if (!id) return;

  const supabase = await createSessionClient();
  await supabase.from("lineas_producto").update({ publicado }).eq("id", id);
  revalidatePath(RUTA_PRODUCTOS);
  revalidarSitioPublico();
}

export async function borrarProducto(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // `linea_imagenes` y `promocion_lineas` tienen ON DELETE CASCADE, así que la
  // galería y las asociaciones a promociones se van con el producto.
  const supabase = await createSessionClient();
  await supabase.from("lineas_producto").delete().eq("id", id);
  revalidatePath(RUTA_PRODUCTOS);
  revalidarSitioPublico();
}

// ─── Galería ────────────────────────────────────────────────────────────────

export async function agregarImagenProducto(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const lineaId = String(formData.get("linea_id") ?? "");
  const url = texto(formData.get("url"), LIMITES.imagen);
  if (!lineaId || !url) return;

  const supabase = await createSessionClient();
  const { data: ultima } = await supabase
    .from("linea_imagenes")
    .select("orden")
    .eq("linea_id", lineaId)
    .order("orden", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("linea_imagenes").insert({
    linea_id: lineaId,
    url,
    alt: texto(formData.get("alt"), 300),
    orden: (ultima?.orden ?? -1) + 1,
  });
  revalidatePath(RUTA_PRODUCTOS);
  revalidarSitioPublico();
}

export async function borrarImagenProducto(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createSessionClient();
  await supabase.from("linea_imagenes").delete().eq("id", id);
  revalidatePath(RUTA_PRODUCTOS);
  revalidarSitioPublico();
}

// ─── Servicios ──────────────────────────────────────────────────────────────

export async function guardarServicio(formData: FormData): Promise<Resultado> {
  await requerirPerfil(["admin"]);

  const id = texto(formData.get("id"), 40);
  const titulo = texto(formData.get("titulo"), LIMITES.titulo);
  const descripcion = texto(formData.get("descripcion"), LIMITES.descripcion);
  if (!titulo || !descripcion) {
    return { ok: false, error: "El título y la descripción son obligatorios." };
  }

  const fila = {
    titulo,
    descripcion,
    imagen: texto(formData.get("imagen"), LIMITES.imagen),
    publicado: formData.get("publicado") === "on",
    orden: entero(formData.get("orden")) ?? 0,
  };

  const supabase = await createSessionClient();

  if (id) {
    const { error } = await supabase.from("servicios").update(fila).eq("id", id);
    if (error) {
      console.error("[admin/servicios] update:", error.message);
      return { ok: false, error: "No se pudo guardar." };
    }
  } else {
    const slug = aSlug(texto(formData.get("slug"), LIMITES.slug) || titulo);
    if (!slug) return { ok: false, error: "No se pudo generar un identificador válido." };

    const { error } = await supabase.from("servicios").insert({ ...fila, slug });
    if (error) {
      console.error("[admin/servicios] insert:", error.message);
      return {
        ok: false,
        error: error.code === "23505" ? "Ya existe un servicio con ese identificador." : "No se pudo crear.",
      };
    }
  }

  revalidatePath(RUTA_SERVICIOS);
  revalidarSitioPublico();
  return { ok: true };
}

export async function borrarServicio(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createSessionClient();
  await supabase.from("servicios").delete().eq("id", id);
  revalidatePath(RUTA_SERVICIOS);
  revalidarSitioPublico();
}

// ─── Promociones ────────────────────────────────────────────────────────────

const TIPOS = ["descuento", "paquete", "liquidacion"] as const;

/**
 * Convierte un `datetime-local` a ISO.
 *
 * El navegador manda hora local sin zona; `new Date()` la interpreta en la
 * zona del servidor, que es lo que queremos: el admin piensa en su hora.
 */
function fechaISO(valor: FormDataEntryValue | null): string | null {
  if (typeof valor !== "string" || !valor.trim()) return null;
  const d = new Date(valor);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export async function guardarPromocion(formData: FormData): Promise<Resultado> {
  await requerirPerfil(["admin"]);

  const id = texto(formData.get("id"), 40);
  const titulo = texto(formData.get("titulo"), LIMITES.titulo);
  if (!titulo) return { ok: false, error: "El título es obligatorio." };

  const tipoBruto = String(formData.get("tipo") ?? "");
  const tipo = (TIPOS as readonly string[]).includes(tipoBruto)
    ? (tipoBruto as (typeof TIPOS)[number])
    : "descuento";

  const inicia = fechaISO(formData.get("inicia_en"));
  const termina = fechaISO(formData.get("termina_en"));

  // Se valida aquí además de en la base: así el admin ve un mensaje claro en
  // vez del error de la restricción `vigencia_coherente`.
  if (inicia && termina && new Date(termina) <= new Date(inicia)) {
    return { ok: false, error: "La fecha de fin debe ser posterior a la de inicio." };
  }

  const fila = {
    titulo,
    descripcion: texto(formData.get("descripcion"), LIMITES.descripcion),
    imagen: texto(formData.get("imagen"), LIMITES.imagen),
    tipo,
    valor: texto(formData.get("valor"), LIMITES.valor),
    activa: formData.get("activa") === "on",
    ...(inicia ? { inicia_en: inicia } : {}),
    termina_en: termina,
  };

  const supabase = await createSessionClient();
  const { error } = id
    ? await supabase.from("promociones").update(fila).eq("id", id)
    : await supabase.from("promociones").insert(fila);

  if (error) {
    console.error("[admin/promociones]:", error.message);
    return { ok: false, error: "No se pudo guardar la promoción." };
  }

  revalidatePath(RUTA_PROMOCIONES);
  revalidarSitioPublico();
  return { ok: true };
}

export async function borrarPromocion(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createSessionClient();
  await supabase.from("promociones").delete().eq("id", id);
  revalidatePath(RUTA_PROMOCIONES);
  revalidarSitioPublico();
}
