import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Origen de Supabase Storage, de donde salen las imágenes que el admin sube
// desde el panel. Se deriva de la variable de entorno para que un cambio de
// proyecto no obligue a tocar la CSP ni los patrones de next/image.
const SUPABASE_ORIGEN = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
})();

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'unsafe-eval' is only needed for Turbopack/webpack HMR in development.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Storage sirve las imágenes que el admin sube; el resto del catálogo
      // sigue viniendo de public/images, que entra por 'self'.
      `img-src 'self' data:${SUPABASE_ORIGEN ? ` ${SUPABASE_ORIGEN}` : ""}`,
      "frame-src https://www.google.com",
      // CircularGallery fetches the Figtree stylesheet + font files at runtime
      // (fonts.googleapis.com serves the CSS, fonts.gstatic.com the font files).
      //
      // Supabase NO está aquí, y es deliberado: la autenticación y las subidas
      // pasan por Server Actions, así que el navegador nunca habla con
      // Supabase directamente. Solo habría que abrirlo si algún día se usa
      // `createBrowserClient` (subidas directas a Storage, realtime). Mientras
      // no haga falta, un XSS tampoco puede llamar a la API desde la página.
      `connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com${isDev ? " ws:" : ""}`,
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    // Solo el bucket `contenido` de nuestro proyecto de Supabase. Se acota a
    // ese pathname a propósito: un `remotePatterns` demasiado abierto
    // convierte el optimizador de imágenes de Next en un proxy que cualquiera
    // puede usar para servir imágenes ajenas desde nuestro dominio.
    remotePatterns: SUPABASE_ORIGEN
      ? [
          {
            protocol: "https",
            hostname: new URL(SUPABASE_ORIGEN).hostname,
            pathname: "/storage/v1/object/public/contenido/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // The /en routes are reachable (navbar language switcher) but their page
        // content is still Spanish, so they must not be indexed as English
        // duplicates. `follow` keeps link equity flowing to the /es originals.
        // Drop this rule once app/messages/en.json actually covers the pages.
        source: "/en/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/en",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        // Admin y ventas son herramientas internas, nunca indexables.
        //
        // La defensa primaria es el `robots` de sus metadata, que emite
        // <meta name="robots" content="noindex, nofollow, nocache"> en el
        // HTML. Este header es el refuerzo, y casa por HOST y no por `source`
        // a propósito: el proxy reescribe "/" → "/admin" en el subdominio, y
        // tanto `source` como los headers que ponga el proxy se pierden
        // cuando la respuesta sale del caché de prerenderizado
        // (`x-nextjs-cache: HIT`). `has: host` se evalúa antes del enrutado,
        // así que sí aplica. Cubre los subdominios de producción y los
        // `*.localhost` de desarrollo.
        source: "/:path*",
        has: [{ type: "host", value: "(app|ventas)\\..*" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        // Acceso por ruta directa, que es como se navegan estas superficies
        // en dev y en los previews de Vercel (sin subdominio propio).
        source: "/:superficie(admin|ventas)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/:superficie(admin|ventas)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
