"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import publications from "@/data/publications.json";
import research from "@/data/research.json";
import news from "@/data/news.json";
import projects from "@/data/projects.json";
import members from "@/data/members.json";

export default function HomePage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const featured = publications
    .filter((p) => p.category.includes("featured"))
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 md:py-28 overflow-hidden">
        {/* 装饰性背景元素 */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-300/40 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-400/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-green-200/50 rounded-full" />
        <div className="container-main text-center relative z-10">
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

      {/* ===== 数据概览 ===== */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: research.length, label: lt({ zh: "研究方向", en: "Research Areas" }), icon: "🔬", href: "/research" },
              { num: publications.length, label: lt({ zh: "学术论文", en: "Publications" }), icon: "📄", href: "/publications" },
              { num: (projects as any[]).length, label: lt({ zh: "科研项目", en: "Projects" }), icon: "📋", href: "/projects" },
              { num: members.pi.length + members.students.length, label: lt({ zh: "团队成员", en: "Team Members" }), icon: "👥", href: "/people" },
            ].map((s, i) => (
              <Link key={i} href={s.href} className="group cursor-pointer hover:scale-105 transition-transform">
                <span className="text-2xl">{s.icon}</span>
                <p className="text-3xl font-bold text-primary mt-1 group-hover:text-primary-dark transition-colors">{s.num}</p>
                <p className="text-sm text-text-light group-hover:text-primary transition-colors">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 研究方向 ===== */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.researchAreas}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {research.map((r) => (
              <Link
                key={r.id}
                href={`/research#${r.id}`}
                className="card-hover bg-white border border-gray-100 rounded-xl overflow-hidden text-center group"
              >
                {/* 配图 */}
                <div className="relative w-full h-36 bg-green-50 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title.zh}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-lg -mt-8 relative z-10 border-2 border-white shadow-sm">
                    {r.icon === "leaf" && "🌿"}
                    {r.icon === "layers" && "🧱"}
                    {r.icon === "mountain" && "⛰️"}
                    {r.icon === "satellite" && "🛰️"}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{lt(r.title)}</h3>
                  <p className="text-sm text-text-light line-clamp-3">{lt(r.description)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 精选论文 ===== */}
      <section className="py-16 bg-bg-light">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.featuredPubs}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="space-y-4 max-w-4xl mx-auto">
            {featured.map((pub) => (
              <Link key={pub.id} href={`/publications#pub-${pub.id}`}
                className="pub-item bg-white rounded-lg p-5 border border-gray-100 block hover:border-primary/30">
                <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors">{pub.title}</h3>
                <p className="text-base text-text-light mb-1">{pub.authors}</p>
                <p className="text-base">
                  <span className="font-medium text-primary">{pub.journal}</span>
                  <span className="text-text-light">, {pub.year}</span>
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/publications" className="text-primary hover:underline font-medium">
              {t.home.viewAllPubs} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 最新动态 ===== */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="section-title text-center">{t.home.latestNews}</h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="max-w-2xl mx-auto space-y-4">
            {news.slice(0, 5).map((n: any, i: number) => (
              <Link key={i} href={`/news#news-${n.id}`}
                className="flex gap-4 items-start py-3 border-b border-gray-50 hover:bg-green-50/50 rounded px-2 -mx-2 transition-colors group">
                <span className="text-base text-text-light whitespace-nowrap">{n.date}</span>
                <p className="text-gray-900 group-hover:text-primary transition-colors">{lt(n.title)}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/news" className="text-primary hover:underline font-medium">
              {t.home.viewAllNews} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 合作单位 ===== */}
      <section className="py-16 bg-bg-light">
        <div className="container-main">
          <h2 className="section-title text-center">
            {lt({ zh: "合作单位", en: "Partner Institutions" })}
          </h2>
          <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: { zh: "中国科学院水土保持研究所", en: "Institute of Soil and Water Conservation, CAS" }, url: "http://www.iswc.ac.cn/" },
              { name: { zh: "西北农林科技大学", en: "Northwest A&F University" }, url: "https://www.nwsuaf.edu.cn/" },
              { name: { zh: "山东农业大学", en: "Shandong Agricultural University" }, url: "https://www.sdau.edu.cn/" },
            ].map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white rounded-lg border border-gray-100 text-sm text-gray-600 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                {lt(p.name)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
