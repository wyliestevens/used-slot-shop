import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  cookieConfig,
  loadCredentials,
  signSession,
  verifyPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_SESSION_SECRET is missing in Vercel env vars." },
      { status: 503 }
    );
  }

  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "Email and password required" },
      { status: 400 }
    );
  }

  let creds;
  try {
    ({ creds } = await loadCredentials());
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Admin credentials not configured. Contact support." },
      { status: 503 }
    );
  }

  const emailMatches = creds.email.trim().toLowerCase() === email;
  const passwordMatches = await verifyPassword(password, creds.passwordHash);
  if (!emailMatches || !passwordMatches) {
    return NextResponse.json(
      { ok: false, error: "Wrong email or password" },
      { status: 401 }
    );
  }

  const token = signSession("admin", creds.mustChangePassword === true);
  const jar = await cookies();
  jar.set(cookieConfig.name, token, cookieConfig);
  return NextResponse.json({
    ok: true,
    mustChangePassword: creds.mustChangePassword === true,
  });
}
