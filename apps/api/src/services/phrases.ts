/** Short, easy-to-pronounce confirmation phrases. Randomised per attempt so a
 * recording of a previous session can't simply be replayed. */
export const VOICE_PHRASES: Record<"en" | "hi", string[]> = {
  en: [
    "My pension keeps me independent",
    "I am well and living at home",
    "Today I confirm I am alive",
  ],
  hi: [
    "मेरी पेंशन मुझे आत्मनिर्भर बनाती है",
    "मैं स्वस्थ हूं और घर पर रहता हूं",
    "आज मैं पुष्टि करता हूं कि मैं जीवित हूं",
  ],
};
