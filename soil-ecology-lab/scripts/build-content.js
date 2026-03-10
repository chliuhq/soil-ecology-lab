/**
 * 构建脚本：将 content/ 目录下的 Markdown 文件转换为 src/data/ 下的 JSON 文件
 * Build script: Convert Markdown files in content/ to JSON files in src/data/
 *
 * 用法 / Usage:  node scripts/build-content.js
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const DATA_DIR = path.join(__dirname, "..", "src", "data");

// ── 工具函数 ──────────────────────────────────────────────
function readMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return { ...data, _content: content.trim(), _file: f };
    });
}

function parseBio(content) {
  // 从 markdown 正文中提取中英文简介，用 --- 分隔
  const parts = content.split(/^---$/m).map((s) => s.trim());
  // 去掉 ## 标题行
  const clean = (s) =>
    s
      .replace(/^##.*$/gm, "")
      .trim();
  const zh = parts[0] ? clean(parts[0]) : "";
  const en = parts[1] ? clean(parts[1]) : "";
  return { zh, en };
}

function parsePubSummary(content) {
  // 解析论文摘要：中文摘要、研究亮点、English Summary、Highlights
  const sections = content.split(/^## /m).filter(Boolean);
  let zh = "", en = "";
  let highlights_zh = [], highlights_en = [];

  for (const sec of sections) {
    const lines = sec.trim().split("\n");
    const title = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    if (title.includes("中文")) {
      const parts = body.split(/^### 研究亮点$/m);
      zh = parts[0].trim();
      if (parts[1]) {
        highlights_zh = parts[1]
          .trim()
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => l.replace(/^- /, ""));
      }
    } else if (title.includes("English")) {
      const parts = body.split(/^### Highlights$/m);
      en = parts[0].trim();
      if (parts[1]) {
        highlights_en = parts[1]
          .trim()
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => l.replace(/^- /, ""));
      }
    }
  }
  // 将 markdown 转为 HTML
  const zhHtml = zh ? marked.parse(zh) : "";
  const enHtml = en ? marked.parse(en) : "";
  return { zh: zhHtml, en: enHtml, highlights: { zh: highlights_zh, en: highlights_en } };
}

// ── 解析 news 正文（中英文） ─────────────────────────────
function parseNewsContent(content) {
  if (!content) return { zh: "", en: "" };
  const sections = content.split(/^## /m).filter(Boolean);
  let zh = "", en = "";
  for (const sec of sections) {
    const lines = sec.trim().split("\n");
    const title = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();
    if (title.includes("中文")) zh = body;
    else if (title.includes("English")) en = body;
  }
  return { zh: zh || content, en: en || content };
}

// ── 构建 news.json ────────────────────────────────────────
function buildNews() {
  const items = readMdFiles(path.join(CONTENT_DIR, "news"));
  return items.map((item, idx) => ({
    id: item._file.replace(/\.md$/, ""),
    date: item.date,
    title: { zh: item.title_zh, en: item.title_en },
    link: item.link || "",
    content: parseNewsContent(item._content),
  }));
}

// ── 构建 research.json ────────────────────────────────────
function buildResearch() {
  const items = readMdFiles(path.join(CONTENT_DIR, "research"));
  return items.map((item) => ({
    id: item.id,
    title: { zh: item.title_zh, en: item.title_en },
    description: { zh: item.description_zh, en: item.description_en },
    icon: item.icon,
    image: item.image,
    methods: { zh: item.methods_zh || "", en: item.methods_en || "" },
    bodyHtml: item._content ? marked.parse(item._content) : "",
  }));
}

// ── 构建 projects.json ────────────────────────────────────
function buildProjects() {
  const items = readMdFiles(path.join(CONTENT_DIR, "projects"));
  return items.map(({ title_zh, title_en, funding_zh, funding_en, period, role, member, status }) => ({
    title: { zh: title_zh, en: title_en },
    funding: { zh: funding_zh, en: funding_en },
    period,
    role,
    member,
    status,
  }));
}

// ── 构建 publications.json ────────────────────────────────
function buildPublications() {
  const items = readMdFiles(path.join(CONTENT_DIR, "publications"));
  // 按年份升序排列（同年按原始 id 升序），最早发表的论文编号为 1
  items.sort((a, b) => a.year - b.year || a.id - b.id);
  return items.map((item, idx) => {
    const summary = parsePubSummary(item._content);
    const images = (item.images || []).map((img) => ({
      src: img.src,
      caption: { zh: img.caption_zh || "", en: img.caption_en || "" },
    }));
    return {
      id: idx + 1,
      authors: item.authors,
      title: item.title,
      journal: item.journal,
      year: item.year,
      volume: item.volume || "",
      pages: item.pages || "",
      doi: item.doi || "",
      pdf: item.pdf || "",
      category: item.category || [],
      member: item.member || "",
      summary: { zh: summary.zh, en: summary.en, highlights: summary.highlights, images },
    };
  });
}

// ── 构建 members.json ─────────────────────────────────────
function buildMembers() {
  const piDir = path.join(CONTENT_DIR, "members", "pi");
  const studentsDir = path.join(CONTENT_DIR, "members", "students");
  const alumniDir = path.join(CONTENT_DIR, "members", "alumni");

  const buildPi = (item) => {
    const bio = parseBio(item._content);
    return {
      id: item.id,
      name: { zh: item.name_zh, en: item.name_en },
      title: { zh: item.title_zh, en: item.title_en },
      department: { zh: item.department_zh, en: item.department_en },
      departmentUrl: item.departmentUrl || "",
      universityUrl: item.universityUrl || "",
      admissionUrl: item.admissionUrl || "",
      email: item.email || "",
      photo: item.photo || "",
      researchgate: item.researchgate || "",
      googlescholar: item.googlescholar || "",
      homepage: item.homepage || "",
      education: (item.education || []).map((e) => ({
        period: e.period,
        institution: { zh: e.institution_zh, en: e.institution_en },
        url: e.url || "",
        degree: { zh: e.degree_zh, en: e.degree_en },
      })),
      bio,
      courses: { zh: item.courses_zh || [], en: item.courses_en || [] },
      enrollment: { zh: item.enrollment_zh || "", en: item.enrollment_en || "" },
    };
  };

  const buildStudent = (item) => ({
    id: item.id,
    name: { zh: item.name_zh, en: item.name_en },
    major: { zh: item.major_zh, en: item.major_en },
    enrollment: item.enrollment || "",
    undergraduate: { zh: item.undergraduate_zh, en: item.undergraduate_en },
    advisor: item.advisor || "",
  });

  const buildAlumnus = (item) => ({
    id: item.id,
    name: { zh: item.name_zh, en: item.name_en },
    degree: { zh: item.degree_zh || "", en: item.degree_en || "" },
    graduation: item.graduation || "",
    currentPosition: { zh: item.currentPosition_zh || "", en: item.currentPosition_en || "" },
  });

  return {
    pi: readMdFiles(piDir).map(buildPi),
    students: readMdFiles(studentsDir).map(buildStudent),
    alumni: readMdFiles(alumniDir).map(buildAlumnus),
  };
}

// ── 构建知识库 ─────────────────────────────────────────────
function buildKnowledgeBase() {
  const s = [];

  // 研究方向
  s.push("## 研究方向 / Research Areas");
  readMdFiles(path.join(CONTENT_DIR, "research")).forEach((d) => {
    s.push(`- ${d.title_zh} (${d.title_en}): ${d.description_zh}`);
  });

  // 成员
  s.push("\n## 团队成员 / Team Members");
  readMdFiles(path.join(CONTENT_DIR, "members", "pi")).forEach((d) => {
    s.push(`- ${d.name_zh} (${d.name_en}), ${d.title_zh}, ${d.department_zh}, Email: ${d.email}`);
    if (d.courses_zh) s.push(`  授课: ${d.courses_zh.join(", ")}`);
    if (d.enrollment_zh) s.push(`  招生方向: ${d.enrollment_zh}`);
    if (d._content) s.push(`  简介: ${d._content.split("---")[0].replace(/^##.*$/gm, "").trim()}`);
  });

  // 论文
  s.push("\n## 代表性论文 / Publications");
  readMdFiles(path.join(CONTENT_DIR, "publications")).forEach((d) => {
    s.push(`- ${d.authors}: "${d.title}". ${d.journal}, ${d.year}. DOI: ${d.doi || "N/A"}`);
  });

  // 项目
  s.push("\n## 科研项目 / Projects");
  readMdFiles(path.join(CONTENT_DIR, "projects")).forEach((d) => {
    s.push(`- ${d.title_zh} (${d.title_en}), ${d.funding_zh}, ${d.period}, 状态: ${d.status}`);
  });

  // 招生信息
  s.push("\n## 招生信息 / Join Us");
  s.push("课题组隶属广西大学，欢迎生态学、土壤学、水文学、林学、农业资源与环境、遥感等相关专业背景的学生报考。");
  s.push("网站: https://soil-ecology-lab.vercel.app");
  s.push("广西大学研究生招生网: https://yjsc.gxu.edu.cn/zsgz/bszs.htm");

  const kb = s.join("\n");
  const outPath = path.join(DATA_DIR, "knowledge-base.json");
  fs.writeFileSync(outPath, JSON.stringify({ content: kb }), "utf-8");
  console.log(`  ✓ knowledge-base.json  (${kb.length} 字符)`);
}

// ── 主函数 ────────────────────────────────────────────────
function main() {
  // 确保输出目录存在
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const write = (name, data) => {
    const file = path.join(DATA_DIR, name);
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
    console.log(`  ✓ ${name}  (${Array.isArray(data) ? data.length + " 条" : "OK"})`);
  };

  console.log("\n📦 正在从 Markdown 生成 JSON 数据...\n");

  write("news.json", buildNews());
  write("research.json", buildResearch());
  write("projects.json", buildProjects());
  write("publications.json", buildPublications());
  write("members.json", buildMembers());

  // 生成知识库
  buildKnowledgeBase();

  console.log("\n✅ 全部完成！JSON 数据已更新到 src/data/\n");
}

main();

