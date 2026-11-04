# Pups Harbour Consultancy: website + admin

The public website for **pupsharbour.com** plus a WordPress-style admin panel (`/admin`) where staff
manage every page, section and item of content. Built with Next.js 16, Payload CMS 3, SQLite/libSQL
and Tailwind CSS 4.

## Quick start

```bash
npm install
cp .env.example .env                  # then set PAYLOAD_SECRET (openssl rand -hex 32)
npm run migrate                       # create/upgrade the database schema
# first run only: create the first super admin from env (min 14-char password) + load all content
BOOTSTRAP_ADMIN_EMAIL=you@example.com BOOTSTRAP_ADMIN_PASSWORD='a-long-password' \
BOOTSTRAP_ADMIN_NAME='Your Name' npm run seed
npm run dev
```

Open http://localhost:3000 (site) and http://localhost:3000/admin (admin).

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run migrate` | Apply database migrations (run after every pull / before every deploy) |
| `npm run migrate:create -- <name>` | After changing collections/blocks: generate a migration and commit it |
| `npm run seed` | Load the initial content from `src/seed/` (skips if pages exist) |
| `SEED_RESET=1 npm run seed` | Recreate **website content only** (users, submissions, media untouched). Refuses if staff have edited content (audit log); `SEED_FORCE=1` overrides |
| `node scripts/capture-admin-images.mjs` | Re-capture the section previews and help screenshots from the running site (`ADMIN_EMAIL`/`ADMIN_PASSWORD` for admin shots) |
| `npm run check` | Lint + typecheck + unit + integration tests |
| `npx playwright test` | Browser tests against a running, seeded site (`E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD` enable the admin tests) |

## Pages
Home · About · Services (+ a detail page per service) · Approach · For Employers (hiring-requirement form)
· Industries · Insights (+ articles) · Careers (resume form) · Contact (business enquiry form) · Privacy · Terms · Disclaimer.

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

**Built-in guidance:** every section row shows its type and live headline; inside each section an
"About this section" panel shows a picture of it on the site and where each field appears; Live
Preview shows the page side by side (mobile/tablet/desktop) while typing. A guided tour runs on first
sign-in, and **Help & guides** (`/admin/help`) has step-by-step guides filtered to your role.

## Docs
- [docs/content/source.md](docs/content/source.md): original copy (from the planning chats + design references)
- [docs/design/brand.md](docs/design/brand.md): colours, type and layout decisions (logo: `public/brand/`)
- [docs/permissions.md](docs/permissions.md): roles, what each can do, first-user bootstrap
- [docs/adr/0001-stack.md](docs/adr/0001-stack.md): why this stack
