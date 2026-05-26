-- sphinixOps schema for Sphinx Healing Services
-- Run in Supabase SQL editor or via CLI

create type ops_role as enum ('director', 'hr', 'manager', 'employee');
create type shift_status as enum ('scheduled', 'in_progress', 'completed', 'cancelled');
create type approval_status as enum ('pending', 'approved', 'rejected');
create type vehicle_type as enum ('company', 'personal');

create table sites (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  city text not null default 'Edmonton',
  color text not null,
  manager_name text,
  staff_total int not null default 0,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  role ops_role not null,
  site_id uuid references sites(id),
  phone text,
  created_at timestamptz not null default now()
);

create table shifts (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references profiles(id),
  site_id uuid not null references sites(id),
  program text not null,
  title text not null,
  location text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status shift_status not null default 'scheduled',
  assigned_by uuid references profiles(id),
  notes text,
  requires_visit_log boolean not null default true,
  created_at timestamptz not null default now()
);

create table time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references profiles(id),
  shift_id uuid not null references shifts(id) on delete cascade,
  punched_in_at timestamptz,
  punched_out_at timestamptz,
  visit_log text,
  visit_log_submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table mileage_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references profiles(id),
  shift_id uuid references shifts(id),
  site_id uuid references sites(id),
  vehicle_type vehicle_type not null,
  km_start numeric,
  km_end numeric,
  km_total numeric generated always as (greatest(0, coalesce(km_end, 0) - coalesce(km_start, 0))) stored,
  reimbursement_eligible boolean not null default false,
  reimbursement_amount numeric not null default 0,
  status approval_status not null default 'pending',
  approved_by uuid references profiles(id),
  week_of date,
  created_at timestamptz not null default now()
);

create table activity_events (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  site_id uuid references sites(id),
  event_type text not null default 'shift',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table shifts enable row level security;
alter table time_entries enable row level security;
alter table mileage_entries enable row level security;

-- RLS policies: refine per role in production
create policy "profiles read own" on profiles for select using (auth.uid() = id);
create policy "director read all profiles" on profiles for select using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'director')
);
