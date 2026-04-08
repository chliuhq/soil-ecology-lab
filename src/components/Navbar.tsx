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
  { key: "resources", href: "/resources" },
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
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-emerald-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5.5-6 7" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <span className="font-serif font-bold text-lg text-gray-900 hidden sm:inline group-hover:text-primary transition-colors">
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
              className="block px-6 py-2.5 text-base text-gray-600 hover:text-primary hover:bg-green-50"
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
