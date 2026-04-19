import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieConfig } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const jar = await cookies();
  jar.set(cookieConfig.name, "", { ...cookieConfig, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
