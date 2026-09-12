"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createServiceClient } from "@/app/lib/supabase/server";

// Server Actions are plain POST endpoints: anyone can hit them without going
// through the UI (see node_modules/next/dist/docs/01-app/02-guides/server-actions.md
// §Security). These two forms are anonymous by design, so there is no session
// to check — the boundary here is strict validation, length caps and a
// per-IP rate limit. Everything below re-validates server-side; nothing from
// the client is trusted.

export type LeadResult = { ok: true; id: string } | { ok: false; error: string };

const LIMITES = {
  nombre: 120,
  email: 200,
  telefono: 40,
  empresa: 160,
  cargo: 120,
  asunto: 160,
  mensaje: 5000,
  descripcion: 5000,
  observaciones: 5000,
  ubicacion: 200,
  superficie: 40,
  plazo: 60,
  presupuesto: 60,
  tipoProyecto: 60,
} as const;

// Ventana de rate limiting por IP hasheada.
const RATE_LIMIT_VENTANA_MIN = 10;
const RATE_LIMIT_MAX_ENVIOS = 5;

/** Recorta, colapsa espacios y devuelve null si queda vacío. */
function limpiar(valor: unknown, max: number): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.replace(/\s+/g, " ").trim().slice(0, max);
  return limpio.length > 0 ? limpio : null;
}

/** Igual que `limpiar` pero conserva los saltos de línea (campos de texto largo). */
function limpiarMultilinea(valor: unknown, max: number): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.replace(/[ \t]+/g, " ").trim().slice(0, max);
  return limpio.length > 0 ? limpio : null;
}

function emailValido(email: string): boolean {
  // Deliberadamente laxo: el objetivo es descartar basura evidente, no
  // rechazar direcciones raras pero legítimas de un cliente real.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function normalizarLocale(valor: unknown): "es" | "en" {
  return valor === "en" ? "en" : "es";
}

/**
 * Hash de la IP con sal. Nunca guardamos la IP en claro: solo necesitamos
 * poder correlacionar envíos abusivos entre sí, no reidentificar a la persona.
 * Si falta la sal, preferimos no guardar nada antes que guardar un hash
 * reversible por fuerza bruta (el espacio de IPv4 es pequeño).
 */
async function contextoPeticion() {
  const h = await headers();
  const sal = process.env.LEAD_IP_SALT;
  const ipCruda = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip");

  const ipHash =
    sal && ipCruda ? createHash("sha256").update(`${sal}:${ipCruda}`).digest("hex") : null;

  return {
    ipHash,
    userAgent: limpiar(h.get("user-agent"), 400),
    origen: limpiar(h.get("referer"), 500),
  };
}

/** Devuelve true si esta IP ya superó la cuota reciente en esa tabla. */
async function superaRateLimit(
  tabla: "contactos" | "cotizaciones",
  ipHash: string | null
): Promise<boolean> {
  if (!ipHash) return false; // sin huella no podemos limitar; no bloqueamos al usuario

  const desde = new Date(Date.now() - RATE_LIMIT_VENTANA_MIN * 60_000).toISOString();
  const supabase = createServiceClient();
  const { count, error } = await supabase
    .from(tabla)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", desde);

  if (error) return false; // ante un fallo de lectura, preferimos no perder el lead
  return (count ?? 0) >= RATE_LIMIT_MAX_ENVIOS;
}

export interface ContactoInput {
  nombre: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  asunto?: string;
  mensaje: string;
  locale?: string;
}

export async function guardarContacto(input: ContactoInput): Promise<LeadResult> {
  const nombre = limpiar(input?.nombre, LIMITES.nombre);
  const mensaje = limpiarMultilinea(input?.mensaje, LIMITES.mensaje);
  if (!nombre || !mensaje) return { ok: false, error: "Faltan nombre o mensaje." };

  const email = limpiar(input?.email, LIMITES.email);
  if (email && !emailValido(email)) return { ok: false, error: "Email inválido." };

  const { ipHash, userAgent, origen } = await contextoPeticion();
  if (await superaRateLimit("contactos", ipHash)) {
    return { ok: false, error: "Demasiados envíos. Inténtalo de nuevo en unos minutos." };
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("contactos")
    .insert({
      nombre,
      email,
      telefono: limpiar(input?.telefono, LIMITES.telefono),
      empresa: limpiar(input?.empresa, LIMITES.empresa),
      asunto: limpiar(input?.asunto, LIMITES.asunto),
      mensaje,
      locale: normalizarLocale(input?.locale),
      origen,
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[leads] fallo al guardar contacto:", error.message);
    return { ok: false, error: "No se pudo guardar el mensaje." };
  }

  return { ok: true, id: data.id };
}

export interface CotizacionInput {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  cargo?: string;
  tipoProyecto?: string;
  descripcion: string;
  ubicacion?: string;
  superficie?: string;
  plazo?: string;
  presupuesto?: string;
  servicios?: string[];
  observaciones?: string;
  locale?: string;
}

export async function guardarCotizacion(input: CotizacionInput): Promise<LeadResult> {
  const nombre = limpiar(input?.nombre, LIMITES.nombre);
  const email = limpiar(input?.email, LIMITES.email);
  const descripcion = limpiarMultilinea(input?.descripcion, LIMITES.descripcion);

  if (!nombre || !email || !descripcion) {
    return { ok: false, error: "Faltan nombre, email o descripción del proyecto." };
  }
  if (!emailValido(email)) return { ok: false, error: "Email inválido." };

  const servicios = Array.isArray(input?.servicios)
    ? input.servicios
        .map((s) => limpiar(s, 80))
        .filter((s): s is string => s !== null)
        .slice(0, 30)
    : [];

  const { ipHash, userAgent, origen } = await contextoPeticion();
  if (await superaRateLimit("cotizaciones", ipHash)) {
    return { ok: false, error: "Demasiados envíos. Inténtalo de nuevo en unos minutos." };
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cotizaciones")
    .insert({
      nombre,
      email,
      telefono: limpiar(input?.telefono, LIMITES.telefono),
      empresa: limpiar(input?.empresa, LIMITES.empresa),
      cargo: limpiar(input?.cargo, LIMITES.cargo),
      tipo_proyecto: limpiar(input?.tipoProyecto, LIMITES.tipoProyecto),
      descripcion,
      ubicacion: limpiar(input?.ubicacion, LIMITES.ubicacion),
      superficie: limpiar(input?.superficie, LIMITES.superficie),
      plazo: limpiar(input?.plazo, LIMITES.plazo),
      presupuesto: limpiar(input?.presupuesto, LIMITES.presupuesto),
      servicios,
      observaciones: limpiarMultilinea(input?.observaciones, LIMITES.observaciones),
      locale: normalizarLocale(input?.locale),
      origen,
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[leads] fallo al guardar cotización:", error.message);
    return { ok: false, error: "No se pudo guardar la solicitud." };
  }

  return { ok: true, id: data.id };
}
