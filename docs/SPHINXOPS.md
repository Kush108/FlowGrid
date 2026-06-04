# Sphinx Ops — Sphinx Healing Services

Custom operations platform for [Sphinx Healing Services](https://sphinxhealing.org/) — going beyond limited [BrightHR](https://www.brighthr.com/ca/home/) workflows with **HR, fleet, CRM, auto payroll, and field programs** for **70+ staff across 6 sites**.

## Live prototype (demo auth)

After deploy:

- **Login:** `/sphinxops/login`
- **Director (Stephanie):** demo account `Stephanie R.`
- **HR:** schedule + approvals
- **Site Manager:** site-scoped dashboard
- **Field Staff:** mobile visits, punch in/out, visit logs, company vs personal vehicle

## Stack

- Next.js App Router (`/app/sphinxops/*`)
- Supabase (auth + Postgres) — schema in `supabase/migrations/001_sphinxops.sql`
- Tailwind + Lucide
- Demo mode: cookie session when Supabase env vars are empty

## Features (prototype)

| Area | Status |
|------|--------|
| Role-based dashboards (4 roles) | ✅ |
| 6 site color coding | ✅ |
| HR shift assignment + notify (demo toast) | ✅ |
| Mileage & fleet: company vs personal, approvals | ✅ |
| Visit log required on punch-out | ✅ |
| Director reports / export placeholders | ✅ |
| CRM & auto payroll modules (preview hubs) | 🔜 |
| Supabase production auth | 🔜 wire when project created |

## Questions for Steph (Director)

1. Exact names/locations of all **6 sites** (cities)?
2. Mileage rate for personal vehicles? Odometer photos required?
3. Which shifts **require** visit logs vs optional notes?
4. Can employees **swap shifts** or only HR assigns?
5. BrightHR: export staff list available? What must stay in BrightHR vs migrate?
6. Fleet: how many company vehicles? Assigned per site or pooled?

## Local dev

```bash
npm install
npm run dev
# Open http://localhost:3000/sphinxops/login
```

## Supabase setup

1. Create project at supabase.com
2. Run `supabase/migrations/001_sphinxops.sql`
3. Add env vars to Vercel / `.env.local`
4. Create auth users and matching `profiles` rows with roles
