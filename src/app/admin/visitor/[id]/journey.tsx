import React from "react";

export type EventDetail = {
  id: string;
  created_at: string;
  session_id: string;
  event_type: string;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  metadata: Record<string, unknown> | null;
};

export type GroupedSession = {
  id: string;
  start: string;
  end: string;
  events: EventDetail[];
};

// Stable color per event type. Cyan for navigation, amber for engagement,
// emerald for high-intent actions, rose for departures.
export const EVENT_STYLE: Record<
  string,
  { color: string; bg: string; ring: string; icon: string; label: string }
> = {
  pageview:        { color: "text-cyan-300",    bg: "bg-cyan-500/15",    ring: "ring-cyan-400/40",   icon: "▸", label: "Pageview" },
  section_view:    { color: "text-amber-300",   bg: "bg-amber-500/15",   ring: "ring-amber-400/40",  icon: "◆", label: "Section in view" },
  section_dwell:   { color: "text-amber-200",   bg: "bg-amber-500/10",   ring: "ring-amber-400/30",  icon: "◇", label: "Dwell" },
  scroll_depth:    { color: "text-violet-300",  bg: "bg-violet-500/15",  ring: "ring-violet-400/40", icon: "↓", label: "Scroll" },
  outbound_click:  { color: "text-rose-300",    bg: "bg-rose-500/15",    ring: "ring-rose-400/40",   icon: "↗", label: "Outbound click" },
  resume_download: { color: "text-emerald-300", bg: "bg-emerald-500/20", ring: "ring-emerald-400/50", icon: "⬇", label: "Resume download" },
  calcom_click:    { color: "text-emerald-300", bg: "bg-emerald-500/20", ring: "ring-emerald-400/50", icon: "📞", label: "Cal.com click" },
  tool_use:        { color: "text-fuchsia-300", bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/40", icon: "★", label: "Tool use" },
  project_click:   { color: "text-blue-300",    bg: "bg-blue-500/15",    ring: "ring-blue-400/40",   icon: "▣", label: "Project click" },
};

function eventStyle(t: string) {
  return EVENT_STYLE[t] ?? {
    color: "text-neutral-300",
    bg: "bg-white/5",
    ring: "ring-white/20",
    icon: "•",
    label: t,
  };
}

// ---------- Top-level summary across all sessions ----------

export function JourneySummary({
  sessions,
  events,
}: {
  sessions: GroupedSession[];
  events: EventDetail[];
}) {
  const totalSeconds = sessions.reduce(
    (acc, s) => acc + (new Date(s.end).getTime() - new Date(s.start).getTime()) / 1000,
    0
  );
  const distinctPages = new Set(
    events.filter(e => e.event_type === "pageview" && e.path).map(e => e.path!)
  ).size;
  const distinctSections = new Set(
    events
      .filter(e => e.event_type === "section_view")
      .map(e => (e.metadata?.section as string) ?? "")
      .filter(Boolean)
  ).size;
  const resumeDownloads = events.filter(e => e.event_type === "resume_download").length;
  const calcomClicks = events.filter(e => e.event_type === "calcom_click").length;
  const outboundClicks = events.filter(e => e.event_type === "outbound_click").length;
  const maxScroll = events
    .filter(e => e.event_type === "scroll_depth" && typeof e.metadata?.depth === "number")
    .reduce((acc, e) => Math.max(acc, (e.metadata!.depth as number)), 0);

  const isHighIntent = resumeDownloads > 0 || calcomClicks > 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">Journey summary</h2>
        {isHighIntent && (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40">
            High intent
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 text-xs">
        <SummaryStat label="Sessions"         value={sessions.length} />
        <SummaryStat label="Pages visited"    value={distinctPages} />
        <SummaryStat label="Sections seen"    value={distinctSections} />
        <SummaryStat label="Time on site"     value={formatDuration(totalSeconds * 1000)} />
        <SummaryStat label="Max scroll"       value={maxScroll ? `${maxScroll}%` : "—"} />
        <SummaryStat label="Resume DLs"       value={resumeDownloads} accent={resumeDownloads > 0} />
        <SummaryStat label="Cal.com clicks"   value={calcomClicks}    accent={calcomClicks > 0} />
      </div>
      <div className="mt-3 text-[11px] text-neutral-500">
        Outbound clicks: {outboundClicks}
      </div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div>
      <div className={`text-lg font-semibold ${accent ? "text-emerald-300" : "text-white"}`}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">{label}</div>
    </div>
  );
}

// ---------- Site flow: page-to-page directed graph ----------

export function SiteFlow({ events }: { events: EventDetail[] }) {
  const pageEvents = events
    .filter(e => e.event_type === "pageview")
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  if (pageEvents.length < 2) return null;

  const pageOrder: string[] = [];
  const pageStats = new Map<string, { hits: number; firstAt: string; lastAt: string }>();
  for (const e of pageEvents) {
    const path = e.path || "/";
    if (!pageStats.has(path)) {
      pageOrder.push(path);
      pageStats.set(path, { hits: 1, firstAt: e.created_at, lastAt: e.created_at });
    } else {
      const s = pageStats.get(path)!;
      s.hits += 1;
      s.lastAt = e.created_at;
    }
  }

  type Edge = { from: string; to: string; count: number };
  const edgeMap = new Map<string, Edge>();
  for (let i = 0; i < pageEvents.length - 1; i++) {
    const from = pageEvents[i].path || "/";
    const to = pageEvents[i + 1].path || "/";
    if (from === to) continue;
    const key = `${from}|||${to}`;
    if (edgeMap.has(key)) edgeMap.get(key)!.count += 1;
    else edgeMap.set(key, { from, to, count: 1 });
  }
  const edges = Array.from(edgeMap.values());

  // Lay out: vertical column, fixed spacing. Edges drawn as right-hand bezier arcs.
  const NODE_H = 56;
  const NODE_GAP = 28;
  const NODE_W = 320;
  const ARC_GUTTER = 130;
  const PAD = 16;

  const W = NODE_W + ARC_GUTTER + PAD * 2;
  const H = pageOrder.length * (NODE_H + NODE_GAP) - NODE_GAP + PAD * 2;

  const nodeIndex = new Map(pageOrder.map((p, i) => [p, i]));
  const nodeY = (i: number) => PAD + i * (NODE_H + NODE_GAP);

  const maxEdgeCount = Math.max(...edges.map(e => e.count), 1);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">Site flow</h2>
        <span className="text-[10px] text-neutral-500">
          {pageOrder.length} unique pages, {edges.length} transitions
        </span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: H, maxHeight: H }}>
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="rgb(34 211 238 / 0.7)" />
            </marker>
          </defs>

          {edges.map((edge, i) => {
            const fromI = nodeIndex.get(edge.from)!;
            const toI = nodeIndex.get(edge.to)!;
            const x1 = PAD + NODE_W;
            const y1 = nodeY(fromI) + NODE_H / 2;
            const x2 = PAD + NODE_W;
            const y2 = nodeY(toI) + NODE_H / 2;
            const arcOut = PAD + NODE_W + 20 + (Math.abs(toI - fromI) - 1) * 14;
            const dir = toI > fromI ? 1 : -1;
            const path = `M ${x1} ${y1} C ${arcOut} ${y1 + 10 * dir}, ${arcOut} ${y2 - 10 * dir}, ${x2 + 4} ${y2}`;
            const opacity = 0.35 + 0.65 * (edge.count / maxEdgeCount);
            const strokeWidth = 1.2 + (edge.count / maxEdgeCount) * 2.2;
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgb(34 211 238)"
                  strokeOpacity={opacity}
                  strokeWidth={strokeWidth}
                  markerEnd="url(#arrow)"
                />
                {edge.count > 1 && (
                  <text
                    x={arcOut + 10}
                    y={(y1 + y2) / 2}
                    fontSize="10"
                    fill="rgb(34 211 238)"
                    fillOpacity="0.9"
                    dominantBaseline="middle"
                  >
                    ×{edge.count}
                  </text>
                )}
              </g>
            );
          })}

          {pageOrder.map((path, i) => {
            const stats = pageStats.get(path)!;
            return (
              <g key={path} transform={`translate(${PAD}, ${nodeY(i)})`}>
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(34, 211, 238, 0.35)"
                />
                <text x="14" y="22" fontSize="13" fill="white" fontFamily="ui-monospace, monospace">
                  {path.length > 36 ? path.slice(0, 33) + "…" : path}
                </text>
                <text x="14" y="40" fontSize="11" fill="rgba(255,255,255,0.5)">
                  {stats.hits} view{stats.hits === 1 ? "" : "s"} · entered {formatTimeOnly(stats.firstAt)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ---------- Per-session attention ribbon ----------

export function SessionRibbon({ session }: { session: GroupedSession }) {
  const startMs = new Date(session.start).getTime();
  const endMs = new Date(session.end).getTime();
  const durationMs = Math.max(endMs - startMs, 1000);

  const W = 1000;
  const ROW_H = 18;
  const PAD_X = 12;
  const PAD_TOP = 28;

  // Lanes: pageview lane, then one lane per distinct section seen this session.
  const sections = Array.from(
    new Set(
      session.events
        .filter(e => e.event_type === "section_view" || e.event_type === "section_dwell")
        .map(e => (e.metadata?.section as string) ?? "")
        .filter(Boolean)
    )
  );

  // The "page" lane is always lane 0; section lanes follow.
  const lanes = ["__page__", ...sections];
  const laneY = (i: number) => PAD_TOP + i * ROW_H;
  const laneIndex = new Map(lanes.map((l, i) => [l, i]));

  const innerW = W - PAD_X * 2;
  const xFor = (ms: number) => PAD_X + ((ms - startMs) / durationMs) * innerW;

  // Build page-active spans on the page lane: between consecutive pageviews,
  // assume that page was active until the next pageview (or session end).
  const pageviews = session.events.filter(e => e.event_type === "pageview");
  type Span = { fromX: number; toX: number; label: string; fill: string };
  const pageSpans: Span[] = [];
  for (let i = 0; i < pageviews.length; i++) {
    const startAt = new Date(pageviews[i].created_at).getTime();
    const endAt =
      i + 1 < pageviews.length
        ? new Date(pageviews[i + 1].created_at).getTime()
        : endMs;
    pageSpans.push({
      fromX: xFor(startAt),
      toX: xFor(endAt),
      label: pageviews[i].path || "/",
      fill: pageColor(pageviews[i].path || "/"),
    });
  }

  // Section spans: rendered from `section_dwell` events (which contain dwellMs).
  const sectionSpans: Array<Span & { laneIdx: number }> = [];
  for (const e of session.events) {
    if (e.event_type !== "section_dwell") continue;
    const dwell = (e.metadata?.dwellMs as number) ?? 0;
    const section = (e.metadata?.section as string) ?? "";
    if (!section || dwell <= 0) continue;
    const exitAt = new Date(e.created_at).getTime();
    const enterAt = exitAt - dwell;
    const idx = laneIndex.get(section);
    if (idx === undefined) continue;
    sectionSpans.push({
      fromX: xFor(enterAt),
      toX: xFor(exitAt),
      label: `${(dwell / 1000).toFixed(1)}s`,
      fill: "rgba(245, 158, 11, 0.35)",
      laneIdx: idx,
    });
  }

  // Discrete event dots above the ribbon (clicks, downloads, scroll depth).
  const dotEvents = session.events.filter(e =>
    ["resume_download", "calcom_click", "outbound_click", "scroll_depth", "tool_use"].includes(
      e.event_type
    )
  );

  const H = PAD_TOP + lanes.length * ROW_H + 18;

  // Time tick labels at start, mid, end.
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(p => ({
    x: PAD_X + p * innerW,
    label: formatRelativeMs(p * durationMs),
  }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
      <div className="flex items-baseline justify-between mb-3 text-xs">
        <span className="text-cyan-400 font-mono">session {session.id.slice(0, 8)}</span>
        <span className="text-neutral-500">
          {new Date(session.start).toLocaleString()}
          <span className="text-neutral-700"> · </span>
          {formatDuration(durationMs)}
          <span className="text-neutral-700"> · </span>
          {session.events.length} events
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: H }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={t.x}
              x2={t.x}
              y1={PAD_TOP - 6}
              y2={PAD_TOP + lanes.length * ROW_H}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={t.x}
              y={PAD_TOP - 10}
              fontSize="9"
              fill="rgba(255,255,255,0.4)"
              textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}
            >
              {t.label}
            </text>
          </g>
        ))}

        {pageSpans.map((s, i) => (
          <g key={`p${i}`}>
            <rect
              x={s.fromX}
              y={laneY(0) + 2}
              width={Math.max(s.toX - s.fromX, 2)}
              height={ROW_H - 4}
              fill={s.fill}
              rx="3"
            >
              <title>{`${s.label}\n${formatDuration(((s.toX - s.fromX) / innerW) * durationMs)}`}</title>
            </rect>
            {s.toX - s.fromX > 80 && (
              <text
                x={s.fromX + 6}
                y={laneY(0) + ROW_H / 2 + 3}
                fontSize="10"
                fill="white"
                fillOpacity="0.85"
                fontFamily="ui-monospace, monospace"
              >
                {s.label.length > 20 ? s.label.slice(0, 18) + "…" : s.label}
              </text>
            )}
          </g>
        ))}

        {sectionSpans.map((s, i) => (
          <rect
            key={`s${i}`}
            x={s.fromX}
            y={laneY(s.laneIdx) + 4}
            width={Math.max(s.toX - s.fromX, 2)}
            height={ROW_H - 8}
            fill={s.fill}
            rx="2"
          >
            <title>{`#${lanes[s.laneIdx]} · ${s.label}`}</title>
          </rect>
        ))}

        {dotEvents.map((e, i) => {
          const x = xFor(new Date(e.created_at).getTime());
          const style = eventStyle(e.event_type);
          const isImportant =
            e.event_type === "resume_download" || e.event_type === "calcom_click";
          return (
            <g key={`d${i}`}>
              <circle
                cx={x}
                cy={laneY(0) + ROW_H / 2}
                r={isImportant ? 5 : 3.5}
                fill={dotFill(e.event_type)}
                stroke="rgb(0,0,0)"
                strokeWidth="1"
              >
                <title>
                  {`${style.label}${e.metadata?.host ? ` → ${e.metadata.host}` : ""}${e.metadata?.depth ? ` ${e.metadata.depth}%` : ""}`}
                </title>
              </circle>
            </g>
          );
        })}

        {lanes.map((lane, i) => (
          <text
            key={lane}
            x={W - PAD_X}
            y={laneY(i) + ROW_H / 2 + 3}
            fontSize="10"
            fill={i === 0 ? "rgba(34, 211, 238, 0.7)" : "rgba(245, 158, 11, 0.7)"}
            textAnchor="end"
          >
            {i === 0 ? "page" : `#${lane}`}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ---------- Detailed event timeline (replaces the old plain list) ----------

export function EventTimeline({ session }: { session: GroupedSession }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
      <div className="flex items-baseline justify-between mb-3 text-xs">
        <span className="text-cyan-400 font-mono">session {session.id.slice(0, 8)} — events</span>
      </div>
      <ol className="relative pl-6">
        <span className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
        {session.events.map((e, i) => {
          const style = eventStyle(e.event_type);
          return (
            <li key={e.id} className="relative mb-2.5 last:mb-0">
              <span
                className={`absolute -left-[14px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ring-1 ${style.bg} ${style.color} ${style.ring}`}
              >
                {style.icon}
              </span>
              <div className="flex items-baseline gap-3 text-xs">
                <span className="text-neutral-500 w-20 shrink-0 font-mono">
                  {new Date(e.created_at).toLocaleTimeString()}
                </span>
                <span className={`font-mono w-32 shrink-0 ${style.color}`}>{e.event_type}</span>
                <span className="text-neutral-300 truncate">
                  {e.path || "/"}
                  {e.metadata && Object.keys(e.metadata).length > 0 && (
                    <span className="text-neutral-500"> {summarizeMeta(e.metadata)}</span>
                  )}
                  {e.referrer && (
                    <span className="text-neutral-600"> · ref: {safeHostname(e.referrer)}</span>
                  )}
                  {e.utm_source && (
                    <span className="text-neutral-600">
                      {" "}· utm: {[e.utm_source, e.utm_medium, e.utm_campaign].filter(Boolean).join("/")}
                    </span>
                  )}
                </span>
              </div>
              {i === 0 && session.events.length > 1 && (
                <span className="absolute -left-[6px] top-6 text-[9px] text-neutral-600">
                  start
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------- Helpers ----------

function dotFill(eventType: string): string {
  switch (eventType) {
    case "resume_download":
      return "rgb(110, 231, 183)";
    case "calcom_click":
      return "rgb(110, 231, 183)";
    case "outbound_click":
      return "rgb(251, 113, 133)";
    case "scroll_depth":
      return "rgb(196, 181, 253)";
    case "tool_use":
      return "rgb(232, 121, 249)";
    default:
      return "rgb(255, 255, 255)";
  }
}

function pageColor(path: string): string {
  // Hash path into a deterministic hue so each page gets a stable color.
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    hash = (hash * 31 + path.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  return `hsla(${hue}, 70%, 55%, 0.65)`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const sec = ms / 1000;
  if (sec < 60) return `${sec.toFixed(1)}s`;
  const min = sec / 60;
  if (min < 60) return `${min.toFixed(1)}m`;
  const hr = min / 60;
  return `${hr.toFixed(1)}h`;
}

function formatRelativeMs(ms: number): string {
  if (ms < 1000) return "0s";
  return formatDuration(ms);
}

function formatTimeOnly(iso: string): string {
  return new Date(iso).toLocaleTimeString();
}

function summarizeMeta(meta: Record<string, unknown>): string {
  const parts: string[] = [];
  if (typeof meta.section === "string") parts.push(`#${meta.section}`);
  if (typeof meta.host === "string") parts.push(meta.host);
  if (typeof meta.href === "string") parts.push(meta.href);
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
