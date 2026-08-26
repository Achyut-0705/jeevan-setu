import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export type AppLocale = "en" | "hi";

const LOCALE_KEY = "jeevansetu.locale";
const MANUAL_KEY = "jeevansetu.localeManual";

function storedLocale(): AppLocale {
  const v = localStorage.getItem(LOCALE_KEY);
  return v === "hi" || v === "en" ? v : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: storedLocale(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

/** Explicit user choice — wins over the profile locale from then on. */
export function setAppLanguage(locale: AppLocale) {
  localStorage.setItem(LOCALE_KEY, locale);
  localStorage.setItem(MANUAL_KEY, "1");
  void i18n.changeLanguage(locale);
}

/** Profile default, applied only when the user has never picked a language themselves. */
export function applyProfileLanguage(locale: AppLocale) {
  if (localStorage.getItem(MANUAL_KEY) === "1") return;
  localStorage.setItem(LOCALE_KEY, locale);
  void i18n.changeLanguage(locale);
}

export function currentLocale(): AppLocale {
  return i18n.language === "hi" ? "hi" : "en";
}

export default i18n;
