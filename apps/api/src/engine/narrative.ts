import type { EventStatus, SignalType } from "@jeevansetu/shared";
import { getSignalDefinition } from "@jeevansetu/shared";

const SIGNAL_LABEL: Record<SignalType, { en: string; hi: string }> = {
  phone_otp: { en: "phone verification", hi: "फ़ोन सत्यापन" },
  trusted_device: { en: "trusted device check", hi: "विश्वसनीय डिवाइस जांच" },
  location_consistency: { en: "location check", hi: "स्थान जांच" },
  pension_record_match: {
    en: "pension record match",
    hi: "पेंशन रिकॉर्ड मिलान",
  },
  face_match: { en: "photo match", hi: "फ़ोटो मिलान" },
  liveness_challenge: { en: "liveness check", hi: "जीवंतता जांच" },
  voice_phrase: { en: "voice check", hi: "आवाज़ जांच" },
  document_upload: { en: "document upload", hi: "दस्तावेज़ अपलोड" },
  family_confirmation: { en: "family confirmation", hi: "परिवार की पुष्टि" },
  video_verification: { en: "video verification", hi: "वीडियो सत्यापन" },
  manual_review: { en: "assisted review", hi: "सहायक समीक्षा" },
  continuity_history: { en: "verification history", hi: "सत्यापन इतिहास" },
};

export function narrativeFor(
  signal: SignalType,
  status: EventStatus,
  pointsAwarded: number,
): {
  en: { title: string; body: string; tone: string };
  hi: { title: string; body: string; tone: string };
} {
  const label = SIGNAL_LABEL[signal];
  if (status === "awarded") {
    return {
      en: {
        title: `${cap(label.en)} confirmed`,
        body: `Great — your ${label.en} was confirmed and added ${pointsAwarded} points to your trust score.`,
        tone: "celebratory",
      },
      hi: {
        title: `${label.hi} की पुष्टि हुई`,
        body: `बहुत बढ़िया — आपका ${label.hi} सफल रहा और आपके भरोसे के स्कोर में ${pointsAwarded} अंक जुड़ गए।`,
        tone: "celebratory",
      },
    };
  }
  if (status === "partial") {
    return {
      en: {
        title: `Partial match on ${label.en}`,
        body: `We could only partly confirm your ${label.en}, but you still earned ${pointsAwarded} points. No problem — you can try again or use another method.`,
        tone: "reassuring",
      },
      hi: {
        title: `${label.hi} आंशिक रूप से सफल`,
        body: `आपका ${label.hi} पूरी तरह से नहीं हो पाया, लेकिन फिर भी आपको ${pointsAwarded} अंक मिले। कोई बात नहीं — आप फिर कोशिश कर सकते हैं या कोई और तरीका अपना सकते हैं।`,
        tone: "reassuring",
      },
    };
  }
  if (status === "capped") {
    return {
      en: {
        title: `${cap(label.en)} recorded`,
        body: `Your ${label.en} was recorded. You've already earned the maximum points possible for this type of check — try a different method to keep building your score.`,
        tone: "informative",
      },
      hi: {
        title: `${label.hi} दर्ज हुआ`,
        body: `आपका ${label.hi} दर्ज हो गया है। इस प्रकार की जांच के लिए आपने पहले ही अधिकतम अंक अर्जित कर लिए हैं — अपना स्कोर बढ़ाने के लिए कोई और तरीका आज़माएं।`,
        tone: "informative",
      },
    };
  }
  return {
    en: {
      title: `${cap(label.en)} didn't come through this time`,
      body: `That's alright — it happens. Let's try another way to confirm it's you.`,
      tone: "reassuring",
    },
    hi: {
      title: `${label.hi} इस बार पूरा नहीं हो सका`,
      body: `कोई बात नहीं — ऐसा होता है। चलिए यह साबित करने का कोई और तरीका आज़माते हैं कि यह आप ही हैं।`,
      tone: "reassuring",
    },
  };
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function assertKnownSignal(signal: SignalType) {
  getSignalDefinition(signal);
}
