const API = "http://localhost:8787/api";
const base = "https://vladmandic.github.io/human/samples/in/";

async function jpegDataUrl(url) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  return "data:image/jpeg;base64," + buf.toString("base64");
}
async function call(path, opts = {}, token) {
  const res = await fetch(API + path, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { error: json.error, status: res.status };
  return json;
}

const mobile = "9876543216";
await call("/auth/otp/request", { method: "POST", body: { mobile } });
const tok = await call("/auth/otp/verify", {
  method: "POST",
  body: { mobile, code: "123456" },
});
const T = tok.accessToken;
console.log("logged in:", !!T);

// 1. verify BEFORE enrollment -> should be refused with a helpful message
const pre = await call("/verification/sessions", { method: "POST" }, T);
const sid = pre.session.id;
const notEnrolled = await call(
  `/verification/sessions/${sid}/signals/face-match`,
  {
    method: "POST",
    body: { image: await jpegDataUrl(base + "person-vlado1.jpg") },
  },
  T,
);
console.log(
  "before enrollment ->",
  notEnrolled.error?.code,
  "|",
  notEnrolled.error?.message,
);

// 2. enroll with person A
const enrollImg = await jpegDataUrl(base + "person-vlado1.jpg");
const enrolled = await call(
  "/enrollment/face",
  { method: "POST", body: { image: enrollImg, source: "selfie" } },
  T,
);
console.log("enrolled:", JSON.stringify(enrolled));

// 3. verify with SAME person, different photo
const same = await call(
  `/verification/sessions/${sid}/signals/face-match`,
  {
    method: "POST",
    body: { image: await jpegDataUrl(base + "person-vlado5.jpg") },
  },
  T,
);
console.log(
  "\nSAME PERSON  -> status:",
  same.event.status,
  "points:",
  same.event.cappedPoints,
  "score:",
  same.event.scoreBefore,
  "->",
  same.event.scoreAfter,
);
console.log("  raw:", JSON.stringify(same.event.raw));
console.log(
  "  says:",
  same.event.narrative.en.title,
  "|",
  same.event.narrative.en.body,
);

// 4. verify with a DIFFERENT person
const diff = await call(
  `/verification/sessions/${sid}/signals/face-match`,
  { method: "POST", body: { image: await jpegDataUrl(base + "group-1.jpg") } },
  T,
);
console.log(
  "\nDIFFERENT PERSON -> status:",
  diff.event.status,
  "points:",
  diff.event.cappedPoints,
  "score:",
  diff.event.scoreBefore,
  "->",
  diff.event.scoreAfter,
);
console.log("  raw:", JSON.stringify(diff.event.raw));
console.log(
  "  says:",
  diff.event.narrative.en.title,
  "|",
  diff.event.narrative.en.body,
);
console.log(
  "  next options offered:",
  diff.event.nextBestActions.map((a) => a.signal).join(", "),
);

// 5. no face at all
const blank =
  "data:image/jpeg;base64," +
  Buffer.from(
    await (
      await fetch(
        "https://vladmandic.github.io/human/samples/in/person-vlado1.jpg",
      )
    ).arrayBuffer(),
  ).toString("base64");
void blank;

// 6. real voice check
const vp = await call(
  `/verification/sessions/${sid}/signals/voice/phrase`,
  {},
  T,
);
console.log("\nvoice phrase:", vp.phrase);
const goodVoice = await call(
  `/verification/sessions/${sid}/signals/voice`,
  {
    method: "POST",
    body: { expectedPhrase: vp.phrase, transcript: vp.phrase },
  },
  T,
);
console.log(
  "SPOKE CORRECTLY -> points:",
  goodVoice.event.cappedPoints,
  "sim:",
  goodVoice.event.raw.transcriptSimilarity,
);
const badVoice = await call(
  `/verification/sessions/${sid}/signals/voice`,
  {
    method: "POST",
    body: {
      expectedPhrase: vp.phrase,
      transcript: "something completely different",
    },
  },
  T,
);
console.log(
  "SPOKE WRONG     -> points:",
  badVoice.event.cappedPoints,
  "sim:",
  badVoice.event.raw.transcriptSimilarity,
);

// 7. real document OCR matching
const me = await call("/users/me", {}, T);
const goodDoc = await call(
  `/verification/sessions/${sid}/signals/document`,
  {
    method: "POST",
    body: {
      ocrText: `GOVERNMENT PENSION BOOK Name: ${me.user.name.en} Pension ID: ${me.user.pension.pensionId} District: ${me.user.address.district}`,
    },
  },
  T,
);
console.log(
  "\nCORRECT DOC -> points:",
  goodDoc.event.cappedPoints,
  "matched:",
  goodDoc.event.raw.matchedFields,
);
const badDoc = await call(
  `/verification/sessions/${sid}/signals/document`,
  {
    method: "POST",
    body: { ocrText: "ELECTRICITY BILL Consumer 99887766 Amount Due 450" },
  },
  T,
);
console.log(
  "WRONG DOC   -> points:",
  badDoc.event.cappedPoints,
  "matched:",
  badDoc.event.raw.matchedFields,
);
