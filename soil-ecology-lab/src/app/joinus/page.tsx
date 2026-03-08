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

      {/* 培养理念 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mt-12 mb-6 border-b pb-2">
        {lt({ zh: "培养理念", en: "Our Philosophy" })}
      </h2>
      <div className="max-w-3xl space-y-3 text-text-light leading-relaxed mb-12">
        <p>{lt({
          zh: "课题组秉持「以学生为中心」的培养理念，注重科研能力与综合素质的协同发展。我们相信每位学生都有独特的潜力，导师的角色是引导、支持和激发，而非简单的任务分配。",
          en: "Our lab upholds a student-centered philosophy, emphasizing the synergistic development of research capabilities and comprehensive qualities. We believe every student has unique potential, and the advisor's role is to guide, support, and inspire rather than simply assign tasks."
        })}</p>
        <p>{lt({
          zh: "我们鼓励学生独立思考、大胆探索，在科研实践中培养批判性思维和创新能力。课题组营造开放、平等、包容的学术氛围，定期开展组会讨论和文献分享，促进思想碰撞与合作交流。",
          en: "We encourage independent thinking and bold exploration, fostering critical thinking and innovation through research practice. The lab maintains an open, equal, and inclusive academic atmosphere with regular group meetings and literature sharing to promote intellectual exchange and collaboration."
        })}</p>
      </div>

      {/* 成长路径 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {lt({ zh: "研究生成长路径", en: "Graduate Growth Path" })}
      </h2>
      <div className="max-w-3xl mb-12">
        <div className="space-y-4">
          {[
            { icon: "🌱", period: { zh: "第一阶段：入学适应期（第1学期）", en: "Phase 1: Orientation (Semester 1)" },
              desc: { zh: "文献阅读训练、实验技能培训、确定研究方向、制定研究计划。导师一对一指导，帮助快速融入科研节奏。", en: "Literature reading training, experimental skill development, research direction identification, and plan formulation. One-on-one mentoring to help students quickly adapt to the research rhythm." } },
            { icon: "🔬", period: { zh: "第二阶段：科研深入期（第2-4学期）", en: "Phase 2: Research Immersion (Semester 2-4)" },
              desc: { zh: "独立开展实验与数据采集、掌握数据分析方法、参加学术会议、撰写并发表学术论文。定期汇报研究进展，及时获得反馈与指导。", en: "Independent experiments and data collection, mastering data analysis methods, attending academic conferences, writing and publishing papers. Regular progress reports with timely feedback and guidance." } },
            { icon: "🎓", period: { zh: "第三阶段：总结提升期（第5-6学期）", en: "Phase 3: Synthesis & Completion (Semester 5-6)" },
              desc: { zh: "完善研究成果、撰写学位论文、准备毕业答辩。同时提供职业规划指导，协助申请博士深造或就业推荐。", en: "Refining research outcomes, writing thesis, preparing for defense. Career planning guidance provided, including assistance with PhD applications or employment recommendations." } },
          ].map((phase, i) => (
            <div key={i} className="flex gap-4 items-start bg-white border border-gray-100 rounded-xl p-5">
              <span className="text-2xl shrink-0">{phase.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{lt(phase.period)}</h3>
                <p className="text-sm text-text-light leading-relaxed">{lt(phase.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 资源支持 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
        {lt({ zh: "资源与支持", en: "Resources & Support" })}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-12">
        {[
          { icon: "💻", title: { zh: "计算与工具", en: "Computing & Tools" },
            desc: { zh: "提供高性能计算资源、专业软件许可、数据分析平台等科研必备工具支持", en: "High-performance computing resources, professional software licenses, and data analysis platforms" } },
          { icon: "📚", title: { zh: "学术交流", en: "Academic Exchange" },
            desc: { zh: "支持参加国内外学术会议、短期访学交流，拓展学术视野与合作网络", en: "Support for attending domestic and international conferences, short-term academic visits to broaden horizons and networks" } },
          { icon: "🧪", title: { zh: "实验平台", en: "Lab Facilities" },
            desc: { zh: "依托广西大学完备的实验平台，配备野外观测站点和室内分析仪器", en: "Well-equipped experimental platforms at Guangxi University with field observation sites and laboratory instruments" } },
          { icon: "🤝", title: { zh: "合作网络", en: "Collaboration Network" },
            desc: { zh: "与国内外多所高校和研究机构保持合作关系，为学生提供多元化的学术交流机会", en: "Collaborative relationships with universities and research institutions worldwide, providing diverse academic exchange opportunities" } },
          { icon: "📖", title: { zh: "科研培训", en: "Research Training" },
            desc: { zh: "课题组内部科研基本技能培训资料，帮助新生快速上手", en: "Internal research skills training materials to help new students get started quickly" },
            link: "https://woa.wps.cn/invite/ditbl363h8v?channel=stable" },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <h3 className="font-semibold text-gray-900">{lt(item.title)}</h3>
            </div>
            <p className="text-sm text-text-light leading-relaxed">{lt(item.desc)}</p>
            {(item as any).link && (
              <a href={(item as any).link} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline">
                {lt({ zh: "进入培训空间 →", en: "Enter training workspace →" })}
              </a>
            )}
          </div>
        ))}
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
