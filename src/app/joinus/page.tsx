"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

export default function JoinUsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.joinus.title}</h1>
      <p className="section-subtitle text-center">{t.joinus.subtitle}</p>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      {/* 欢迎语 */}
      <div className="max-w-3xl mx-auto mb-12 bg-green-50 rounded-xl p-8 text-center">
        <p className="text-text-main leading-relaxed">{t.joinus.welcome}</p>
      </div>

      {/* 招生方向 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {t.joinus.directions}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {members.pi.map((m) => (
          <div key={m.id} className="bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-1">{lt(m.name)}</h3>
            <p className="text-base text-primary mb-3">
              <a href={(m as any).departmentUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{lt(m.department)}</a>
            </p>
            <p className="text-base text-text-main">{lt(m.enrollment)}</p>
            <p className="text-base text-text-light mt-3">
              📧 <a href={`mailto:${m.email}`} className="hover:text-primary">{m.email}</a>
            </p>
            {(m as any).admissionUrl && (
              <a
                href={(m as any).admissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm px-4 py-1.5 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
              >
                {lt({ zh: "研究生招生信息", en: "Graduate Admission" })}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* 我们期待的你 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {t.joinus.requirements}
      </h2>
      <div className="max-w-3xl space-y-3 text-text-light leading-relaxed">
        <p>{lt({
          zh: "诚挚邀请具有生态学、土壤学、水文学、林学、农业资源与环境、微生物学、水土保持学、遥感科学与技术、地理信息科学、计算机、人工智能等相关专业背景的本科生报考硕士研究生。",
          en: "We sincerely invite undergraduates with backgrounds in ecology, soil science, hydrology, forestry, agricultural resources and environment, microbiology, soil and water conservation, remote sensing, GIS, computer science, or AI to apply for our graduate programs."
        })}</p>
        <p>{lt({
          zh: "欢迎不同专业背景和年级的本科生及硕士研究生联系，参与课题研究，加入现有课题或者根据个人兴趣开展新的课题！",
          en: "Students of all backgrounds and levels are welcome to contact us, participate in ongoing projects, or initiate new research based on personal interests!"
        })}</p>
        <p>{lt({
          zh: "期待有志于土壤生态、植被恢复和水土保持等相关领域的学生加入，共同探索科学前沿，实现自我的成长与发展。",
          en: "We look forward to students passionate about soil ecology, vegetation restoration, and soil conservation joining us to explore scientific frontiers and achieve personal growth."
        })}</p>
      </div>

      {/* 招生链接 */}
      <div className="mt-12 p-6 bg-green-50 rounded-xl text-center">
        <p className="text-base text-text-main mb-3">
          {lt({ zh: "更多招生信息请访问", en: "For more admission information, please visit" })}
        </p>
        <a
          href="https://yjsc.gxu.edu.cn/zsgz/bszs.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
        >
          {lt({ zh: "广西大学研究生招生网", en: "Guangxi University Graduate Admissions" })}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
