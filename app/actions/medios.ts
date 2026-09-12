"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requerirPerfil } from "@/app/lib/auth";
import { createSessionClient } from "@/app/lib/supabase/server-session";
import { urlPublicaStorage } from "@/app/lib/imagenes";

const RUTA_MEDIOS = "/admin/medios";
const BUCKET = "contenido";

// Mismos límites que el bucket declara en la migración. Se comprueban también
// aquí para dar un mensaje claro en vez del error crudo de Storage.
const MAX_BYTES = 10 * 1024 * 1024;
const TIPOS = ["image/webp", "image/jpeg", "image/png", "image/avif", "image/svg+xml"];

export type ResultadoSubida = { ok: true; url: string } | { ok: false; error: string };

/** Nombre seguro: sin rutas, sin espacios, sin acentos, y siempre único. */
function rutaSegura(nombre: string): string {
  const base = nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(-80);

  // El prefijo aleatorio evita que dos archivos con el mismo nombre se pisen,
  // y que alguien pueda adivinar la ruta de lo que suba otra persona.
  const carpeta = new Date().toISOString().slice(0, 7); // YYYY-MM
  return `${carpeta}/${randomUUID().slice(0, 8)}-${base}`;
}

/**
 * Sube una imagen al bucket `contenido`.
 *
 * El archivo viaja dentro de la Server Action (servidor → Storage) en vez de
 * ir del navegador directo a Supabase. Eso mantiene `connect-src` cerrado en
 * la CSP y evita exponer credenciales de subida al cliente.
 */
export async function subirMedio(
  _previo: ResultadoSubida | undefined,
  formData: FormData
): Promise<ResultadoSubida> {
  const perfil = await requerirPerfil(["admin"]);

  const archivo = formData.get("archivo");
  if (!(archivo instanceof File) || archivo.size === 0) {
    return { ok: false, error: "Elige un archivo." };
  }
  if (archivo.size > MAX_BYTES) {
    return { ok: false, error: "El archivo supera los 10 MB." };
  }
  if (!TIPOS.includes(archivo.type)) {
    return { ok: false, error: "Formato no admitido. Usa WebP, JPG, PNG, AVIF o SVG." };
  }

  const path = rutaSegura(archivo.name);
  const supabase = await createSessionClient();

  const { error: errSubida } = await supabase.storage
    .from(BUCKET)
    .upload(path, archivo, { contentType: archivo.type, upsert: false });

  if (errSubida) {
    console.error("[admin/medios] subida:", errSubida.message);
    return { ok: false, error: "No se pudo subir el archivo." };
  }

  const url = urlPublicaStorage(path, BUCKET);

  // El registro en `media` es lo que permite listar y borrar desde el panel
  // sin tener que recorrer el bucket.
  const { error: errRegistro } = await supabase.from("media").insert({
    bucket: BUCKET,
    path,
    url,
    mime: archivo.type,
    bytes: archivo.size,
    alt: (formData.get("alt") as string | null)?.trim().slice(0, 300) || null,
    subida_por: perfil.id,
  });

  if (errRegistro) {
    // El archivo ya está en Storage pero sin registro quedaría huérfano:
    // mejor deshacer que dejar basura invisible en el bucket.
    await supabase.storage.from(BUCKET).remove([path]);
    console.error("[admin/medios] registro:", errRegistro.message);
    return { ok: false, error: "No se pudo registrar el archivo." };
  }

  revalidatePath(RUTA_MEDIOS);
  return { ok: true, url };
}

export async function borrarMedio(formData: FormData): Promise<void> {
  await requerirPerfil(["admin"]);
  const id = String(formData.get("id") ?? "");
  const path = String(formData.get("path") ?? "");
  if (!id || !path) return;

  const supabase = await createSessionClient();

  // Primero el objeto, luego el registro: si falla el borrado en Storage nos
  // quedamos con el registro y se puede reintentar. Al revés, el archivo
  // quedaría huérfano sin forma de encontrarlo desde el panel.
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) {
    console.error("[admin/medios] borrado en Storage:", error.message);
    return;
  }

  await supabase.from("media").delete().eq("id", id);
  revalidatePath(RUTA_MEDIOS);
}
