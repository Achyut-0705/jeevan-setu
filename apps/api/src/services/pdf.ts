import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { Certificate, User } from "@jeevansetu/shared";
import { env } from "../env";

const INK = "#1A1A1A";
const MUTED = "#5B6B66";
const BRAND = "#1E5F4A";
const RULE = "#D5E2DC";

export function certificateVerifyUrl(certificate: Certificate): string {
  return `${env.PUBLIC_BASE_URL}/check/${certificate.verificationCode}`;
}

/**
 * A filename a pensioner can find again six months later in a folder of downloads:
 * their name, what it is, and the date it was issued.
 */
export function certificateFileName(certificate: Certificate, user: User): string {
  const slug = user.name.en
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const issued = new Date(certificate.issuedAt).toISOString().slice(0, 10);
  return `${slug}-life-certificate-${issued}.pdf`;
}

/**
 * pdfkit loads its standard-font metrics (.afm) from disk at runtime, which static
 * file tracing does not always pick up. vercel.json force-includes that data
 * directory in the function bundle — if a deploy ever throws ENOENT on an .afm
 * file, that glob is what to check.
 */
export async function renderCertificatePdf(certificate: Certificate, user: User): Promise<Buffer> {
  const verifyUrl = certificateVerifyUrl(certificate);
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 320 });
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1] ?? "", "base64");

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    /* ------------------------------------------------------------- header */
    doc.rect(0, 0, doc.page.width, 128).fill(BRAND);
    doc
      .fillColor("#FFFFFF")
      .fontSize(22)
      .text("JeevanSetu — Digital Life Certificate", 56, 42, { width: 420 });
    doc
      .fontSize(10)
      .fillColor("#D8ECE3")
      .text("Demo prototype — not a government-issued document", 56, 74, { width: 420 });
    doc
      .fontSize(10)
      .fillColor("#D8ECE3")
      .text(certificate.kind === "full" ? "Full certificate · valid 12 months" : "Provisional certificate · valid 30 days", 56, 92, {
        width: 420,
      });

    /* -------------------------------------------- verification block (right)
     * Order matters and is fixed: the human-readable code first, then the QR that
     * encodes the same thing, then the URL the QR resolves to. Anyone holding the
     * printout can verify it three ways without a scanner.
     */
    const colX = 372;
    const colWidth = 168;
    let vy = 158;

    doc.fontSize(8).fillColor(MUTED).text("VERIFICATION CODE", colX, vy, { width: colWidth, align: "center" });
    vy += 12;
    doc
      .fontSize(15)
      .fillColor(INK)
      .text(certificate.verificationCode, colX, vy, { width: colWidth, align: "center", characterSpacing: 1.5 });
    vy += 24;

    doc.image(qrBuffer, colX + (colWidth - 132) / 2, vy, { width: 132 });
    vy += 142;

    doc.fontSize(8).fillColor(MUTED).text("Verify this certificate at", colX, vy, { width: colWidth, align: "center" });
    vy += 11;
    doc
      .fontSize(8)
      .fillColor(BRAND)
      .text(verifyUrl, colX, vy, { width: colWidth, align: "center", link: verifyUrl, underline: false });

    /* --------------------------------------------------- details (left column) */
    let y = 158;
    const labelled = (label: string, value: string) => {
      doc.fontSize(8).fillColor(MUTED).text(label.toUpperCase(), 56, y, { width: 290 });
      y += 12;
      doc.fontSize(12).fillColor(INK).text(value, 56, y, { width: 290 });
      y += 22;
    };

    labelled("Certificate number", certificate.certificateNumber);
    labelled("Issued to", user.name.en);
    labelled("Aadhaar number", user.maskedAadhaar);
    labelled("Passbook number", user.pension.passbookNumber);
    labelled("Date of birth", new Date(user.dob).toLocaleDateString("en-IN"));
    labelled("Pension disbursing agency", user.pension.disbursingAgency);
    labelled("Bank account", user.bank.maskedAccount);

    y += 6;
    doc.moveTo(56, y).lineTo(346, y).strokeColor(RULE).stroke();
    y += 16;

    labelled("Issued on", new Date(certificate.issuedAt).toLocaleDateString("en-IN"));
    labelled("Valid until", new Date(certificate.validUntil).toLocaleDateString("en-IN"));
    labelled(
      "Trust confidence score",
      `${certificate.confidenceScore}%  ·  ${certificate.tier.replace(/^\w/, (m) => m.toUpperCase())}`
    );

    /* ------------------------------------------------- methods, full width */
    y = Math.max(y, 560);
    doc.moveTo(56, y).lineTo(doc.page.width - 56, y).strokeColor(RULE).stroke();
    y += 16;
    doc.fontSize(8).fillColor(MUTED).text("HOW THIS IDENTITY WAS CONFIRMED", 56, y, { width: 480 });
    y += 13;
    doc
      .fontSize(10)
      .fillColor(INK)
      .text(certificate.signalsUsed.map(readableSignal).join(" · "), 56, y, { width: 480 });

    /* ------------------------------------------------------------ footer */
    doc
      .fontSize(8)
      .fillColor("#8A9A95")
      .text(
        "This is a demonstration certificate generated by a hackathon prototype. No government system was involved in its issuance, and it confers no entitlement. Personal details shown here were read from a mocked Aadhaar service with the holder's consent.",
        56,
        752,
        { width: doc.page.width - 112 }
      );

    doc.end();
  });
}

function readableSignal(signal: string): string {
  return signal
    .split("_")
    .map((w) => w.replace(/^\w/, (m) => m.toUpperCase()))
    .join(" ");
}
