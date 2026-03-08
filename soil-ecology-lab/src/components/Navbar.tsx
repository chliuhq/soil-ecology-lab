"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { locales, localeNames } from "@/i18n";
import type { Locale } from "@/i18n";

const navItems = [
  { key: "home", href: "/" },
  { key: "people", href: "/people" },
  { key: "research", href: "/research" },
  { key: "publications", href: "/publications" },
  { key: "projects", href: "/projects" },
  { key: "joinus", href: "/joinus" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const { t, locale, setLocale, translating } = useI18n();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary text-xl">🌱</span>
          <span className="font-serif font-bold text-lg text-gray-900 hidden sm:inline">
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
              className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              {translating ? "⏳" : "🌐"} {localeNames[locale]}
              <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-1.5 text-sm hover:bg-green-50 ${locale === l ? "text-primary font-medium" : "text-gray-700"}`}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
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
        <div className="md:hidden border-t border-gray-100 bg-white pb-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-6 py-2.5 text-base text-gray-600 hover:text-primary hover:bg-green-50"
              onClick={() => setOpen(false)}
            >
              {(t.nav as any)[item.key]}
            </Link>
          ))}
          <div className="px-6 mt-2">
            <select
              value={locale}
              onChange={(e) => { setLocale(e.target.value as Locale); setOpen(false); }}
              className="text-sm px-3 py-1.5 border border-gray-200 rounded-md w-full"
            >
              {locales.map((l) => (
                <option key={l} value={l}>{localeNames[l]}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}
