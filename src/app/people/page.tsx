"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

export default function PeoplePage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.people.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      {/* PI */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8 border-b pb-2">
        {t.people.pi}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {members.pi.map((m) => (
          <div key={m.id} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            {/* 头像区域 */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-full bg-green-100 overflow-hidden border-4 border-green-200 shadow-md mb-4">
                <Image
                  src={m.photo}
                  alt={lt(m.name)}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{lt(m.name)}</h3>
              <p className="text-lg text-primary font-medium mt-1">{lt(m.title)}</p>
              <a
                href={(m as any).departmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-text-light hover:text-primary hover:underline mt-1"
              >
                {lt(m.department)}
              </a>
              {/* 联系方式图标行 */}
              <div className="flex items-center gap-3 mt-3">
                <a
                  href={`mailto:${m.email}`}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-50 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                  title={m.email}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                {m.researchgate && (
                  <a
                    href={m.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-50 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    title="ResearchGate"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.586 0c-.828 0-1.58.725-1.58 1.586v21.828c0 .861.752 1.586 1.58 1.586h.828V0h-.828zM5.395 2.994C4.576 2.994 4 3.71 4 4.494v15.012c0 .784.575 1.5 1.395 1.5h13.21c.82 0 1.395-.716 1.395-1.5V4.494c0-.784-.575-1.5-1.395-1.5H5.395z" />
                      <path d="M8.475 7.756c1.113 0 1.89-.938 1.89-2.013s-.777-2.012-1.89-2.012-1.89.937-1.89 2.012.777 2.013 1.89 2.013zm3.97 9.578c2.172 0 3.69-1.828 3.69-4.014 0-2.186-1.518-4.013-3.69-4.013-2.171 0-3.69 1.827-3.69 4.013 0 2.186 1.519 4.014 3.69 4.014z" />
                    </svg>
                  </a>
                )}
                {m.googlescholar && (
                  <a
                    href={m.googlescholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-50 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    title="Google Scholar"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* 简介 */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {lt({ zh: "个人简介", en: "About" })}
              </h4>
              <p className="text-base text-text-light leading-relaxed">{lt(m.bio)}</p>
            </div>

            {/* 教育背景 */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {lt({ zh: "教育背景", en: "Education" })}
              </h4>
              <div className="space-y-2">
                {m.education.map((e, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{lt(e.degree)}</div>
                      <div className="text-sm text-text-light">
                        {(e as any).url ? (
                          <a href={(e as any).url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{lt(e.institution)}</a>
                        ) : lt(e.institution)}
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{e.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 主讲课程 */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {lt({ zh: "主讲课程", en: "Courses" })}
              </h4>
              <div className="flex flex-wrap gap-2">
                {lt(m.courses).map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 text-primary text-sm rounded-full border border-green-100">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 研究生 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {t.people.students}
      </h2>
      {members.students.length === 0 ? (
        <Link href="/joinus" className="block text-center py-12 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
          <p className="text-lg text-primary group-hover:underline">{t.people.noStudents}</p>
          <p className="text-sm text-primary/60 mt-2">{lt({ zh: "点击查看招生信息 →", en: "View recruitment info →" })}</p>
        </Link>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {members.students.map((s) => {
              const advisor = members.pi.find((m) => m.id === s.advisor);
              return (
                <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900">{lt(s.name)}</h3>
                  <p className="text-base text-primary mt-1">{lt(s.major)}</p>
                  <p className="text-sm text-text-light mt-1">
                    {lt({ zh: "本科院校", en: "Undergraduate" })}: {lt(s.undergraduate)}
                  </p>
                  <p className="text-sm text-text-light mt-1">
                    {lt({ zh: "入学时间", en: "Enrollment" })}: {s.enrollment}
                  </p>
                  {advisor && (
                    <p className="text-sm text-text-light mt-1">
                      {lt({ zh: "导师", en: "Advisor" })}: {lt(advisor.name)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <Link href="/joinus" className="inline-block text-primary hover:underline font-medium">
            {lt({ zh: "欢迎更多同学加入 →", en: "Welcome to join us →" })}
          </Link>
        </>
      )}
    </div>
  );
}
