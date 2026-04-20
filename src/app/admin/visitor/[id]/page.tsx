import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { sql, isDbReady } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import {
  EventDetail,
  GroupedSession,
  EVENT_STYLE,
  JourneySummary,
  SiteFlow,
  SessionRibbon,
  EventTimeline,
} from "./journey";

export const dynamic = "force-dynamic";

type VisitorDetail = {
  visitor_id: string;
  first_seen_at: string;
  last_seen_at: string;
  visit_count: number;
  ip_country: string | null;
  ip_region: string | null;
  ip_city: string | null;
  ip_company: string | null;
  ip_company_domain: string | null;
  ip_company_type: string | null;
  ip_org: string | null;
  ip_asn: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
};

export default async function VisitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (!isDbReady() || !sql) notFound();

  const { id } = await params;
  if (!/^[a-f0-9]{8,128}$/.test(id)) notFound();

  const visitorRows = (await sql`
    SELECT * FROM analytics_visitors WHERE visitor_id = ${id} LIMIT 1;
  `) as VisitorDetail[];
  const visitor = visitorRows[0];
  if (!visitor) notFound();

  const events = (await sql`
    SELECT
      id::TEXT,
      created_at,
      session_id,
      event_type,
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      metadata
    FROM analytics_events
    WHERE visitor_id = ${id}
    ORDER BY created_at ASC
    LIMIT 500;
  `) as EventDetail[];

  const sessions = groupBySession(events);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs text-neutral-400 hover:text-white">
            ← Back to dashboard
          </Link>
          <h1 className="text-lg font-semibold mt-1">
            {visitor.ip_company || visitor.ip_org || "Unknown visitor"}
            {visitor.ip_country && (
              <span className="text-sm font-normal text-neutral-400 ml-2">
                · {visitor.ip_city ? `${visitor.ip_city}, ` : ""}{visitor.ip_country}
              </span>
            )}
          </h1>
          <p className="text-xs text-neutral-500 font-mono">{visitor.visitor_id}</p>
        </div>
        <div className="text-xs text-neutral-500 text-right">
          <div>First seen: {new Date(visitor.first_seen_at).toLocaleString()}</div>
          <div>Last seen: {new Date(visitor.last_seen_at).toLocaleString()}</div>
          <div>Visits: {visitor.visit_count}</div>
        </div>
      </header>

      <section className="px-6 py-6">
        <JourneySummary sessions={sessions} events={events} />
        <SiteFlow events={events} />

        <h2 className="text-sm font-semibold text-white mb-3 mt-8">
          Sessions ({sessions.length})
        </h2>
        <Legend />

        {sessions.length === 0 && (
          <p className="text-xs text-neutral-500 mt-3">No events recorded yet.</p>
        )}

        {sessions.map(s => (
          <div key={s.id} className="mb-6">
            <SessionRibbon session={s} />
            <details className="bg-white/[0.02] border border-white/5 rounded-lg">
              <summary className="cursor-pointer text-xs text-neutral-400 hover:text-white px-4 py-2">
                Show {s.events.length} raw events
              </summary>
              <div className="px-2 pb-2">
                <EventTimeline session={s} />
              </div>
            </details>
          </div>
        ))}

        <h2 className="text-sm font-semibold text-white mb-3 mt-8">Visitor metadata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailPanel title="Network">
            <Row k="Company"  v={visitor.ip_company} />
            <Row k="Domain"   v={visitor.ip_company_domain} />
            <Row k="Type"     v={visitor.ip_company_type} />
            <Row k="ASN"      v={visitor.ip_asn} />
            <Row k="Org (raw)" v={visitor.ip_org} />
          </DetailPanel>
          <DetailPanel title="Location">
            <Row k="Country"  v={visitor.ip_country} />
            <Row k="Region"   v={visitor.ip_region} />
            <Row k="City"     v={visitor.ip_city} />
          </DetailPanel>
          <DetailPanel title="Device">
            <Row k="Device"   v={visitor.device_type} />
            <Row k="Browser"  v={visitor.browser} />
            <Row k="OS"       v={visitor.os} />
          </DetailPanel>
          <DetailPanel title="User agent">
            <p className="text-xs text-neutral-300 break-all font-mono">
              {visitor.user_agent || "—"}
            </p>
          </DetailPanel>
        </div>
      </section>
    </main>
  );
}

function Legend() {
  const entries = Object.entries(EVENT_STYLE);
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px]">
      <span className="uppercase tracking-wider text-neutral-500 mr-1">Legend:</span>
      {entries.map(([key, style]) => (
        <span
          key={key}
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${style.bg} ${style.color} ring-1 ${style.ring}`}
        >
          <span>{style.icon}</span>
          <span>{style.label}</span>
        </span>
      ))}
    </div>
  );
}

function groupBySession(events: EventDetail[]): GroupedSession[] {
  const groups = new Map<string, EventDetail[]>();
  for (const e of events) {
    const arr = groups.get(e.session_id) ?? [];
    arr.push(e);
    groups.set(e.session_id, arr);
  }
  const sessions: GroupedSession[] = [];
  for (const [id, arr] of groups.entries()) {
    const sorted = [...arr].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    sessions.push({
      id,
      start: sorted[0].created_at,
      end: sorted[sorted.length - 1].created_at,
      events: sorted,
    });
  }
  sessions.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
  return sessions;
}

function DetailPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
        {title}
      </h2>
      <dl className="text-xs space-y-1.5">{children}</dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string | null }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <dt className="text-neutral-500">{k}</dt>
      <dd className="col-span-2 text-neutral-200">
        {v || <span className="text-neutral-600">—</span>}
      </dd>
    </div>
  );
}
