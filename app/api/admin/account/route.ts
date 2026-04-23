import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  cookieConfig,
  hashPassword,
  loadCredentials,
  saveCredentials,
  signSession,
  verifyPassword,
  verifySession,
} from "@/lib/auth";

export const runtime = "nodejs";

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: Request) {
  const jar = await cookies();
  const session = verifySession(jar.get(cookieConfig.name)?.value);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  let currentPassword = "";
  let newPassword = "";
  try {
    const body = await req.json();
    currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  } catch {
    return badRequest("Invalid body");
  }

  if (!currentPassword || !newPassword) return badRequest("Both fields required");
  if (newPassword.length < 8) return badRequest("New password must be at least 8 characters");
  if (newPassword === currentPassword)
    return badRequest("New password must be different from current password");

  const { creds, sha } = await loadCredentials();
  const ok = await verifyPassword(currentPassword, creds.passwordHash);
  if (!ok) return NextResponse.json({ ok: false, error: "Current password is incorrect" }, { status: 401 });

  const newHash = await hashPassword(newPassword);
  const next = {
    ...creds,
    passwordHash: newHash,
    mustChangePassword: false,
    updatedAt: new Date().toISOString(),
  };
  await saveCredentials(next, "admin: password updated", sha);

  // Reissue session cookie with mustChange cleared.
  const token = signSession("admin", false);
  jar.set(cookieConfig.name, token, cookieConfig);

  return NextResponse.json({ ok: true });
}
