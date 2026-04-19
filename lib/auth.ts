import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "uss_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function verifyPassword(input: string) {
  const expected = adminPassword();
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function signSession(userId = "admin") {
  const iat = Math.floor(Date.now() / 1000);
  const payload = `${userId}:${iat}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifySession(value: string | undefined): { userId: string; iat: number } | null {
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length !== 3) return null;
  const [userId, iatStr, sig] = parts;
  const payload = `${userId}:${iatStr}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch {
    return null;
  }
  const iat = Number(iatStr);
  if (!Number.isFinite(iat)) return null;
  if (Date.now() / 1000 - iat > MAX_AGE_SECONDS) return null;
  return { userId, iat };
}

export const cookieConfig = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
