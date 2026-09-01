# Spokesmancom Events Monorepo

npm-workspaces monorepo holding the Next.js sites for Spokesman Communication
Ministries events. Each app is fully independent (own `package.json`,
`next.config.ts`, static export build) and deploys via its own GitHub Actions
workflow, so a change to one app never triggers a deploy of the other.

```
apps/
  ilcon-spokesman/   -> ilcon.spokesmancom.org  (ILCON 2026)
  fit/               -> fit.spokesmancom.org    (FIT 2026 registration)
.github/workflows/
  ci.yml            -> entry point: detects which app(s) changed, calls deploy-base.yml for each
  deploy-base.yml   -> reusable build+rsync steps, shared by every app (no app-specific logic)
docs/
  api-endpoints.md  -> request/response contract for the backend team (ilcon + fit)
```

## ⚠️ Security note (read this first)

`apps/ilcon-spokesman/public/images/spokesman_db.sql` in the original upload
was a full database dump (users, personal_access_tokens,
password_reset_tokens, sessions, ilcon_attendees, etc.) sitting inside the
publicly-served `public/` folder — meaning it was downloadable at
`ilcon.spokesmancom.org/images/spokesman_db.sql`. It has been removed from
this build so it won't be redeployed. Please, as soon as possible:

1. Rotate the database credentials and any API/personal access tokens that
   appear in that dump.
2. Invalidate active sessions / password reset tokens.
3. If the file was ever committed to git, scrub it from history (it isn't
   enough to just delete it in a new commit) and check Bluehost for other
   stray dumps in `public_html`.

## Local development

```bash
npm install                 # installs deps for both apps (npm workspaces)
npm run dev:ilcon           # http://localhost:3000 - ILCON
npm run dev:fit             # http://localhost:3000 - FIT (run in a separate terminal on a different port if both are needed)
```

## Building

```bash
npm run build:ilcon         # -> apps/ilcon-spokesman/out
npm run build:fit           # -> apps/fit/out
npm run build               # both
```

Both apps use `output: 'export'` (static HTML export), matching the existing
Bluehost/FTP deployment approach — there is no Node server involved.

## CI/CD

`ci.yml` is the single entry point. On every push to `main` it:

1. Runs `dorny/paths-filter` to work out whether `apps/ilcon-spokesman/**`
   and/or `apps/fit/**` actually changed.
2. Calls the reusable `deploy-base.yml` workflow once per affected app —
   so a FIT-only change never touches ILCON's deployment and vice versa.

`deploy-base.yml` holds all the actual steps (checkout → install → build →
rsync over SSH) and has no app-specific logic; it's parameterized entirely
by the `with:` block each caller job passes in. Adding a third app later
means adding a new `deploy-<name>` job to `ci.yml` (copy the `deploy-fit`
block) — not touching `deploy-base.yml`.

You can also trigger a deploy manually from the Actions tab
(`workflow_dispatch`) with a checkbox to force-deploy ILCON and/or FIT
regardless of what changed — handy after rotating a secret.

Deploys go out over `rsync` + SSH (not FTP), mirroring
`apps/<app>/out/` exactly onto the server (`--delete` removes anything on
the server that's no longer in the build).

### Required GitHub secrets / variables

These live under **Settings → Environments → PROD** (the workflows target
the `PROD` environment) unless noted otherwise:

| Name | Type | Used by | Notes |
|---|---|---|---|
| `SSH_PRIVATE_KEY` | secret | both | private key for the deploy user, shared across apps |
| `HOST` | variable | both | SSH host |
| `USERNAME` | variable | both | SSH user |
| `PORT` | variable | both | SSH port |
| `NEXT_PUBLIC_BASEURL_URL` | variable | ilcon | API base URL, inlined at build time |
| `NEXT_PUBLIC_BASEURL_URL_FIT` | variable | fit | can point at the same backend as ILCON, or a different one |
| `NEXT_PUBLIC_SITE_URL_FIT` | variable | fit | canonical URL used in FIT's SEO metadata, e.g. `https://fit.spokesmancom.org` |

**`remote_dir` is hardcoded in `ci.yml`, not a secret** — I set placeholders
(`public_html/ilcon.spokesmancom.org` and `public_html/fit.spokesmancom.org`,
marked `# TODO`) since I don't know your server's real folder names. Update
those two lines in `ci.yml` to match wherever each domain actually points
on the server before the first real deploy.

If ILCON and FIT ever end up on different servers/accounts, split
`deploy-base.yml`'s single `SSH_PRIVATE_KEY`/`HOST`/`USERNAME`/`PORT` into
per-app names (e.g. `SSH_PRIVATE_KEY_FIT`) and pass them explicitly from
each caller job instead of relying on the shared `PROD` environment.

## API contract

See [`docs/api-endpoints.md`](./docs/api-endpoints.md) for the exact
request/response shape both apps expect from the backend — `ilcon-attendees`
(existing, with categories/payment) and `fit-attendees` (new, pure
registration, no payment).

## Adding a third app later

1. `apps/<name>/` with its own `package.json` (add it to nothing else — npm
   workspaces auto-discovers everything under `apps/*`).
2. Add a `deploy-<name>` job to `ci.yml`, copying the `deploy-fit` block —
   new `app_path`, `remote_dir`, and a filter rule in `detect-changes`.
3. `npm install` at the repo root to link it into the workspace for local
   dev (CI installs each app's deps independently, matching `deploy-base.yml`'s
   per-app `working-directory` install step).
