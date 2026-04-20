import { cookies } from "next/headers";
import { createHash, randomBytes, createHmac } from "crypto";
import { NextRequest } from "next/server";

const COOKIE_NAME = "ssg_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase().trim();
const ADMIN_SECRET = process.env.ADMIN_SECRET;

export function isAdminConfigured(): boolean {
  return Boolean(ADMIN_EMAIL && ADMIN_SECRET);
}

export function isAdminEmail(email: string): boolean {
  if (!ADMIN_EMAIL) return false;
  return email.toLowerCase().trim() === ADMIN_EMAIL;
}

export function generateMagicToken(): string {
  return randomBytes(24).toString("hex");
}

export function hashMagicToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function signSession(payload: string): string {
  if (!ADMIN_SECRET) throw new Error("ADMIN_SECRET not set");
  return createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
}

const COOKIE_DELIM = "|";

function buildSessionCookie(email: string): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${email}${COOKIE_DELIM}${issuedAt}`;
  const sig = signSession(payload);
  return `${payload}${COOKIE_DELIM}${sig}`;
}

function parseSessionCookie(value: string): { email: string; issuedAt: number } | null {
  const parts = value.split(COOKIE_DELIM);
  if (parts.length !== 3) return null;
  const [email, issuedAtStr, sig] = parts;
  const issuedAt = Number(issuedAtStr);
  if (!email || !Number.isFinite(issuedAt) || !sig) return null;

  try {
    const expected = signSession(`${email}${COOKIE_DELIM}${issuedAtStr}`);
    if (expected.length !== sig.length) return null;
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) {
      mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    }
    if (mismatch !== 0) return null;
  } catch {
    return null;
  }

  if (Date.now() / 1000 - issuedAt > SESSION_MAX_AGE_SECONDS) return null;
  return { email, issuedAt };
}

export async function setAdminSessionCookie(email: string): Promise<void> {
  const value = buildSessionCookie(email);
  const store = await cookies();
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<string | null> {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME);
  if (!cookie) return null;
  const parsed = parseSessionCookie(cookie.value);
  return parsed?.email ?? null;
}

export function getAdminSessionFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie) return null;
  const parsed = parseSessionCookie(cookie.value);
  return parsed?.email ?? null;
}
