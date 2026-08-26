# Deploying JeevanSetu to Vercel

One Vercel project serves both halves: the Vite app as static assets, and the whole
Hono API as a single Vercel Function. There is no second deployment to manage.

```
jeevansetu/
  api/[...path].ts      -> Vercel Function; wraps apps/api/src/app.ts
  apps/web  -> dist/    -> static assets (outputDirectory)
  vercel.json           -> build, rewrites, bundle include/exclude
```

## Why this shape

The alternative was migrating to Next.js. It was rejected: it would have meant
rewriting ~25 pages, the router and the auth context, and it would **not** have
avoided either serverless constraint below. Wrapping the existing Hono app costs one
file.

`api/[...path].ts` uses `getRequestListener(app.fetch)` from `@hono/node-server` — the
same adapter used locally — so Vercel invokes the identical app with the original
request path preserved. Requests are routed by Hono, not by the filesystem.

## The two things that had to change

### 1. Storage: SQLite → in-memory on serverless

Vercel Functions have a read-only filesystem and a fresh process per cold start, and
`better-sqlite3` is a native module that cannot load there at all.

`apps/api/src/db/store.ts` has two drivers behind one `Table<T>` API. Nothing else in
the codebase knows which is active.

| | local dev | Vercel |
|---|---|---|
| `PERSIST` | `sqlite` | `memory` (auto, via `process.env.VERCEL`) |
| Survives restart | yes | no — the seed re-runs on each cold start |

**Consequence for demos:** a cold start resets sessions, certificates, review tickets
and booked calls back to the seeded state. Finish a walkthrough in one sitting. If you
need durability, port the driver to Vercel Postgres or Upstash — `Table<T>` is a
JSON-document store, so it is a small change.

### 2. Face matching: server → browser

`@vladmandic/human` plus TensorFlow is far larger than a function bundle allows.

With `FACE_ENGINE=client` (auto on Vercel) the browser runs the same pipeline and
posts only the 1024-d descriptor. **The server still holds the enrolled template,
computes the cosine similarity, applies the calibration and does all scoring** — the
client never reports its own match result.

This is a genuine reduction in assurance and is recorded as one: events carry
`engine: "client"` in their raw payload, so a certificate's provenance travels with
it. `humanEngine` is a lazy import and the heavy packages are in `excludeFiles`, so
they never reach the bundle.

## First deploy

The CLI is already installed (`vercel --version` → 59.x). Login is an interactive
browser flow, so run this one yourself — in this session you can prefix it with `!`:

```
! vercel login
```

Then, from the repo root:

```bash
vercel link          # pick scope, accept "jeevansetu" as the project name
vercel --prod        # build + deploy, prints the URL
```

`vercel.json` already sets the install command, build command and output directory, so
there is nothing to configure in the dashboard.

## Environment variables

Nothing is required — every variable has a working default (see
`apps/api/src/env.ts`). Set these for anything beyond a demo:

```bash
vercel env add JWT_SECRET production          # replace the dev default
vercel env add JWT_REFRESH_SECRET production
vercel env add ENABLE_DEV_TOOLS production    # set to "false" to hide /api/dev/*
```

| Variable | Default | Notes |
|---|---|---|
| `PERSIST` | `memory` on Vercel | `sqlite` locally |
| `FACE_ENGINE` | `client` on Vercel | `server` locally |
| `PUBLIC_BASE_URL` | `https://$VERCEL_URL` | Certificate verification links and family SMS links are built from this. Set it explicitly once you attach a custom domain, or QR codes will point at the deployment URL. |
| `ENABLE_DEV_TOOLS` | `true` | **Leave `true` for demos.** The officer console that completes verification calls and decides review requests lives under `/api/dev/*`; with it off, no call can be signed off and no full certificate can be issued. |
| `VERIFICATION_MODE` | `real` | `simulate` short-circuits the face pipeline so a hardware failure on stage cannot block a walkthrough. |

## Day-to-day commands

```bash
vercel                       # preview deployment
vercel --prod                # production
vercel ls                    # recent deployments
vercel logs <url>            # runtime logs for a deployment
vercel env ls                # what is set, per environment
vercel rollback <url>        # revert production to an earlier deployment
vercel inspect <url>         # bundle size, regions, build output
```

Pushing to a connected Git branch also deploys, once the project is linked to a repo
in the dashboard.

## If a deploy misbehaves

- **`ENOENT ... Helvetica.afm`** — pdfkit loads its standard-font metrics from disk at
  runtime. `vercel.json` force-includes them via
  `includeFiles: node_modules/.pnpm/pdfkit@*/node_modules/pdfkit/js/data/**`. If the
  pdfkit version changed, check that glob still matches.
  (`pdfkit/js/pdfkit.standalone.js` looks like the obvious fix but is not: it stubs
  `fs`, so `doc.image(buffer)` fails and the QR code never renders.)
- **Function bundle over 250 MB** — something pulled TensorFlow back in. Check that
  `humanEngine` is only ever reached through a dynamic `import()` and that
  `excludeFiles` still covers `@tensorflow`, `@vladmandic`, `better-sqlite3` and
  `tesseract.js`.
- **API 404s while the app loads** — the rewrite `"/((?!api/).*)" -> "/index.html"`
  must keep the `api/` negative lookahead, or the SPA fallback swallows the API.
- **Everything resets mid-demo** — that is the memory driver on a cold start, working
  as designed. See the table above.
