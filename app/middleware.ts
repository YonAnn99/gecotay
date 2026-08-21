import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && locales.includes(cookie)) return cookie;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(preferred)) return preferred;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
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
      response.cookies.set("NEXT_LOCALE", currentLocale, { path: "/", maxAge: 31536000 });
    }
    return response;
  }

  // Redirect to locale-prefixed URL
  const locale = getLocale(request);
  const newUrl = `/${locale}${pathname}${request.nextUrl.search}`;
  const response = NextResponse.redirect(new URL(newUrl, request.url));
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon|.*\\.).*)"],
};