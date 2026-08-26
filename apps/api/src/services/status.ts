import type { User, VerificationStatusDetail } from "@jeevansetu/shared";
import { isAssistedReviewOpen, resolveTier } from "@jeevansetu/shared";
import {
  certificatesForUser,
  findActiveSessionForUser,
  reviewsForUser,
} from "../db/repo";
import { activeAppointment, hasCompletedCall } from "./appointments";

/**
 * One place that answers "where does my life certificate stand?".
 *
 * Every surface — dashboard, verification page, certificate list — reads this, so
 * the pensioner is never told two different things by two different screens. It
 * reports the honest state including the unflattering ones: waiting on us,
 * rejected, or not needed at all.
 */

function fmt(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export function computeVerificationStatus(user: User, now = new Date()): VerificationStatusDetail {
  const session = findActiveSessionForUser(user.id);
  const certificates = certificatesForUser(user.id);
  const latest = certificates[0] ?? null;
  const liveCertificate =
    latest && latest.status === "active" && new Date(latest.validUntil) > now ? latest : null;

  const reviews = reviewsForUser(user.id);
  const openReview = reviews.find(isAssistedReviewOpen) ?? null;
  const lastReview = reviews[0] ?? null;
  const appointment = activeAppointment(user.id);

  const score = session?.currentScore ?? liveCertificate?.confidenceScore ?? 0;
  const tier = resolveTier(score).tier;

  const base = {
    score,
    tier,
    sessionId: session?.id ?? null,
    certificateId: liveCertificate?.id ?? latest?.id ?? null,
    openReviewTicket: openReview?.ticketNumber ?? null,
    appointmentId: appointment?.id ?? null,
    updatedAt: now.toISOString(),
  };

  // A full certificate is only issued after a verification officer has completed a
  // call, so the call is "required" from the moment the automated signals are done.
  const callDone = session ? hasCompletedCall(user.id, session.id) : false;
  const callRequired = !!session && !callDone && resolveTier(score).issuesCertificate;

  /* ---- not a pensioner: say so plainly rather than starting a journey ---- */
  if (user.pension.status === "not_eligible") {
    return {
      ...base,
      status: "not_required",
      callRequired: false,
      waitingOn: null,
      headline: {
        en: "No life certificate is needed for this Aadhaar number",
        hi: "इस आधार संख्या के लिए जीवन प्रमाण पत्र आवश्यक नहीं है",
      },
      detail: user.pension.ineligibleReason ?? {
        en: "You are not currently drawing a pension.",
        hi: "आप वर्तमान में पेंशन प्राप्त नहीं कर रहे हैं।",
      },
      nextStep: null,
    };
  }

  /* ---- waiting on a person ---- */
  if (openReview) {
    return {
      ...base,
      status: "awaiting_review",
      callRequired,
      waitingOn: "assisted_review",
      headline: {
        en: `Your request ${openReview.ticketNumber} is with our team`,
        hi: `आपका अनुरोध ${openReview.ticketNumber} हमारी टीम के पास है`,
      },
      detail: {
        en: `A verification officer will review your details and get back to you by ${fmt(openReview.slaDueAt, "en-IN")}. Nobody is reviewing it at this exact moment — you do not need to stay on this page.`,
        hi: `एक सत्यापन अधिकारी आपके विवरण की समीक्षा करेंगे और ${fmt(openReview.slaDueAt, "hi-IN")} तक आपसे संपर्क करेंगे। इस समय कोई इसकी समीक्षा नहीं कर रहा है — आपको इस पृष्ठ पर रुकने की आवश्यकता नहीं है।`,
      },
      nextStep:
        openReview.status === "more_info_needed"
          ? {
              en: "The officer has asked you for one more thing. Open your request to see what is needed.",
              hi: "अधिकारी ने आपसे एक और जानकारी माँगी है। देखने के लिए अपना अनुरोध खोलें।",
            }
          : null,
    };
  }

  if (appointment) {
    return {
      ...base,
      status: "awaiting_call",
      callRequired: true,
      waitingOn: "verification_call",
      headline: {
        en: `Verification call booked for ${fmt(appointment.slotStart, "en-IN")}`,
        hi: `${fmt(appointment.slotStart, "hi-IN")} के लिए सत्यापन कॉल बुक है`,
      },
      detail: {
        en: "This call is the last step. Once the officer confirms it is you, your life certificate is issued and your pension continues.",
        hi: "यह कॉल अंतिम चरण है। जैसे ही अधिकारी पुष्टि करते हैं कि यह आप हैं, आपका जीवन प्रमाण पत्र जारी हो जाता है और आपकी पेंशन जारी रहती है।",
      },
      nextStep: {
        en: "Keep your Aadhaar card with you and join the call at the booked time.",
        hi: "अपना आधार कार्ड साथ रखें और बुक किए गए समय पर कॉल में शामिल हों।",
      },
    };
  }

  /* ---- an officer said no ---- */
  if (lastReview?.status === "rejected" && !liveCertificate) {
    return {
      ...base,
      status: "rejected",
      callRequired,
      waitingOn: null,
      headline: {
        en: "We could not confirm your identity from your last request",
        hi: "आपके पिछले अनुरोध से हम आपकी पहचान की पुष्टि नहीं कर सके",
      },
      detail: lastReview.decisionNote ?? {
        en: "A verification officer reviewed your request and could not confirm it from the information available.",
        hi: "एक सत्यापन अधिकारी ने आपके अनुरोध की समीक्षा की और उपलब्ध जानकारी से पुष्टि नहीं कर सके।",
      },
      nextStep: {
        en: "Book a verification call — an officer can confirm your identity with you directly.",
        hi: "सत्यापन कॉल बुक करें — अधिकारी सीधे आपके साथ आपकी पहचान की पुष्टि कर सकते हैं।",
      },
    };
  }

  /* ---- done ---- */
  if (liveCertificate) {
    const dueSoon =
      new Date(liveCertificate.validUntil).getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1000;
    return {
      ...base,
      status: "completed",
      callRequired: false,
      waitingOn: null,
      certificateId: liveCertificate.id,
      headline: {
        en: dueSoon ? "Your certificate expires soon" : "Your life certificate is active",
        hi: dueSoon ? "आपका प्रमाण पत्र जल्द समाप्त हो रहा है" : "आपका जीवन प्रमाण पत्र सक्रिय है",
      },
      detail: {
        en: `Valid until ${fmt(liveCertificate.validUntil, "en-IN")}. Your pension continues without interruption.`,
        hi: `${fmt(liveCertificate.validUntil, "hi-IN")} तक मान्य। आपकी पेंशन बिना रुकावट जारी रहेगी।`,
      },
      nextStep: dueSoon
        ? {
            en: "You can renew now — it takes a few minutes and there is no need to wait for the last day.",
            hi: "आप अभी नवीनीकरण कर सकते हैं — इसमें कुछ मिनट लगते हैं, अंतिम दिन तक प्रतीक्षा करने की आवश्यकता नहीं।",
          }
        : null,
    };
  }

  /* ---- expired / stopped ---- */
  if (user.pension.status === "stopped" || (latest && latest.status === "expired")) {
    return {
      ...base,
      status: "expired",
      callRequired,
      waitingOn: null,
      headline: {
        en:
          user.pension.monthsUnpaid > 0
            ? `Your pension has been on hold for ${user.pension.monthsUnpaid} month${user.pension.monthsUnpaid === 1 ? "" : "s"}`
            : "Your life certificate has expired",
        hi:
          user.pension.monthsUnpaid > 0
            ? `आपकी पेंशन ${user.pension.monthsUnpaid} माह से रोकी गई है`
            : "आपका जीवन प्रमाण पत्र समाप्त हो गया है",
      },
      detail: {
        en: "Completing your verification releases the withheld payments and restarts your monthly pension.",
        hi: "अपना सत्यापन पूरा करने पर रोकी गई राशि जारी हो जाएगी और मासिक पेंशन फिर शुरू हो जाएगी।",
      },
      nextStep: {
        en: "Start your verification — most people finish in under five minutes.",
        hi: "अपना सत्यापन शुरू करें — अधिकांश लोग पाँच मिनट से कम में पूरा कर लेते हैं।",
      },
    };
  }

  /* ---- mid-journey ---- */
  if (session && score > 0) {
    return {
      ...base,
      status: "in_progress",
      callRequired,
      waitingOn: null,
      headline: {
        en: "Your verification is in progress",
        hi: "आपका सत्यापन जारी है",
      },
      detail: {
        en: `You are at ${Math.round(score)}% confidence. Each step you complete adds to it, and you can stop and come back at any time.`,
        hi: `आप ${Math.round(score)}% विश्वास पर हैं। हर पूरा किया गया चरण इसमें जुड़ता है, और आप कभी भी रुककर वापस आ सकते हैं।`,
      },
      nextStep: callRequired
        ? {
            en: "Book your verification call — it is the last step before your certificate is issued.",
            hi: "अपनी सत्यापन कॉल बुक करें — प्रमाण पत्र जारी होने से पहले यह अंतिम चरण है।",
          }
        : {
            en: "Continue with the next suggested step.",
            hi: "अगले सुझाए गए चरण के साथ जारी रखें।",
          },
    };
  }

  return {
    ...base,
    status: "not_started",
    callRequired: false,
    waitingOn: null,
    headline: {
      en: "You have not started your life certificate yet",
      hi: "आपने अभी तक अपना जीवन प्रमाण पत्र शुरू नहीं किया है",
    },
    detail: {
      en: user.pension.nextRenewalDueAt
        ? `Your next renewal is due by ${fmt(user.pension.nextRenewalDueAt, "en-IN")}.`
        : "You can complete it from home whenever you are ready.",
      hi: user.pension.nextRenewalDueAt
        ? `आपका अगला नवीनीकरण ${fmt(user.pension.nextRenewalDueAt, "hi-IN")} तक देय है।`
        : "आप जब तैयार हों, इसे घर से पूरा कर सकते हैं।",
    },
    nextStep: {
      en: "Start your verification — it takes a few minutes.",
      hi: "अपना सत्यापन शुरू करें — इसमें कुछ मिनट लगते हैं।",
    },
  };
}
