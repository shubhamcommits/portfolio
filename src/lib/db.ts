import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  // We avoid throwing at import time so build doesn't fail without env vars.
  // The ingest endpoint will short-circuit when DATABASE_URL is missing.
  console.warn("[db] DATABASE_URL is not set. Analytics ingest will be disabled.");
}

export const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : null;

export const isDbReady = () => sql !== null;

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS analytics_visitors (
  visitor_id TEXT PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  visit_count   INTEGER     NOT NULL DEFAULT 1,
  ip_country    TEXT,
  ip_region     TEXT,
  ip_city       TEXT,
  ip_org        TEXT,
  ip_asn        TEXT,
  ip_company    TEXT,
  ip_company_domain TEXT,
  ip_company_type   TEXT,
  user_agent    TEXT,
  device_type   TEXT,
  browser       TEXT,
  os            TEXT
);

CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON analytics_visitors (last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_company   ON analytics_visitors (ip_company);

CREATE TABLE IF NOT EXISTS analytics_events (
  id            BIGSERIAL PRIMARY KEY,
  visitor_id    TEXT NOT NULL REFERENCES analytics_visitors(visitor_id) ON DELETE CASCADE,
  session_id    TEXT NOT NULL,
  event_type    TEXT NOT NULL,
  path          TEXT,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  metadata      JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_visitor_created ON analytics_events (visitor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_type_created    ON analytics_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session         ON analytics_events (session_id);

CREATE TABLE IF NOT EXISTS admin_login_tokens (
  token       TEXT PRIMARY KEY,
  email       TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_admin_tokens_expires ON admin_login_tokens (expires_at);
`;
