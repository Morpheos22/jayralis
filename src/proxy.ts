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
  "/readme",
  "/vercel.json",
  "/next.config.ts",
  "/next.config.js",
  "/next.config.mjs",
  "/tsconfig.json",
  "/middleware.ts",
  "/proxy.ts",
  "/.gitignore",
  "/worklog.md",
  "/license",
  "/license.md",
  "/contributing.md",
  "/.git",
  "/.git/config",
  "/.git/HEAD",
  "/.gitignore",
  "/.npmrc",
  "/.prettierrc",
  "/.eslintrc",
  "/.eslintrc.json",
  "/.eslintrc.js",
  "/composer.json",
  "/docker-compose.yml",
  "/dockerfile",
  "/.dockerignore",
  "/.vscode",
  "/.idea",
  "/.DS_Store",
];

const BLOCKED_EXTENSIONS = [
  ".map",
  ".env",
  ".prisma",
  ".db",
  ".sqlite",
  ".sqlite3",
  ".log",
  ".lock",
  ".pem",
  ".key",
  ".crt",
  ".p12",
  ".pfx",
  ".bak",
  ".backup",
  ".swp",
  ".tmp",
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
  "httpx",      // python httpx
  "node-fetch", // node fetch scraper
  "axios",      // axios scrapers
  "postman",    // Postman runtime
  "insomnia",   // Insomnia REST client
  "httpie",
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const url = request.nextUrl.clone();
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const referer = request.headers.get("referer") || "";
  const origin = url.origin;
  const lowerPath = pathname.toLowerCase();

  // ── 1. Block sensitive paths (exact + startswith for dir-like) ────────
  if (BLOCKED_PATHS.some((p) => lowerPath === p || lowerPath.startsWith(p + "/"))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ── 2. Block sensitive extensions (source maps, env, db files, keys) ──
  if (BLOCKED_EXTENSIONS.some((ext) => lowerPath.endsWith(ext))) {
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

  // ── 4. Block /_next/data/* — exposes page data as JSON (info disclosure) ──
  // This route is used for client-side navigation in Next.js App Router;
  // since our entire site is a single static page, we can safely block it.
  if (pathname.startsWith("/_next/data/")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ── 5. Block build ID enumeration via /_next/static/<BUILD_ID>/ paths ──
  // We don't block the assets themselves (they're needed for the page to work)
  // but we add a noindex header so search engines don't index them.
  if (pathname.startsWith("/_next/static/")) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  }

  // ── 6. Asset protection: block scraping bots on protected images ──────
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
      searchParams.has("save") ||
      searchParams.has("raw")
    ) {
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // ── 7. Defensive headers on every response ────────────────────────────
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  res.headers.set("X-Download-Options", "noopen"); // IE legacy: prevents auto-open of downloaded files
  return res;
}

export const config = {
  // Run on all routes except favicon.ico and robots.txt (handled separately)
  // Note: we DO run on /_next/static/* now (to add noindex), but skip /_next/image
  // (image optimizer) and favicon/robots to avoid overhead.
  matcher: ["/((?!_next/image|favicon.ico).*)"],
};
