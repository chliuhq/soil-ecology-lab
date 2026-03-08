export type Locale = "zh" | "en";

export const defaultLocale: Locale = "zh";

export const locales: Locale[] = ["zh", "en"];

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
  zh: () => import("./zh.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
