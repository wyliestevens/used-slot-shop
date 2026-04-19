import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieConfig, signSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
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
