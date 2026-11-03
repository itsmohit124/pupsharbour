# Pups Harbour Consultancy: website + admin

The public website for **pupsharbour.com** plus a WordPress-style admin panel (`/admin`) where staff
manage every page, section and item of content. Built with Next.js 16, Payload CMS 3, SQLite/libSQL
and Tailwind CSS 4.

## Quick start

```bash
npm install
cp .env.example .env                  # then set PAYLOAD_SECRET (openssl rand -hex 32)
# first run only: create the first super admin from env (min 14-char password)
BOOTSTRAP_ADMIN_EMAIL=you@example.com BOOTSTRAP_ADMIN_PASSWORD='a-long-password' \
BOOTSTRAP_ADMIN_NAME='Your Name' npm run dev
npm run seed                          # load all site content (only if the site is empty)
```

Open http://localhost:3000 (site) and http://localhost:3000/admin (admin).

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run seed` | Load the initial content from `src/seed/` (skips if pages exist) |
| `SEED_RESET=1 npm run seed` | Recreate **website content only** (users, submissions, media untouched) |
| `npm run check` | Lint + typecheck + unit + integration tests |
| `npx playwright test` | Browser smoke tests against a running, seeded site |

## Pages
Home · About · Services (+ a detail page per service) · Approach · Industries · Insights (+ articles)
· Careers (resume form) · Contact (business enquiry form) · Privacy · Terms · Disclaimer.

## What staff can do in `/admin`
- **Pages:** every page is a stack of sections (hero, stats, pillars, feature grid, process, packages,
  industries, live demo, testimonials, forms, CTA…). Add, reorder, duplicate, **hide** or delete
  sections, and edit or remove any item inside them. Save drafts, preview, publish, and restore old
  versions.
- **Services / Service groups / Industries / Insights / Testimonials / Media:** structured content
  used across the site (menus, footer, cards and detail pages update automatically).
- **Website settings:** phone, WhatsApp, email, hours, menu, header buttons, footer links.
- **Submissions:** business enquiries and job applications (with private resume downloads), each
  with a status workflow and internal notes. New submissions also trigger an email alert.
- **Staff users & Audit log:** roles and permissions are listed in [docs/permissions.md](docs/permissions.md).

Editors cannot inject HTML or CSS. Every section has a fixed design, so the site stays consistent.

## Docs
- [docs/content/source.md](docs/content/source.md): original copy (from the planning chats + design references)
- [docs/design/brand.md](docs/design/brand.md): colours, type and layout decisions (logo: `public/brand/`)
- [docs/permissions.md](docs/permissions.md): roles, what each can do, first-user bootstrap
- [docs/adr/0001-stack.md](docs/adr/0001-stack.md): why this stack
