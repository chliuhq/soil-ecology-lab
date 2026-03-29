"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n-context";
import { locales, localeNames } from "@/i18n";
import type { Locale } from "@/i18n";

const navItems = [
  { key: "home", href: "/" },
  { key: "people", href: "/people" },
  { key: "research", href: "/research" },
  { key: "publications", href: "/publications" },
  { key: "projects", href: "/projects" },
  { key: "resources", href: "/resources" },
  { key: "joinus", href: "/joinus" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const { t, locale, setLocale, translating } = useI18n();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur border-b border-gray-100 dark:border-gray-700 transition-colors">
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary text-xl">🌱</span>
          <span className="font-serif font-bold text-lg text-gray-900 dark:text-gray-100 hidden sm:inline">
            {locale === "zh" ? "土壤生态与水土保持课题组" : "Soil Ecology & Conservation Lab"}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="nav-link">
              {(t.nav as any)[item.key]}
            </Link>
          ))}
          <div className="relative ml-3">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 dark:text-gray-300"
            >
              {translating ? "⏳" : "🌐"} {localeNames[locale]}
              <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-1.5 text-sm hover:bg-green-50 dark:hover:bg-green-900/30 ${locale === l ? "text-primary font-medium" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="ml-2 p-2 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {mounted && (isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ))}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-dark-surface pb-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-6 py-2.5 text-base text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/30"
              onClick={() => setOpen(false)}
            >
              {(t.nav as any)[item.key]}
            </Link>
          ))}
          <div className="px-6 mt-2 flex gap-2">
            <select
              value={locale}
              onChange={(e) => { setLocale(e.target.value as Locale); setOpen(false); }}
              className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-600 dark:bg-dark-surface dark:text-gray-300 rounded-md flex-1"
            >
              {locales.map((l) => (
                <option key={l} value={l}>{localeNames[l]}</option>
              ))}
            </select>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {mounted && (isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ))}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
