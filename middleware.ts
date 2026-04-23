import { NextRequest, NextResponse } from "next/server";

// Edge-safe session verification (inline, since lib/auth.ts uses node:crypto).
async function verifyEdge(value: string | undefined, secretKey: string) {
  if (!value || !secretKey) return null;
  const parts = value.split(":");
  if (parts.length !== 4) return null;
  const [userId, iatStr, mcStr, sig] = parts;
  const payload = `${userId}:${iatStr}:${mcStr}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
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
  return { userId, iat, mustChange: mcStr === "1" };
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Login routes are always open.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }
  const cookie = req.cookies.get("uss_admin")?.value;
  const secretKey = process.env.ADMIN_SESSION_SECRET || "";
  const session = await verifyEdge(cookie, secretKey);
  if (!session) {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  // Force password change before anything else.
  if (session.mustChange) {
    const allowed =
      pathname === "/admin/change-password" ||
      pathname === "/api/admin/account" ||
      pathname === "/api/admin/logout";
    if (!allowed) {
      if (pathname.startsWith("/api/admin/")) {
        return NextResponse.json({ error: "Password change required" }, { status: 403 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/admin/change-password";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
