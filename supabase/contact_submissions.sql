-- Run this in Supabase: SQL Editor → New query → Run
-- Table name must match src/app/api/contact/route.ts

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Optional: index for admin sorting by date
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Service role bypasses RLS; enable RLS if you add a public read policy later
alter table public.contact_submissions enable row level security;

-- No policies = only service_role can insert/read (used by your API route)
