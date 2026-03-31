"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import publications from "@/data/publications.json";
import research from "@/data/research.json";
import news from "@/data/news.json";
import members from "@/data/members.json";

/* ===== SVG Icons for Research Areas ===== */
const researchIcons: Record<string, React.ReactNode> = {
  leaf: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5.5-6 7" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  layers: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    </svg>
  ),
  mountain: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  satellite: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
      <path d="m9 15 3-3" />
      <path d="M17 13a6 6 0 0 0-6-6" />
      <path d="M21 13A10 10 0 0 0 11 3" />
    </svg>
  ),
};

/* ===== Color themes per research area ===== */
const areaTheme: Record<string, { iconBg: string; iconText: string; hoverBorder: string; gradFrom: string }> = {
  leaf: { iconBg: "bg-emerald-100", iconText: "text-emerald-600", hoverBorder: "hover:border-emerald-300", gradFrom: "from-emerald-50" },
  layers: { iconBg: "bg-amber-100", iconText: "text-amber-600", hoverBorder: "hover:border-amber-300", gradFrom: "from-amber-50" },
  mountain: { iconBg: "bg-orange-100", iconText: "text-orange-600", hoverBorder: "hover:border-orange-300", gradFrom: "from-orange-50" },
  satellite: { iconBg: "bg-blue-100", iconText: "text-blue-600", hoverBorder: "hover:border-blue-300", gradFrom: "from-blue-50" },
};

/* ===== Publication category → left border color ===== */
const catBorderColor: Record<string, string> = {
  "soil-water-carbon": "border-l-emerald-500",
  soc: "border-l-amber-500",
  erosion: "border-l-orange-500",
  "remote-sensing": "border-l-blue-500",
};

/* ===== Stat icon SVGs ===== */
const statIcons = {
  book: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  compass: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  journal: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export default function HomePage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const featured = useMemo(
    () =>
      publications
        .filter((p) => p.category.includes("featured"))
        .sort((a, b) => b.year - a.year)
        .slice(0, 4),
    []
  );

  const journalCount = useMemo(
    () => new Set(publications.map((p) => p.journal)).size,
    []
  );

  const teamCount = members.pi.length + members.students.length;

  const stats = [
    { value: publications.length, label: t.home.stats.publications, icon: statIcons.book },
    { value: research.length, label: t.home.stats.researchAreas, icon: statIcons.compass },
    { value: teamCount, label: t.home.stats.teamMembers, icon: statIcons.users },
    { value: journalCount, label: t.home.stats.journals, icon: statIcons.journal },
  ];

  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20 md:pt-28 pb-28 md:pb-36">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {t.home.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {t.home.subtitle}
          </p>
          <p className="max-w-3xl mx-auto text-text-light text-lg md:text-xl leading-relaxed mb-8">
            {t.home.description}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/research"
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              {t.home.learnMore}
            </Link>
            <Link
              href="/joinus"
              className="px-6 py-2.5 border border-primary text-primary rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              {t.nav.joinus}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar (floating overlap) ===== */}
      <section className="relative -mt-14 z-10 mb-4">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-5 md:p-6 text-center flex flex-col items-center gap-1.5">
                <div className="text-primary">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-text-light font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Research Areas (Dynamic Cards) ===== */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.researchAreas}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {research.map((r) => {
              const theme = areaTheme[r.icon] ?? areaTheme.leaf;
              return (
                <Link
                  key={r.id}
                  href={`/research#${r.id}`}
                  className={`group flex gap-5 items-start bg-gradient-to-br ${theme.gradFrom} to-white border border-gray-100 ${theme.hoverBorder} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <div
                    className={`shrink-0 w-14 h-14 rounded-xl ${theme.iconBg} ${theme.iconText} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    {researchIcons[r.icon]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-lg group-hover:text-primary transition-colors">
                      {lt(r.title)}
                    </h3>
                    <p className="text-base text-text-light leading-relaxed">
                      {lt(r.description)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Featured Publications (Color Blocks) ===== */}
      <section className="py-16 bg-bg-light">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.featuredPubs}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="space-y-4 max-w-4xl mx-auto">
            {featured.map((pub) => {
              const primaryCat = pub.category.find((c) => c !== "featured") ?? pub.category[0];
              const borderClass = catBorderColor[primaryCat] ?? "border-l-gray-300";
              return (
                <Link
                  key={pub.id}
                  href={`/publications#pub-${pub.id}`}
                  className={`block bg-white rounded-lg p-5 border border-gray-100 border-l-4 ${borderClass} hover:shadow-md transition-all duration-200`}
                >
                  <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-base text-text-light mb-1">{pub.authors}</p>
                  <p className="text-base">
                    <span className="font-medium text-primary">{pub.journal}</span>
                    <span className="text-text-light">, {pub.year}</span>
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/publications" className="text-primary hover:underline font-medium">
              {t.home.viewAllPubs} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Latest News ===== */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.latestNews}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="max-w-2xl mx-auto space-y-4">
            {news.slice(0, 5).map((n, i) => (
              <div key={i} className="flex gap-4 items-start py-3 border-b border-gray-50">
                <span className="text-base text-text-light whitespace-nowrap">{n.date}</span>
                <p className="text-gray-900">{lt(n.title)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
