import { NextRequest, NextResponse } from "next/server";
import { sql, isDbReady } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  BOT_UA_KEYWORDS,
  CLOUD_KEYWORDS,
  VPN_PROXY_KEYWORDS,
  parseFilters,
} from "@/lib/admin-filters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!isDbReady() || !sql) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 500 });
  }

  const type = req.nextUrl.searchParams.get("type") || "visitors";
  if (type !== "visitors" && type !== "events") {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const filters = parseFilters(req.nextUrl.searchParams);
  const excludeKeywords: string[] = [];
  if (!filters.includeCloud) excludeKeywords.push(...CLOUD_KEYWORDS);
  if (!filters.includeVpn) excludeKeywords.push(...VPN_PROXY_KEYWORDS);
  const excludeBotPatterns = filters.includeBots ? [] : BOT_UA_KEYWORDS;

  let csv: string;
  let filename: string;

  if (type === "visitors") {
    const rows = (await sql`
      SELECT
        v.visitor_id,
        v.first_seen_at,
        v.last_seen_at,
        v.visit_count,
        v.ip_country,
        v.ip_region,
        v.ip_city,
        v.ip_company,
        v.ip_company_domain,
        v.ip_company_type,
        v.ip_org,
        v.ip_asn,
        v.device_type,
        v.browser,
        v.os,
        COUNT(*) FILTER (WHERE e.event_type = 'pageview')        AS pageviews,
        COUNT(*) FILTER (WHERE e.event_type = 'resume_download') AS resume_downloads,
        COUNT(*) FILTER (WHERE e.event_type = 'calcom_click')    AS calcom_clicks,
        COUNT(*) FILTER (WHERE e.event_type = 'outbound_click')  AS outbound_clicks
      FROM analytics_visitors v
      LEFT JOIN analytics_events e ON e.visitor_id = v.visitor_id
      WHERE last_seen_at > NOW() - INTERVAL '180 days'
        AND (${filters.includeIsps} OR COALESCE(v.ip_company_type, '') != 'isp')
        AND (
          COALESCE(v.ip_company, v.ip_org, '') = ''
          OR NOT (LOWER(COALESCE(v.ip_company, v.ip_org, '')) ILIKE ANY (${excludeKeywords}))
        )
        AND (
          v.user_agent IS NULL
          OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
        )
      GROUP BY v.visitor_id
      ORDER BY v.last_seen_at DESC;
    `) as Array<Record<string, unknown>>;

    csv = toCsv(rows);
    filename = `portfolio-visitors-${dateStamp()}.csv`;
  } else {
    const rows = (await sql`
      SELECT
        e.id,
        e.created_at,
        e.visitor_id,
        e.session_id,
        e.event_type,
        e.path,
        e.referrer,
        e.utm_source,
        e.utm_medium,
        e.utm_campaign,
        e.metadata,
        v.ip_country,
        v.ip_company,
        v.device_type
      FROM analytics_events e
      LEFT JOIN analytics_visitors v ON v.visitor_id = e.visitor_id
      WHERE e.created_at > NOW() - INTERVAL '180 days'
      ORDER BY e.created_at DESC
      LIMIT 10000;
    `) as Array<Record<string, unknown>>;

    csv = toCsv(rows);
    filename = `portfolio-events-${dateStamp()}.csv`;
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

function toCsv(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const out: string[] = [headers.join(",")];
  for (const row of rows) {
    out.push(headers.map(h => csvCell(row[h])).join(","));
  }
  return out.join("\n");
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s: string;
  if (value instanceof Date) s = value.toISOString();
  else if (typeof value === "object") s = JSON.stringify(value);
  else s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function dateStamp(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}
