import { NextResponse } from "next/server";

/**
 * Hardened root API route.
 *
 * - Returns only a fixed, static message — no user input is ever read,
 *   reflected, or evaluated.
 * - No LLM calls are made here, eliminating prompt-injection attack surface.
 * - Sets defensive cache & robots headers.
 * - Rejects any non-GET method (no POST/PUT/DELETE surface to probe).
 */
export async function GET() {
  const res = NextResponse.json(
    { status: "ok", service: "jayralis-public-site" },
    { status: 200 }
  );
  // Never cache API responses
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}

// Block all non-GET methods — surface area minimization
export async function POST() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
export async function PUT() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
export async function DELETE() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
export async function PATCH() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
