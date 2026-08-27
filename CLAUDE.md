# JeevanSetu — orientation for a new session

A prototype that lets a pensioner prove they are alive from home, so their pension
keeps being paid. pnpm workspace: Hono API + Vite/React SPA + a shared zod package.

**Read `CHANGELOG.md` first** — it records what changed in the last round of work and
why, with file pointers. `docs/DEPLOYMENT.md` covers Vercel. `docs/DEMO.md` covers the
four personas and a walkthrough.

## Run it

```bash
pnpm install
pnpm dev            # api on :8787, web on :5173 (vite proxies /api)
pnpm typecheck      # both packages
pnpm --filter @jeevansetu/api db:reset
```

Log in with `9876543210` and Aadhaar OTP `123456`.

## Layout

```
apps/api/src/
  mocks/aadhaar.ts          MOCK UIDAI registry — the only source of personal data
  mocks/pensionRegistry.ts  MOCK disbursement registry, keyed by Aadhaar UID
  services/aadhaar.ts       OTP txns, consent, projection onto the local user row
  services/status.ts        the single "where do I stand?" computation
  services/assistedReview.ts human review requests (never auto-approved)
  services/appointments.ts  scheduled verification calls + live-presence scoring
  services/certificates.ts  issuance, and the two gates on it
  db/store.ts               Table<T> over sqlite (local) or memory (serverless)
  routes/                   one file per resource; app.ts wires them
apps/web/src/
  features/aadhaar/         the mocked UIDAI screens' chrome + txn handoff
  features/status/          StatusCard, read by every page
  features/call/            live-presence measurement during a call
  features/onboarding/      guided tour (provider + spotlight overlay)
  features/certificate/     the certificate document, shared by app + public link
packages/shared/src/        zod schemas, enums, scoring config — imported by both
api/[...path].ts            Vercel Function wrapper around the Hono app
```

## Invariants worth knowing before you change things

1. **Personal data is read-only.** Name, DOB, gender, address and family are
   projections of the mock Aadhaar record, refreshed on login. There is no write path
   and no edit UI. `syncFamilyFromAadhaar()` *replaces* the family list rather than
   merging, which is what makes "you cannot invent an attester" true rather than
   merely unexposed.
2. **Nothing simulates a human acting.** Assisted reviews and verification-call
   sign-offs only move when the operator console (`/api/dev/*`) moves them. An earlier
   version auto-approved reviews on a 15-second timer; that was removed deliberately —
   telling someone whose pension has stopped that a person is reviewing their case
   when nobody is could make them stop trying.
3. **A full certificate requires a completed call.** Automated signals can issue a
   30-day *provisional* certificate so a stopped pension restarts immediately; the
   12-month *full* certificate needs `hasCompletedCall()`. See
   `services/certificates.ts`.
4. **The client never scores itself.** Under `FACE_ENGINE=client` the browser extracts
   the face descriptor, but the server holds the enrolled template and does the
   comparison, calibration and scoring. Events record `engine: "client"` so the
   provenance is visible.
5. **One status, one endpoint.** `GET /api/verification/status` is what every screen
   reads. If a page needs to say where the user stands, extend
   `services/status.ts` rather than inferring it locally.
6. **Both locales stay in lockstep.** `en.json` and `hi.json` must have identical key
   sets; a missing Hindi key silently falls back to English mid-sentence.

## Things that are mocked, and labelled as such in the UI

- The Aadhaar service (`/aadhaar/*` screens carry a simulation banner).
- The pension disbursement registry.
- The verification officer on a call, and the reviewer deciding a ticket — both shown
  in a dashed "Demo: officer console" card.
- SMS delivery (`mocks/sms.ts` writes to an outbox readable at `/api/dev/outbox`).

Keep it that way. The value of this prototype is that the honest parts are honest.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
