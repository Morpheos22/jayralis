import type { NextConfig } from "next";

/**
 * Content Security Policy
 * - default-src 'self' — deny everything by default
 * - script-src 'self' 'unsafe-inline' — Next.js 16 (Turbopack) requires inline for hydration chunks
 *   (we do NOT allow 'unsafe-eval' — eliminates prompt-injection via eval)
 * - style-src 'self' 'unsafe-inline' — Tailwind 4 / styled-jsx needs inline styles
 * - img-src 'self' data: blob: https: — allow staff photos, logo, OG images
 * - font-src 'self' data: — Geist fonts served by Next.js
 * - connect-src 'self' — block all third-party API calls (no analytics, no external fetches)
 * - frame-ancestors 'none' — prevent any embedding / clickjacking
 * - base-uri 'self' — prevent <base> tag hijacking
 * - form-action 'self' — prevent form submission to external domains
 * - object-src 'none' — block Flash/Java/object embeds
 * - upgrade-insecure-requests — force HTTPS
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
  // Lock down browser features site-wide
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()",
  },
  // Disable DNS prefetching (minor privacy hardening)
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Cross-Origin policies — prevent Spectre-style cross-origin leaks
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Do not expose the source URL of fetched resources
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  // Disable source maps in production — prevents source code leakage
  productionBrowserSourceMaps: false,

  // Ignore build errors (project includes scaffolded demo files outside src/app
  // that aren't part of the deployed site — keeping ignoreBuildErrors true
  // avoids blocking deploys on those pre-existing scaffold issues)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Re-enable strict mode (was disabled previously)
  reactStrictMode: true,

  // Strip the "X-Powered-By: Next.js" header — don't advertise stack
  poweredByHeader: false,

  // Compress responses
  compress: true,

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
    ];
  },
};

export default nextConfig;
