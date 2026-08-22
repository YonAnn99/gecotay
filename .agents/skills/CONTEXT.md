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
- Solo se muestra **una vez por sesión** (`sessionStorage`), dura 1.5 s + fade 0.4 s; renderiza `null` en SSR (no bloquea LCP).
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
| **SplashScreen rework** | Ratio intrínseco real del logo (436×280, antes 280×81 → warning de next/image); una vez por sesión, 1.5 s + fade 0.4 s (antes 2.5 s fijos), sin SSR (LCP), reduced-motion friendly. `NavBrand` y `Footer` también con dims correctas. |
| **i18n chrome completo** | Catálogos ampliados (`nav.*`, `footer.*`, `cookies.*`); `NavMenu`, `Footer` y `CookieBanner` localizados (CookieBanner además tenía links sin prefijo de locale). |
| **Lint limpio** | 0 errores (4 `any`/`<a>`→`<Link>` corregidos); `.agents/**` excluido en `eslint.config.mjs`. Quedan solo 2 warnings del código vendoreado de ReactBits (`Grainient.tsx`). |
| **Nav responsive** | Islands del nav reposicionadas para móviles: `top-5 left-4/right-4` con tamaños reducidos < 640px (antes `left-30/right-30` se solapaban/overflow en pantallas pequeñas); etiqueta del menú oculta < 420 px. |

## Pending / To‑Do (🔲)

| Area | Tasks |
|------|-------|
| **Lighthouse / Core Web Vitals** | Full CI run (performance ≥ 90, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90). Current local run timed‑out; need stable ChromeDriver. |
| **Automated Accessibility (axe)** | ChromeDriver version mismatch – install matching driver (`npx browser-driver-manager install chrome`) and re‑run. |
| **Image Optimisation** | Replace remaining placeholder images (category/product/finish) with final brand photography; ensure all `alt` texts are descriptive. |
| **Content Review** | Verify copy with marketing (FAQ answers, TL;DR copy, CTA wording). |
| **Testing** | Unit tests (Jest + React Testing Library), E2E (Cypress) for critical flows (cotizar wizard, contact form). |
| **Analytics / Consent** | Integrate GA4 / Matomo + cookie banner respecting GDPR. |
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
 │   ├─ products/
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
 │   ├─ ui/
 │   │   ├─ SplashScreen.tsx          # NEW
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
 │   │   └─ Footer.tsx
 │   └─ home/
 │       ├─ Hero.tsx                  # Overhauled (h1/h2, locale nav)
 │       ├─ Services.tsx
 │       ├─ About.tsx                 # NEW
 │       ├─ NewProducts.tsx           # NEW
 │       └─ WhyChoose.tsx             # NEW
 ├─ lib/
 │   └─ i18n.ts                       # t(locale, key) helper
 ├─ messages/
 │   ├─ es.json
 │   └─ en.json
 └─ data/
     └─ empresa.ts                    # Brand data, esNuevo flags
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
*Generated on 2026‑08‑21 · Updated 2026‑08‑22 – architectural fixes (single root layout, Proxy migration, dynamic sitemap/robots, splash rework, chrome i18n, lint clean, mobile nav fix).*