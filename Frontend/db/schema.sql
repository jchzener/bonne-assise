CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  description_fr TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('food','culture','music','heritage','nature','community')),
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','verified','rejected')),
  sponsored BOOLEAN NOT NULL DEFAULT FALSE,
  sponsor_name TEXT,
  featured_rank INTEGER,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (source_url, title, starts_at),
  CHECK (ends_at >= starts_at)
);
CREATE INDEX IF NOT EXISTS events_published_dates_idx ON events (status, starts_at, ends_at);
CREATE INDEX IF NOT EXISTS events_featured_idx ON events (sponsored DESC, featured_rank, starts_at);

-- CMS: partner / editorial content (MVP admin Next.js + Postgres)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'partner' CHECK (role IN ('admin','editor','partner')),
  password_hash TEXT NOT NULL,
  organization TEXT NOT NULL DEFAULT '',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_entries (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('place','restaurant','hotel','experience','story','guide')),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en','fr')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body JSONB NOT NULL DEFAULT '[]',
  city TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','archived')),
  author_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  partner_org TEXT NOT NULL DEFAULT '',
  meta JSONB NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (type, slug, locale)
);

CREATE INDEX IF NOT EXISTS content_entries_status_idx ON content_entries (status, type, published_at DESC);
CREATE INDEX IF NOT EXISTS content_entries_author_idx ON content_entries (author_id);
