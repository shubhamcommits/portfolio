// Cloud / hosting / VPN / proxy ASN keywords we treat as "non-human" by default.
// Used in dashboard SQL via NOT (... ILIKE ANY(...)).
export const CLOUD_KEYWORDS = [
  "%amazon%",
  "%aws%",
  "%google%",
  "%gcp%",
  "%microsoft%",
  "%azure%",
  "%cloudflare%",
  "%digitalocean%",
  "%linode%",
  "%hetzner%",
  "%ovh%",
  "%vultr%",
  "%oracle%cloud%",
  "%fastly%",
  "%vercel%",
];

export const VPN_PROXY_KEYWORDS = [
  "%zscaler%",
  "%palo alto%",
  "%nordvpn%",
  "%expressvpn%",
  "%mullvad%",
  "%proton%vpn%",
  "%iboss%",
  "%netskope%",
];

// Common bot user-agent substrings.
export const BOT_UA_KEYWORDS = [
  "%bot%",
  "%crawl%",
  "%spider%",
  "%headless%",
  "%lighthouse%",
  "%pagespeed%",
  "%ahrefs%",
  "%semrush%",
  "%dataforseo%",
  "%pingdom%",
  "%uptimerobot%",
  "%gtmetrix%",
  "%facebookexternalhit%",
  "%slackbot%",
  "%twitterbot%",
  "%linkedinbot%",
  "%discordbot%",
  "%whatsapp%",
  "%embedly%",
];

export type FilterFlags = {
  includeIsps: boolean;
  includeCloud: boolean;
  includeVpn: boolean;
  includeBots: boolean;
};

export function parseFilters(searchParams: URLSearchParams | { get(k: string): string | null }): FilterFlags {
  const get = (k: string) => searchParams.get(k);
  return {
    includeIsps: get("isps") === "1",
    includeCloud: get("cloud") === "1",
    includeVpn: get("vpn") === "1",
    includeBots: get("bots") === "1",
  };
}

export function filterFlagsToQueryString(flags: FilterFlags): string {
  const params = new URLSearchParams();
  if (flags.includeIsps) params.set("isps", "1");
  if (flags.includeCloud) params.set("cloud", "1");
  if (flags.includeVpn) params.set("vpn", "1");
  if (flags.includeBots) params.set("bots", "1");
  const s = params.toString();
  return s ? `?${s}` : "";
}
