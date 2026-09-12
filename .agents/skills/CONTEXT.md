# GECOTAY – Project Context & Progress Summary

## Project Overview
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Font**: Geist Sans / Geist Mono (via `next/font/google`)
- **Language**: Spanish (`lang="es"`)
- **Repository**: https://github.com/YonAnn99/gecotay (main branch)

## Implemented Features (✅ Completed)

### Core Layout & Navigation
- **Floating “Island” Header** – glassmorphism, scroll‑aware transparency, centered logo, nav order: Inicio • Productos • Servicios • LOGO • Acabados y tapices • Contacto.
- **Responsive Mobile Drawer** – hamburger → slide‑in panel, same link set, accessible ARIA.
- **Footer** – dark theme, 5 column grid, social icons, legal links, fade‑in animation.
- **404 Page** – friendly illustration, link back to home.

### Pages & Content
| Route | Highlights |
|-------|------------|
| `/` (Home) | Hero = full‑width 3D Coverflow carousel (20 product lines) + subtle background gradient. |
| `/productos` | Category grid (5), featured products (4), TL;DR key‑takeaways, early CTA, FAQ + JSON‑LD `FAQPage`. |
| `/servicios` | 6 detailed services (left list + right sticky CTAs), TL;DR, early CTA, FAQ + schema. |
| `/nosotros` | Timeline (7 milestones), 4 values, 6 certifications, TL;DR, early CTA, internal link cluster, FAQ + schema. |
| `/acabados-tapices` | 4 finish families, TL;DR, early CTA (“Solicitar muestras gratis”), FAQ + schema, LocalBusiness schema. |
| `/contacto` | Form (validated), 4 direct channels, 4 delegations, TL;DR, early CTA, internal links, FAQ + schema. |
| `/cotizar` | 4‑step wizard (datos, proyecto, detalles, revisar), TL;DR, early CTA, internal links, FAQ + schema. |
| `/not-found` | Minimal 404 with back‑home link. |

### SEO & Structured Data
- **Per‑page `metadata` export** (unique title, description, OG, Twitter, robots).
- **Single `<h1>` per page**, different from meta‑title.
- **Key‑takeaways (TL;DR) block** placed right after the first paragraph on every content page.
- **Early CTA** after first paragraph.
- **FAQ section** with `FAQPage` JSON‑LD injected via `<Script type="application/ld+json">`.
- **LocalBusiness JSON‑LD** added globally in `layout.tsx` (address, phone, geo, openingHours, priceRange).
- **Internal linking cluster**: each page links to the other main sections (productos, servicios, acabados‑tapices, contacto, nosotros).
- **Clean URLs** – e.g. `/acabados-tapices` (no connectors).
- **Sitemap** (`public/sitemap.xml`) with all public routes.

### Performance & Assets
- **All images converted to WebP** (cwebp q80) and served via `next/image` with proper `sizes` & `loading` (eager for hero/carousel center, lazy for others).
- **Carousel images** preloaded, `will-change: transform, opacity` for 60 fps animations.
- **Favicon & PWA icons** generated (ICO, PNG 16/32, Apple touch, Android 192/512, `site.webmanifest`).
- **Font loading** via `next/font` (self‑hosted Geist).

### Accessibility & UX
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`, `article`, `dl/dt/dd` for FAQ).
- ARIA labels on carousel, mobile menu, links.
- Focus‑visible outlines, colour contrast compliant.
- Keyboard navigation on carousel (←/→), touch swipe support.
- Reduced‑motion friendly (animations respect `prefers-reduced-motion` via Tailwind defaults).

### Internationalisation (i18n) – NEW ✅
- **Locale-based routing** via `[locale]` segment (`es` default, `en` supported).
- **Proxy** (`proxy.ts`, raíz del proyecto) detects `Accept-Language`, sets `NEXT_LOCALE` cookie, redirects `/` → `/es` (or `/en`). *Next.js 16 renombró Middleware → Proxy; `middleware.ts` ya no es una convención válida.*
- **All internal links** prefixed with locale (`/${locale}/…`).
- **Message catalogs** (`app/messages/es.json`, `en.json`) + tiny `t(locale, key)` helper in `app/lib/i18n.ts`.
- **Page metadata** includes `alternates.languages` for `hreflang`.
- **Schema.org** `legalName` updated to localized brand.
- **Chrome i18n completo**: `NavMenu`, `NavBrand`, `Footer` y `CookieBanner` consumen catálogos (`nav.*`, `footer.*`, `cookies.*`). *El contenido profundo de páginas sigue en español (pendiente revisión con marketing).*

### Homepage SEO Overhaul – NEW ✅
- **Hero section** now has semantic hierarchy: `<h1>` (brand + keywords), `<h2>` (slogan), descriptive `<p>`, two CTAs (Cotizar, Ver Productos).
- **Services** heading demoted to `<h2>`; intro paragraph translated.
- **New sections**: “Quiénes Somos” (`<h2>` + mission/vision/warranty cards), “Lo Más Nuevo” (`<h2>` + 6 product cards flagged `esNuevo`), “Por Qué Elegirnos” (`<h2>` + 4 trust signals).
- **CircularGallery clicks** now navigate to `/${locale}/productos/<slug>` (fixed 404 bug).
- **Removed duplicate WhatsApp CTA** (global float button retained).

### Brand Unification – NEW ✅
- **Automated script** (`scripts/rebrand-ecotay-to-gecotay.mjs`) replaced **all** user-visible “Ecotay” → “Gecotay” across 20+ files (messages, metadata, data layer, component copy, WhatsApp templates, FAQs).
- Legal entity name, social-handle labels, JSON-LD `name`/`legalName` now read **“Grupo Gecotay S.A.S. de C.V.”**.
- Social URLs & e-mail addresses preserved.

### Configurable Grainient Background – NEW ✅
- Swapped local vendored copy for **official ReactBits `Grainient`** installed via MCP (`npx shadcn@latest add @react-bits/Grainient-TS-TW`).
- `GrainientBackground.tsx` now consumes a single `GRAINIENT_CONFIG` constant:
  - Palette: **Gecotay Green `#AAC637` / Pure Black `#000000` / White `#ffffff`**.
  - `colorBalance: -0.35`, `blendSoftness: 0.28`, `rotationAmount: 260` → white appears only as a faint highlight.
- Future updates via `npx shadcn@latest add @react-bits/Grainient-TS-TW`.

### Splash Screen / Preloader – NEW ✅ (reworked 2026-08-22)
- **`app/components/ui/SplashScreen.tsx`** – full-screen white overlay, centered logo (`logo-horizontal-color.webp`, ratio intrínseco real 436×280) + “BIENVENIDO”.
- Solo se muestra **en cada recarga** (decisión del usuario; quitar el gate de `sessionStorage` si se prefiere once-per-session). Tiempos reales en `SplashScreen.tsx`: `MIN_SHOW_MS = 1100`, `MAX_SHOW_MS = 3000`, `FADE_MS = 500`, `BAR_FILL_MS = 300` → ~1.9 s efectivos (antes 2500/7000 ≈ 3.3 s, recortado el 2026-09-11 por LCP). El overlay **sí** vive en el HTML SSR (el layout lo pinta con el primer byte); el componente cliente solo gobierna su ciclo de vida vía DOM.
- Respeta `prefers-reduced-motion` (se omite por completo).
- Montado en el root layout (`app/[locale]/layout.tsx`).

### Performance & Assets
- **All images converted to WebP** (cwebp q80) and served via `next/image` with proper `sizes` & `loading` (eager for hero/carousel center, lazy for others).
- **Carousel images** preloaded, `will-change: transform, opacity` for 60 fps animations.
- **Favicon & PWA icons** generated (ICO, PNG 16/32, Apple touch, Android 192/512, `site.webmanifest`).
- **Font loading** via `next/font` (self‑hosted Geist).

### Accessibility & UX
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`, `article`, `dl/dt/dd` for FAQ).
- ARIA labels on carousel, mobile menu, links.
- Focus‑visible outlines, colour contrast compliant.
- Keyboard navigation on carousel (←/→), touch swipe support.
- Reduced‑motion friendly (animations respect `prefers-reduced-motion` via Tailwind defaults).

## Architectural Fixes – 2026-08-22 ✅

| Fix | Detalle |
|-----|---------|
| **Doble `<html>/<body>` eliminado** | `app/layout.tsx` y `app/page.tsx` borrados; `app/[locale]/layout.tsx` es ahora el **root layout único** (patrón oficial i18n de Next). Incluye fuentes, globals.css, metadata, viewport, SplashScreen, schema JSON-LD. Verificado: un solo `<html lang="es">`. |
| **Middleware → Proxy** | Next.js 16 renombró la convención: `app/middleware.ts` se ignoraba silenciosamente (las redirecciones de locale nunca funcionaron; lo enmascaraba el root redirect). Ahora vive en `proxy.ts` (raíz) con export `proxy()`. Verificado: `/` → `307 /es/`. |
| **Sitemap dinámico + robots** | `public/sitemap.xml` eliminado. Nuevo `app/sitemap.ts`: URLs por locale (`/es/…`, `/en/…`) con `xhtml:link hreflang`, incluye las líneas de producto dinámicamente desde `LINEAS_PRODUCTO`. Nuevo `app/robots.ts` (`/robots.txt`). |
| **Schema corregido** | `"@type": "LocalBusiness"` (antes Organization) con URLs absolutas vía `metadataBase: new URL(EMPRESA.url)`. |
| **SplashScreen rework** | Ratio intrínseco real del logo (436×280, antes 280×81 → warning de next/image); **se muestra en cada recarga** (decisión del usuario), 1.5 s + fade 0.4 s (antes 2.5 s fijos), sin SSR (LCP), reduced-motion friendly. `NavBrand` y `Footer` también con dims correctas. |
| **i18n chrome completo** | Catálogos ampliados (`nav.*`, `footer.*`, `cookies.*`); `NavMenu`, `Footer` y `CookieBanner` localizados (CookieBanner además tenía links sin prefijo de locale). |
| **`params` async en páginas** | En Next.js 16 `params` es una Promise: corregido `app/[locale]/page.tsx` (`await params` en `generateMetadata` y `Home`; el resto de páginas ya lo hacía bien — verificado con grep). |
| **Lint limpio** | 0 errores (4 `any`/`<a>`→`<Link>` corregidos); `.agents/**` excluido en `eslint.config.mjs`. Quedan solo 2 warnings del código vendoreado de ReactBits (`Grainient.tsx`). |
| **Nav responsive** | Islands del nav reposicionadas para móviles: `top-5 left-4/right-4` con tamaños reducidos < 640px (antes `left-30/right-30` se solapaban/overflow en pantallas pequeñas); etiqueta del menú oculta < 420 px. |

## Auditoría & Fixes – 2026-09-11 ✅

Auditoría completa del sistema. Estado base sano: `tsc --noEmit` 0 errores, `eslint` 0 errores/0 warnings, `next build` OK (60 rutas, todas SSG). Aplicado:

| Fix | Detalle |
|-----|---------|
| **`GrainientBackground` duplicado** | Se montaba en el root layout **y otra vez** en `contacto`, `servicios` y `acabados-tapices` → dos canvas WebGL con dos loops de `requestAnimationFrame` en paralelo en esas rutas. Eliminados los 3 montajes redundantes (y sus imports). El único montaje válido vive en `app/[locale]/layout.tsx`. |
| **Splash recortado** | `MIN_SHOW_MS` 2500 → 1100, `MAX_SHOW_MS` 7000 → 3000, barra de progreso 1800 ms → 900 ms. El overlay es el LCP medido por Google (va en el HTML SSR con el logo `priority`), así que su duración es directamente una penalización de Core Web Vitals. |
| **JSON-LD server-rendered** | Pasaba por `<Script strategy="lazyOnload">`, o sea se inyectaba después del `window.load`. Ahora es un `<script type="application/ld+json">` plano en el HTML del servidor, con el escape `\u003c` que recomienda `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`. Crítico porque el schema es `LocalBusiness`. |
| **`/en` despublicado de buscadores** | El contenido de las páginas internas sigue en español (solo home + chrome usan `t(locale,…)`), así que el `hreflang` anunciaba ~30 URLs duplicadas como inglés. Ahora: sitemap solo `/es`, `alternates` con `canonical` + `x-default` apuntando a `/es`, y `X-Robots-Tag: noindex, follow` sobre `/en/:path*` vía `next.config.ts`. **Las rutas `/en` siguen existiendo y son accesibles** — solo dejaron de anunciarse. Revertir cuando `app/messages/en.json` cubra de verdad las páginas. |
| **Selector de idioma** | Nuevo `app/components/layout/LocaleSwitcher.tsx`, montado al pie del dropdown de `NavMenu`. Intercambia el segmento de locale conservando la ruta actual. La cookie `NEXT_LOCALE` sigue siendo `httpOnly` a propósito: no hace falta escribirla desde el cliente porque `proxy.ts` la reescribe en cada request con prefijo de locale. Antes no había **ninguna** forma de volver de `/en` a `/es`. |
| **`npm run typecheck`** | Este documento ya lo listaba como comando de CI pero el script no existía en `package.json`. Agregado (`tsc --noEmit`). |
| **Limpieza** | Borrados los SVG del template de Next sin referencias (`globe`, `next`, `window`, `vercel`, `file`). |

### Verificado en build de producción
- `sitemap.xml`: 29 `<loc>`, cero `/en/`.
- `/es/servicios`: `<link rel="canonical">` + `alternate hreflang="es"` + `alternate hreflang="x-default"`.
- `/en/*` responde `X-Robots-Tag: noindex, follow`; `/es/*` no lleva ese header.
- `LocalBusiness` JSON-LD presente en el HTML servido de `/es`.

## Backend: captura de leads en Supabase – 2026-09-11 ✅

Primer módulo real de backend. Antes los dos formularios solo abrían `wa.me/…` y **cada lead se perdía** si nadie contestaba ese WhatsApp. Ahora se persisten primero.

### Esquema (`supabase/migrations/20260911222650_create_leads_tables.sql`)
- Tablas `public.contactos` y `public.cotizaciones`, una por formulario, con los campos exactos de cada uno.
- Enum `public.lead_estado` (`nuevo` → `contactado` → `cotizado` → `ganado` / `perdido`) para seguimiento comercial, más una columna `notas` libre.
- `CHECK` de longitud en **todas** las columnas de texto: la validación no depende solo del cliente ni de la Server Action, la base es la última línea de defensa.
- Trigger `set_updated_at` (`security invoker`, `search_path = ''`) en ambas tablas.
- Índices por `created_at desc` y por `estado` (para el listado del panel de admin) y por `(ip_hash, created_at desc)` (para el rate limiting).
- La copia versionada en `supabase/migrations/` existe para que el esquema viva en el repo; la migración ya está aplicada al proyecto remoto vía MCP.

### Modelo de seguridad (importante)
**RLS activa y deliberadamente SIN políticas** en ambas tablas. La clave publicable que viaja al navegador no puede leer ni escribir una sola fila. Todas las escrituras pasan por Server Actions con la clave `service_role`, que salta RLS y vive solo en el servidor.

> ⚠️ **Nunca** agregar una política tipo "anyone can insert" a estas tablas. Contienen nombres, correos y teléfonos de clientes reales. El advisor de Supabase reporta `rls_enabled_no_policy` en nivel INFO — es el estado buscado, no un pendiente.

Verificado contra la API real: `SELECT` con clave publicable y con la anon legacy devuelve `[]` aun habiendo filas; `INSERT` rebota con `42501 new row violates row-level security policy`.

### Código
| Archivo | Rol |
|---------|-----|
| `app/lib/supabase/types.ts` | Tipos generados con el MCP (`generate_typescript_types`). **No editar a mano** — regenerar tras cada migración. |
| `app/lib/supabase/server.ts` | Cliente `service_role`. Importa `server-only`, así que cualquier import accidental desde el cliente es un error de build. La env var **no** lleva prefijo `NEXT_PUBLIC_` a propósito. |
| `app/actions/leads.ts` | Server Actions `guardarContacto` / `guardarCotizacion`: sanitización, topes de longitud, validación de email, hash de IP y rate limiting. |

### Dos decisiones que no son obvias
1. **El guardado va sin `await` en los formularios.** `window.open` solo esquiva el bloqueador de pop-ups mientras la ejecución sigue dentro del gesto del usuario; meter un `await` antes rompería esa cadena y WhatsApp dejaría de abrirse. Por eso se dispara `void guardarX(...).catch(...)` y **después** el `window.open`. El guardado es un respaldo: si falla, el lead igual llega por WhatsApp, así que nunca debe bloquear ni alterar el flujo.
2. **La IP se guarda hasheada con sal (`LEAD_IP_SALT`), nunca en claro.** Solo necesitamos correlacionar envíos abusivos entre sí, no reidentificar personas. Sin la sal el hash sería reversible por fuerza bruta (el espacio IPv4 es pequeño), así que si la variable falta simplemente no se guarda huella — y el rate limiting se desactiva en vez de bloquear a gente legítima.

Una Server Action es un endpoint POST público alcanzable sin pasar por la UI (ver `node_modules/next/dist/docs/01-app/02-guides/server-actions.md` §Security). Como estos formularios son anónimos por diseño no hay sesión que verificar: la frontera es la validación estricta + el rate limit (5 envíos por IP cada 10 min) + los `CHECK` de la base.

### Variables de entorno
`.env.example` (versionado, con `!.env.example` añadido al `.gitignore`) documenta las tres. En `.env.local` ya quedaron la URL y una `LEAD_IP_SALT` generada; **falta pegar `SUPABASE_SERVICE_ROLE_KEY`** desde Dashboard → Project Settings → API Keys. Las mismas variables hay que darlas de alta en el deploy (Vercel).

Verificado tras el build que ni la service-role key ni la sal aparecen en `.next/static/`.

### Verificación end-to-end desde el navegador (2026-09-11)
Ambos formularios enviados desde Chrome contra el dev server, con la `SUPABASE_SERVICE_ROLE_KEY` real:
- **`/es/contacto`** → fila en `contactos` con los 6 campos, más `locale`, `origen` (del `referer`), `user_agent` y la IP hasheada. `estado = nuevo`.
- **`/es/cotizar`** (wizard de 4 pasos) → fila en `cotizaciones` con los 13 campos, incluido el array `servicios` con 3 elementos.
- **El pop-up de WhatsApp NO fue bloqueado** en ninguno de los dos, con el mensaje prellenado completo. Esto es lo que valida el diseño sin `await`: confirma que disparar la Server Action y llamar a `window.open` en el mismo tick mantiene el gesto del usuario intacto.

Filas de prueba borradas; ambas tablas en 0.

### Fix: etiquetas de `servicios` (2026-09-11)
Los checkboxes de servicios guardaban sus `value` internos (`instalacion`, `tapiceria`) en las **cuatro** salidas del wizard. Era un defecto previo a Supabase: ventas ya recibía "Servicios: instalacion, tapiceria" por WhatsApp y por correo. Ahora existe el catálogo `serviciosDisponibles` a nivel de módulo (misma forma que `projectTypes` y `timelines`) más el helper `etiquetasDeServicios()`, y **todas** las salidas pasan por él: mensaje de WhatsApp, `mailto`, paso de revisión y el payload a Supabase. Los checkboxes también consumen ese catálogo en vez del array duplicado que estaba inline en el JSX. El estado interno sigue guardando los `value` — eso es lo correcto, la conversión ocurre solo al salir.

Verificado end-to-end: la fila quedó con `servicios = ["Entrega e instalación","Tapicería","Planeación de espacios"]` y el mensaje de WhatsApp con las mismas etiquetas.

## Módulos admin y ventas — Fase 0: esqueleto de subdominios ✅ (2026-09-11)

Rama `feat/admin-ventas`. Plan completo en `~/.claude/plans/por-el-momento-no-hazy-perlis.md`.

Tres superficies en un solo repo y un solo proyecto de Vercel, separadas por subdominio:

| Host | Sirve | Root layout |
|------|-------|-------------|
| `gecotay.com` / `www` | sitio público (sin cambios) | `app/[locale]/layout.tsx` |
| `app.gecotay.com` | panel de administración | `app/admin/layout.tsx` |
| `ventas.gecotay.com` | módulo interno de ventas | `app/ventas/layout.tsx` |

### El root layout NO hubo que extraerlo
El plan anticipaba tener que sacar un `app/layout.tsx` compartido, y resultó innecesario. Los docs de Next 16 son explícitos: *"Any layout without a `layout.js` above it is a root layout… Omitting `app/layout.js` so layouts in subdirectories each become root layouts for their respective directories"* (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`). Como no existe `app/layout.tsx`, los tres árboles aportan el suyo y cada uno define su propio `<html>`/`<body>`. **`app/[locale]/layout.tsx` quedó intacto** y se evitó por completo el riesgo de reabrir el bug de doble `<html>` de 2026-08-22.

Lo único compartido es `app/lib/fonts.ts`, que exporta `geistSans`/`geistMono`/`fontVariables`: `next/font` exige la llamada en ámbito de módulo, así que centralizarlas evita instanciar la misma familia tres veces.

### Enrutado por Host (`proxy.ts`)
`superficieDeHost()` lee el subdominio y **reescribe** (no redirige) a `/admin` o `/ventas`, de modo que la URL visible sigue siendo `app.gecotay.com/productos`. El sitio público no cambia en nada.

Sin dominio conectado todavía, las superficies se navegan así:
- **Local**: `app.localhost:3000` y `ventas.localhost:3000` — Chrome resuelve `*.localhost` sin tocar `/etc/hosts`.
- **Previews de Vercel**: por ruta directa `/admin` y `/ventas`, porque `*.vercel.app` no admite subdominios propios.
- **Producción**: esas rutas directas devuelven 404 desde el host público, con el gate `NODE_ENV === "production" && VERCEL_ENV === "production"` — así dev y preview siguen siendo navegables.

### `noindex`: tres capas, y por qué hicieron falta
El header `X-Robots-Tag` **no llegaba** en los subdominios. Diagnóstico con `curl`: la respuesta salía con `x-nextjs-cache: HIT`, y **Next descarta los headers que pone el proxy cuando la respuesta viene del caché de prerenderizado**. Tampoco servía una regla por `source` en `next.config.ts`, porque esa API casa contra la ruta *entrante* (en el subdominio siempre `/`), no contra la reescrita.

Orden de fiabilidad, de mayor a menor:
1. **`robots` en el metadata de cada root layout** → `<meta name="robots" content="noindex, nofollow, nocache">` en el HTML. Es la defensa real.
2. **`has: [{ type: "host", value: "(app|ventas)\\..*" }]`** en `next.config.ts`: se evalúa antes del enrutado, sobrevive al caché y cubre también los `*.localhost`.
3. El header que pone el proxy, que solo llega cuando la respuesta no es estática. Se mantiene porque en cuanto estas rutas tengan sesión dejarán de serlo.

### Verificado contra build de producción
- Sitio público intacto: `/` → 307 `/es/`, `/es/servicios` → 200, `<meta robots>` sigue en `index, follow`.
- **Un solo `<html>` en las tres superficies.**
- `app.gecotay.com/` y `ventas.gecotay.com/` → 200 con su placeholder, sin redirecciones (`num_redirects: 0`).
- Ruta inexistente bajo subdominio → 404, sin fuga al sitio público.
- `X-Robots-Tag` presente en los dos subdominios, en `*.localhost` y en `/admin` por ruta directa; **ausente en `/es`**.
- `npm run build`: las 60 rutas SSG del sitio público intactas, más `/admin` y `/ventas`.
- `tsc` y `eslint` en cero.

> Nota: al añadir el segundo root layout, `.next/dev/types/validator.ts` quedó obsoleto y `tsc` falló con `Type '"/admin"' is not assignable to type '"/[locale]"'`. Se regenera solo con `npm run build`; no es un error de código.

## Fase 1a: identidad y roles (esquema) ✅ (2026-09-12)

Tres migraciones: `20260912003241_create_perfiles_invitaciones`, `..._mover_helpers_a_esquema_privado`, `..._permitir_evaluar_helpers_a_anon`. **`get_advisors` de seguridad: 0 hallazgos.**

### Tablas
- **`perfiles`** — `id` (FK a `auth.users`, on delete cascade), `email` único, `nombre`, `rol` enum `('admin','ventas')`, `activo`, `ultimo_acceso`. `activo` permite revocar acceso sin borrar el histórico.
- **`invitaciones`** — `email`, `codigo` (`^[A-Z0-9]{8}$`, único), `estado` enum `('pendiente','usada','expirada','revocada')`, `rol`, `creada_por`, `expira_en` (default +7 días), `usada_en`, `perfil_id`.

### Sin registro público, y sin trigger sobre `auth.users`
Nadie se da de alta solo. El primer admin se crea a mano; los colaboradores solo existen si un admin los invita y canjean el código. **Deliberadamente NO hay trigger que autocree perfiles al insertarse en `auth.users`**: un alta accidental en Auth no debe traducirse jamás en acceso. Conviene además desactivar los registros públicos en Auth → Settings.

### El código de invitación se borra al usarse
La restricción `invitacion_coherente` lo garantiza en la base, no solo en la aplicación: una invitación `pendiente` tiene código y no tiene `usada_en`; una `usada` tiene `usada_en` y **`codigo` a NULL**; una `expirada`/`revocada` tampoco conserva código. Así el admin puede ver el código mientras está pendiente (para dictarlo si el correo no llega), pero una fuga posterior de la tabla no revela credenciales reutilizables.

### Los helpers viven en el esquema `private`, no en `public`
`es_admin()` y `tiene_acceso_interno()` nacieron en `public` y el advisor los marcó de inmediato: PostgREST publica ese esquema, así que quedaban invocables como `/rest/v1/rpc/es_admin` por cualquiera. Se movieron a un esquema `private` que la API no expone (verificado: esos endpoints responden **404**).

Dos sutilezas que conviene no deshacer:
- Son **`security definer`**, y eso es lo que evita la recursión infinita: una política sobre `perfiles` que consultara `perfiles` bajo RLS se llamaría a sí misma. Al correr como su propietario, la función salta RLS y corta el ciclo.
- **`anon` necesita `EXECUTE`** sobre ellas. Sin ese permiso, cualquier consulta anónima a una tabla con RLS muere con `42501 permission denied for function es_admin` en vez de evaluar la política y devolver `[]`. Hoy es indiferente, pero en la Fase 2 las tablas de contenido llevarán políticas `publicado = true OR private.es_admin()`: sin el permiso, **el sitio público recibiría un error en lugar del catálogo**. Concederlo no reabre nada — la función sigue fuera de la API y para `anon` devuelve siempre `false`, porque `auth.uid()` es null.

### Políticas
- `perfiles`: cada quien ve su propia ficha (`auth.uid() = id`, lo necesita el layout para saber su rol); el admin ve y gobierna todas.
- `invitaciones`: solo admin. El canje lo hará una Server Action con `service_role`, porque quien canjea todavía no tiene sesión — por eso no hace falta política para el invitado.
- `contactos` y `cotizaciones`: **primeras políticas** desde su creación — `select` y `update` para admin. Siguen **sin política de INSERT** a propósito: los formularios públicos escriben con `service_role` desde `app/actions/leads.ts`.

### Verificado contra la API real
Con la clave publicable: `invitaciones`, `perfiles` y `cotizaciones` devuelven `[]` aun habiendo filas; insertar una invitación o autocrearse un perfil `admin` rebota con `42501`; `/rest/v1/rpc/es_admin` responde 404. Las seis restricciones de coherencia y el FK de `perfiles` rechazan lo que deben. Tablas en 0 tras las pruebas.

## Fase 1b: cliente de sesión y guards de rol ✅ (2026-09-12)

Dependencia nueva: `@supabase/ssr` 0.12.7.

### Autenticación solo por Server Actions, sin cliente de navegador
Decisión deliberada: el login corre en el servidor, el token va a una cookie httpOnly y **nunca pasa por JavaScript del cliente**. Dos consecuencias buenas: no hay que abrir `connect-src` en la CSP (sigue en `'self'` + fuentes de Google) y un XSS no puede leer la sesión. Si algún día se necesita Supabase desde el navegador (subidas directas a Storage, realtime), habrá que añadir el host de Supabase a `connect-src` y crear un `createBrowserClient` — hoy no hace falta.

### Módulos
| Archivo | Rol |
|---------|-----|
| `app/lib/supabase/server-session.ts` | Cliente ligado a las cookies, con la clave **publicable**: todo lo que hace queda sujeto a RLS. Distinto de `server.ts`, que usa `service_role` y salta RLS. |
| `app/lib/supabase/proxy-session.ts` | `refrescarSesion()` para el proxy. |
| `app/lib/auth.ts` | `requerirPerfil(roles)`, `perfilActual()`, `baseDeSuperficie()`. |
| `app/lib/superficies.ts` | `HEADER_BASE` y `SUPERFICIES`, compartidos con el proxy. |

`superficies.ts` existe por una razón concreta: el proxy necesitaba esas constantes, y tomarlas de `auth.ts` le metía `server-only`, `next/headers`, `next/navigation` y Supabase enteros en su bundle, que se ejecuta en **cada** petición.

### `getClaims()`, no `getSession()`
El guard verifica identidad con `getClaims()`, que valida la firma del JWT. `getSession()` devuelve un objeto de usuario que sale de la cookie y por tanto **es falsificable**; los propios docs de Supabase advierten de no usarlo para decisiones de autorización.

Además, **el rol nunca se lee del token**: tras validar el JWT, el guard consulta `perfiles` y comprueba `activo`. Un JWT sigue siendo criptográficamente válido después de que un admin revoque el acceso, así que confiar en un claim de rol dejaría entrar a alguien ya revocado hasta que caducara el token.

### Refresco de sesión en el proxy, y solo donde hace falta
Los Server Components no pueden escribir cookies, así que sin refresco los usuarios se ven expulsados en momentos aleatorios. `refrescarSesion()` devuelve un `aplicarCookies(response)` que el proxy aplica a la respuesta final —sea `next()`, `rewrite()` o `redirect()`—, para que el token renovado **sobreviva a la reescritura por subdominio**. Se ejecuta solo para admin y ventas: el sitio público es estático y no tiene sesión.

### Estructura: el guard va en un grupo de rutas, no en el root layout
```
app/admin/
 ├─ layout.tsx              # root layout, SIN guard
 ├─ login/                  # fuera del guard
 │   ├─ page.tsx
 │   ├─ FormularioLogin.tsx
 │   └─ actions.ts          # iniciarSesion / cerrarSesion
 └─ (protegido)/
     ├─ layout.tsx          # await requerirPerfil(["admin"])
     └─ page.tsx            # sigue siendo la URL /admin
```
El paréntesis de `(protegido)` no aparece en la URL. El login tiene que quedar **fuera** del guard: si estuviera dentro, el redirect apuntaría a una página que a su vez exige sesión y el navegador entraría en bucle. `ventas` es idéntico pero acepta `["admin", "ventas"]`, para que un admin consulte el catálogo sin cambiar de cuenta.

### `baseDeSuperficie()` y por qué existe
El proxy pone la cabecera `x-superficie-base`: vacía si la petición llegó por subdominio, `/admin` o `/ventas` si llegó por ruta directa. Los guards construyen el destino con ella. Sin esto, un `redirect("/login")` en modo ruta mandaría **al sitio público**, donde esa ruta no existe.

### Verificado contra build de producción
- Sin sesión, por subdominio: `app.gecotay.com/` y `ventas.gecotay.com/` → 307 a `/login`, y siguiendo el redirect se sirve la pantalla correcta de cada superficie (no el sitio público).
- Sin sesión, por ruta directa: `/admin` → `/admin/login`, `/ventas` → `/ventas/login`.
- `npm run build`: `/admin`, `/admin/login`, `/ventas`, `/ventas/login` como **ƒ (Dynamic)** —esperado, el guard lee cookies— y el sitio público conserva sus 60 rutas SSG con un solo `<html>`.
- `tsc` y `eslint` en cero.

> **Sin probar todavía**, porque requiere una cuenta real: el login exitoso, y que el guard rechace a un usuario con sesión válida pero `activo = false` o rol insuficiente. Para cerrarlo hace falta crear el usuario admin en Supabase → Authentication → Users e insertarle su fila en `perfiles` con `rol = 'admin'`.

## Fase 1c: invitaciones y canje ✅ (2026-09-12)

Cuenta de administrador creada: **gecotay@gmail.com**, `rol = 'admin'` en `perfiles`.

### El SMTP de Supabase NO cubre este correo
Confusión fácil y cara: el SMTP de Supabase → Auth → Settings solo se usa para los correos que **Supabase Auth** manda por su cuenta (confirmación, magic link, recuperación). El correo con el código de invitación es nuestro, así que necesita su propio emisor. `app/lib/correo.ts` usa la **API HTTP de Resend con `fetch`**, sin SDK.

Degrada limpio, igual que los leads: sin `RESEND_API_KEY` la invitación se crea igual, la Server Action devuelve `correoEnviado: false` y el panel muestra el código para que el admin lo haga llegar por su cuenta. **El código se devuelve siempre**, se haya enviado el correo o no.

### El colaborador elige su propia contraseña al canjear
Cambio respecto a lo planteado al principio. La alternativa —generar una contraseña interna y dejarle solo la cookie— lo dejaría **sin forma de volver a entrar** cuando esa sesión caducara, obligando a reinvitarlo cada vez. Con contraseña, a partir del canje es una cuenta normal, y la pantalla de `/ventas/login` tiene dos pestañas: «Tengo un código» y «Ya tengo cuenta».

### Detalles del código de invitación
- Alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`: **sin I, O, 0 ni 1**, porque el admin va a dictarlo por teléfono cuando el correo no llegue y esos cuatro son los que siempre se confunden.
- Generado con `randomInt` (CSPRNG), no `Math.random`: es una credencial.
- Comparado con `timingSafeEqual`, para no filtrarlo carácter a carácter.
- Columna `intentos_fallidos`: a los 10 fallos la invitación se quema. El espacio de búsqueda ya hacía inviable la fuerza bruta, pero el canje es un endpoint público sin autenticar.
- Invitar de nuevo a la misma persona **revoca su invitación pendiente anterior**: solo debe haber un código vivo por persona, o revocar el acceso dejaría puertas abiertas sin notarlo.
- Los errores del canje son deliberadamente genéricos («Correo o código incorrectos»), para no revelar qué correos están invitados.

### Bug encontrado y corregido: bucle de redirección
Con rol insuficiente, el guard redirigía a `${base}/`, que **también está protegido** → el guard rechazaba otra vez → `ERR_TOO_MANY_REDIRECTS`. Se reprodujo con una sesión de `ventas` pidiendo `/admin`. Ahora redirige a `${base}/login?motivo=sin-permiso`, que queda fuera del guard: corta el ciclo y además permite entrar con la cuenta correcta. **Regla general: nunca redirigir a una ruta protegida desde el propio guard.**

### Verificado end-to-end en navegador
| Caso | Resultado |
|------|-----------|
| Código incorrecto | `intentos_fallidos` 0 → 1, mensaje genérico, código no revelado |
| Código correcto | Invitación → `usada` con **`codigo` a NULL**; cuenta creada y confirmada en `auth.users`; `perfiles` con `rol='ventas'`, `activo=true`, `ultimo_acceso` puesto |
| Sesión de ventas → `/ventas` | Acceso concedido |
| Sesión de ventas → `/admin` | Redirige a `/admin/login?motivo=sin-permiso` con mensaje claro, **sin bucle** |
| `activo = false` con JWT válido | Expulsado de inmediato a `/ventas/login?motivo=sin-acceso` |

Ese último caso es justo lo que justifica **no leer el rol del token**: el JWT seguía siendo criptográficamente válido y aun así el acceso se cortó al instante.

Datos de prueba borrados: `invitaciones` en 0, un solo usuario en `auth.users` (el admin).

## Fase 1d: pantalla de colaboradores ✅ (2026-09-12)

Primera pantalla real del panel. Cierra la Fase 1.

```
app/admin/(protegido)/
 ├─ layout.tsx              # guard + NavAdmin
 ├─ NavAdmin.tsx            # barra con enlaces y "Salir"
 ├─ page.tsx                # inicio
 └─ colaboradores/
     ├─ page.tsx            # listados (Server Component)
     └─ FormularioInvitar.tsx
```

Invitar por correo, listado de quién tiene acceso con su último acceso y botón de revocar/reactivar, y listado de invitaciones con estado, caducidad, intentos fallidos y el código visible **solo mientras siga pendiente** (al revocarse o canjearse la restricción lo pone a NULL, así que desaparece solo).

### Se lee con el cliente de SESIÓN, no con service_role
Deliberado: así estas consultas pasan por las políticas RLS de verdad. Si un día una política se rompe, la pantalla se queda vacía en vez de seguir funcionando por privilegio y ocultar el fallo hasta que lo explote alguien.

### Bug de fondo oscuro: reglas sin capa vs. Tailwind v4
El `<body className="bg-gray-50">` del layout de admin **se veía negro**. Causa: `globals.css` tiene `body { background: var(--background) }` (#0e0e0e) y esa regla va **sin `@layer`**; en Tailwind v4 las utilidades viven en `@layer utilities`, y **lo no-capeado gana a lo capeado por mucha especificidad que tenga la clase**. Una clase nunca iba a ganarle.

Solución: los root layouts internos marcan `<html data-superficie="interna">` y `globals.css` lleva una regla acotada, también sin capa, que les pone fondo claro. El sitio público no lleva el atributo y conserva su fondo oscuro, que es el que combina con el WebGL de Grainient. **Regla general para este repo: para pelear con algo de `globals.css` hay que hacerlo en `globals.css`, no con utilidades.**

### `cambiarAccesoColaborador` filtra por `rol = 'ventas'`
Para que un admin no pueda desactivarse a sí mismo —ni a otro admin— desde esta pantalla y quedarse sin forma de entrar al panel.

### `revalidatePath` usa la ruta INTERNA
`/admin/colaboradores`, no `/colaboradores`. El subdominio la sirve sin prefijo, pero `revalidatePath` opera sobre el árbol de rutas real.

### Verificado en navegador (con un admin temporal, borrado al terminar)
- Login de admin → panel; la barra muestra el correo y "Salir".
- Invitar → invitación creada, aviso «el correo no salió · falta configurar el proveedor» y **código mostrado en grande** para dictarlo. El código generado (`W5W6C7XK`) confirma el alfabeto sin I/O/0/1.
- La invitación aparece en el listado con su caducidad y estado `pendiente`.
- Revocar → estado `revocada` y **el código desaparece** del listado.
- El sitio público sigue sin el atributo `data-superficie` y con su fondo oscuro.

> Detalle menor pendiente: tras revocar, el panel verde de la invitación recién creada sigue mostrando el código en pantalla (es el resultado de la acción anterior en el cliente, no la base). El código ya está muerto; se limpia recargando.

Datos de prueba borrados: `invitaciones` en 0, un solo usuario en `auth.users` (el admin).

## Fase 2: esquema de contenido y migración de datos ✅ (2026-09-12)

Migraciones `20260912020339_create_tablas_contenido` y `..._crear_bucket_contenido`. Advisor de seguridad: **sin hallazgos sobre estas tablas**.

### Tablas
- **`lineas_producto`** — `slug` (validado con regex de slug), `nombre`, `descripcion`, `imagen`, `precio_desde`, `es_nuevo`, `orden`, `publicado`.
- **`linea_imagenes`** — galería aparte, para reordenar o borrar una foto sin reescribir el producto entero.
- **`servicios`** — `slug`, `titulo`, `descripcion`, `imagen`, `orden`, `publicado`.
- **`promociones`** + **`promocion_lineas`** — `tipo` enum (`descuento`/`paquete`/`liquidacion`), `valor` como **texto libre** a propósito (un descuento puede ser "20%", "2x1" o "$5,000 menos"; forzar número obligaría a inventar reglas de formato), vigencia con restricción `termina_en > inicia_en`.
- **`media`** — inventario de lo subido a Storage, para listarlo y borrarlo desde el panel sin recorrer el bucket.

### Modelo de acceso: distinto al de las tablas internas
Aquí **sí** hay lectura pública, porque el sitio y ventas consumen el catálogo. La política es `publicado = true OR private.es_admin()`: el visitante ve solo lo publicado, el admin ve también los borradores. Las imágenes y las promociones heredan la visibilidad de su padre. `media` no se expone. La escritura es solo admin en todas.

> Esto es exactamente lo que hacía falta prever en la Fase 1: sin el `EXECUTE` sobre `private.es_admin()` concedido a `anon`, estas consultas anónimas morirían con `42501` en vez de devolver el catálogo.

### Storage
Bucket `contenido`, 10 MB por archivo, MIME restringido a imágenes. `public = true` solo significa **lectura** sin firmar (lo que necesita `next/image`); subir, cambiar y borrar exigen admin vía políticas sobre `storage.objects`.

**Las 489 imágenes existentes NO se migraron.** Se quedan en `public/images`: ya se sirven bien desde el CDN de Vercel y moverlas obligaría a reescribir cada referencia del repo sin ganar nada. `app/lib/imagenes.ts` (`resolverImagen`, `esRemota`, `urlPublicaStorage`) distingue ruta local de URL de Storage, así que ambos orígenes acaban en el mismo `<Image>` sin repartir condicionales por las plantillas.

### Seed
`scripts/seed-contenido.mjs`, idempotente (upsert por `slug`). Importó **20 líneas, 226 imágenes de galería y 11 servicios**, con el orden del array original como `orden`. `empresa.ts` no se borra: sigue siendo la fuente de `EMPRESA`, `CONTACTO`, `REDES`, `VALORES`, `NOSOTROS`, `POLITICAS`, `FINISHES` y `NAVEGACION`.

> **Bug del parser, por si hay que tocarlo:** el script aísla el literal del array en `empresa.ts` sin compilar TypeScript. La primera versión buscaba el `[` desde el inicio de la declaración y encontraba el de la anotación de tipo (`LINEAS_PRODUCTO: LineaProducto[] =`), devolviendo una lista vacía — importó 0 líneas en silencio. Ahora busca el `[` **después del `=`**.

### Configuración
`next.config.ts` deriva el origen de Supabase de `NEXT_PUBLIC_SUPABASE_URL` y lo usa en dos sitios:
- `images.remotePatterns`, acotado a `/storage/v1/object/public/contenido/**`. Un patrón más abierto convertiría el optimizador de imágenes de Next en un proxy que cualquiera podría usar para servir imágenes ajenas desde nuestro dominio.
- CSP `img-src`.

**`connect-src` sigue SIN Supabase, y es deliberado**: auth y subidas pasan por Server Actions, así que el navegador nunca habla con Supabase directamente. Solo habría que abrirlo si algún día se usa `createBrowserClient`. Mientras tanto, un XSS tampoco puede llamar a la API desde la página.

### Verificado contra la API real con la clave publicable
| Prueba | Resultado |
|--------|-----------|
| Leer catálogo | 20 líneas, 226 imágenes, 11 servicios ✓ |
| Leer `media` | `[]` (inventario interno oculto) |
| Insertar una línea | `42501` RLS |
| Actualizar precio de `ceri` | HTTP 204 pero **0 filas afectadas** — RLS las filtró; el precio siguió en 5499 |
| Borrador (`publicado = false`) | Invisible en el listado **y** pidiéndolo por slug directo |
| CSP servida | `img-src` incluye Supabase, `connect-src` no |
| Sitio público | `/es/productos` y `/es/productos/ceri` siguen en 200 |

Ojo con el 204 del update: PostgREST responde así cuando RLS deja la consulta sin filas que tocar. Parece éxito y no lo es — hay que comprobar el dato, no el código de estado.

## Fase 3: panel de administración ✅ (2026-09-12)

Siete pantallas bajo `app/admin/(protegido)/`, todas detrás del guard de rol.

| Ruta | Qué hace |
|------|----------|
| `/admin` | Tablero con conteos reales y aviso de leads sin atender |
| `/admin/leads` | Bandeja única de cotizaciones + contactos, filtro por estado, edición de estado y notas |
| `/admin/productos` | CRUD de líneas, galería (añadir/quitar), publicar/despublicar |
| `/admin/servicios` | CRUD |
| `/admin/promociones` | CRUD con vigencia por fechas y cálculo de "vigente" |
| `/admin/medios` | Subida a Storage, copiar URL, borrado |
| `/admin/colaboradores` | (Fase 1d) |

### Todo escribe con el cliente de SESIÓN, no con `service_role`
Las políticas de admin ya autorizan exactamente estas operaciones, así que no hay razón para saltarse RLS. Si la sesión se pierde, la escritura **falla** en vez de aplicarse con privilegio. `service_role` queda reservado para lo que de verdad no puede pasar por RLS: guardar leads de formularios anónimos y canjear invitaciones.

`requerirPerfil(["admin"])` va **dentro de cada Server Action**, no solo en el layout: son endpoints POST alcanzables sin pasar por la UI.

### Los leads se muestran en una sola bandeja
`cotizaciones` y `contactos` se mezclan y se ordenan por fecha. A quien atiende le importa qué llegó primero, no de qué formulario vino; la etiqueta distingue el origen.

### El slug no se puede cambiar después de crear
El editor solo ofrece el campo al dar de alta. Cambiarlo rompería las URLs publicadas y cualquier enlace que apunte a ellas.

### Las subidas van por Server Action, no del navegador a Storage
El archivo viaja servidor → Storage. Eso mantiene `connect-src` cerrado en la CSP y evita exponer credenciales de subida al cliente. Si el registro en `media` falla después de subir, **se borra el objeto**: mejor deshacer que dejar basura invisible en el bucket. Al borrar se hace al revés — primero Storage, luego el registro — porque un fallo intermedio deja algo reintentable en vez de un archivo huérfano sin forma de encontrarlo.

### Error de build que conviene recordar
`A "use server" file can only export async functions, found object`. Lo provocó exportar el array `ESTADOS_LEAD` desde `app/actions/leads-admin.ts`. Las constantes compartidas con las pantallas viven ahora en **`app/lib/leads.ts`**. Mismo patrón que `app/lib/superficies.ts`: si una constante hace falta fuera de un módulo de acciones, va a su propio archivo.

También: un helper genérico `cuenta(tabla: A | B | C)` sobre el cliente tipado estrecha las columnas a las que **todas** las tablas comparten, así que `.eq("estado", …)` deja de compilar. Las consultas que filtran por columnas propias van sueltas.

### Verificado
Con una sesión de admin real (usuario temporal creado y borrado; las credenciales del dueño no se tocaron), ejecutando **las mismas consultas que hacen las pantallas**, bajo RLS y con la clave publicable:

- Lecturas: productos (20 + galería embebida), servicios (11), leads, promociones, medios, colaboradores — todas ✓.
- Escrituras: update de producto, insert+delete de promoción, y update de lead — todas ✓, con el dato comprobado (`estado: contactado`, `notas: "Nota de prueba"`).
- Guard: las 7 rutas protegidas responden 307 al login sin sesión; `/admin/login` da 200.
- Sitio público intacto (`/es`, `/es/productos` en 200).
- `tsc` y `eslint` en cero; build con las 7 rutas como `ƒ (Dynamic)`.

> **Sin verificar: el renderizado de las pantallas en navegador.** La extensión de Chrome se desconectó tras el reinicio que pidió la instalación del plugin `context-mode`, así que se probó la capa de datos y el enrutado, no la UI. Queda pendiente un recorrido visual: crear un producto, subir una imagen y marcar un lead.

## Fase 4: módulo de ventas ✅ (2026-09-12)

Herramienta interna para el equipo comercial, `noindex`, solo lectura.

| Ruta | Qué muestra |
|------|-------------|
| `/ventas` | Catálogo con buscador, filtro de novedades y aviso de promociones vigentes |
| `/ventas/producto/[slug]` | Detalle con galería, precio y promociones que le aplican |
| `/ventas/servicios` | Los 11 servicios publicados |
| `/ventas/promociones` | Vigentes, con días restantes y productos asociados |

### `app/lib/contenido.ts`: un módulo para las tres superficies
Lee el catálogo con el **cliente de sesión**, y eso hace que el mismo código sirva a ventas, al admin y —en la Fase 5— al sitio público sin ramificar: sin cookie el rol es `anon` y las políticas devuelven solo lo publicado y las promociones vigentes; con sesión de admin devuelven también los borradores. **La visibilidad la decide la base, no el código que llama.**

Por eso `obtenerPromociones()` no filtra por fecha: la política `promociones: lectura de las vigentes` ya excluye inactivas y fuera de rango. Repetirlo en el código duplicaría la regla en dos sitios que podrían desincronizarse.

### Detalles pensados para el uso real
- **El buscador mira también la descripción**, no solo el nombre: frente al cliente se pregunta por características ("con ducto pasacable"), no por el nombre de la línea. Verificado: buscar "pasacable" devuelve Línea Silver.
- Normaliza acentos, para que teclear rápido sin tildes siga encontrando.
- Las promociones vigentes salen como **aviso** en la cabecera del catálogo, no como una sección más: es lo primero que un vendedor necesita tener en la cabeza.
- Reutiliza `app/components/ui/Gallery.tsx` del sitio público en vez de crear otro visor.
- `NavVentas` reutiliza `cerrarSesion` de admin: es la misma operación y `baseDeSuperficie()` ya resuelve a qué login volver.

### Verificado en navegador (extensión reconectada)
Con sesión de admin temporal (creado y borrado; las credenciales del dueño no se tocaron):

- Login de ventas por la pestaña «Ya tengo cuenta» → catálogo con las 20 líneas, precios, conteo de fotos y distintivos de novedad.
- Búsqueda «pasacable» → 1 de 20 líneas, encontrada **por su descripción**.
- Detalle de Línea Silver → galería de 4 imágenes, precio y descripción.
- **Integración completa de las fases 2-3-4**: se creó una promoción desde `/admin/promociones` y apareció de inmediato en `/ventas` («1 promoción vigente») y en `/ventas/promociones`.
- Panel de admin renderizando con su navegación completa — cierra la verificación visual que quedó pendiente de la Fase 3.
- Servicios: los 11 con sus imágenes.

> Falsa alarma investigada: las miniaturas de servicios salían en blanco en la primera captura. Se comprobaron **las 257 rutas de imagen** de la base contra el disco (11 servicios + 20 portadas + 226 de galería): **0 rotas**. Era carga diferida, no un problema de datos.

Datos de prueba borrados; promociones en 0.

## Fase 5: el sitio público lee del CMS ✅ (2026-09-12)

Lo delicado de todo el proyecto: tocar páginas que ya funcionaban. **El sitio sigue 100% estático.**

### La clave: un cliente SIN cookies
`app/lib/supabase/public.ts` → `createPublicClient()`. En cuanto un componente de servidor toca `cookies()`, Next marca la ruta como dinámica y se pierden las 60 rutas SSG. `contenido.ts` migró de `createSessionClient` a este cliente, y por eso `/es/productos/ceri` y compañía siguen apareciendo como `●` (SSG) en el build.

Actúa como `anon`, así que las políticas devuelven exactamente lo que debe ver un visitante. Ventas obtiene lo mismo y es correcto: un rol `ventas` tampoco es admin. **El panel NO pasa por aquí** — tiene sus propias consultas con el cliente de sesión, que es lo que le deja ver los borradores.

### Qué se migró
`productos/page.tsx` + `ProductosPage`, `productos/[linea]`, `servicios/page.tsx` + `ServiciosPage`, `sitemap.ts`, y los componentes cliente del home (`Services`, `NewProducts`) y `NavSearch`, que ahora reciben los datos por props desde sus padres servidor. `Navbar` pasó a Server Component para alimentar el buscador.

`empresa.ts` sigue siendo la fuente de `EMPRESA`, `CONTACTO`, `REDES`, `VALORES`, `NOSOTROS`, `POLITICAS`, `FINISHES`, `NAVEGACION`.

### Revalidación
ISR con `revalidate = 3600` como red de seguridad, más `revalidarSitioPublico()` en cada acción del panel que toque contenido publicable. Invalida `/[locale]` como **layout** (el buscador del navbar vive ahí y ofrecería líneas ya borradas), las páginas de productos y servicios, y el sitemap. `cacheTag` quedó descartado: exige `cacheComponents: true`, que cambia el prerenderizado de toda la app.

### Bug encontrado: números escritos a mano
Al despublicar "ceri" el cuerpo decía 19 y **la meta description seguía diciendo 20**. `productos/page.tsx` pasó de `export const metadata` a `generateMetadata()` con el conteo real. Los demás ("20 líneas" en contacto, nosotros y la 404) dejaron de nombrar una cifra que el admin puede cambiar. **Regla: con el catálogo editable, ningún conteo va escrito a mano.**

### ⚠️ `.next/cache` puede servir contenido rancio tras un build
Sitemap con 20 productos y la ficha del producto 20 dando 404, **en el mismo build**. Causa: Next conserva el Full Route Cache entre builds y reutilizó salida de la compilación anterior. Con `rm -rf .next/cache` todo cuadró en 19.

Importa porque **Vercel restaura esa caché entre despliegues**. Mitigado por el `revalidate = 3600` (se cura solo en una hora) y porque la revalidación en vivo sí funciona. Si alguna vez aparece catálogo desfasado justo tras un deploy, la causa es esta.

### Verificado end-to-end, sin reconstruir
Despublicar "ceri" desde el panel → `/es/productos/ceri` da 404, desaparece del listado, del sitemap (19) y del buscador del navbar. Volver a publicarlo → todo regresa (200, 20 líneas en cuerpo **y** meta, 20 en sitemap). El catálogo quedó en su estado original.

## Páginas 404 con identidad de marca ✅ (2026-09-12)

Cuatro archivos, y el reparto no es obvio:

| Archivo | Cuándo se sirve |
|---------|-----------------|
| `app/not-found.tsx` | **URLs que no casan con ninguna ruta** — el caso más común |
| `app/[locale]/not-found.tsx` | `notFound()` dentro del sitio público (producto despublicado) |
| `app/ventas/not-found.tsx` | `notFound()` en ventas (ficha de producto inexistente) |
| `app/admin/not-found.tsx` | `notFound()` en el panel |

**La global era la que faltaba y es la que más se ve.** Las `not-found.tsx` de segmento solo cubren llamadas explícitas a `notFound()`; una dirección suelta como `/cualquier-cosa` no llega a ellas y Next servía su 404 en blanco y negro con texto en inglés.

Como no existe `app/layout.tsx` —cada superficie aporta su root layout—, `app/not-found.tsx` **debe renderizar su propio `<html>`/`<body>`** y declarar su `metadata`, o el navegador muestra la URL cruda como título.

La del sitio público deja el fondo transparente para que se vea el Grainient del layout, y sus enlaces van **sin prefijo de locale** a propósito: `not-found.tsx` no recibe `params`, así que el proxy los resuelve con la cookie `NEXT_LOCALE` y cada visitante aterriza en su idioma.

Verificado en navegador: las cuatro renderizan con logo, el 404 en degradado verde de marca y enlaces útiles; ninguna cae ya en la de Next.

## Subida de medios: verificada ✅ (2026-09-12)

Última pieza del panel que quedaba sin ejercitar en navegador. Se subió un WebP de prueba y se borró después; **bucket y tabla quedaron en 0**.

### Subida
El nombre se sanea y se prefija: `2026-09/37c2989a-prueba-borrar-subida.webp` — carpeta por mes, UUID corto y nombre normalizado. Verificado en las tres capas: registro en `media` con mime, bytes, `alt` y `subida_por`; objeto en el bucket con su tamaño real; y la URL pública sirviendo `200 image/webp`.

### Borrado
Deja las dos capas limpias: `media` en 0, bucket en 0, y la URL pública pasa a **400**. Confirma que el orden elegido —primero Storage, luego el registro— no deja archivos huérfanos.

### RLS de Storage, probada de verdad
El primer intento de subida anónima rebotó con *"mime type application/octet-stream is not supported"*, que es la restricción de MIME del bucket y **no prueba nada sobre los permisos**. Repetido con un WebP real y su `contentType` correcto, el rechazo vino de donde debía: **`new row violates row-level security policy`**. El borrado anónimo tampoco tuvo efecto y `media` devuelve `[]`.

> Lección para futuras pruebas de permisos: un rechazo no vale si pudo venir de una validación previa. Hay que llegar hasta la capa que se quiere comprobar.

### Nota operativa: las cookies ignoran el puerto
Durante la prueba la barra del panel mostraba `gecotay@gmail.com` en vez del admin temporal recién creado. Las cookies se comparten entre puertos del mismo host, así que la sesión de `localhost:3000` (el dev server del desarrollador) aplica también a `localhost:3200`. **Al probar en local hay que mirar quién aparece en la barra antes de dar por hecho con qué cuenta se está actuando.**

### Nota de automatización
El `confirm()` nativo del botón de borrado congela la automatización del navegador. Hay que sustituirlo (`window.confirm = () => true`) antes de pulsar, y **rehacerlo tras cada recarga**. Además, los clics por referencia de accesibilidad no envían estos formularios: hay que pulsar por coordenadas.

## Pending / To‑Do (🔲)

| Area | Tasks |
|------|-------|
| **Convenciones Next.js 16** | Recordar al agregar páginas nuevas: `params`/`searchParams` son **Promises** (`await`), el proxy es `proxy.ts` (no `middleware.ts`), y revisar `node_modules/next/dist/docs/` antes de usar APIs — hay breaking changes vs. Next 15. |
| **Splash en móviles lentos** | Recortado a ~1.9 s efectivos el 2026-09-11. Falta **medir** con Lighthouse en móvil real; si sigue penalizando, la siguiente palanca es mostrarlo una sola vez por sesión (`sessionStorage`) en vez de en cada recarga. |
| **Lighthouse / Core Web Vitals** | Full CI run (performance ≥ 90, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90). Current local run timed‑out; need stable ChromeDriver. |
| **Automated Accessibility (axe)** | ChromeDriver version mismatch – install matching driver (`npx browser-driver-manager install chrome`) and re‑run. |
| **Image Optimisation** | Replace remaining placeholder images (product/finish) with final brand photography; ensure all `alt` texts are descriptive. *(2026‑09‑03: the old "category grid" feature and its 18 orphaned images — 5 categories × jpg+webp + 4 products × jpg+webp, ~3.9MB, zero references in code — were removed entirely; `public/images` is now 100% WebP except the 2 intentionally‑PNG logo files.)* |
| **Backend / CMS / Cuentas del cliente** | Roadmap de varias fases diseñado y aprobado: Supabase (Postgres + Auth + Storage) como backend, panel de administrador para editar todo el contenido del sitio, módulo de **ofertas/promociones**, y módulo de **ventas** (catálogo + ofertas), ambos servidos por subdominio (`app.gecotay.com`, `ventas.gecotay.com`, sin login expuesto en el sitio público) en vez de rutas dentro del dominio principal. **Bloqueado** en varios frentes por falta de acceso al correo del dueño del negocio: no se puede (1) crear el proyecto de Supabase a su nombre, (2) transferir el proyecto de Vercel a su cuenta, (3) confirmar/tocar el DNS de `gecotay.com` en GoDaddy (el desarrollador tampoco tiene acceso al panel de GoDaddy sin ese correo). Mientras tanto todo sigue en cuentas personales del desarrollador. Ya implementado como preparación, sin depender de Supabase: `app/data/empresa.ts` usa `NEXT_PUBLIC_SITE_URL` (con fallback a `https://www.gecotay.com`) en vez de la URL hardcodeada, para no requerir cambios de código al conectar el dominio real. |
| **Traducción real de `/en`** | Solo el home y el chrome (`NavMenu`, `NavBrand`, `NavSearch`, `Footer`, `CookieBanner`) consumen los catálogos. Las 8 páginas internas tienen el español hardcodeado — la más densa es `aviso-privacidad` (texto legal, ~188 caracteres acentuados), luego `contacto`, `cotizar`, `productos`, `servicios`, `nosotros`, `acabados-tapices`, `descargas`. Hasta que eso se extraiga a `es.json`/`en.json` y se traduzca, `/en` queda `noindex` (ver sección 2026-09-11). |
| **Desactivar registros públicos** | Pendiente en Supabase → Auth → Settings. Sin eso cualquiera puede crearse una cuenta en Auth; no obtendría acceso (no hay trigger que autocree perfiles), pero es ruido innecesario. |
| **SMTP propio** | El de Supabase está limitado a unos pocos correos por hora. Necesario antes de probar las invitaciones de colaboradores (Resend o SendGrid en Auth → Settings). |
| **Proveedor de correo** | Falta `RESEND_API_KEY` y verificar el dominio remitente en Resend. Sin eso las invitaciones se crean pero no se envían; el admin tiene que dictar el código. |
| **Protección de contraseñas filtradas** | Supabase la reporta desactivada. Es un toggle en Auth → Settings que compara contra HaveIBeenPwned; relevante ahora que los colaboradores eligen su propia contraseña. |
| **Peso de `public/`** | 38 MB (27 MB imágenes + 12 MB PDFs), con `docs/gecotay-catalogo-2026.pdf` de **8.5 MB** servido directo desde `/descargas`. Candidatos claros a Supabase Storage: salen del repo y del bundle de deploy. |
| **Content Review** | Verify copy with marketing (FAQ answers, TL;DR copy, CTA wording). |
| **Testing** | Unit tests (Jest + React Testing Library), E2E (Cypress) for critical flows (cotizar wizard, contact form). |
| **Analytics / Consent** | No hay **nada** instalado (ni GA4, ni Matomo, ni Sentry). El `CookieBanner` guarda un consentimiento en `localStorage` (`gecotay-cookie-consent`) que hoy no gobierna absolutamente nada — al conectar analytics, ese valor tiene que ser el que active/bloquee los scripts. |
| **Deploy Pipeline** | GitHub Actions → build → lint → test → deploy to Vercel/Netlify. |
| **Monitoring** | Error tracking (Sentry), uptime checks. |

## Key Files & Directories
```
proxy.ts                     # Locale detection & redirect (Next 16 "Proxy", ex-middleware)
app/
 ├─ sitemap.ts               # Sitemap dinámico por locale + hreflang
 ├─ robots.ts                # /robots.txt
 ├─ [locale]/
 │   ├─ layout.tsx           # ROOT LAYOUT: html/body, fonts, metadata, SplashScreen, JSON-LD
 │   ├─ page.tsx             # Home (Hero, Services, About, NewProducts, WhyChoose)
 │   ├─ productos/
 │   │   ├─ page.tsx
 │   │   ├─ ProductosPage.tsx
 │   │   └─ [linea]/page.tsx
 │   ├─ servicios/
 │   │   ├─ page.tsx
 │   │   └─ ServiciosPage.tsx
 │   ├─ nosotros/
 │   │   ├─ page.tsx
 │   │   └─ NosotrosPage.tsx
 │   ├─ acabados-tapices/
 │   │   ├─ page.tsx
 │   │   └─ AcabadosPage.tsx
 │   ├─ contacto/
 │   │   ├─ page.tsx
 │   │   └─ ContactoPage.tsx
 │   ├─ cotizar/
 │   │   ├─ page.tsx
 │   │   └─ CotizarPage.tsx
 │   ├─ aviso-privacidad/page.tsx
 │   └─ descargas/page.tsx
 ├─ components/
 │   ├─ CookieBanner.tsx
 │   ├─ ui/
 │   │   ├─ SplashScreen.tsx          # NEW
 │   │   ├─ Gallery.tsx
 │   │   ├─ WhatsAppFloat.tsx
 │   │   ├─ Grainient.tsx             # ReactBits (MCP)
 │   │   ├─ GrainientBackground.tsx   # Configurable
 │   │   ├─ Icons.tsx
 │   │   ├─ CircularGallery.tsx
 │   │   ├─ KeyTakeaways.tsx
 │   │   ├─ EarlyCTA.tsx
 │   │   ├─ FAQSection.tsx
 │   │   └─ CoverflowCarousel.tsx
 │   ├─ layout/
 │   │   ├─ Navbar.tsx
 │   │   ├─ NavBrand.tsx
 │   │   ├─ NavMenu.tsx
 │   │   ├─ NavSearch.tsx
 │   │   ├─ LocaleSwitcher.tsx        # NEW (selector ES/EN en el dropdown)
 │   │   └─ Footer.tsx
 │   └─ home/
 │       ├─ Hero.tsx                  # Overhauled (h1/h2, locale nav)
 │       ├─ Services.tsx
 │       ├─ About.tsx                 # NEW
 │       ├─ NewProducts.tsx           # NEW
 │       └─ WhyChoose.tsx             # NEW
 ├─ actions/
 │   └─ leads.ts                      # NEW Server Actions: guardarContacto / guardarCotizacion
 ├─ lib/
 │   ├─ i18n.ts                       # t(locale, key) helper
 │   └─ supabase/
 │       ├─ server.ts                 # NEW cliente service_role (server-only)
 │       └─ types.ts                  # NEW tipos generados — no editar a mano
 ├─ messages/
 │   ├─ es.json
 │   └─ en.json
 └─ data/
     └─ empresa.ts                    # Brand data, esNuevo flags
supabase/
 └─ migrations/
     └─ 20260911222650_create_leads_tables.sql   # NEW esquema de leads (aplicado en remoto)
.env.example                          # NEW variables documentadas (.env.local es local y va ignorado)
scripts/
 └─ rebrand-ecotay-to-gecotay.mjs     # Automated rebrand
public/
 ├─ images/
 │   ├─ logo/*.webp
 │   ├─ carousel/*.webp
 │   ├─ hero/hero-main.webp
 │   ├─ categories/*.webp
 │   ├─ products/*.webp
 │   └─ finishes/*.webp
 ├─ favicon.ico, *.png, *.webmanifest
```
> Nota: el sitemap ya no es un archivo estático en `public/` — se genera en `/sitemap.xml` vía `app/sitemap.ts`.

## MCP de Supabase

Configurado el 2026-09-11 en `.mcp.json` (scope de proyecto, commiteado):

```
claude mcp add --scope project --transport http supabase \
  "https://mcp.supabase.com/mcp?project_ref=ffhyxkawjcegvbgbfqke&features=docs,account,database,debugging,development,functions,branching"
```

La autenticación es OAuth y **debe hacerse desde una terminal normal, no desde una extensión de IDE**: `claude` → `/mcp` → seleccionar `supabase` → Authenticate. El token es por máquina, así que cada desarrollador lo hace una vez.

Opcional, sin correr todavía: `npx skills add supabase/agent-skills`.

## How to Run Locally
```bash
cd /home/yonann/Documentos/GECOTAY/gecotay
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
```

## Useful Commands (CI)
```bash
npm run lint
npm run typecheck   # tsc --noEmit
npm run test        # (to be added)
npx lighthouse http://localhost:3000 --output=json --output-path=lighthouse-report.json
npx @axe-core/cli http://localhost:3000
```

---
*Generated on 2026‑08‑21 · Updated 2026‑08‑22 – architectural fixes (single root layout, Proxy migration, dynamic sitemap/robots, splash rework, chrome i18n, lint clean, mobile nav fix) · Updated 2026‑09‑11 – auditoría completa: Grainient duplicado, splash recortado, JSON‑LD server‑rendered, `/en` despublicado + selector de idioma, MCP de Supabase.*