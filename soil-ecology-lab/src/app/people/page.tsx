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
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {t.people.pi}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {members.pi.map((m) => (
          <div key={m.id} className="card-hover bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex gap-5 items-start">
              {/* 头像 */}
              <div className="w-28 h-28 rounded-full bg-green-100 overflow-hidden shrink-0 border-2 border-green-200">
                <Image
                  src={m.photo}
                  alt={lt(m.name)}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900">{lt(m.name)}</h3>
                <p className="text-base text-primary font-medium">{lt(m.title)}</p>
                <p className="text-base text-text-light mt-1">
                  <a href={(m as any).departmentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{lt(m.department)}</a>
                </p>
                <p className="text-base text-text-light mt-1">
                  📧 <a href={`mailto:${m.email}`} className="hover:text-primary">{m.email}</a>
                </p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {(m as any).homepage && (
                    <a href={(m as any).homepage} target="_blank" rel="noopener noreferrer"
                       className="text-sm tag tag-primary">🏫 {lt({ zh: "学校主页", en: "University Profile" })}</a>
                  )}
                  {m.researchgate && (
                    <a href={m.researchgate} target="_blank" rel="noopener noreferrer"
                       className="text-sm tag tag-primary">ResearchGate</a>
                  )}
                  {m.googlescholar && (
                    <a href={m.googlescholar} target="_blank" rel="noopener noreferrer"
                       className="text-sm tag tag-accent">Google Scholar</a>
                  )}
                </div>
              </div>
            </div>

            {/* 简介 */}
            <p className="text-base text-text-light mt-4 leading-relaxed">{lt(m.bio)}</p>

            {/* 学历 */}
            <div className="mt-4">
              <h4 className="text-base font-semibold text-gray-700 mb-2">
                {lt({ zh: "教育背景", en: "Education" })}
              </h4>
              <div className="space-y-1">
                {m.education.map((e, i) => (
                  <div key={i} className="text-sm text-text-light flex gap-2">
                    <span className="whitespace-nowrap font-mono">{e.period}</span>
                    <span>
                      {(e as any).url ? (
                        <a href={(e as any).url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{lt(e.institution)}</a>
                      ) : lt(e.institution)}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>{lt(e.degree)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 课程 */}
            <div className="mt-4">
              <h4 className="text-base font-semibold text-gray-700 mb-1">
                {lt({ zh: "主讲课程", en: "Courses" })}
              </h4>
              <p className="text-sm text-text-light">{lt(m.courses).join("、")}</p>
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
