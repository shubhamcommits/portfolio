import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql, isDbReady } from "@/lib/db";
import {
  generateMagicToken,
  hashMagicToken,
  isAdminConfigured,
  isAdminEmail,
} from "@/lib/admin-auth";
import AdminMagicLink from "@/emails/admin-magic-link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_TTL_MINUTES = 15;

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "admin_not_configured" }, { status: 500 });
  }
  if (!isDbReady() || !sql) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 500 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 500 });
  }

  let payload: { email?: string };
  try {
    payload = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (payload.email || "").trim();
  if (!email) {
    return NextResponse.json({ error: "missing_email" }, { status: 400 });
  }

  // Always succeed silently to avoid leaking which emails are admin.
  if (!isAdminEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  const token = generateMagicToken();
  const tokenHash = hashMagicToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  try {
    await sql`
      INSERT INTO admin_login_tokens (token, email, expires_at)
      VALUES (${tokenHash}, ${email.toLowerCase()}, ${expiresAt.toISOString()});
    `;
  } catch (err) {
    console.error("[admin/login] token insert failed", err);
    return NextResponse.json({ error: "token_persist_failed" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  const url = `${origin}/api/admin/verify?token=${token}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio Admin <admin@shubhamsinngh.com>",
      to: email,
      subject: "Sign-in link for shubhamsinngh.com admin",
      react: AdminMagicLink({ url, expiresInMinutes: TOKEN_TTL_MINUTES }),
    });
  } catch (err) {
    console.error("[admin/login] email send failed", err);
    return NextResponse.json({ error: "email_send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
