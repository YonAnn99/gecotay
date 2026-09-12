/**
 * Importa el catálogo hardcodeado de app/data/empresa.ts a las tablas de
 * contenido de Supabase.
 *
 * Idempotente: usa upsert por `slug`, así que se puede volver a correr sin
 * duplicar. Las imágenes de galería sí se reemplazan por completo en cada
 * pasada (se borran y se reinsertan), porque el orden importa y no hay una
 * clave natural por la que casarlas.
 *
 * `empresa.ts` NO se borra: sigue siendo la fuente de todo lo que esta fase no
 * migra (EMPRESA, CONTACTO, REDES, VALORES, NOSOTROS, POLITICAS, FINISHES,
 * NAVEGACION).
 *
 * Uso:  node --env-file=.env.local scripts/seed-contenido.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const db = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Extrae un array exportado de empresa.ts sin compilar TypeScript.
 *
 * El archivo es TS con tipos e interfaces, así que no se puede importar desde
 * Node directamente. En vez de añadir tsx o un paso de build solo para esto,
 * se aísla el literal del array y se evalúa: son datos estáticos escritos a
 * mano en nuestro propio repo, sin interpolación ni llamadas.
 */
function leerArray(nombre) {
  const fuente = readFileSync(resolve(raiz, "app/data/empresa.ts"), "utf8");
  const inicio = fuente.indexOf(`export const ${nombre}`);
  if (inicio === -1) throw new Error(`No se encontró ${nombre} en empresa.ts`);

  // Buscar el "[" DESPUÉS del "=", no desde el inicio de la declaración: una
  // anotación de tipo como `LINEAS_PRODUCTO: LineaProducto[] =` contiene un
  // corchete que no es el del array y haría que se leyera una lista vacía.
  const igual = fuente.indexOf("=", inicio);
  const corchete = fuente.indexOf("[", igual);
  let profundidad = 0;
  let fin = -1;
  for (let i = corchete; i < fuente.length; i++) {
    if (fuente[i] === "[") profundidad++;
    else if (fuente[i] === "]") {
      profundidad--;
      if (profundidad === 0) {
        fin = i + 1;
        break;
      }
    }
  }
  if (fin === -1) throw new Error(`No se pudo delimitar ${nombre}`);

  return new Function(`return ${fuente.slice(corchete, fin)}`)();
}

const LINEAS = leerArray("LINEAS_PRODUCTO");
const SERVICIOS = leerArray("SERVICIOS");

console.log(`Leídos de empresa.ts: ${LINEAS.length} líneas, ${SERVICIOS.length} servicios.`);

// ── Líneas de producto ────────────────────────────────────────────────────
const filasLineas = LINEAS.map((l, i) => ({
  slug: l.slug,
  nombre: l.nombre,
  descripcion: l.descripcion,
  imagen: l.imagen ?? null,
  precio_desde: typeof l.precioDesde === "number" ? l.precioDesde : null,
  es_nuevo: l.esNuevo === true,
  // El orden del array es el orden con el que el sitio las muestra hoy.
  orden: i,
  publicado: true,
}));

const { data: lineasGuardadas, error: errLineas } = await db
  .from("lineas_producto")
  .upsert(filasLineas, { onConflict: "slug" })
  .select("id, slug");

if (errLineas) {
  console.error("✗ líneas:", errLineas.message);
  process.exit(1);
}
console.log(`✓ ${lineasGuardadas.length} líneas de producto`);

// ── Galerías ──────────────────────────────────────────────────────────────
const idPorSlug = new Map(lineasGuardadas.map((l) => [l.slug, l.id]));

const { error: errBorrado } = await db
  .from("linea_imagenes")
  .delete()
  .in("linea_id", [...idPorSlug.values()]);
if (errBorrado) {
  console.error("✗ limpieza de galerías:", errBorrado.message);
  process.exit(1);
}

const filasImagenes = LINEAS.flatMap((l) =>
  (l.galeria ?? []).map((url, i) => ({
    linea_id: idPorSlug.get(l.slug),
    url,
    alt: `${l.nombre} — imagen ${i + 1}`,
    orden: i,
  }))
);

if (filasImagenes.length) {
  const { error } = await db.from("linea_imagenes").insert(filasImagenes);
  if (error) {
    console.error("✗ galerías:", error.message);
    process.exit(1);
  }
}
console.log(`✓ ${filasImagenes.length} imágenes de galería`);

// ── Servicios ─────────────────────────────────────────────────────────────
const filasServicios = SERVICIOS.map((s, i) => ({
  slug: s.slug,
  titulo: s.titulo,
  descripcion: s.descripcion,
  imagen: s.imagen ?? null,
  orden: i,
  publicado: true,
}));

const { data: serviciosGuardados, error: errServicios } = await db
  .from("servicios")
  .upsert(filasServicios, { onConflict: "slug" })
  .select("id");

if (errServicios) {
  console.error("✗ servicios:", errServicios.message);
  process.exit(1);
}
console.log(`✓ ${serviciosGuardados.length} servicios`);

console.log("\nSeed completo.");
