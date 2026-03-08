"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { Locale } from "@/i18n";
import { isNativeLocale } from "@/i18n";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

type Dict = typeof zhDict;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
  translateText: (obj: { zh: string; en: string }) => string;
  translating: boolean;
}

const dicts: Record<string, Dict> = { zh: zhDict, en: enDict };

// 翻译缓存
const transCache: Record<string, Record<string, string>> = {};

function getCacheKey(lang: string) { return `i18n_cache_${lang}`; }

function loadCache(lang: string): Record<string, string> {
  if (transCache[lang]) return transCache[lang];
  try {
    const raw = localStorage.getItem(getCacheKey(lang));
    transCache[lang] = raw ? JSON.parse(raw) : {};
  } catch { transCache[lang] = {}; }
  return transCache[lang];
}

function saveCache(lang: string) {
  try { localStorage.setItem(getCacheKey(lang), JSON.stringify(transCache[lang] || {})); } catch {}
}

const I18nContext = createContext<I18nContextType>({
  locale: "zh",
  setLocale: () => {},
  t: zhDict,
  translateText: (obj) => obj.zh,
  translating: false,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [translatedDict, setTranslatedDict] = useState<Dict | null>(null);
  const [translating, setTranslating] = useState(false);
  const [textCache, setTextCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved) setLocaleState(saved);
  }, []);

  // 翻译 UI 字典（t 对象）
  useEffect(() => {
    if (isNativeLocale(locale)) {
      setTranslatedDict(null);
      return;
    }
    const cache = loadCache(locale);
    const dictKey = `__dict_${locale}`;
    if (cache[dictKey]) {
      try { setTranslatedDict(JSON.parse(cache[dictKey])); return; } catch {}
    }
    // 调用 API 翻译整个 UI 字典
    setTranslating(true);
    fetch("/api/translate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: zhDict, targetLang: locale }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.translated) {
          setTranslatedDict(data.translated as Dict);
          const c = loadCache(locale);
          c[dictKey] = JSON.stringify(data.translated);
          saveCache(locale);
        }
      })
      .catch(() => {})
      .finally(() => setTranslating(false));
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    if (isNativeLocale(l)) setTranslatedDict(null);
  };

  const currentDict = isNativeLocale(locale) ? dicts[locale] : (translatedDict || dicts.zh);

  // 翻译动态文本（{zh, en} 对象）
  const translateText = useCallback((obj: { zh: string; en: string }): string => {
    if (isNativeLocale(locale)) return obj[locale as "zh" | "en"];
    const cache = loadCache(locale);
    if (cache[obj.zh]) return cache[obj.zh];
    // 异步翻译，先返回英文，翻译完后更新
    if (!cache[`__pending_${obj.zh}`]) {
      cache[`__pending_${obj.zh}`] = "1";
      fetch("/api/translate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: { t: obj.zh }, targetLang: locale }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.translated?.t) {
            const c = loadCache(locale);
            c[obj.zh] = data.translated.t;
            delete c[`__pending_${obj.zh}`];
            saveCache(locale);
            setTextCache((prev) => ({ ...prev, [obj.zh]: data.translated.t }));
          }
        })
        .catch(() => {});
    }
    return textCache[obj.zh] || obj.en;
  }, [locale, textCache]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: currentDict, translateText, translating }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

/** 从 {zh, en} 对象中取当前语言的值，非原生语言自动翻译 */
export function useLocaleText() {
  const { locale, translateText } = useI18n();
  return <T,>(obj: { zh: T; en: T }): T => {
    if (isNativeLocale(locale)) return obj[locale as "zh" | "en"];
    if (typeof obj.zh === "string") return translateText(obj as any) as unknown as T;
    return obj.en; // fallback for non-string types
  };
}
