"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import members from "@/data/members.json";

export default function PeoplePage() {
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
              {t.people.title}
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <p className="text-lg md:text-xl text-emerald-300/90 max-w-2xl mx-auto">
              {lt({
                zh: "志同道合的伙伴，共同探索土壤科学的前沿",
                en: "Like-minded partners exploring the frontiers of soil science together",
              })}
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ===== PI Section ===== */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.people.pi}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />
          </FadeInOnScroll>

          <div className="space-y-10">
            {members.pi.map((m, idx) => (
              <FadeInOnScroll key={m.id} delay={idx * 120}>
                <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Photo */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-green-100 dark:bg-green-900/30 overflow-hidden border-2 border-green-200 dark:border-green-800">
                        <Image
                          src={m.photo}
                          alt={lt(m.name)}
                          width={176}
                          height={176}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Links under photo */}
                      <div className="flex gap-2 mt-3 flex-wrap justify-center">
                        {(m as any).homepage && (
                          <a href={(m as any).homepage} target="_blank" rel="noopener noreferrer"
                            className="text-xs tag tag-primary">
                            {lt({ zh: "学校主页", en: "Profile" })}
                          </a>
                        )}
                        {m.researchgate && (
                          <a href={m.researchgate} target="_blank" rel="noopener noreferrer"
                            className="text-xs tag tag-primary">RG</a>
                        )}
                        {m.googlescholar && (
                          <a href={m.googlescholar} target="_blank" rel="noopener noreferrer"
                            className="text-xs tag tag-accent">GS</a>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">{lt(m.name)}</h3>
                      <p className="text-primary font-medium mt-1">{lt(m.title)}</p>
                      <p className="text-text-light dark:text-gray-400 mt-1">
                        <a href={(m as any).departmentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-colors">{lt(m.department)}</a>
                      </p>
                      <p className="text-text-light dark:text-gray-400 mt-1">
                        <a href={`mailto:${m.email}`} className="hover:text-primary transition-colors">{m.email}</a>
                      </p>

                      {/* Bio */}
                      <p className="text-text-light dark:text-gray-400 mt-4 leading-relaxed">{lt(m.bio)}</p>

                      {/* Education */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          {lt({ zh: "教育背景", en: "Education" })}
                        </h4>
                        <div className="space-y-1.5">
                          {m.education.map((e, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-text-light dark:text-gray-400">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                              <div>
                                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{e.period}</span>
                                <span className="mx-1.5 text-gray-300 dark:text-gray-600">|</span>
                                {(e as any).url ? (
                                  <a href={(e as any).url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-colors">{lt(e.institution)}</a>
                                ) : lt(e.institution)}
                                <span className="mx-1.5 text-gray-300 dark:text-gray-600">|</span>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{lt(e.degree)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Courses */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          {lt({ zh: "主讲课程", en: "Courses" })}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {lt(m.courses).map((c: string, i: number) => (
                            <span key={i} className="tag tag-primary text-xs">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Graduate Students ===== */}
      <section className="py-16 bg-bg-light dark:bg-dark-surface">
        <div className="container-main">
          <FadeInOnScroll>
            <h2 className="section-title text-center">{t.people.students}</h2>
            <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />
          </FadeInOnScroll>

          {members.students.length === 0 ? (
            <FadeInOnScroll>
              <Link href="/joinus" className="block text-center py-12 bg-white dark:bg-dark-bg rounded-xl hover:shadow-lg transition-all duration-300 group">
                <p className="text-lg text-primary group-hover:underline">{t.people.noStudents}</p>
                <p className="text-sm text-primary/60 mt-2">{lt({ zh: "点击查看招生信息 →", en: "View recruitment info →" })}</p>
              </Link>
            </FadeInOnScroll>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {members.students.map((s, i) => {
                const advisor = members.pi.find((m) => m.id === s.advisor);
                return (
                  <FadeInOnScroll key={s.id} delay={i * 100}>
                    <div className="bg-white dark:bg-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                          {lt(s.name).charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100">{lt(s.name)}</h3>
                          <p className="text-sm text-primary">{lt(s.major)}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-text-light dark:text-gray-400">
                        <p>{lt({ zh: "本科院校", en: "Undergraduate" })}: {lt(s.undergraduate)}</p>
                        <p>{lt({ zh: "入学时间", en: "Enrollment" })}: {s.enrollment}</p>
                        {advisor && <p>{lt({ zh: "导师", en: "Advisor" })}: {lt(advisor.name)}</p>}
                      </div>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== Join Us CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f2027] via-[#1a4a3a] to-[#2c5f2d] dark:from-[#070d10] dark:via-[#0d2820] dark:to-[#142e15]">
        <div className="container-main text-center">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {lt({ zh: "加入我们", en: "Join Our Team" })}
            </h2>
            <p className="text-emerald-300/80 text-lg max-w-xl mx-auto mb-8">
              {lt({
                zh: "我们正在招收对土壤生态学充满热情的研究生，欢迎联系了解详情",
                en: "We are recruiting passionate graduate students in soil ecology. Get in touch to learn more.",
              })}
            </p>
            <Link
              href="/joinus"
              className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-emerald-50 hover:shadow-lg transition-all duration-300"
            >
              {lt({ zh: "查看招生信息", en: "View Recruitment Info" })}
            </Link>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
