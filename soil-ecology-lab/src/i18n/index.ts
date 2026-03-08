export type NativeLocale = "zh" | "en";
export type TranslatedLocale = "ja" | "ko" | "fr" | "de" | "es" | "ru";
export type Locale = NativeLocale | TranslatedLocale;

export const defaultLocale: Locale = "zh";

export const nativeLocales: NativeLocale[] = ["zh", "en"];
export const translatedLocales: TranslatedLocale[] = ["ja", "ko", "fr", "de", "es", "ru"];
export const locales: Locale[] = [...nativeLocales, ...translatedLocales];

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  ru: "Русский",
};

export function isNativeLocale(l: Locale): l is NativeLocale {
  return l === "zh" || l === "en";
}
