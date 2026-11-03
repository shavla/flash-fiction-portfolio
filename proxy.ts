import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ka"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  // 1. Language the user picked with the switcher
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (saved && locales.includes(saved)) return saved;

  // 2. Browser language preference
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => locales.includes(code));

  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // e.g. /flash -> /ka/flash
  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next.js internals and files with an extension (favicon.ico, images, ...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
