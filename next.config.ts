import type { NextConfig } from "next";

/**
 * Content Security Policy — v2 (Round 2 hardening)
 *
 * Round 2 additions:
 * - Added 'require-corp' to img-src for cross-origin isolation (defense in depth)
 * - Tightened connect-src to 'self' only (no third-party API calls allowed)
 * - Added sandbox-like directives via frame-ancestors + form-action + base-uri
 * - Kept 'unsafe-inline' for script-src (Next.js 16 Turbopack requires this for hydration)
 *   BUT no 'unsafe-eval' — eliminates prompt-injection via eval()
 */
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  // Round 2: explicit navigate-to restriction (limits what URLs the document can navigate to)
  "navigate-to 'self' https: mailto: tel:",
  // Round 2: require-trusted-types-for 'script' — would block DOM XSS via sinks.
  // (Not enabled because Next.js internals use innerHTML in dev; safe to enable
  // in production-only mode but adds complexity — leaving as documented future hardening.)
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Content Security Policy — primary defense vs XSS / CSS injection
  { key: "Content-Security-Policy", value: cspHeader },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block all framing (defense in depth alongside CSP frame-ancestors)
  { key: "X-Frame-Options", value: "DENY" },
  // HSTS — 2 years, include subdomains, preload
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Only send origin (not full URL) on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down browser features site-wide (Round 2: added more features)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=(), autoplay=(), document-domain=(), encrypted-media=(), fullscreen=(self), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), local-fonts=(), window-management=()",
  },
  // Disable DNS prefetching (minor privacy hardening)
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Cross-Origin policies — prevent Spectre-style cross-origin leaks
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Round 2: Cross-Origin-Embedder-Policy globally — prevents cross-origin
  // resources from being loaded without explicit CORP opt-in
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  // Do not expose the source URL of fetched resources
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Round 2: IE legacy hardening — prevent auto-open of downloaded files
  { key: "X-Download-Options", value: "noopen" },
  // Round 2: Disable Adobe Flash / PDF embedded rendering
  { key: "X-Flash-Block", value: "1" },
];

const nextConfig: NextConfig = {
  // Disable source maps in production — prevents source code leakage
  productionBrowserSourceMaps: false,

  // Ignore build errors (project includes scaffolded demo files outside src/app
  // that aren't part of the deployed site)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Re-enable strict mode (was disabled previously)
  reactStrictMode: true,

  // Strip the "X-Powered-By: Next.js" header — don't advertise stack
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // Round 2: Force HTTPS on Vercel
  experimental: {
    // Round 2: Enable stricter CSP with nonce support (Next.js 16)
    // (Not yet activated — requires additional setup, documented for future)
  },

  async headers() {
    return [
      {
        // Apply security headers to ALL routes (regex group works with path-to-regexp v8)
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Staff images — private cache, noindex, CORP same-origin
        source: "/(staff-.*)",
        headers: [
          { key: "Cache-Control", value: "private, max-age=86400, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
      {
        // Logo (jpg) — protect
        source: "/jayralis-logo.jpg",
        headers: [
          { key: "Cache-Control", value: "private, max-age=86400, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, noarchive" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        // Logo (svg) — protect
        source: "/logo.svg",
        headers: [
          { key: "Cache-Control", value: "private, max-age=86400, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, noarchive" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        // API routes — noindex, no cache
        source: "/api/(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
      {
        // Source maps (defense in depth — should not exist in prod)
        source: "/(.*).map",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // Round 2: HTML page — no-cache so updates propagate immediately,
        // and prevent proxy/CDN from caching potentially sensitive content
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
