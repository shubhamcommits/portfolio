import { createHash } from "crypto";
import { NextRequest } from "next/server";

const SALT = process.env.ANALYTICS_SALT || "shubhamsinngh-default-salt-change-me";

export type GeoInfo = {
  country: string | null;
  region: string | null;
  city: string | null;
};

export type CompanyInfo = {
  org: string | null;
  asn: string | null;
  company: string | null;
  companyDomain: string | null;
  companyType: string | null;
};

export type DeviceInfo = {
  deviceType: string;
  browser: string;
  os: string;
};

export function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

export function getGeoFromRequest(req: NextRequest): GeoInfo {
  // Vercel injects these headers on the edge for free, no extra calls needed.
  return {
    country: req.headers.get("x-vercel-ip-country") || null,
    region: req.headers.get("x-vercel-ip-country-region") || null,
    city: decodeIfPresent(req.headers.get("x-vercel-ip-city")),
  };
}

function decodeIfPresent(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Hash IP+UA into a stable opaque visitor ID. We never store raw IPs.
// This avoids GDPR personal-data classification while still giving us
// repeat-visit detection.
export function hashVisitor(ip: string | null, userAgent: string | null): string {
  const fingerprint = `${ip ?? "noip"}|${userAgent ?? "noua"}|${SALT}`;
  return createHash("sha256").update(fingerprint).digest("hex").slice(0, 32);
}

export async function lookupCompany(ip: string | null): Promise<CompanyInfo> {
  const empty: CompanyInfo = {
    org: null,
    asn: null,
    company: null,
    companyDomain: null,
    companyType: null,
  };

  if (!ip || !process.env.IPINFO_TOKEN) return empty;
  if (isPrivateIp(ip)) return empty;

  try {
    const res = await fetch(
      `https://ipinfo.io/${encodeURIComponent(ip)}/json?token=${process.env.IPINFO_TOKEN}`,
      { next: { revalidate: 60 * 60 * 24 } } // cache 24h per IP
    );
    if (!res.ok) return empty;

    const data = (await res.json()) as {
      org?: string;
      company?: { name?: string; domain?: string; type?: string };
      asn?: { asn?: string; name?: string };
    };

    const org = data.org ?? null;
    let asn: string | null = data.asn?.asn ?? null;
    if (!asn && org) {
      const m = org.match(/^(AS\d+)/i);
      if (m) asn = m[1];
    }

    return {
      org,
      asn,
      company: data.company?.name ?? data.asn?.name ?? null,
      companyDomain: data.company?.domain ?? null,
      companyType: data.company?.type ?? null,
    };
  } catch {
    return empty;
  }
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

export function parseDevice(userAgent: string | null): DeviceInfo {
  const ua = userAgent ?? "";
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);

  let browser = "Other";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua) && !/Edg|OPR/i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua) && !/Chrome|Edg|OPR/i.test(ua)) browser = "Safari";

  let os = "Other";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  return {
    deviceType: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
    browser,
    os,
  };
}
