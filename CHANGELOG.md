# Changelog

## 2026-08-25 — Aadhaar as source of truth, honest human-in-the-loop, Vercel-ready

A large round covering 19 pieces of feedback. Grouped by theme below; every item
notes the files involved so a fresh session can jump straight to the code.

### 1. Aadhaar is now the only source of personal data

Previously the app owned name, date of birth, address and family, and let the user
edit them. That is now impossible by construction.

- **`apps/api/src/mocks/aadhaar.ts`** (new) — a mocked UIDAI registry. Holds name,
  care-of, DOB, gender, address, registered mobile, and linked family members with
  their own UIDs and mobile-verified flags. Fictional records, deliberately outside
  any issued UID range.
- **`apps/api/src/services/aadhaar.ts`** (new) — the client for it: OTP transactions,
  scoped consent, and `upsertUserFromAadhaar()`, which *projects* an Aadhaar record
  onto the local user row on every login. There is no write path back.
- **`apps/api/src/routes/aadhaar.ts`** (new) — the mocked portal endpoints.
- **`packages/shared/src/schemas/user.ts`** — personal fields are documented as
  projections; only `prefs` and `locale` are user-writable.
- **`apps/api/src/routes/users.ts`** — `POST`/`PATCH`/`DELETE` for family contacts
  were **removed**. Family is read-only, re-synced from Aadhaar on read.

**Why family is read-only:** an attester who is not on the pensioner's Aadhaar record
is the obvious way to defraud a life certificate — ask a friend to vouch for you.
`syncFamilyFromAadhaar()` *replaces* rather than merges, so nothing invented survives.

### 2. Face ID must be registered against Aadhaar (feedback #1)

Setting up Face ID now leaves the app for the Aadhaar service, re-authenticates with
an OTP, and takes an explicit `face_authentication` consent. The enrolment endpoint
refuses any capture that does not quote a live consent, so the flow cannot be
shortcut.

- `POST /api/aadhaar/face/start` → `/face/otp/verify` → `/face/consent` issues a
  `{ consentId, txnId }` pair.
- **`apps/api/src/routes/enrollment.ts`** validates that pair (ownership, expiry,
  scope, transaction match) before storing a descriptor.
- Withdrawing consent in Settings revokes the face template too
  (`revokeFaceEnrollmentsForConsent`).
- Web: **`apps/web/src/pages/verify/EnrollPage.tsx`**,
  **`apps/web/src/features/aadhaar/faceConsentStore.ts`**.

### 3. Pension history (feedback #3) and passbook number (feedback #10)

- **`apps/api/src/mocks/pensionRegistry.ts`** (new) — a second external system, keyed
  by Aadhaar UID. Generates a disbursement statement: date, amount, masked account,
  UTR-style transaction id, settlement rail (NEFT/RTGS/IMPS/UPI), and status. Withheld
  months carry a bilingual reason.
- `GET /api/users/me/pension/history` returns rows plus a summary (withheld total,
  months unpaid, next renewal date).
- **`apps/web/src/pages/PensionPage.tsx`** (new) renders it.
- `pensionId` was renamed to **`passbookNumber`** everywhere — schema, seed, PDF,
  profile, dashboard, document OCR matching, and the sidebar user block.

### 4. Four demo personas (feedback #4)

Eight lookalike accounts became four, one per situation that actually matters. See
`apps/api/src/db/seed.ts` and `docs/DEMO.md`.

| Persona | Mobile | State |
|---|---|---|
| Ram Prasad Sharma | 9876543210 | Fully verified, renewal 271 days out |
| Kamla Devi | 9876543211 | Renewal due in 11 days, still being paid |
| George Mathew | 9876543212 | Pension stopped 3 months, no family on record |
| Aarav Menon | 9876543213 | 25 years old, not eligible — no pension linked |

They are listed on the login screen from `GET /api/aadhaar/directory`, which is
**public**.

### 5. Login is Aadhaar-first (feedback #5, #6)

- The login field is explicitly labelled *Aadhaar-registered mobile number*, with
  help text saying it must be the number linked to Aadhaar.
- Submitting redirects to `/aadhaar/verify` — a visually distinct mocked UIDAI site
  (**`apps/web/src/features/aadhaar/AadhaarChrome.tsx`**) where the OTP is entered.
  First-time users then see a consent screen showing the *actual values* about to be
  shared, with a real decline button.
- The old `POST /api/auth/otp/*` endpoints are gone; `routes/auth.ts` now only does
  refresh, logout and `/me`.
- **Fixed:** the persona list used to come from a dev-only, session-gated endpoint, so
  after logging out there was no way to know which numbers existed. It is now public
  and always rendered.
- **Fixed:** an unrecognised 10-digit number produced a generic "something went
  wrong" toast. It now returns `AADHAAR_MOBILE_NOT_FOUND` with an actionable message,
  rendered inline against the field rather than as a toast.

### 6. Verification status is surfaced everywhere (feedback #14)

- **`apps/api/src/services/status.ts`** (new) computes one
  `VerificationStatusDetail` from the session, any open review, any booked call and
  the latest certificate. Statuses: `not_required`, `not_started`, `in_progress`,
  `awaiting_review`, `awaiting_call`, `completed`, `rejected`, `expired`.
- `GET /api/verification/status` bundles it with review eligibility and the active
  appointment.
- **`apps/web/src/features/status/StatusCard.tsx`** renders it. Every screen reads the
  same endpoint, so no two pages can disagree.

### 7. Assisted review is honest and tracked (feedback #15)

The old flow auto-approved on a 15-second timer, which told a pensioner whose pension
had stopped that a human had looked at their case when none had.

- **`apps/api/src/services/assistedReview.ts`** (new). Creating a request returns a
  ticket (`AR-XXXXXX`), an SLA date, and a `nextRequestAllowedAt` **3 days** out.
  Nothing advances on a timer.
- One open request at a time; then a 3-day cooldown. `checkEligibility()` returns this
  as *data* (`canRequest`, `reason`, `nextAllowedAt`) so the UI disables the button
  with an explanation instead of failing on click.
- Decisions come only from the operator console
  (`POST /api/dev/reviews/:id/decide`), because a real one comes from a person.
- **`apps/web/src/pages/ReviewsPage.tsx`** (new) is the tracker: status, activity log,
  expected-by date, withdraw, and explicit loading/error/empty states.

### 8. Scheduled online verification call (feedback #17)

Modelled on bank video-KYC, and it is now the **final gate** for a full certificate.

- **`apps/api/src/services/appointments.ts`** (new): slot listing (4 slots/day over 5
  days), booking, joining, a four-step officer script (show Aadhaar → turn head →
  read a phrase aloud → sign on camera), evidence submission, and officer sign-off.
- **Bot/AI detection**: `useCallIntegrity` (**`apps/web/src/features/call/`**) measures
  real browser signals during the call — gaze variation and blinks from the face mesh,
  head-movement variance, pointer path length, and keystroke-timing jitter. These are
  posted as six aggregate numbers (no video ever leaves the device) and
  `scoreIntegrity()` turns them into a live-presence score with named flags
  (`no_blink_detected`, `machine_like_keystrokes`, …).
- **Certificate gating** (`apps/api/src/services/certificates.ts`): a *provisional*
  30-day certificate is issuable from automated signals alone, so a stopped pension
  restarts immediately; the *full* 12-month certificate requires
  `hasCompletedCall()`. Verified end-to-end.
- The simulated officer is labelled as such on screen, and the sign-off buttons live
  in a dashed "Demo: officer console" card.

### 9. Onboarding tour (feedback #16)

- **`apps/web/src/features/onboarding/`** — provider, spotlight overlay, and steps.
- Six steps, each answering *what to do*, *why it matters*, and *what happens next*,
  with "Step N of M" and a progress bar.
- Anchored to real elements via `data-tour` attributes; degrades to a centred card if
  an anchor is off-screen (narrow layouts where the sidebar is a drawer).
- Auto-runs once for a user with no `prefs.onboardingCompletedAt`; replayable from the
  dashboard header and from Settings.

### 10. Certificates (feedback #8, #9, #18, #19)

- **`apps/web/src/features/certificate/CertificateDocument.tsx`** (new) — one
  component renders the holder's view *and* the shared verification link, mirroring
  the PDF field-for-field. The share link no longer shows a bare valid/invalid card.
- **PDF verification block order is now fixed**: human-readable verification code →
  QR → the URL the QR resolves to (`apps/api/src/services/pdf.ts`).
- **Filename**: `Ram-Prasad-Sharma-life-certificate-2026-08-25.pdf`
  (`certificateFileName()`), delivered via `Content-Disposition` and read back by
  `downloadFile()` in `apps/web/src/lib/api.ts`.
- **Access control**: `GET /api/certificates/:id` and `/download` are owner-only (a
  different user gets 404). The public `/api/certificates/verify/:code` returns a
  **redacted** view — name masked to `Kamla D.`, no passbook number, no bank account —
  unless the request carries the owner's token, in which case it returns the full
  certificate.

  > **Open decision.** Feedback #19 asked that the certificate URL be restricted to
  > the current user. Taken literally that would break #8 (a *shared* link that
  > renders the certificate). The redaction split above is the standard approach and
  > satisfies both, but if you want the public link removed entirely, delete the
  > `/verify/:code` route and the `/check/:code` page.

### 11. Smaller fixes

- **Toasts** moved from top-centre to **top-right** (`apps/web/src/main.tsx`).
- **Collapsed sidebar logo** (feedback #13): the mark was shrinking and drifting right
  because the wordmark stayed in the flex row at icon width. Fixed with `shrink-0` on
  the mark, `group-data-[collapsible=icon]:hidden` on the wordmark, and
  `justify-center` on the button (`apps/web/src/components/layout/AppSidebar.tsx`).

### 12. Deployable as one Vercel project (feedback #12)

See **`docs/DEPLOYMENT.md`** for the runbook. In short:

- **`api/[...path].ts`** wraps the existing Hono app in a single Vercel Function via
  `getRequestListener`. Same app as local dev, no second routing layer.
- **`vercel.json`** builds the Vite app to static assets and rewrites everything
  except `/api/*` to `index.html`.
- **Storage** is now pluggable (`apps/api/src/db/store.ts`): `sqlite` locally,
  `memory` on serverless (read-only FS, and `better-sqlite3` is a native module that
  cannot load there). Auto-selected via `process.env.VERCEL`.
- **The face pipeline moved to the browser** on serverless (`FACE_ENGINE=client`).
  TensorFlow is far too large for a function bundle. The browser extracts the
  descriptor; **the server still does the comparison and all scoring**, and records
  `engine: "client"` in the event's raw payload so the provenance travels with the
  certificate. `humanEngine` is a lazy import, and TF/tesseract/better-sqlite3 are in
  `excludeFiles`.
- **pdfkit** reads `.afm` font metrics from disk at runtime, so `vercel.json`
  force-includes that directory. (The `pdfkit.standalone.js` build was tried first and
  rejected — it stubs `fs` and cannot accept a Buffer image, which broke the QR code.)

### Verified

Ran end-to-end against a live server with `PERSIST=memory FACE_ENGINE=client`:
unknown-number error → Aadhaar OTP → consent → passbook number → 14 pension
transactions with ₹37,200 withheld → read-only family → 3-day review cooldown
rejection → slot booking → call checks → integrity score 0.712 → officer sign-off →
provisional (30d) became full (365d) → PDF `%PDF-` 8,657 bytes with the correct
filename → anonymous check redacted, owner check full, other user 404.

### Not done

- No automated test suite was added; verification above was by scripted API calls.
- The onboarding tour, call UI and Aadhaar screens were typechecked and built but not
  exercised in a browser.
