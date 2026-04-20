import { NextRequest, NextResponse } from "next/server";
import { sql, isDbReady, SCHEMA_SQL } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isDbReady() || !sql) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 500 });
  }

  const provided = req.headers.get("x-init-secret");
  if (!process.env.ADMIN_SECRET || provided !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const statements = SCHEMA_SQL
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  try {
    for (const stmt of statements) {
      await sql.query(stmt);
    }
  } catch (err) {
    console.error("[init] schema apply failed", err);
    return NextResponse.json(
      { error: "schema_apply_failed", detail: String(err) },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, applied: statements.length });
}
