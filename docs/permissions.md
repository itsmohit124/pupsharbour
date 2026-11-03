# Staff roles & permissions

The code is the source of truth: [`src/access/permissions.ts`](../src/access/permissions.ts). Every cell
is asserted by [`tests/unit/permissions.spec.ts`](../tests/unit/permissions.spec.ts). To change a
permission, edit the test first, then the matrix.

| Capability | super_admin | admin | editor | contributor | recruiter |
|---|---|---|---|---|---|
| Open the admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Draft pages/sections/content | ✅ | ✅ | ✅ | ✅ | ❌ |
| Publish / unpublish | ✅ | ✅ | ✅ | ❌ | ❌ |
| Delete content, restore old versions | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload media | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete media | ✅ | ✅ | ✅ | ❌ | ❌ |
| Header / Footer | ✅ | ✅ | ✅ | ❌ | ❌ |
| Site settings (phone, WhatsApp, email) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Business enquiries (read/status/notes, delete/export) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Job applications + resumes (read/download/status) | ✅ | ✅ | ❌ | ❌ | ✅ |
| Job applications (delete/export) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage staff users | ✅ any role | ✅ editor/contributor/recruiter | ❌ | ❌ | ❌ |
| Read audit log | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit own profile & password | ✅ | ✅ | ✅ | ✅ | ✅ |

## Rules enforced on every request
- Deny by default. Signed-out visitors have no access to anything in the admin.
- A **deactivated** user cannot sign in and has no permissions.
- A user flagged **must change password** can only edit their own profile until they change it.
- No one can change their own role or deactivate themselves. No one can delete themselves.
- Admins cannot edit or delete other admins or super_admins.
- The **last active super_admin** can't be deleted, demoted or deactivated.
- 5 failed sign-ins lock the account for 15 minutes. Sessions expire after 2 hours.
- Sign-ins, creates, updates, publishes, deletions and role changes go to the append-only **Audit log**.

## First user
Set `BOOTSTRAP_ADMIN_EMAIL`, `BOOTSTRAP_ADMIN_PASSWORD` (≥ 14 chars) and optionally
`BOOTSTRAP_ADMIN_NAME`, then start the app. If the users table is empty, one `super_admin` is created and
must change the password at first sign-in. **Remove the variables afterwards.** Payload's
"create first user" screen and `/api/users/first-register` are permanently disabled (404).
