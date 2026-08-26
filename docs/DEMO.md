# Demo personas and walkthrough

Aadhaar OTP is always **123456**. Log in with the Aadhaar-registered mobile number;
the login screen lists all four and fills the field when you tap one.

## The four personas

Four, not eight, because each one exists to make a different part of the product
legible. They are defined in `apps/api/src/db/seed.ts` and
`apps/api/src/mocks/pensionRegistry.ts`.

### 1. Ram Prasad Sharma — `9876543210`

*Aadhaar `XXXX XXXX 5566` · 68 · Lucknow, UP · Hindi*

Everything in order. Full certificate issued 94 days ago, renewal not due for another
271 days, pension credited every month. Two attesters on his Aadhaar record, both with
verified mobiles. Onboarding already completed.

**Shows:** the happy path, and the status card saying so plainly.

### 2. Kamla Devi — `9876543211`

*Aadhaar `XXXX XXXX 8890` · 76 · Patna, Bihar · Hindi*

Still being paid, but her certificate lapses **in 11 days**. Two family members on
record — a son who can attest, and a daughter-in-law who cannot, because UIDAI has no
verified mobile for her.

**Shows:** the deadline, the renewal path, and why an attester can be listed but
unavailable. Best persona for the full end-to-end run.

### 3. George Mathew — `9876543212`

*Aadhaar `XXXX XXXX 3378` · 71 · Ernakulam, Kerala · English*

The reason the product exists. Certificate expired 96 days ago; three months of
payments withheld (**₹37,200**), each line on the pension statement carrying the
reason. **No family on his Aadhaar record at all.**

**Shows:** the hardest real case — living alone, nobody to vouch for you, money
already stopped. He must still be able to finish, via selfie, document, a verification
call, or an assisted review.

### 4. Aarav Menon — `9876543213`

*Aadhaar `XXXX XXXX 5401` · 25 · Bengaluru, Karnataka · English*

Not a pensioner. No pension account is linked to his Aadhaar.

**Shows:** the app saying "no life certificate is needed here" instead of starting a
journey it cannot finish. Status is `not_required`; booking a call is refused.

## A full walkthrough (≈8 minutes)

Use **Kamla Devi** unless you want the stopped-pension story, in which case use
George.

1. **Login** — type `9876543211`. Note the field says *Aadhaar-registered* mobile.
   Try `9999999999` first to see the real error rather than a generic failure.
2. **Aadhaar** — you land on a visibly different site with a simulation banner. Enter
   `123456`. A first-time user then sees the consent screen listing the actual name,
   DOB, address and family count about to be shared, with a working decline button.
3. **Dashboard** — the guided tour starts by itself for anyone who has not seen it
   (Kamla has not). Six steps, each saying what to do, why, and what happens next.
   Replayable from the header button or Settings.
4. **Status card** — one card, one honest answer. Read it at each stage; it changes as
   you go.
5. **Pension** — the disbursement statement: date, amount, masked account, UTR,
   NEFT/RTGS/IMPS/UPI, status. Switch to George to see three withheld months and the
   reason on each line.
6. **Profile → Set up Face ID** — this leaves for Aadhaar again, takes an OTP and a
   separate face-authentication consent, and only then captures. Try skipping straight
   to `/verify/enroll`: it will not let you past the consent gate.
7. **Verify** — run a selfie and a liveness check. Watch the confidence score climb
   and the timeline fill in.
8. **Try to get a certificate now** — you get a **provisional, 30-day** one. This is
   deliberate: it restarts a stopped pension immediately.
9. **Call** — book a slot, join. The officer asks for the Aadhaar card, a head turn, a
   sentence read aloud (type it too — that is where the keystroke-timing sample comes
   from), and a signature on camera. The live-presence panel updates as you go: gaze
   variation, blinks, head movement, pointer travel, typing jitter.
10. **Submit** — the call goes to the officer. It does **not** complete itself. Use the
    dashed "Demo: officer console" card to confirm identity.
11. **Certificate** — now issuable as **full, 12 months**. Download it: the filename is
    `Kamla-Devi-life-certificate-<date>.pdf`, and the verification block reads code →
    QR → URL.
12. **Share** — open the verification link in a private window. It renders the same
    certificate, but the name is masked to `Kamla D.` and the passbook number and bank
    account are gone. Open it while signed in as Kamla and it is complete.

## Showing the honest-failure paths

- **Assisted review cooldown** — raise a request from *Help requests*. Try to raise a
  second: refused, with the date you may try again. The first one sits at "waiting for
  an officer" and says outright that nobody is looking at it right now.
- **Rejection** — from the operator console, decide a review as `rejected`. The status
  card switches to "we could not confirm your identity" and points at a call.
- **No attester** — as George, open *Family*. Empty, with the alternatives offered
  rather than an "add a member" button that would defeat the point.
- **Bot-like call** — join a call and do nothing: no blinks, no mouse, no typing. The
  presence score collapses and the flags name exactly what was missing.

## Resetting

```bash
curl -X POST http://localhost:8787/api/dev/reset
```

On Vercel the in-memory store resets by itself on every cold start.
