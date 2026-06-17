import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security proxy — Next.js 16 replacement for middleware.ts.
 *
 * Runtime hardening layer:
 * 1. Block direct access to sensitive file types that should never be
 *    served to the client (source maps, env files, lock files, raw
 *    source code, README, config files).
 * 2. Restrict /api enumeration — only /api root is allowed, all other
 *    /api/* paths return 404 (defeats endpoint probing).
 * 3. Reject CLI-style user agents (curl, wget, scrapy, python-requests)
 *    on protected images unless they send a same-origin Referer —
 *    defeats casual asset scraping without breaking normal browsing.
 * 4. Strip download-coercion query params (?download=1 etc.) on assets.
 * 5. Inject defensive headers as runtime backstop.
 */

const BLOCKED_PATHS = [
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.env.development",
  "/package-lock.json",
  "/bun.lock",
  "/yarn.lock",
  "/readme.md",
  "/vercel.json",
  "/next.config.ts",
  "/next.config.js",
  "/tsconfig.json",
  "/middleware.ts",
  "/proxy.ts",
  "/.gitignore",
  "/worklog.md",
];

const BLOCKED_EXTENSIONS = [
  ".map",
  ".env",
  ".prisma",
  ".db",
  ".sqlite",
  ".log",
  ".lock",
];

const SUSPICIOUS_AGENTS = [
  "wget",
  "curl",
  "scrapy",
  "python-requests",
  "httpclient",
  "libwww",
  "mechanize",
  "java/",
  "okhttp",
  "go-http-client",
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const url = request.nextUrl.clone();
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const referer = request.headers.get("referer") || "";
  const origin = url.origin;
  const lowerPath = pathname.toLowerCase();

  // ── 1. Block sensitive paths ──────────────────────────────────────────
  if (BLOCKED_PATHS.some((p) => lowerPath === p)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ── 2. Block sensitive extensions (source maps, env, db files) ────────
  if (BLOCKED_EXTENSIONS.some((ext) => lowerPath.endsWith(ext))) {
    // Allow .env.txt as edge case — but we have no such file
    return new NextResponse("Not Found", { status: 404 });
  }

  // ── 3. Restrict /api/* enumeration ────────────────────────────────────
  if (pathname.startsWith("/api")) {
    if (pathname !== "/api" && pathname !== "/api/") {
      return new NextResponse("Not Found", { status: 404 });
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  }

  // ── 4. Asset protection: block scraping bots on protected images ──────
  const isProtectedAsset =
    pathname.startsWith("/staff-") ||
    pathname === "/jayralis-logo.jpg" ||
    pathname === "/logo.svg";

  if (isProtectedAsset) {
    // If user-agent looks like a CLI scraper AND referer is not from our origin → block
    if (SUSPICIOUS_AGENTS.some((agent) => userAgent.includes(agent))) {
      if (!referer.startsWith(origin)) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
    // Strip download-coercion query params
    if (
      searchParams.has("download") ||
      searchParams.has("force-download") ||
      searchParams.has("attachment") ||
      searchParams.has("save")
    ) {
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // ── 5. Defensive headers on every response ────────────────────────────
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  return res;
}

export const config = {
  // Run on all routes except Next.js internal asset paths
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
