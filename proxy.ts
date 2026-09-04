import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

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

export function proxy(request: NextRequest) {
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
