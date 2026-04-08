"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

const crossDisciplines = [
  {
    from: { zh: "生物科学/生物技术", en: "Biology / Biotechnology" },
    to: { zh: "土壤微生物组分析、生物多样性调查、分子生态学", en: "Soil microbiome analysis, biodiversity surveys, molecular ecology" },
    icon: "🧬",
  },
  {
    from: { zh: "环境科学/环境工程", en: "Environmental Science / Engineering" },
    to: { zh: "土壤污染修复、水土保持工程、环境监测", en: "Soil remediation, soil & water conservation engineering, environmental monitoring" },
    icon: "🌍",
  },
  {
    from: { zh: "地理信息科学/测绘", en: "GIS / Surveying & Mapping" },
    to: { zh: "GIS空间分析、遥感影像处理、数字地形分析", en: "GIS spatial analysis, remote sensing image processing, digital terrain analysis" },
    icon: "🗺️",
  },
  {
    from: { zh: "计算机/人工智能", en: "Computer Science / AI" },
    to: { zh: "深度学习图像分析、大数据挖掘、自动化监测系统", en: "Deep learning image analysis, big data mining, automated monitoring systems" },
    icon: "🤖",
  },
  {
    from: { zh: "水利工程/水文学", en: "Hydraulic Engineering / Hydrology" },
    to: { zh: "水土流失模拟、流域水文过程、坡面产流产沙", en: "Soil erosion modeling, watershed hydrology, hillslope runoff & sediment" },
    icon: "💧",
  },
  {
    from: { zh: "林学/园林", en: "Forestry / Landscape Architecture" },
    to: { zh: "森林生态系统调查、植被恢复、混交林研究", en: "Forest ecosystem surveys, vegetation restoration, mixed forest studies" },
    icon: "🌲",
  },
  {
    from: { zh: "农学/植物保护", en: "Agronomy / Plant Protection" },
    to: { zh: "土壤-植物互作、根际生态、养分循环", en: "Soil-plant interactions, rhizosphere ecology, nutrient cycling" },
    icon: "🌾",
  },
];

const interestTracks = [
  {
    icon: "📸",
    title: { zh: "摄影爱好者", en: "Photography Enthusiast" },
    tagline: { zh: "适合喜欢摄影、视觉创作、记录美好的你", en: "For those who love photography, visual creation & capturing beauty" },
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    items: [
      { zh: "无人机航拍与遥感影像采集", en: "UAV aerial photography & remote sensing image acquisition" },
      { zh: "生态景观摄影记录", en: "Ecological landscape photography & documentation" },
      { zh: "CT扫描土壤孔隙结构的微观摄影", en: "CT-scan micro-photography of soil pore structures" },
      { zh: "图像后处理与智能分析", en: "Image post-processing & intelligent analysis" },
    ],
  },
  {
    icon: "🏕️",
    title: { zh: "野外探索者", en: "Field Explorer" },
    tagline: { zh: "适合喜欢户外、热爱自然、享受野外的你", en: "For those who love the outdoors, nature & fieldwork adventures" },
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    items: [
      { zh: "亚热带森林样地调查", en: "Subtropical forest plot surveys" },
      { zh: "土壤剖面采样与观测", en: "Soil profile sampling & observation" },
      { zh: "野外长期定位监测站维护", en: "Long-term field monitoring station maintenance" },
      { zh: "不同生态系统的对比研究", en: "Comparative studies across ecosystems" },
    ],
  },
  {
    icon: "💻",
    title: { zh: "编程/数据爱好者", en: "Coding & Data Enthusiast" },
    tagline: { zh: "适合喜欢独处、沉浸思考、享受代码世界的你", en: "For those who enjoy solitude, deep thinking & the world of code" },
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    items: [
      { zh: "遥感影像智能分析（Google Earth Engine）", en: "Remote sensing image analysis (Google Earth Engine)" },
      { zh: "无人机影像拼接与三维重建", en: "UAV image mosaicking & 3D reconstruction" },
      { zh: "CT扫描图像的深度学习分析", en: "Deep learning analysis of CT scan images" },
      { zh: "大数据荟萃分析", en: "Big data meta-analysis" },
    ],
  },
  {
    icon: "🔬",
    title: { zh: "跨学科创新者", en: "Interdisciplinary Innovator" },
    tagline: { zh: "适合喜欢跨界、脑洞大开、不走寻常路的你", en: "For those who love cross-boundary thinking & unconventional paths" },
    color: "from-purple-50 to-fuchsia-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
    items: [
      { zh: "多源遥感（卫星+无人机+地面传感器）数据融合", en: "Multi-source remote sensing data fusion (satellite + UAV + ground sensors)" },
      { zh: "AI辅助土壤分类与制图", en: "AI-assisted soil classification & mapping" },
      { zh: "物联网土壤监测系统", en: "IoT-based soil monitoring systems" },
    ],
  },
];

const techHighlights = [
  {
    icon: "🛸",
    title: { zh: "无人机遥感", en: "UAV Remote Sensing" },
    desc: { zh: "航拍、多光谱、LiDAR——从空中精准感知地表变化", en: "Aerial photography, multispectral & LiDAR — precision sensing from above" },
  },
  {
    icon: "🔍",
    title: { zh: "CT扫描", en: "CT Scanning" },
    desc: { zh: "土壤孔隙结构三维重建、根系形态无损观测", en: "3D reconstruction of soil pore structures & non-destructive root morphology observation" },
  },
  {
    icon: "🤖",
    title: { zh: "图像智能分析", en: "AI Image Analysis" },
    desc: { zh: "深度学习、目标检测、语义分割——让AI读懂土壤", en: "Deep learning, object detection & semantic segmentation — teaching AI to read soil" },
  },
  {
    icon: "🌍",
    title: { zh: "多源遥感融合", en: "Multi-source RS Fusion" },
    desc: { zh: "卫星+无人机+地面传感器，多尺度立体监测", en: "Satellite + UAV + ground sensors for multi-scale 3D monitoring" },
  },
];

export default function JoinUsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.joinus.title}</h1>
      <p className="section-subtitle text-center">{t.joinus.subtitle}</p>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      {/* Hero banner */}
      <div className="max-w-4xl mx-auto mb-14 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 md:p-10 border border-green-100 dark:border-green-800">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
          {lt({ zh: "🌿 不只是传统土壤学", en: "🌿 Beyond Traditional Soil Science" })}
        </h2>
        <p className="text-text-main leading-relaxed text-center max-w-2xl mx-auto">
          {lt({
            zh: "我们将无人机遥感、CT扫描、深度学习等前沿技术与经典土壤生态学深度融合，用新视角、新工具探索土壤世界的奥秘。无论你是喜欢飞无人机、写代码，还是热爱野外探索，这里都有属于你的舞台。",
            en: "We deeply integrate cutting-edge technologies — UAV remote sensing, CT scanning, deep learning — with classical soil ecology. Whether you love flying drones, writing code, or exploring the field, there's a stage for you here."
          })}
        </p>
      </div>

      {/* 跨专业欢迎 */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-violet-50 via-pink-50 to-amber-50 dark:from-violet-900/20 dark:via-pink-900/20 dark:to-amber-900/20 rounded-2xl p-8 md:p-10 border border-violet-100 dark:border-violet-800">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
            {lt({ zh: "🌈 我们不看专业，看你", en: "🌈 We Don't Judge by Major — We See You" })}
          </h2>
          <p className="text-text-main leading-relaxed text-center max-w-2xl mx-auto mb-8">
            {lt({
              zh: "态度和能力远比专业对口重要。无论你来自什么专业，只要有好奇心和行动力，结合你的专业特长，都能在课题组找到属于自己的研究方向。",
              en: "Attitude and ability matter far more than having the \"right\" major. No matter your background, if you bring curiosity and initiative, you can combine your expertise with our research to carve out your own path."
            })}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {crossDisciplines.map((d, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/70 dark:bg-gray-800/50 rounded-lg p-3.5">
                <span className="text-xl shrink-0">{d.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{lt(d.from)}</p>
                  <p className="text-xs text-text-light dark:text-gray-400 mt-0.5">→ {lt(d.to)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 你可以做什么 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b dark:border-gray-700 pb-2">
        {lt({ zh: "🎯 你可以做什么", en: "🎯 What You Can Do" })}
      </h2>
      <p className="text-text-light mb-6">
        {lt({ zh: "根据你的兴趣，找到最适合你的研究方向", en: "Find the research track that matches your interests" })}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {interestTracks.map((track, i) => (
          <div key={i} className={`bg-gradient-to-br ${track.color} border ${track.border} rounded-xl p-6 hover:shadow-md transition-shadow`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">✨ {lt(track.tagline)}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{track.icon}</span>
              <span className={`text-sm font-semibold px-3 py-0.5 rounded-full ${track.badge}`}>{lt(track.title)}</span>
            </div>
            <ul className="space-y-1.5">
              {track.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  <span>{lt(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 前沿技术手段 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b dark:border-gray-700 pb-2">
        {lt({ zh: "🚀 前沿技术手段", en: "🚀 Cutting-edge Technologies" })}
      </h2>
      <p className="text-text-light mb-6">
        {lt({ zh: "不仅是传统遥感——我们的技术工具箱", en: "Beyond traditional remote sensing — our technology toolbox" })}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {techHighlights.map((tech, i) => (
          <div key={i} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center hover:border-primary/30 hover:shadow-sm transition-all">
            <span className="text-3xl block mb-2">{tech.icon}</span>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{lt(tech.title)}</h3>
            <p className="text-xs text-text-light dark:text-gray-400 leading-relaxed">{lt(tech.desc)}</p>
          </div>
        ))}
      </div>

      {/* 招生方向 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
        {t.joinus.directions}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {members.pi.map((m) => (
          <div key={m.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{lt(m.name)}</h3>
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
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
        {t.joinus.requirements}
      </h2>
      <div className="max-w-3xl space-y-5 text-text-light dark:text-gray-400 leading-loose text-base">
        <p>{lt({
          zh: "我们热忱欢迎各专业背景的同学报考！近年来，越来越多生物科学、生物技术、环境科学、地理信息、计算机等专业的同学选择跨考生态学和林业方向。事实证明，跨专业背景往往能带来独特的视角和方法，结合课题组的研究方向，同样能开展出色的研究工作。",
          en: "We warmly welcome applicants from all academic backgrounds! In recent years, more and more students from biology, biotechnology, environmental science, GIS, computer science and other fields have chosen to pursue graduate studies in ecology and forestry. Experience shows that cross-disciplinary backgrounds often bring unique perspectives and methods, enabling equally outstanding research when combined with our lab's directions."
        })}</p>
        <p>{lt({
          zh: "我们最看重的不是你的专业是否对口，而是你是否具备：对科学研究的热情与好奇心、踏实认真的工作态度、主动学习和解决问题的能力。专业知识可以学，但态度和热情是最宝贵的。",
          en: "What we value most is not whether your major is a perfect match, but whether you have: passion and curiosity for scientific research, a diligent and earnest work ethic, and the ability to learn proactively and solve problems. Domain knowledge can be learned — attitude and enthusiasm are what truly matter."
        })}</p>
        <p>{lt({
          zh: "期待有志于土壤生态、植被恢复和水土保持等相关领域的学生加入，共同探索科学前沿，实现自我的成长与发展。",
          en: "We look forward to students passionate about soil ecology, vegetation restoration, and soil conservation joining us to explore scientific frontiers and achieve personal growth."
        })}</p>
      </div>

      {/* 培养理念 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 border-b dark:border-gray-700 pb-2">
        {lt({ zh: "培养理念", en: "Our Philosophy" })}
      </h2>
      <div className="max-w-3xl space-y-3 text-text-light dark:text-gray-400 leading-relaxed mb-12">
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
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
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
            <div key={i} className="flex gap-4 items-start bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl shrink-0">{phase.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{lt(phase.period)}</h3>
                <p className="text-sm text-text-light dark:text-gray-400 leading-relaxed">{lt(phase.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 资源支持 */}
      <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
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
          <div key={i} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{lt(item.title)}</h3>
            </div>
            <p className="text-sm text-text-light dark:text-gray-400 leading-relaxed">{lt(item.desc)}</p>
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
      <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
        <p className="text-base text-text-main dark:text-gray-300 mb-3">
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
