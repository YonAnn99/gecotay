import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refrescarSesion } from "./app/lib/supabase/proxy-session";
import { HEADER_BASE, SUPERFICIES } from "./app/lib/superficies";

const locales = ["es", "en"];
const defaultLocale = "es";

/**
 * Resuelve a qué superficie pertenece una petición a partir del Host.
 *
 * Devuelve el prefijo interno (`/admin`, `/ventas`) o `null` para el sitio
 * público. Reconoce tanto los subdominios reales (`app.gecotay.com`) como los
 * de desarrollo (`app.localhost:3000`), que Chrome resuelve sin tocar
 * /etc/hosts.
 */
const CABECERA_INTERNA = ["X-Robots-Tag", "noindex, nofollow, noarchive"] as const;

/**
 * Marca una respuesta de admin/ventas como no indexable.
 *
 * Es la tercera capa, no la principal. Por orden de fiabilidad:
 *   1. `robots` en el metadata de cada root layout → <meta name="robots">.
 *   2. La regla `has: host` de next.config.ts, que se evalúa antes del
 *      enrutado y sí sobrevive al caché.
 *   3. Esto, que solo llega cuando la respuesta NO sale del caché de
 *      prerenderizado: con `x-nextjs-cache: HIT` los headers que pone el
 *      proxy se descartan (verificado con curl contra el build de
 *      producción). Vale la pena mantenerlo porque en cuanto estas rutas
 *      tengan sesión dejarán de ser estáticas.
 */
function marcarInterna(response: NextResponse): NextResponse {
  response.headers.set(CABECERA_INTERNA[0], CABECERA_INTERNA[1]);
  return response;
}

function superficieDeHost(host: string | null): string | null {
  if (!host) return null;
  const sub = host.split(":")[0].split(".")[0].toLowerCase();
  return SUPERFICIES.find((s) => s.sub === sub)?.prefijo ?? null;
}

function getLocale(request: NextRequest): string {
  // Intentionally does not fall back to the browser's Accept-Language header:
  // this site targets Spanish-speaking visitors and the English content is
  // not fully translated yet (see .agents/skills/CONTEXT.md), so a browser
  // set to English would otherwise land on a half-translated /en experience
  // with no way to switch back (there is no language switcher UI). New
  // visitors always get /es; /en stays reachable by direct URL, and the
  // NEXT_LOCALE cookie remembers whichever locale was last visited.
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files, api, _next, images, favicon, files with dot
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const superficie = superficieDeHost(request.headers.get("host"));

  if (superficie) {
    // Refrescamos la sesión ANTES de enrutar y aplicamos las cookies a la
    // respuesta final, para que el token renovado sobreviva a la reescritura.
    const aplicarCookies = await refrescarSesion(request);
    // Base vacía: la petición llegó por subdominio, así que los enlaces
    // internos van sin prefijo (app.gecotay.com/login).
    request.headers.set(HEADER_BASE, "");
    // Subdominio de admin o ventas: reescribimos a su prefijo interno.
    // Estas superficies no tienen locale — son herramientas internas en
    // español — así que nunca pasan por la lógica de abajo.
    // Reescritura (no redirect): la URL que ve el usuario sigue siendo
    // app.gecotay.com/productos, no app.gecotay.com/admin/productos.
    if (pathname.startsWith(`${superficie}/`) || pathname === superficie) {
      return aplicarCookies(marcarInterna(NextResponse.next({ request })));
    }
    const url = request.nextUrl.clone();
    url.pathname = `${superficie}${pathname === "/" ? "" : pathname}`;
    return aplicarCookies(marcarInterna(NextResponse.rewrite(url, { request })));
  }

  // A partir de aquí es el sitio público. En producción sus rutas internas
  // no deben ser alcanzables desde el dominio principal: el panel solo se
  // entra por su subdominio. En dev y en los previews de Vercel (donde los
  // subdominios propios no existen) sí se dejan pasar, o no habría forma de
  // trabajar en ellos antes de conectar el dominio.
  const esRutaInterna = SUPERFICIES.some(
    ({ prefijo }) => pathname === prefijo || pathname.startsWith(`${prefijo}/`)
  );
  if (esRutaInterna) {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    // Modo ruta directa (dev y previews de Vercel, sin subdominio propio):
    // los enlaces internos necesitan conservar el prefijo.
    const base = SUPERFICIES.find(
      ({ prefijo }) => pathname === prefijo || pathname.startsWith(`${prefijo}/`)
    )!.prefijo;
    const aplicarCookies = await refrescarSesion(request);
    request.headers.set(HEADER_BASE, base);
    return aplicarCookies(marcarInterna(NextResponse.next({ request })));
  }

  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const currentLocale = pathname.split("/")[1];
    if (locales.includes(currentLocale)) {
      response.cookies.set("NEXT_LOCALE", currentLocale, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
        httpOnly: true,
        secure: request.nextUrl.protocol === "https:",
      });
    }
    return response;
  }

  // Redirect to locale-prefixed URL
  const locale = getLocale(request);
  const newUrl = `/${locale}${pathname}${request.nextUrl.search}`;
  const response = NextResponse.redirect(new URL(newUrl, request.url));
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon|.*\\.).*)"],
};
