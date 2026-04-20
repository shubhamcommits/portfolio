import Link from "next/link";
import { redirect } from "next/navigation";
import { sql, isDbReady } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import {
  BOT_UA_KEYWORDS,
  CLOUD_KEYWORDS,
  VPN_PROXY_KEYWORDS,
  parseFilters,
  filterFlagsToQueryString,
  FilterFlags,
} from "@/lib/admin-filters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SummaryRow = { metric: string; value: string };
type TopRow = { label: string; value: number };
type DailyRow = { day: string; visitors: number; pageviews: number };
type ScrollRow = { depth: number; visitors: number };
type DwellRow = { section: string; median_ms: number; samples: number };
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

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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

  const sp = await searchParams;
  const filters = parseFilters({
    get: (k: string) => {
      const v = sp[k];
      return Array.isArray(v) ? v[0] ?? null : v ?? null;
    },
  });

  // Build dynamic exclude lists for the visitor scope.
  const excludeKeywords: string[] = [];
  if (!filters.includeCloud) excludeKeywords.push(...CLOUD_KEYWORDS);
  if (!filters.includeVpn) excludeKeywords.push(...VPN_PROXY_KEYWORDS);
  const excludeBotPatterns = filters.includeBots ? [] : BOT_UA_KEYWORDS;

  const summaryRows = (await sql`
    WITH scoped AS (
      SELECT * FROM analytics_visitors v
      WHERE last_seen_at > NOW() - INTERVAL '30 days'
        AND (${filters.includeIsps} OR COALESCE(v.ip_company_type, '') != 'isp')
        AND (
          COALESCE(v.ip_company, v.ip_org, '') = ''
          OR NOT (LOWER(COALESCE(v.ip_company, v.ip_org, '')) ILIKE ANY (${excludeKeywords}))
        )
        AND (
          v.user_agent IS NULL
          OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
        )
    )
    SELECT 'visitors_total'::TEXT  AS metric, COUNT(*)::TEXT AS value FROM scoped
    UNION ALL
    SELECT 'visitors_7d',  COUNT(*)::TEXT FROM scoped WHERE last_seen_at > NOW() - INTERVAL '7 days'
    UNION ALL
    SELECT 'visitors_30d', COUNT(*)::TEXT FROM scoped
    UNION ALL
    SELECT 'pageviews_7d',
      COALESCE((
        SELECT COUNT(*) FROM analytics_events e
        JOIN scoped s ON s.visitor_id = e.visitor_id
        WHERE e.event_type = 'pageview' AND e.created_at > NOW() - INTERVAL '7 days'
      ), 0)::TEXT
    UNION ALL
    SELECT 'resume_downloads_30d',
      COALESCE((
        SELECT COUNT(*) FROM analytics_events e
        JOIN scoped s ON s.visitor_id = e.visitor_id
        WHERE e.event_type = 'resume_download' AND e.created_at > NOW() - INTERVAL '30 days'
      ), 0)::TEXT
    UNION ALL
    SELECT 'calcom_clicks_30d',
      COALESCE((
        SELECT COUNT(*) FROM analytics_events e
        JOIN scoped s ON s.visitor_id = e.visitor_id
        WHERE e.event_type = 'calcom_click' AND e.created_at > NOW() - INTERVAL '30 days'
      ), 0)::TEXT
    UNION ALL
    SELECT 'outbound_clicks_30d',
      COALESCE((
        SELECT COUNT(*) FROM analytics_events e
        JOIN scoped s ON s.visitor_id = e.visitor_id
        WHERE e.event_type = 'outbound_click' AND e.created_at > NOW() - INTERVAL '30 days'
      ), 0)::TEXT;
  `) as SummaryRow[];

  const dailyTraffic = (await sql`
    WITH scoped AS (
      SELECT visitor_id FROM analytics_visitors v
      WHERE last_seen_at > NOW() - INTERVAL '30 days'
        AND (${filters.includeIsps} OR COALESCE(v.ip_company_type, '') != 'isp')
        AND (
          COALESCE(v.ip_company, v.ip_org, '') = ''
          OR NOT (LOWER(COALESCE(v.ip_company, v.ip_org, '')) ILIKE ANY (${excludeKeywords}))
        )
        AND (
          v.user_agent IS NULL
          OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
        )
    ),
    days AS (
      SELECT generate_series(
        date_trunc('day', NOW() - INTERVAL '29 days'),
        date_trunc('day', NOW()),
        INTERVAL '1 day'
      )::date AS day
    )
    SELECT
      d.day::TEXT AS day,
      COALESCE(COUNT(DISTINCT e.visitor_id), 0)::INT AS visitors,
      COALESCE(COUNT(*) FILTER (WHERE e.event_type = 'pageview'), 0)::INT AS pageviews
    FROM days d
    LEFT JOIN analytics_events e
      ON date_trunc('day', e.created_at)::date = d.day
     AND e.visitor_id IN (SELECT visitor_id FROM scoped)
    GROUP BY d.day
    ORDER BY d.day ASC;
  `) as DailyRow[];

  const topCompanies = (await sql`
    SELECT COALESCE(v.ip_company, v.ip_org, 'Unknown') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors v
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
      AND (${filters.includeIsps} OR COALESCE(v.ip_company_type, '') != 'isp')
      AND (
        COALESCE(v.ip_company, v.ip_org, '') = ''
        OR NOT (LOWER(COALESCE(v.ip_company, v.ip_org, '')) ILIKE ANY (${excludeKeywords}))
      )
      AND (
        v.user_agent IS NULL
        OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
      )
    GROUP BY label
    ORDER BY value DESC
    LIMIT 15;
  `) as TopRow[];

  const topCountries = (await sql`
    SELECT COALESCE(ip_country, 'Unknown') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors v
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
      AND (
        v.user_agent IS NULL
        OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
      )
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

  const topDevices = (await sql`
    SELECT COALESCE(device_type, 'unknown') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC;
  `) as TopRow[];

  const topBrowsers = (await sql`
    SELECT COALESCE(browser, 'Other') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC;
  `) as TopRow[];

  const topOS = (await sql`
    SELECT COALESCE(os, 'Other') AS label, COUNT(*)::INT AS value
    FROM analytics_visitors
    WHERE last_seen_at > NOW() - INTERVAL '30 days'
    GROUP BY label
    ORDER BY value DESC;
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

  const sectionDwell = (await sql`
    SELECT
      (metadata->>'section') AS section,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (metadata->>'dwellMs')::INT)::INT AS median_ms,
      COUNT(*)::INT AS samples
    FROM analytics_events
    WHERE event_type = 'section_dwell'
      AND created_at > NOW() - INTERVAL '30 days'
      AND metadata ? 'section'
      AND metadata ? 'dwellMs'
    GROUP BY section
    ORDER BY median_ms DESC
    LIMIT 12;
  `) as DwellRow[];

  const scrollFunnel = (await sql`
    SELECT
      (metadata->>'depth')::INT AS depth,
      COUNT(DISTINCT visitor_id)::INT AS visitors
    FROM analytics_events
    WHERE event_type = 'scroll_depth'
      AND created_at > NOW() - INTERVAL '30 days'
      AND metadata ? 'depth'
    GROUP BY depth
    ORDER BY depth ASC;
  `) as ScrollRow[];

  const recentVisitors = (await sql`
    WITH scoped AS (
      SELECT * FROM analytics_visitors v
      WHERE last_seen_at > NOW() - INTERVAL '30 days'
        AND (${filters.includeIsps} OR COALESCE(v.ip_company_type, '') != 'isp')
        AND (
          COALESCE(v.ip_company, v.ip_org, '') = ''
          OR NOT (LOWER(COALESCE(v.ip_company, v.ip_org, '')) ILIKE ANY (${excludeKeywords}))
        )
        AND (
          v.user_agent IS NULL
          OR NOT (LOWER(v.user_agent) ILIKE ANY (${excludeBotPatterns}))
        )
    )
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
    FROM scoped v
    LEFT JOIN analytics_events e ON e.visitor_id = v.visitor_id
    GROUP BY v.visitor_id, v.first_seen_at, v.last_seen_at, v.visit_count,
             v.ip_country, v.ip_city, v.ip_company, v.ip_company_domain,
             v.ip_company_type, v.ip_org, v.device_type, v.browser, v.os
    ORDER BY v.last_seen_at DESC
    LIMIT 50;
  `) as VisitorRow[];

  const highIntentVisitors = recentVisitors.filter(
    v => v.resume_downloads > 0 || v.calcom_clicks > 0
  );

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
  const filterQuery = filterFlagsToQueryString(filters);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Portfolio Analytics</h1>
          <p className="text-xs text-neutral-500">Signed in as {session}</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterBar filters={filters} />
          <a
            href={`/api/admin/export?type=visitors${filterQuery ? `&${filterQuery.slice(1)}` : ""}`}
            className="text-xs text-neutral-400 hover:text-white border border-white/10 rounded px-2 py-1"
          >
            Export CSV
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="text-xs text-neutral-400 hover:text-white">Sign out</button>
          </form>
        </div>
      </header>

      <section className="px-6 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        <Stat label="Visitors all-time"     value={summary.visitors_total} />
        <Stat label="Visitors 30d"          value={summary.visitors_30d} />
        <Stat label="Visitors 7d"           value={summary.visitors_7d} />
        <Stat label="Pageviews 7d"          value={summary.pageviews_7d} />
        <Stat label="Resume DLs 30d"        value={summary.resume_downloads_30d} accent="text-cyan-400" />
        <Stat label="Cal.com clicks 30d"    value={summary.calcom_clicks_30d}    accent="text-cyan-400" />
        <Stat label="Outbound clicks 30d"   value={summary.outbound_clicks_30d} />
      </section>

      <div className="px-6">
        <Panel title="Daily traffic (30d)" hint="Distinct visitors and total pageviews per day">
          <DailyChart rows={dailyTraffic} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        <Panel title="Top companies (30d)" hint="ISPs, cloud and VPNs filtered out by default">
          <BarList rows={topCompanies} emptyHint="No company data yet for the current filter." />
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
        <Panel title="Section dwell — median (30d)" hint="How long readers actually linger on each section">
          <BarList rows={sectionDwell.map(d => ({ label: d.section, value: d.median_ms }))} formatValue={ms => `${(ms / 1000).toFixed(1)}s`} emptyHint="Need a few more visits before dwell data is meaningful." />
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
        <Panel title="Devices (30d)">
          <BarList rows={topDevices} />
        </Panel>
        <Panel title="Browsers (30d)">
          <BarList rows={topBrowsers} />
        </Panel>
        <Panel title="Operating systems (30d)">
          <BarList rows={topOS} />
        </Panel>
      </div>

      <div className="px-6">
        <Panel title="Scroll-depth funnel (30d)" hint="Distinct visitors that reached each scroll threshold">
          <ScrollFunnel rows={scrollFunnel} />
        </Panel>
      </div>

      <section className="px-6">
        <Panel title={`High-intent visitors (${highIntentVisitors.length})`} hint="Downloaded resume or clicked Cal.com">
          <VisitorTable visitors={highIntentVisitors} />
        </Panel>
      </section>

      <section className="px-6">
        <Panel title={`Recent visitors (${recentVisitors.length})`}>
          <VisitorTable visitors={recentVisitors} />
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
                  <Link
                    href={`/admin/visitor/${e.visitor_id}`}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    {(e.ip_company || e.ip_country || "Unknown")}
                  </Link>
                  <span className="text-neutral-500"> · {e.path || "/"}</span>
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

function FilterBar({ filters }: { filters: FilterFlags }) {
  const link = (key: keyof FilterFlags, label: string) => {
    const next = { ...filters, [key]: !filters[key] };
    const qs = filterFlagsToQueryString(next);
    return (
      <Link
        href={`/admin${qs}`}
        className={`text-xs px-2 py-1 rounded border ${
          filters[key]
            ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
            : "border-white/10 text-neutral-400 hover:text-white"
        }`}
      >
        {filters[key] ? "✓ " : ""}{label}
      </Link>
    );
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-neutral-500 mr-1">Include:</span>
      {link("includeIsps", "ISPs")}
      {link("includeCloud", "Cloud")}
      {link("includeVpn", "VPN/Proxy")}
      {link("includeBots", "Bots")}
    </div>
  );
}

function VisitorTable({ visitors }: { visitors: VisitorRow[] }) {
  if (visitors.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-neutral-500">No visitors match the current filters.</p>
    );
  }

  return (
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
            <Th>Out</Th>
            <Th>Sections</Th>
            <Th>Last path</Th>
            <Th>Referrer</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => (
            <tr key={v.visitor_id} className="border-t border-white/5 hover:bg-white/[0.02]">
              <Td className="text-neutral-400 whitespace-nowrap">{relativeTime(v.last_seen_at)}</Td>
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
              <Td className="text-neutral-400">{v.outbound_clicks}</Td>
              <Td className="max-w-[180px]">
                {(v.sections_seen || []).filter(Boolean).join(", ") || (
                  <span className="text-neutral-600">—</span>
                )}
              </Td>
              <Td className="text-neutral-300 max-w-[180px] truncate">{v.last_path || "—"}</Td>
              <Td className="text-neutral-400 max-w-[180px] truncate" title={v.last_referrer || ""}>
                {v.last_referrer ? safeHostname(v.last_referrer) : "(direct)"}
              </Td>
              <Td>
                <Link
                  href={`/admin/visitor/${v.visitor_id}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  open →
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DailyChart({ rows }: { rows: DailyRow[] }) {
  if (rows.length === 0) {
    return <p className="text-xs text-neutral-500">No traffic in the last 30 days.</p>;
  }
  const maxVisitors = Math.max(...rows.map(r => r.visitors), 1);
  const maxPv = Math.max(...rows.map(r => r.pageviews), 1);

  const totalVisitors = rows.reduce((acc, r) => acc + r.visitors, 0);
  const totalPv = rows.reduce((acc, r) => acc + r.pageviews, 0);

  const W = 700;
  const H = 120;
  const PAD = 4;
  const stepX = (W - PAD * 2) / Math.max(rows.length - 1, 1);

  const visitorsPath = rows
    .map((r, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - ((H - PAD * 2) * r.visitors) / maxVisitors;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const pvPath = rows
    .map((r, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - ((H - PAD * 2) * r.pageviews) / maxPv;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <div className="flex items-baseline gap-6 mb-2 text-xs">
        <span className="text-cyan-400">● Visitors <span className="text-neutral-500">({totalVisitors})</span></span>
        <span className="text-purple-400">● Pageviews <span className="text-neutral-500">({totalPv})</span></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32">
        <path d={pvPath} stroke="rgb(167 139 250)" strokeWidth="1.5" fill="none" />
        <path d={visitorsPath} stroke="rgb(34 211 238)" strokeWidth="1.5" fill="none" />
        {rows.map((r, i) => {
          const x = PAD + i * stepX;
          const y = H - PAD - ((H - PAD * 2) * r.visitors) / maxVisitors;
          return r.visitors > 0 ? (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="rgb(34 211 238)"
            >
              <title>{`${r.day}: ${r.visitors} visitors, ${r.pageviews} pageviews`}</title>
            </circle>
          ) : null;
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
        <span>{rows[0]?.day}</span>
        <span>{rows[rows.length - 1]?.day}</span>
      </div>
    </div>
  );
}

function ScrollFunnel({ rows }: { rows: ScrollRow[] }) {
  const map = new Map(rows.map(r => [r.depth, r.visitors]));
  const depths = [25, 50, 75, 100];
  const data = depths.map(d => ({ depth: d, visitors: map.get(d) ?? 0 }));
  const max = Math.max(...data.map(d => d.visitors), 1);

  return (
    <div className="grid grid-cols-4 gap-3">
      {data.map((d, i) => {
        const prev = i === 0 ? null : data[i - 1].visitors;
        const dropoff = prev && prev > 0 ? Math.round(((prev - d.visitors) / prev) * 100) : null;
        return (
          <div key={d.depth} className="bg-white/5 rounded-md p-3">
            <div className="text-2xl font-semibold text-white">{d.visitors}</div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
              reached {d.depth}%
            </div>
            <div className="h-1 bg-white/5 rounded mt-2">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded"
                style={{ width: `${(d.visitors / max) * 100}%` }}
              />
            </div>
            {dropoff !== null && (
              <div className="text-[10px] text-neutral-500 mt-1">
                {dropoff > 0 ? `−${dropoff}% from previous` : "no drop-off"}
              </div>
            )}
          </div>
        );
      })}
    </div>
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

function BarList({
  rows,
  emptyHint,
  formatValue,
}: {
  rows: TopRow[];
  emptyHint?: string;
  formatValue?: (v: number) => string;
}) {
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
            <span className="text-neutral-400 font-mono">
              {formatValue ? formatValue(r.value) : r.value}
            </span>
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

function Th({ children }: { children?: React.ReactNode }) {
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

function safeHostname(value: string): string {
  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}
