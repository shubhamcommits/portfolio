import { redirect } from "next/navigation";
import { sql, isDbReady } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SummaryRow = { metric: string; value: string };
type TopRow = { label: string; value: number };
type VisitorRow = {
  visitor_id: string;
  first_seen_at: string;
  last_seen_at: string;
  visit_count: number;
  ip_country: string | null;
  ip_city: string | null;
  ip_company: string | null;
  ip_company_domain: string | null;
  ip_company_type: string | null;
  ip_org: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  pageviews: number;
  resume_downloads: number;
  calcom_clicks: number;
  outbound_clicks: number;
  sections_seen: string[] | null;
  last_path: string | null;
  last_referrer: string | null;
};
type EventRow = {
  created_at: string;
  visitor_id: string;
  event_type: string;
  path: string | null;
  metadata: Record<string, unknown> | null;
  ip_country: string | null;
  ip_company: string | null;
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (!isDbReady() || !sql) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-semibold mb-3">Database not configured</h1>
        <p className="text-sm text-neutral-400">
          Set <code className="text-cyan-400">DATABASE_URL</code> and run{" "}
          <code className="text-cyan-400">POST /api/init</code> to create tables.
        </p>
      </main>
    );
  }

  const summaryRows = (await sql`
    SELECT 'visitors_total'::TEXT  AS metric, COUNT(*)::TEXT AS value FROM analytics_visitors
    UNION ALL
    SELECT 'visitors_7d',  COUNT(*)::TEXT FROM analytics_visitors WHERE last_seen_at > NOW() - INTERVAL '7 days'
    UNION ALL
    SELECT 'visitors_30d', COUNT(*)::TEXT FROM analytics_visitors WHERE last_seen_at > NOW() - INTERVAL '30 days'
    UNION ALL
    SELECT 'pageviews_7d',
      COALESCE(COUNT(*) FILTER (WHERE event_type = 'pageview'), 0)::TEXT
      FROM analytics_events WHERE created_at > NOW() - INTERVAL '7 days'
    UNION ALL
    SELECT 'resume_downloads_30d',
      COALESCE(COUNT(*) FILTER (WHERE event_type = 'resume_download'), 0)::TEXT
      FROM analytics_events WHERE created_at > NOW() - INTERVAL '30 days'
    UNION ALL
    SELECT 'calcom_clicks_30d',
      COALESCE(COUNT(*) FILTER (WHERE event_type = 'calcom_click'), 0)::TEXT
      FROM analytics_events WHERE created_at > NOW() - INTERVAL '30 days';
  `) as SummaryRow[];

  const topCompanies = (await sql`
    SELECT COALESCE(ip_company, ip_org, 'Unknown') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
      AND COALESCE(ip_company_type, '') != 'isp'
    GROUP BY label
    ORDER BY value DESC
    LIMIT 15;
  `) as TopRow[];

  const topCountries = (await sql`
    SELECT COALESCE(ip_country, 'Unknown') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC
    LIMIT 12;
  `) as TopRow[];

  const topPaths = (await sql`
    SELECT COALESCE(path, '/') AS label, COUNT(*)::INT AS value
    FROM analytics_events
    WHERE event_type = 'pageview' AND created_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC
    LIMIT 10;
  `) as TopRow[];

  const topReferrers = (await sql`
    SELECT COALESCE(NULLIF(referrer, ''), '(direct)') AS label, COUNT(*)::INT AS value
    FROM analytics_events
    WHERE event_type = 'pageview' AND created_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC
    LIMIT 10;
  `) as TopRow[];

  const sectionEngagement = (await sql`
    SELECT (metadata->>'section') AS label, COUNT(*)::INT AS value
    FROM analytics_events
    WHERE event_type = 'section_view'
      AND created_at > NOW() - INTERVAL '30 days'
      AND metadata ? 'section'
    GROUP BY label
    ORDER BY value DESC
    LIMIT 12;
  `) as TopRow[];

  const recentVisitors = (await sql`
    WITH per_visitor_events AS (
      SELECT
        v.visitor_id,
        v.first_seen_at,
        v.last_seen_at,
        v.visit_count,
        v.ip_country,
        v.ip_city,
        v.ip_company,
        v.ip_company_domain,
        v.ip_company_type,
        v.ip_org,
        v.device_type,
        v.browser,
        v.os,
        COUNT(*) FILTER (WHERE e.event_type = 'pageview')        AS pageviews,
        COUNT(*) FILTER (WHERE e.event_type = 'resume_download') AS resume_downloads,
        COUNT(*) FILTER (WHERE e.event_type = 'calcom_click')    AS calcom_clicks,
        COUNT(*) FILTER (WHERE e.event_type = 'outbound_click')  AS outbound_clicks,
        ARRAY_AGG(DISTINCT e.metadata->>'section')
          FILTER (WHERE e.event_type = 'section_view' AND e.metadata ? 'section') AS sections_seen,
        (
          SELECT path FROM analytics_events
          WHERE visitor_id = v.visitor_id AND event_type = 'pageview'
          ORDER BY created_at DESC LIMIT 1
        ) AS last_path,
        (
          SELECT referrer FROM analytics_events
          WHERE visitor_id = v.visitor_id AND event_type = 'pageview' AND referrer IS NOT NULL AND referrer <> ''
          ORDER BY created_at DESC LIMIT 1
        ) AS last_referrer
      FROM analytics_visitors v
      LEFT JOIN analytics_events e ON e.visitor_id = v.visitor_id
      WHERE v.last_seen_at > NOW() - INTERVAL '30 days'
      GROUP BY v.visitor_id
    )
    SELECT * FROM per_visitor_events
    ORDER BY last_seen_at DESC
    LIMIT 30;
  `) as VisitorRow[];

  const recentEvents = (await sql`
    SELECT
      e.created_at,
      e.visitor_id,
      e.event_type,
      e.path,
      e.metadata,
      v.ip_country,
      v.ip_company
    FROM analytics_events e
    LEFT JOIN analytics_visitors v ON v.visitor_id = e.visitor_id
    WHERE e.event_type IN ('resume_download','calcom_click','outbound_click','section_view','tool_use')
    ORDER BY e.created_at DESC
    LIMIT 50;
  `) as EventRow[];

  const summary = Object.fromEntries(summaryRows.map(r => [r.metric, Number(r.value)]));

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Portfolio Analytics</h1>
          <p className="text-xs text-neutral-500">Signed in as {session}</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="text-xs text-neutral-400 hover:text-white">Sign out</button>
        </form>
      </header>

      <section className="px-6 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Visitors (all-time)"  value={summary.visitors_total} />
        <Stat label="Visitors 30d"         value={summary.visitors_30d} />
        <Stat label="Visitors 7d"          value={summary.visitors_7d} />
        <Stat label="Pageviews 7d"         value={summary.pageviews_7d} />
        <Stat label="Resume DLs 30d"       value={summary.resume_downloads_30d} accent="text-cyan-400" />
        <Stat label="Cal.com clicks 30d"   value={summary.calcom_clicks_30d} accent="text-cyan-400" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        <Panel title="Top companies (30d)" hint="Excludes ISPs">
          <BarList rows={topCompanies} emptyHint="No company data yet. Add IPINFO_TOKEN to enable." />
        </Panel>
        <Panel title="Top countries (30d)">
          <BarList rows={topCountries} />
        </Panel>
        <Panel title="Most viewed pages (30d)">
          <BarList rows={topPaths} />
        </Panel>
        <Panel title="Top referrers (30d)">
          <BarList rows={topReferrers} />
        </Panel>
        <Panel title="Section engagement (30d)" hint="Times each section was 50%+ in viewport">
          <BarList rows={sectionEngagement} />
        </Panel>
      </div>

      <section className="px-6 py-6">
        <Panel title="Recent visitors (last 30 days)">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-xs">
              <thead className="text-neutral-500 uppercase tracking-wider">
                <tr>
                  <Th>Last seen</Th>
                  <Th>Company / Org</Th>
                  <Th>Where</Th>
                  <Th>Device</Th>
                  <Th>Visits</Th>
                  <Th>Pages</Th>
                  <Th>Resume</Th>
                  <Th>Cal</Th>
                  <Th>Sections</Th>
                  <Th>Last path</Th>
                  <Th>Referrer</Th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-6 text-center text-neutral-500">
                      No visitor data yet.
                    </td>
                  </tr>
                )}
                {recentVisitors.map(v => (
                  <tr key={v.visitor_id} className="border-t border-white/5">
                    <Td className="text-neutral-400">{relativeTime(v.last_seen_at)}</Td>
                    <Td>
                      <div className="text-white">
                        {v.ip_company || v.ip_org || <span className="text-neutral-600">—</span>}
                      </div>
                      {v.ip_company_domain && (
                        <div className="text-neutral-500">{v.ip_company_domain}</div>
                      )}
                      {v.ip_company_type && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 text-[10px] uppercase">
                          {v.ip_company_type}
                        </span>
                      )}
                    </Td>
                    <Td>
                      {v.ip_country || "—"}
                      {v.ip_city && <span className="text-neutral-500"> · {v.ip_city}</span>}
                    </Td>
                    <Td className="text-neutral-400">
                      {v.device_type} · {v.browser} · {v.os}
                    </Td>
                    <Td>{v.visit_count}</Td>
                    <Td>{v.pageviews}</Td>
                    <Td className={v.resume_downloads > 0 ? "text-cyan-400 font-semibold" : ""}>
                      {v.resume_downloads}
                    </Td>
                    <Td className={v.calcom_clicks > 0 ? "text-cyan-400 font-semibold" : ""}>
                      {v.calcom_clicks}
                    </Td>
                    <Td className="max-w-[180px]">
                      {(v.sections_seen || []).filter(Boolean).join(", ") || (
                        <span className="text-neutral-600">—</span>
                      )}
                    </Td>
                    <Td className="text-neutral-300 max-w-[180px] truncate">{v.last_path || "—"}</Td>
                    <Td className="text-neutral-400 max-w-[180px] truncate" title={v.last_referrer || ""}>
                      {v.last_referrer ? new URL(v.last_referrer).hostname : "(direct)"}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <section className="px-6 pb-10">
        <Panel title="Recent high-signal events">
          <ul className="text-xs divide-y divide-white/5">
            {recentEvents.length === 0 && (
              <li className="py-6 text-center text-neutral-500">No events yet.</li>
            )}
            {recentEvents.map((e, i) => (
              <li key={i} className="py-2 flex items-baseline gap-3">
                <span className="text-neutral-500 w-24 shrink-0">{relativeTime(e.created_at)}</span>
                <span className="text-cyan-400 font-mono w-32 shrink-0">{e.event_type}</span>
                <span className="text-neutral-300 truncate">
                  {(e.ip_company || e.ip_country || "Unknown")} · {e.path || "/"}
                  {e.metadata && Object.keys(e.metadata).length > 0 && (
                    <span className="text-neutral-500"> {summarizeMeta(e.metadata)}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </main>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-3">
      <div className={`text-2xl font-semibold ${accent ?? "text-white"}`}>{value ?? 0}</div>
      <div className="text-[11px] text-neutral-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {hint && <span className="text-[10px] text-neutral-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function BarList({ rows, emptyHint }: { rows: TopRow[]; emptyHint?: string }) {
  if (rows.length === 0) {
    return <p className="text-xs text-neutral-500">{emptyHint || "No data yet."}</p>;
  }
  const max = Math.max(...rows.map(r => r.value), 1);
  return (
    <ul className="space-y-1.5">
      {rows.map(r => (
        <li key={r.label} className="text-xs">
          <div className="flex items-baseline justify-between mb-0.5">
            <span className="text-neutral-300 truncate pr-2">{r.label}</span>
            <span className="text-neutral-400 font-mono">{r.value}</span>
          </div>
          <div className="h-1 bg-white/5 rounded">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left font-medium px-2 py-2">{children}</th>;
}

function Td({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <td className={`px-2 py-2 align-top ${className}`} title={title}>
      {children}
    </td>
  );
}

function relativeTime(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const sec = Math.round(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  return `${day}d ago`;
}

function summarizeMeta(meta: Record<string, unknown>): string {
  const parts: string[] = [];
  if (typeof meta.section === "string") parts.push(`#${meta.section}`);
  if (typeof meta.host === "string") parts.push(meta.host);
  if (typeof meta.depth === "number") parts.push(`${meta.depth}%`);
  if (typeof meta.dwellMs === "number") parts.push(`${Math.round(meta.dwellMs / 100) / 10}s`);
  if (parts.length > 0) return `(${parts.join(" ")})`;
  return "";
}
