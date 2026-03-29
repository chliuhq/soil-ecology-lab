"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import research from "@/data/research.json";
import publications from "@/data/publications.json";

const ICON_MAP: Record<string, string> = {
  leaf: "🌿",
  layers: "🧱",
  mountain: "⛰️",
  satellite: "🛰️",
};

const TECH_ITEMS = [
  { icon: "🛰️", label: { zh: "无人机遥感", en: "UAV Remote Sensing" } },
  { icon: "🔬", label: { zh: "CT 扫描", en: "CT Scanning" } },
  { icon: "🤖", label: { zh: "AI / 机器学习", en: "AI / Machine Learning" } },
  { icon: "🌍", label: { zh: "Google Earth Engine", en: "Google Earth Engine" } },
  { icon: "📡", label: { zh: "InSAR 监测", en: "InSAR Monitoring" } },
  { icon: "🧬", label: { zh: "高通量测序", en: "High-throughput Sequencing" } },
  { icon: "🏷️", label: { zh: "稳定同位素示踪", en: "Stable Isotope Tracing" } },
  { icon: "📊", label: { zh: "结构方程模型", en: "Structural Equation Modeling" } },
];

export default function ResearchPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#1a4a3a] to-[#2c5f2d] dark:from-[#070d10] dark:via-[#0d2820] dark:to-[#142e15]">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl" />
        <div className="container-main text-center relative z-10">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {lt({ zh: "探索土壤的奥秘", en: "Exploring the Secrets of Soil" })}
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <p className="text-lg md:text-xl text-emerald-300/90 max-w-2xl mx-auto">
              {lt({
                zh: "从微观碳循环到宏观遥感监测，多尺度揭示土壤生态系统的运行规律",
                en: "From microscale carbon cycling to macroscale remote sensing, revealing soil ecosystem dynamics across multiple scales",
              })}
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ===== Research Directions — Alternating Layout ===== */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.research.title}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-14 rounded" />
          </FadeInOnScroll>

          <div className="space-y-24">
            {research.map((r, idx) => {
              const isEven = idx % 2 === 1;
              const rAny = r as any;
              const methods = String(lt(rAny.methods || { zh: "", en: "" }) || "");
              const methodList = methods ? methods.split(/、|,\s*/).map((m: string) => m.trim()).filter(Boolean) : [];

              const relatedPubs = publications
                .filter((p) => p.category.includes(r.id))
                .sort((a, b) => b.year - a.year || b.id - a.id)
                .slice(0, 3);

              return (
                <div key={r.id} id={r.id} className="scroll-mt-20">
                  <div className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}>
                    {/* Image */}
                    <FadeInOnScroll direction={isEven ? "right" : "left"} delay={100} className="w-full lg:w-1/2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={r.image}
                          alt={lt(r.title)}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-5 flex items-center gap-2">
                          <span className="text-3xl drop-shadow-lg">{ICON_MAP[r.icon] || "🔬"}</span>
                          <span className="text-white font-serif font-bold text-xl drop-shadow-lg">{lt(r.title)}</span>
                        </div>
                      </div>
                    </FadeInOnScroll>

                    {/* Text */}
                    <FadeInOnScroll direction={isEven ? "left" : "right"} delay={200} className="w-full lg:w-1/2">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <span className="text-2xl">{ICON_MAP[r.icon] || "🔬"}</span>
                        {lt(r.title)}
                      </h3>
                      <p className="text-text-light dark:text-gray-400 leading-relaxed mb-5">
                        {lt(r.description)}
                      </p>

                      {/* Methods */}
                      {methodList.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {lt({ zh: "研究方法", en: "Methods" })}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {methodList.map((m: string, i: number) => (
                              <span key={i} className="tag tag-primary">{m}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech tags */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          {lt({ zh: "技术手段", en: "Technologies" })}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {methodList.slice(0, 4).map((m: string, i: number) => (
                            <span key={i} className="tag tag-accent">{m}</span>
                          ))}
                        </div>
                      </div>

                      {/* Related pubs */}
                      {relatedPubs.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {t.research.relatedPubs}
                          </h4>
                          <div className="space-y-2">
                            {relatedPubs.map((pub) => (
                              <Link key={pub.id} href={`/publications#pub-${pub.id}`}
                                className="pub-item text-sm block hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg px-3 py-2">
                                <p className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors line-clamp-1">{pub.title}</p>
                                <p className="text-text-light dark:text-gray-400 text-xs">
                                  {pub.authors.split(",").slice(0, 3).join(",")}... — <span className="text-primary">{pub.journal}</span>, {pub.year}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </FadeInOnScroll>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Frontier Technologies Grid ===== */}
      <section className="py-16 bg-bg-light dark:bg-dark-surface">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">
              {lt({ zh: "前沿技术手段", en: "Frontier Technologies" })}
            </h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />
          </FadeInOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TECH_ITEMS.map((tech, i) => (
              <FadeInOnScroll key={i} delay={i * 80}>
                <div className="bg-white dark:bg-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <span className="text-3xl mb-2 block">{tech.icon}</span>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{lt(tech.label)}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
