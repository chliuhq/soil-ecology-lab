"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Locale } from "@/i18n";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

type Dict = typeof zhDict;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const dicts: Record<Locale, Dict> = { zh: zhDict, en: enDict };

const I18nContext = createContext<I18nContextType>({
  locale: "zh",
  setLocale: () => {},
  t: zhDict,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "zh" || saved === "en")) setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

/** 从 {zh, en} 对象中取当前语言的值 */
export function useLocaleText() {
  const { locale } = useI18n();
  return <T,>(obj: { zh: T; en: T }): T => obj[locale];
}
