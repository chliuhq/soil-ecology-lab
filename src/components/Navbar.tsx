"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

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
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary text-xl">🌱</span>
          <span className="font-serif font-bold text-lg text-gray-900 hidden sm:inline">
            {locale === "zh" ? "土壤生态课题组" : "Soil Ecology Lab"}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="nav-link">
              {(t.nav as any)[item.key]}
            </Link>
          ))}
          <button
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="ml-3 text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t.common.switchLang}
          </button>
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
              className="block px-6 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-green-50"
              onClick={() => setOpen(false)}
            >
              {(t.nav as any)[item.key]}
            </Link>
          ))}
          <button
            onClick={() => { setLocale(locale === "zh" ? "en" : "zh"); setOpen(false); }}
            className="mx-6 mt-2 text-sm px-3 py-1.5 border border-gray-200 rounded-md"
          >
            {t.common.switchLang}
          </button>
        </div>
      )}
    </nav>
  );
}
