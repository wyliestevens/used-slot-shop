import { createHmac, timingSafeEqual, scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import { readFile, writeFile } from "./github";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  opts?: Record<string, number>
) => Promise<Buffer>;

const COOKIE_NAME = "uss_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const CREDENTIALS_PATH = "data/admin/credentials.json";

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

// ───────── Credentials file (git-backed, source of truth) ─────────

export type Credentials = {
  email: string;
  passwordHash: string; // "saltHex$hashHex"
  mustChangePassword: boolean;
  updatedAt: string;
};

export async function loadCredentials(): Promise<{ creds: Credentials; sha: string | null }> {
  const file = await readFile(CREDENTIALS_PATH);
  if (!file) throw new Error("Credentials file missing. Seed data/admin/credentials.json.");
  return { creds: JSON.parse(file.content) as Credentials, sha: file.sha };
}

export async function saveCredentials(
  creds: Credentials,
  message: string,
  sha: string | null
) {
  const body = JSON.stringify(creds, null, 2) + "\n";
  const b64 = Buffer.from(body, "utf8").toString("base64");
  return writeFile({
    path: CREDENTIALS_PATH,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

// ───────── Password hashing (scrypt) ─────────

export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scryptAsync(plain, salt, 64, { N: 16384, r: 8, p: 1 });
  return `${salt.toString("hex")}$${hash.toString("hex")}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split("$");
  if (!saltHex || !hashHex) return false;
  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const got = await scryptAsync(plain, salt, 64, { N: 16384, r: 8, p: 1 });
    if (got.length !== expected.length) return false;
    return timingSafeEqual(got, expected);
  } catch {
    return false;
  }
}

// ───────── Session cookie ─────────
// Payload: userId:iat:mustChange:sig

export function signSession(userId = "admin", mustChange = false) {
  const iat = Math.floor(Date.now() / 1000);
  const mc = mustChange ? "1" : "0";
  const payload = `${userId}:${iat}:${mc}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifySession(
  value: string | undefined
): { userId: string; iat: number; mustChange: boolean } | null {
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length !== 4) return null;
  const [userId, iatStr, mcStr, sig] = parts;
  const payload = `${userId}:${iatStr}:${mcStr}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch {
    return null;
  }
  const iat = Number(iatStr);
  if (!Number.isFinite(iat)) return null;
  if (Date.now() / 1000 - iat > MAX_AGE_SECONDS) return null;
  return { userId, iat, mustChange: mcStr === "1" };
}

export const cookieConfig = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
