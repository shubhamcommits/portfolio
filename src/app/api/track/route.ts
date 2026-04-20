import { NextRequest, NextResponse } from "next/server";
import { sql, isDbReady } from "@/lib/db";
import {
  getClientIp,
  getGeoFromRequest,
  hashVisitor,
  lookupCompany,
  parseDevice,
} from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrackPayload = {
  sessionId?: string;
  eventType?: string;
  path?: string;
  referrer?: string;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
  };
  metadata?: Record<string, unknown>;
};

const ALLOWED_EVENTS = new Set([
  "pageview",
  "section_view",
  "section_dwell",
  "scroll_depth",
  "outbound_click",
  "resume_download",
  "calcom_click",
  "project_click",
  "tool_use",
]);

export async function POST(req: NextRequest) {
  if (!isDbReady() || !sql) {
    return NextResponse.json({ ok: false, reason: "db_not_configured" }, { status: 200 });
  }

  let body: TrackPayload;
  try {
    body = (await req.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const eventType = (body.eventType || "").toString();
  if (!ALLOWED_EVENTS.has(eventType)) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  const sessionId = sanitizeId(body.sessionId);
  if (!sessionId) {
    return NextResponse.json({ error: "invalid_session" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent");
  const ip = getClientIp(req);
  const visitorId = hashVisitor(ip, ua);
  const geo = getGeoFromRequest(req);
  const device = parseDevice(ua);
  const company = await lookupCompany(ip);

  try {
    await sql`
      INSERT INTO analytics_visitors (
        visitor_id, ip_country, ip_region, ip_city,
        ip_org, ip_asn, ip_company, ip_company_domain, ip_company_type,
        user_agent, device_type, browser, os
      ) VALUES (
        ${visitorId}, ${geo.country}, ${geo.region}, ${geo.city},
        ${company.org}, ${company.asn}, ${company.company}, ${company.companyDomain}, ${company.companyType},
        ${ua}, ${device.deviceType}, ${device.browser}, ${device.os}
      )
      ON CONFLICT (visitor_id) DO UPDATE SET
        last_seen_at = NOW(),
        visit_count  = analytics_visitors.visit_count + 1,
        ip_country   = COALESCE(analytics_visitors.ip_country, EXCLUDED.ip_country),
        ip_region    = COALESCE(analytics_visitors.ip_region, EXCLUDED.ip_region),
        ip_city      = COALESCE(analytics_visitors.ip_city, EXCLUDED.ip_city),
        ip_company   = COALESCE(analytics_visitors.ip_company, EXCLUDED.ip_company),
        ip_company_domain = COALESCE(analytics_visitors.ip_company_domain, EXCLUDED.ip_company_domain),
        ip_company_type   = COALESCE(analytics_visitors.ip_company_type, EXCLUDED.ip_company_type),
        ip_org       = COALESCE(analytics_visitors.ip_org, EXCLUDED.ip_org),
        ip_asn       = COALESCE(analytics_visitors.ip_asn, EXCLUDED.ip_asn);
    `;

    await sql`
      INSERT INTO analytics_events (
        visitor_id, session_id, event_type, path, referrer,
        utm_source, utm_medium, utm_campaign, metadata
      ) VALUES (
        ${visitorId}, ${sessionId}, ${eventType},
        ${truncate(body.path, 512)}, ${truncate(body.referrer, 1024)},
        ${truncate(body.utm?.source, 128)}, ${truncate(body.utm?.medium, 128)}, ${truncate(body.utm?.campaign, 128)},
        ${body.metadata ? JSON.stringify(body.metadata) : null}
      );
    `;
  } catch (err) {
    console.error("[track] insert failed", err);
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function sanitizeId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!/^[a-zA-Z0-9_-]{8,64}$/.test(value)) return null;
  return value;
}

function truncate(value: unknown, max: number): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value);
  return str.length > max ? str.slice(0, max) : str;
}
