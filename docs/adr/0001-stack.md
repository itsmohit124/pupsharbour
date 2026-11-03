# ADR-0001: Stack — Next.js + Payload CMS 3 + SQLite/libSQL

- Status: accepted
- Date: 2026-11-04

## Context
Pups Harbour Consultancy needs a 5-page marketing site with two enquiry forms (one with resume upload)
and a WordPress-like admin. Staff must be able to view, edit, reorder, hide and remove sections and
their parts, while the design stays consistent and everything stays secure. The site deploys to Netlify
first and later to our own server.

## Decision
- **Next.js (App Router) + Payload CMS 3.** Payload runs inside the Next.js app and provides:
  - The admin UI and auth (lockout, sessions, password reset).
  - Access control at collection and field level.
  - Drafts, versions and live preview.
  - Block-based layouts with strict schemas.

  Because of this we don't build security-critical auth or editor UI ourselves.
- **SQLite/libSQL** via `@payloadcms/db-sqlite`:
  - **Netlify (phase 1):** Turso, which is hosted libSQL. Netlify functions are stateless, so the database must be reachable over the network.
  - **VPS (phase 2):** a SQLite file on a Docker volume, with Litestream streaming it to R2 continuously.
  - Size estimate: under 100 MB even after years, because binary files live in R2.
  - Transactions are enabled with `transactionOptions: {}`.
- **Cloudflare R2** for files: a public bucket for media and a private bucket for resumes.
- **Roles live in code** in `src/access/permissions.ts`. They are not editable at runtime, which keeps them reviewable and prevents escalation from the UI.

## Consequences
- One writer at a time and a single app instance on the VPS. Both are acceptable at this scale.
  Moving to `@payloadcms/db-postgres` is a config swap plus a data migration, because the schema model is the same.
- Editors cannot write HTML or CSS. Every block maps to one React component through a typed registry,
  so a new visual pattern is a code change (a new block), not something done in content.

## Rejected
- **Postgres:** more to run and back up, with no need at this data size.
- **Custom admin:** a large security surface to build and maintain.
- **Astro + Decap (git CMS):** personal data (resumes, enquiries) must never live in git, and self-hosting the admin is awkward.
