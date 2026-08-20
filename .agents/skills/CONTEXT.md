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

## Pending / To‑Do (🔲)

| Area | Tasks |
|------|-------|
| **Lighthouse / Core Web Vitals** | Full CI run (performance ≥ 90, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90). Current local run timed‑out; need stable ChromeDriver. |
| **Automated Accessibility (axe)** | ChromeDriver version mismatch – install matching driver (`npx browser-driver-manager install chrome`) and re‑run. |
| **Image Optimisation** | Replace remaining placeholder images (category/product/finish) with final brand photography; ensure all `alt` texts are descriptive. |
| **Content Review** | Verify copy with marketing (FAQ answers, TL;DR copy, CTA wording). |
| **Internationalisation (i18n)** | Add English (or other) locale if required. |
| **Testing** | Unit tests (Jest + React Testing Library), E2E (Cypress) for critical flows (cotizar wizard, contact form). |
| **Analytics / Consent** | Integrate GA4 / Matomo + cookie banner respecting GDPR. |
| **Deploy Pipeline** | GitHub Actions → build → lint → test → deploy to Vercel/Netlify. |
| **Monitoring** | Error tracking (Sentry), uptime checks. |

## Key Files & Directories
```
app/
 ├─ layout.tsx               # Global metadata, LocalBusiness schema, fonts
 ├─ page.tsx                 # Home (Hero + Services + Footer)
 ├─ not-found.tsx
 ├─ productos/
 │   ├─ page.tsx             # metadata + ProductosPage
 │   └─ ProductosPage.tsx    # TL;DR, early CTA, FAQ, categories, featured
 ├─ servicios/
 │   ├─ page.tsx
 │   └─ ServiciosPage.tsx
 ├─ nosotros/
 │   ├─ page.tsx
 │   └─ NosotrosPage.tsx
 ├─ acabados-tapices/
 │   ├─ page.tsx
 │   └─ AcabadosPage.tsx
 ├─ contacto/
 │   ├─ page.tsx
 │   └─ ContactoPage.tsx
 ├─ cotizar/
 │   ├─ page.tsx
 │   └─ CotizarPage.tsx
 └─ components/
     ├─ ui/
     │   ├─ KeyTakeaways.tsx
     │   ├─ EarlyCTA.tsx
     │   ├─ FAQSection.tsx
     │   └─ CoverflowCarousel.tsx
     ├─ layout/
     │   ├─ Navbar.tsx
     │   ├─ NavBrand.tsx
     │   ├─ NavLinks.tsx
     │   ├─ MobileMenuButton.tsx
     │   ├─ MobileDrawer.tsx
     │   └─ Footer.tsx
     └─ home/
         ├─ Hero.tsx
         └─ Services.tsx
public/
 ├─ images/
 │   ├─ logo/*.webp
 │   ├─ carousel/*.webp
 │   ├─ hero/hero-main.webp
 │   ├─ categories/*.webp
 │   ├─ products/*.webp
 │   └─ finishes/*.webp
 ├─ favicon.ico, *.png, *.webmanifest
 └─ sitemap.xml
```

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
*Generated on 2026‑08‑20 – reflects state after commit **38b0220** (SEO audit implementation).*