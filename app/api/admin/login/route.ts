import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminPassword, cookieConfig, signSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminPassword()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Admin not configured yet. Set ADMIN_PASSWORD in Vercel → Project → Settings → Environment Variables, then redeploy.",
      },
      { status: 503 }
    );
  }
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_SESSION_SECRET is missing in Vercel env vars." },
      { status: 503 }
    );
  }
  let password = "";
  try {
    const body = await req.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }
  const token = signSession("admin");
  const jar = await cookies();
  jar.set(cookieConfig.name, token, cookieConfig);
  return NextResponse.json({ ok: true });
}
