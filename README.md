# FlowGrid.ca — FieldTrack (flagship) marketing site

This repo contains the Next.js (App Router) marketing site deployed at `flowgrid.ca`.

- **FlowGrid** is the company/studio.
- **FieldTrack** is the flagship product demo used for sales/outreach.

## Local development

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill what you have.

- `NEXT_PUBLIC_BOOKING_URL`: optional (book-a-call CTA). If unset, CTAs fall back to `mailto:hello@flowgrid.ca`.
- `MAKE_WEBHOOK_URL`: optional (server-side intake webhook). If unset, submissions still succeed but won’t forward anywhere.
- `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`: optional (footer socials).

## Key routes

- `/` marketing homepage
- `/api/intake` intake submission endpoint
- `/privacy`, `/terms` legal pages
