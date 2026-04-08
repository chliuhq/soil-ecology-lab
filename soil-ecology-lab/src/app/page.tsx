"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import publications from "@/data/publications.json";
import research from "@/data/research.json";
import news from "@/data/news.json";
import members from "@/data/members.json";
import projects from "@/data/projects.json";

/* ── Journal color map ── */
const JOURNAL_COLORS: Record<string, { bg: string; text: string }> = {
  "Journal of Hydrology": { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300" },
  "Catena": { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300" },
  "Land Degradation & Development": { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-300" },
  "Hydrological Processes": { bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-700 dark:text-cyan-300" },
  "European Journal of Soil Biology": { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300" },
  "European Journal of Agronomy": { bg: "bg-lime-100 dark:bg-lime-900/40", text: "text-lime-700 dark:text-lime-300" },
  "Agriculture, Ecosystems and Environment": { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300" },
  "Remote Sensing": { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300" },
};
const DEFAULT_JOURNAL_COLOR = { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400" };

const PARTNERS = [
  { name: { zh: "中国科学院水土保持研究所", en: "Institute of Soil and Water Conservation, CAS" }, url: "http://www.iswc.ac.cn/" },
  { name: { zh: "西北农林科技大学", en: "Northwest A&F University" }, url: "https://www.nwsuaf.edu.cn/" },
  { name: { zh: "山东农业大学", en: "Shandong Agricultural University" }, url: "https://www.sdau.edu.cn/" },
];

const AREA_THEME: Record<string, string> = {
  leaf: "from-emerald-50 to-green-50",
  layers: "from-amber-50 to-yellow-50",
  mountain: "from-orange-50 to-amber-50",
  satellite: "from-blue-50 to-indigo-50",
};

const AREA_ICON_BG: Record<string, string> = {
  leaf: "bg-emerald-100 text-emerald-600",
  layers: "bg-amber-100 text-amber-600",
  mountain: "bg-orange-100 text-orange-600",
  satellite: "bg-blue-100 text-blue-600",
};

export default function HomePage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const featured = publications
    .filter((p) => p.category.includes("featured"))
    .sort((a, b) => b.year - a.year || b.id - a.id)
    .slice(0, 4);

  const latestNews = [...news]
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      {/* ===== Hero: Left content + Right stats panel ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-end">
            {/* Left: Text content */}
            <FadeInOnScroll>
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
                  {t.home.title}
                </h1>
                <p className="text-lg md:text-xl text-primary font-medium mb-4">
                  {t.home.subtitle}
                </p>
                <p className="text-base md:text-lg text-text-light leading-relaxed max-w-2xl mb-8">
                  {t.home.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/research"
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                  >
                    {t.home.learnMore}
                  </Link>
                  <Link
                    href="/joinus"
                    className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium text-sm"
                  >
                    {t.nav.joinus}
                  </Link>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Right: Stats panel */}
            <FadeInOnScroll delay={150}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: publications.length, label: lt({ zh: "学术论文", en: "Publications" }), href: "/publications", highlight: true },
                  { num: research.length, label: lt({ zh: "研究方向", en: "Research Areas" }), href: "/research", highlight: false },
                  { num: (projects as any[]).length, label: lt({ zh: "科研项目", en: "Projects" }), href: "/projects", highlight: false },
                  { num: members.pi.length + members.students.length, label: lt({ zh: "团队成员", en: "Team Members" }), href: "/people", highlight: false },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className={`rounded-xl p-5 text-center block transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      s.highlight
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-700 hover:border-primary/30"
                    }`}
                  >
                    <AnimatedCounter
                      target={s.num}
                      className={`text-3xl md:text-4xl font-bold block ${s.highlight ? "text-white" : "text-primary"}`}
                      suffix="+"
                    />
                    <p className={`text-xs mt-1 ${s.highlight ? "text-emerald-100" : "text-text-light"}`}>{s.label}</p>
                  </Link>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ===== Research Areas ===== */}
      <section className="py-14 bg-bg-light dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">{t.home.researchAreas}</h2>
                <div className="h-1 w-12 bg-primary rounded mt-2" />
              </div>
              <Link href="/research" className="text-sm text-primary hover:underline font-medium shrink-0">
                {lt({ zh: "查看全部 →", en: "View all →" })}
              </Link>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {research.map((r, i) => (
              <FadeInOnScroll key={r.id} delay={i * 80}>
                <div>
                <Link
                  href={`/research#${r.id}`}
                  className="group block bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image area with color gradient */}
                  <div className={`relative h-28 bg-gradient-to-br ${AREA_THEME[r.icon] || "from-gray-50 to-gray-100"} overflow-hidden`}>
                    {r.image && (
                      <Image src={r.image} alt={r.title.zh} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`w-9 h-9 rounded-lg ${AREA_ICON_BG[r.icon] || "bg-gray-100 text-gray-600"} flex items-center justify-center shadow-sm text-lg`}>
                        {r.icon === "leaf" ? "🌿" : r.icon === "layers" ? "🪵" : r.icon === "mountain" ? "🏔️" : r.icon === "satellite" ? "🛰️" : "🔬"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                      {lt(r.title)}
                    </h3>
                    <p className="text-xs text-text-light dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {lt(r.description)}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/publications?category=${r.id}`}
                  className="block text-xs text-primary hover:underline mt-1.5 px-1"
                >
                  {lt({ zh: "查看相关论文 →", en: "View papers →" })}
                </Link>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Publications ===== */}
      <section className="py-14 bg-white dark:bg-dark-surface">
        <div className="container-main">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">{t.home.featuredPubs}</h2>
                <div className="h-1 w-12 bg-primary rounded mt-2" />
              </div>
              <Link href="/publications" className="text-sm text-primary hover:underline font-medium shrink-0">
                {t.home.viewAllPubs} →
              </Link>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((pub, i) => (
              <FadeInOnScroll key={pub.id} delay={i * 80}>
                <Link
                  href={`/publications#pub-${pub.id}`}
                  className="group block bg-white dark:bg-dark-bg rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/40 hover:shadow-md transition-all duration-300 p-5"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs font-medium text-white bg-primary px-2 py-0.5 rounded">{pub.year}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${(JOURNAL_COLORS[pub.journal] || DEFAULT_JOURNAL_COLOR).bg} ${(JOURNAL_COLORS[pub.journal] || DEFAULT_JOURNAL_COLOR).text}`}>
                      {pub.journal}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-relaxed mb-3 line-clamp-3 group-hover:text-primary transition-colors flex-1">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-text-light dark:text-gray-400 line-clamp-1">{pub.authors}</p>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Latest News ===== */}
      <section className="py-14 bg-bg-light dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">{t.home.latestNews}</h2>
                <div className="h-1 w-12 bg-primary rounded mt-2" />
              </div>
              <Link href="/news" className="text-sm text-primary hover:underline font-medium shrink-0">
                {t.home.viewAllNews} →
              </Link>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestNews.map((n: any, i: number) => {
              const [year, month, day] = n.date.split("-");
              const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              return (
                <FadeInOnScroll key={i} delay={i * 80}>
                  <Link
                    href={`/news/${n.id}`}
                    className="group flex gap-0 bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-20 bg-emerald-600 flex flex-col items-center justify-center text-white p-3">
                      <span className="text-2xl font-bold leading-none">{parseInt(day)}</span>
                      <span className="text-xs font-medium uppercase mt-1">{monthNames[parseInt(month) - 1]}</span>
                      <span className="text-[10px] opacity-70 mt-0.5">{year}</span>
                    </div>
                    <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                        {lt(n.title)}
                      </h3>
                      {n.content && (
                        <p className="text-xs text-text-light dark:text-gray-400 mt-1.5 line-clamp-2">{String(lt(n.content))}</p>
                      )}
                    </div>
                  </Link>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Partner Institutions ===== */}
      <section className="py-12 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-gray-700">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center mb-6">
              {lt({ zh: "合作单位", en: "Partner Institutions" })}
            </h2>
          </FadeInOnScroll>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {PARTNERS.map((p, i) => (
              <FadeInOnScroll key={i} delay={i * 60}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:border-primary/40 hover:shadow-sm transition-all duration-200"
                >
                  {lt(p.name)}
                </a>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
