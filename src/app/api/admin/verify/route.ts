import { NextRequest, NextResponse } from "next/server";
import { sql, isDbReady } from "@/lib/db";
import { hashMagicToken, isAdminEmail, setAdminSessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isDbReady() || !sql) {
    return redirectToLogin(req, "db_not_configured");
  }

  const token = req.nextUrl.searchParams.get("token");
  if (!token || !/^[a-f0-9]{32,128}$/.test(token)) {
    return redirectToLogin(req, "invalid_token");
  }

  const tokenHash = hashMagicToken(token);

  let row: { email: string; expires_at: string; used_at: string | null } | undefined;
  try {
    const rows = (await sql`
      SELECT email, expires_at, used_at
      FROM admin_login_tokens
      WHERE token = ${tokenHash}
      LIMIT 1;
    `) as Array<{ email: string; expires_at: string; used_at: string | null }>;
    row = rows[0];
  } catch (err) {
    console.error("[admin/verify] token lookup failed", err);
    return redirectToLogin(req, "lookup_failed");
  }

  if (!row) return redirectToLogin(req, "unknown_token");
  if (row.used_at) return redirectToLogin(req, "token_used");
  if (new Date(row.expires_at).getTime() < Date.now()) {
    return redirectToLogin(req, "token_expired");
  }
  if (!isAdminEmail(row.email)) {
    return redirectToLogin(req, "not_admin");
  }

  try {
    await sql`
      UPDATE admin_login_tokens
      SET used_at = NOW()
      WHERE token = ${tokenHash};
    `;
  } catch (err) {
    console.error("[admin/verify] token mark-used failed", err);
    return redirectToLogin(req, "mark_used_failed");
  }

  await setAdminSessionCookie(row.email);

  return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
}

function redirectToLogin(req: NextRequest, reason: string): NextResponse {
  const url = new URL("/admin/login", req.nextUrl.origin);
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}
