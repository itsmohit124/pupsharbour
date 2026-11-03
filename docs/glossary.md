# Glossary (ubiquitous language)

| Term | Meaning in this codebase |
|---|---|
| **Pillar** | One of the four consulting areas: Brand, Marketing, HR, Strategy. |
| **Service** | One of the 13 offerings (all under the HR pillar today). Has bullets ("Our services include"), a focus statement, an order, and optionally the **flagship** flag. |
| **Flagship** | The service highlighted above the others. Currently Company Analysis & 360° Survey. |
| **Package** | An engagement tier: Basic (Discovery & Assessment), Standard (Strategy & Implementation), Premium (Full Support & Monitoring). |
| **Approach** | The four-step method: Discover → Plan → Execute → Review. |
| **Page** | A routable document made of an ordered list of **Blocks** (sections). |
| **Block / Section** | A typed, schema-validated section of a page (Hero, PillarsGrid, Packages…). It renders through exactly one component in `src/blocks/registry.ts`. It can be hidden without being deleted. |
| **Enquiry** | A Business Enquiry form submission from an employer or company. |
| **Application** | A Job-Seeker submission (Submit Your Resume), with an attached **Resume** file. |
| **Resume** | A private uploaded file (PDF/DOC/DOCX). It is never publicly reachable. |
| **Role** | One of `super_admin`, `admin`, `editor`, `contributor`, `recruiter`. Defined in code. |
| **Capability** | A named permission such as `pages.publish`. The role → capability map lives in `src/access/permissions.ts`. |
| **Bootstrap admin** | The first `super_admin`, created from `BOOTSTRAP_ADMIN_*` env vars only when the users table is empty. |
