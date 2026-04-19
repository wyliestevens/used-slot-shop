import { NextRequest, NextResponse } from "next/server";

// Edge-safe session verification (inline, since lib/auth.ts uses node:crypto).
async function verifyEdge(value: string | undefined, secret: string) {
  if (!value || !secret) return null;
  const parts = value.split(":");
  if (parts.length !== 3) return null;
  const [userId, iatStr, sig] = parts;
  const payload = `${userId}:${iatStr}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigBytes = new Uint8Array((sig.match(/.{2}/g) || []).map((h) => parseInt(h, 16)));
  const ok = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
  if (!ok) return null;
  const iat = Number(iatStr);
  if (!Number.isFinite(iat)) return null;
  const maxAge = 60 * 60 * 24 * 7;
  if (Date.now() / 1000 - iat > maxAge) return null;
  return { userId, iat };
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow the login page + the login API without auth.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }
  const cookie = req.cookies.get("uss_admin")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  const session = await verifyEdge(cookie, secret);
  if (!session) {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
