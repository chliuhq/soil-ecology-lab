"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import publications from "@/data/publications.json";
import research from "@/data/research.json";
import news from "@/data/news.json";
import members from "@/data/members.json";

/* ── SVG icon components for research areas ── */
function IconMountain({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21l4.8-12L16 15l4 6H4z" />
      <path d="M2 21h20" />
      <path d="M12 9l-1.5-3L8 12" />
    </svg>
  );
}
function IconSatellite({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7L9 3 3 9l4 4" />
      <path d="M11 13l4 4 6-6-4-4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 21l4.35-4.35" />
      <path d="M16.65 3.35L21 7.7" />
    </svg>
  );
}
function IconLayers({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function IconLeaf({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.55-3.42C11.26 20.85 16.57 18.5 20 14c1.5-2 2-5 2-8-3 0-6 .5-8 2z" />
      <path d="M2 2l7.05 7.05" />
    </svg>
  );
}

const SVG_ICON_MAP: Record<string, (props: { className?: string }) => React.ReactElement> = {
  leaf: IconLeaf,
  layers: IconLayers,
  mountain: IconMountain,
  satellite: IconSatellite,
};

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

export default function HomePage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const featured = publications
    .filter((p) => p.category.includes("featured"))
    .sort((a, b) => b.year - a.year || b.id - a.id)
    .slice(0, 8);

  const latestNews = [...news]
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      {/* ===== Full-screen Hero ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#1a4a3a] to-[#2c5f2d] dark:from-[#070d10] dark:via-[#0d2820] dark:to-[#142e15]"
      >
        {/* Decorative blurred orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-300/40 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-emerald-200/30 rounded-full" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container-main text-center relative z-10 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight"
          >
            {t.home.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-xl md:text-2xl text-emerald-300 font-medium mb-6"
          >
            {t.home.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-10"
          >
            {t.home.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex gap-4 justify-center"
          >
            <Link
              href="/research"
              className="px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors font-medium text-lg shadow-lg shadow-emerald-500/20"
            >
              {t.home.learnMore}
            </Link>
            <Link
              href="/joinus"
              className="px-8 py-3 border border-emerald-400/60 text-emerald-300 rounded-lg hover:bg-emerald-400/10 transition-colors font-medium text-lg"
            >
              {t.nav.joinus}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll-down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span className="text-xs text-gray-400 tracking-widest uppercase">
              {lt({ zh: "向下滚动", en: "Scroll Down" })}
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Stats Bar (green) ===== */}
      <section className="py-10 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-800 dark:to-green-900">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: <AnimatedCounter target={publications.length} className="text-4xl font-bold text-white block" />,
                label: lt({ zh: "发表论文", en: "Publications" }),
                icon: (
                  <svg className="w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
              },
              {
                value: <AnimatedCounter target={research.length} className="text-4xl font-bold text-white block" />,
                label: lt({ zh: "研究方向", en: "Research Areas" }),
                icon: (
                  <svg className="w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47-2.47" />
                  </svg>
                ),
              },
              {
                value: <AnimatedCounter target={members.pi.length + members.students.length} className="text-4xl font-bold text-white block" />,
                label: lt({ zh: "团队成员", en: "Team Members" }),
                icon: (
                  <svg className="w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21 12.318 12.318 0 0 1 2.25 19.234v-.106A6.375 6.375 0 0 1 8.624 12.75a6.375 6.375 0 0 1 6.376 6.375M15 10.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ),
              },
              {
                value: <AnimatedCounter target={new Set(publications.map((p) => p.journal)).size} className="text-4xl font-bold text-white block" />,
                label: lt({ zh: "来源期刊", en: "Journals" }),
                icon: (
                  <svg className="w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <FadeInOnScroll key={i} delay={i * 100}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
                    {s.icon}
                  </div>
                  {s.value}
                  <p className="text-sm text-emerald-100 mt-0.5">{s.label}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Research Areas — 2×2 Grid ===== */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.home.researchAreas}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {research.map((r, i) => (
              <FadeInOnScroll key={r.id} delay={i * 120}>
                <Link
                  href={`/research#${r.id}`}
                  className="group block bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-44 bg-green-50 dark:bg-green-900/20 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title.zh}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-white/90 dark:bg-dark-surface/90 flex items-center justify-center shadow text-emerald-600 dark:text-emerald-400">
                        {SVG_ICON_MAP[r.icon]
                          ? SVG_ICON_MAP[r.icon]({ className: "w-4 h-4" })
                          : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>}
                      </span>
                      <h3 className="font-semibold text-white text-lg drop-shadow">{lt(r.title)}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-text-light dark:text-gray-400 line-clamp-3 leading-relaxed">{lt(r.description)}</p>
                  </div>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Publications — Horizontal Scroll ===== */}
      <section className="py-16 bg-bg-light dark:bg-dark-surface">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.home.featuredPubs}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((pub, i) => (
              <FadeInOnScroll key={pub.id} delay={i * 100}>
                <Link
                  href={`/publications#pub-${pub.id}`}
                  className="bg-white dark:bg-dark-bg rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-medium text-white bg-primary px-2 py-0.5 rounded">{pub.year}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${(JOURNAL_COLORS[pub.journal] || DEFAULT_JOURNAL_COLOR).bg} ${(JOURNAL_COLORS[pub.journal] || DEFAULT_JOURNAL_COLOR).text}`}>
                      {pub.journal}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 line-clamp-3 text-sm leading-relaxed flex-1">{pub.title}</h3>
                  <p className="text-xs text-text-light dark:text-gray-400 line-clamp-2">{pub.authors}</p>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/publications" className="text-primary hover:underline font-medium">
            {t.home.viewAllPubs} →
          </Link>
        </div>
      </section>

      {/* ===== Latest News — Card Layout ===== */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.home.latestNews}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {latestNews.map((n: any, i: number) => {
              const [year, month, day] = n.date.split("-");
              const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              return (
                <FadeInOnScroll key={i} delay={i * 120}>
                  <Link
                    href={`/news/${n.id}`}
                    className="group flex bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Date card */}
                    <div className="flex-shrink-0 w-20 bg-emerald-600 flex flex-col items-center justify-center text-white p-3">
                      <span className="text-2xl font-bold leading-none">{parseInt(day)}</span>
                      <span className="text-xs font-medium uppercase mt-1">{monthNames[parseInt(month) - 1]}</span>
                      <span className="text-xs opacity-80 mt-0.5">{year}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4 min-w-0">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-primary transition-colors line-clamp-2 text-sm">
                        {lt(n.title)}
                      </h3>
                      {n.content && (
                        <p className="text-xs text-text-light dark:text-gray-400 line-clamp-2 mt-2">{String(lt(n.content))}</p>
                      )}
                    </div>
                  </Link>
                </FadeInOnScroll>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/news" className="text-primary hover:underline font-medium">
              {t.home.viewAllNews} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Partner Institutions ===== */}
      <section className="py-16 bg-bg-light dark:bg-dark-surface">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">
              {lt({ zh: "合作单位", en: "Partner Institutions" })}
            </h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          </FadeInOnScroll>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {PARTNERS.map((p, i) => (
              <FadeInOnScroll key={i} delay={i * 100}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white dark:bg-dark-bg rounded-lg border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
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
