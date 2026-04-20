"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SESSION_STORAGE_KEY = "ssg_analytics_session";
const SESSION_MAX_AGE_MS = 30 * 60 * 1000;
const TRACK_ENDPOINT = "/api/track";

type TrackEvent = {
  eventType: string;
  path?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
};

type StoredSession = { id: string; ts: number };

function getOrCreateSession(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredSession;
      if (parsed.id && Date.now() - parsed.ts < SESSION_MAX_AGE_MS) {
        const refreshed: StoredSession = { id: parsed.id, ts: Date.now() };
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(refreshed));
        return parsed.id;
      }
    }
  } catch {
    // sessionStorage might be unavailable (private mode in some browsers).
  }

  const id = randomId();
  try {
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({ id, ts: Date.now() } satisfies StoredSession)
    );
  } catch {
    // ignore
  }
  return id;
}

function randomId(): string {
  const arr = new Uint8Array(12);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

function send(payload: TrackEvent & { sessionId: string; utm?: Record<string, string | null> }) {
  const body = JSON.stringify(payload);
  // sendBeacon survives page unload, our fallback handles online tracking.
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(TRACK_ENDPOINT, blob)) return;
  }
  fetch(TRACK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string | null>(null);

  // Pageview tracking with UTM capture
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const sessionId = getOrCreateSession();
    if (!sessionId) return;

    const utm = {
      source: searchParams?.get("utm_source") ?? null,
      medium: searchParams?.get("utm_medium") ?? null,
      campaign: searchParams?.get("utm_campaign") ?? null,
    };

    send({
      sessionId,
      eventType: "pageview",
      path: pathname,
      referrer: document.referrer || undefined,
      utm,
    });
  }, [pathname, searchParams]);

  // Section visibility, scroll-depth, dwell-time, outbound clicks
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/admin")) return;
    const sessionId = getOrCreateSession();
    if (!sessionId) return;

    const sectionEnterTimes = new Map<string, number>();
    const sectionsSeen = new Set<string>();
    const depthsHit = new Set<number>();
    const SCROLL_DEPTHS = [25, 50, 75, 100];

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-track-section]")
    );

    const sectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const name = entry.target.getAttribute("data-track-section");
          if (!name) continue;
          if (entry.isIntersecting) {
            sectionEnterTimes.set(name, performance.now());
            if (!sectionsSeen.has(name)) {
              sectionsSeen.add(name);
              send({
                sessionId,
                eventType: "section_view",
                path: window.location.pathname,
                metadata: { section: name },
              });
            }
          } else {
            const enteredAt = sectionEnterTimes.get(name);
            if (enteredAt !== undefined) {
              const dwellMs = Math.round(performance.now() - enteredAt);
              sectionEnterTimes.delete(name);
              if (dwellMs > 1500) {
                send({
                  sessionId,
                  eventType: "section_dwell",
                  path: window.location.pathname,
                  metadata: { section: name, dwellMs },
                });
              }
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    for (const el of sections) sectionObserver.observe(el);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);
      for (const depth of SCROLL_DEPTHS) {
        if (pct >= depth && !depthsHit.has(depth)) {
          depthsHit.add(depth);
          send({
            sessionId,
            eventType: "scroll_depth",
            path: window.location.pathname,
            metadata: { depth },
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      const button = target?.closest("[data-track-event]") as HTMLElement | null;
      const trackedEl = anchor || button;
      if (!trackedEl) return;

      const explicitEvent = trackedEl.getAttribute("data-track-event");
      const explicitMeta = trackedEl.getAttribute("data-track-meta") || undefined;

      if (explicitEvent) {
        send({
          sessionId,
          eventType: explicitEvent,
          path: window.location.pathname,
          metadata: parseMeta(explicitMeta, anchor?.href),
        });
        return;
      }

      if (anchor?.href) {
        const url = safeUrl(anchor.href);
        if (!url) return;

        if (url.pathname.endsWith(".pdf") && url.pathname.toLowerCase().includes("resume")) {
          send({
            sessionId,
            eventType: "resume_download",
            path: window.location.pathname,
            metadata: { href: anchor.href },
          });
          return;
        }

        if (url.hostname.includes("cal.com")) {
          send({
            sessionId,
            eventType: "calcom_click",
            path: window.location.pathname,
            metadata: { href: anchor.href },
          });
          return;
        }

        if (url.hostname && url.hostname !== window.location.hostname) {
          send({
            sessionId,
            eventType: "outbound_click",
            path: window.location.pathname,
            metadata: { href: anchor.href, host: url.hostname },
          });
        }
      }
    };
    document.addEventListener("click", onClick, true);

    const onUnload = () => {
      const now = performance.now();
      for (const [name, enteredAt] of sectionEnterTimes.entries()) {
        const dwellMs = Math.round(now - enteredAt);
        if (dwellMs > 1500) {
          send({
            sessionId,
            eventType: "section_dwell",
            path: window.location.pathname,
            metadata: { section: name, dwellMs },
          });
        }
      }
    };
    window.addEventListener("pagehide", onUnload);

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", onUnload);
    };
  }, [pathname]);

  return null;
}

function safeUrl(href: string): URL | null {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function parseMeta(raw: string | undefined, href: string | undefined): Record<string, unknown> {
  const meta: Record<string, unknown> = {};
  if (href) meta.href = href;
  if (!raw) return meta;
  try {
    return { ...meta, ...JSON.parse(raw) };
  } catch {
    meta.note = raw;
    return meta;
  }
}
