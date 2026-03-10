#!/usr/bin/env node
/**
 * Google Scholar 论文自动同步脚本
 * 用法: node scripts/sync-scholar.js [--dry-run]
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const SERP_API_KEY = process.env.SERP_API_KEY || "7ef1e32fc97267d6304913dd8112673f538f15b618d91f2958e0941814b5d61d";
const AUTHORS = [
  { id: "AyQBphkAAAAJ", member: "huaqing-liu", name: "Huaqing Liu" },
  { id: "spXTiCIAAAAJ", member: "jiahui-yang", name: "Jiahui Yang" },
];
const PUB_DIR = path.join(__dirname, "..", "content", "publications");
const DRY_RUN = process.argv.includes("--dry-run");
const CAT_KW = {
  "soil-water-carbon": ["diversity","organic carbon","soc","carbon","intercrop","mixture","nutrient","nitrogen","biomass","dom","litter"],
  "erosion": ["erosion","rill","runoff","sediment","straw","slope","rainfall simulat","water conserv","soil loss","freeze-thaw","loess","thaw"],
  "remote-sensing": ["remote sensing","insar","gee","google earth","satellite","landslide","machine learning","detection","monitoring","ndvi","vegetation ind"],
};

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = ""; res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch { reject(new Error("JSON parse")); } });
      res.on("error", reject);
    }).on("error", reject);
  });
}

function normalizeTitle(t) { return (t || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }

// 模糊匹配：前30字符相同 或 共同子串占比 > 85%
function isSimilarTitle(a, b) {
  if (a === b) return true;
  if (!a || !b || a.length < 20 || b.length < 20) return false;
  // 策略1: 前30个字符完全匹配
  const prefixLen = Math.min(30, a.length, b.length);
  if (a.substring(0, prefixLen) === b.substring(0, prefixLen)) return true;
  // 策略2: 用滑动窗口找最长公共子串，占比 > 85%
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;
  let maxMatch = 0;
  for (let len = Math.min(shorter.length, 40); len >= 20; len--) {
    for (let i = 0; i <= shorter.length - len; i++) {
      if (longer.includes(shorter.substring(i, i + len))) { maxMatch = len; break; }
    }
    if (maxMatch) break;
  }
  return maxMatch / shorter.length > 0.6;
}

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50).replace(/-+$/, ""); }

function guessCategories(title) {
  const l = (title || "").toLowerCase();
  const c = [];
  for (const [k, ws] of Object.entries(CAT_KW)) { if (ws.some((w) => l.includes(w))) c.push(k); }
  return c.length ? c : ["soil-water-carbon"];
}

function getExistingPubs() {
  const files = fs.readdirSync(PUB_DIR).filter((f) => f.endsWith(".md"));
  const pubs = []; let maxId = 0;
  for (const file of files) {
    const content = fs.readFileSync(path.join(PUB_DIR, file), "utf-8");
    // 用行扫描方式提取 frontmatter，避免正则在 Windows 换行符下失败
    const lines = content.split(/\r?\n/);
    let inFm = false, fmLines = [];
    for (const line of lines) {
      if (line.trim() === "---") { if (!inFm) { inFm = true; continue; } else break; }
      if (inFm) fmLines.push(line);
    }
    const fm = fmLines.join("\n");
    const idM = fm.match(/^id:\s*(\d+)/m);
    const titleM = fm.match(/^title:\s*"?(.+?)"?\s*$/m);
    const doiM = fm.match(/^doi:\s*"?([^"\s]+)"?\s*$/m);
    const id = idM ? parseInt(idM[1]) : 0;
    if (id > maxId) maxId = id;
    pubs.push({ id, file, nt: normalizeTitle(titleM ? titleM[1] : ""), doi: doiM ? doiM[1] : "" });
  }
  return { pubs, maxId };
}

async function fetchArticles(authorId) {
  const articles = []; let start = 0;
  while (true) {
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${SERP_API_KEY}&start=${start}&num=100&sort=pubdate`;
    console.log(`  📡 Fetching (start=${start})...`);
    const data = await httpGet(url);
    if (data.error) { console.error(`  ❌ ${data.error}`); break; }
    const arts = data.articles || [];
    if (!arts.length) break;
    for (const a of arts) {
      articles.push({ title: a.title || "", authors: a.authors || "", year: a.year ? parseInt(a.year) : null, publication: a.publication || "" });
    }
    start += 100;
    if (arts.length < 100) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return articles;
}

async function lookupDOI(title) {
  try {
    const data = await httpGet(`https://api.crossref.org/works?query.title=${encodeURIComponent(title)}&rows=1&select=DOI,title`);
    const item = data?.message?.items?.[0];
    if (item?.DOI) {
      const ct = normalizeTitle(Array.isArray(item.title) ? item.title[0] : item.title);
      const ot = normalizeTitle(title);
      const ratio = Math.min(ct.length, ot.length) / Math.max(ct.length, ot.length);
      if (ct.length && ot.length && ratio > 0.7) {
        if (ot.includes(ct.substring(0, Math.floor(Math.min(ct.length, ot.length) * 0.5)))) return item.DOI;
      }
    }
  } catch {}
  return "";
}

function parsePub(pub) {
  if (!pub) return { journal: "", volume: "", pages: "" };
  const parts = pub.split(",").map((s) => s.trim());
  let journal = parts[0] || "", volume = "", pages = "";
  const vm = journal.match(/^(.+?)\s+(\d+\s*\([^)]+\)|\d+)$/);
  if (vm) { journal = vm[1]; volume = vm[2]; }
  for (let i = 1; i < parts.length; i++) {
    if (/^\d+[-–]\d+$|^\w?\d{4,}$/.test(parts[i])) pages = parts[i];
  }
  return { journal, volume, pages };
}

function genMd(id, a, member, doi, pi) {
  const cats = guessCategories(a.title).map((c) => `  - "${c}"`).join("\n");
  return [
    "---", `id: ${id}`, `authors: "${a.authors}"`,
    `title: "${a.title.replace(/"/g, '\\"')}"`,
    `journal: "${pi.journal}"`, `year: ${a.year || new Date().getFullYear()}`,
    `volume: "${pi.volume}"`, `pages: "${pi.pages}"`, `doi: "${doi}"`,
    `category:\n${cats}`, `member: "${member}"`, "images: []", "---",
    "## 中文摘要", "（待补充）", "### 研究亮点", "- 待补充",
    "## English Summary", a.title, "### Highlights", "- To be added", "",
  ].join("\n");
}

async function main() {
  console.log("\n🔬 Google Scholar 论文同步工具\n");
  if (DRY_RUN) console.log("⚠️  预览模式 (--dry-run)\n");

  const { pubs: existing, maxId } = getExistingPubs();
  console.log(`📂 已有 ${existing.length} 篇论文 (最大ID: ${maxId})\n`);

  // 获取两位作者的论文
  const allArticles = [];
  for (const author of AUTHORS) {
    console.log(`👤 ${author.name} (${author.id})`);
    const arts = await fetchArticles(author.id);
    console.log(`   找到 ${arts.length} 篇\n`);
    for (const a of arts) allArticles.push({ ...a, member: author.member });
  }

  // 去重（两位作者可能有共同论文，保留第一作者对应的 member）
  const seen = new Map();
  for (const a of allArticles) {
    const key = normalizeTitle(a.title);
    if (!seen.has(key)) {
      seen.set(key, a);
    } else {
      // 如果当前作者是第一作者，替换
      const authLow = (a.authors || "").toLowerCase();
      const isLiu = a.member === "huaqing-liu" && (authLow.startsWith("h liu") || authLow.startsWith("huaqing") || authLow.startsWith("刘华清"));
      const isYang = a.member === "jiahui-yang" && (authLow.startsWith("j yang") || authLow.startsWith("jiahui") || authLow.startsWith("杨佳慧"));
      if (isLiu || isYang) seen.set(key, a);
    }
  }
  const unique = Array.from(seen.values());
  console.log(`📊 去重后 ${unique.length} 篇\n`);

  // 与现有论文比对（标题模糊匹配 + DOI 精确匹配）
  const existingNTs = existing.map((p) => p.nt);
  const existingDOIs = new Set(existing.map((p) => p.doi).filter(Boolean));
  const newArticles = [];
  for (const a of unique) {
    const nt = normalizeTitle(a.title);
    if (existingNTs.some((et) => isSimilarTitle(nt, et))) continue;
    // DOI 去重会在查询后进行
    newArticles.push(a);
  }
  console.log(`🆕 发现 ${newArticles.length} 篇新论文\n`);

  if (newArticles.length === 0) {
    console.log("✅ 没有新论文需要添加，已是最新！\n");
    return;
  }

  // 为新论文查询 DOI 并生成文件
  let nextId = maxId + 1;
  let created = 0;
  for (const a of newArticles) {
    console.log(`  🔍 [${nextId}] ${a.title.substring(0, 60)}...`);
    const doi = await lookupDOI(a.title);
    if (doi) console.log(`     DOI: ${doi}`);
    // DOI 去重：如果查到的 DOI 已存在，跳过
    if (doi && existingDOIs.has(doi)) {
      console.log(`     ⏭️  DOI 已存在，跳过`);
      continue;
    }
    const pi = parsePub(a.publication);
    const slug = slugify(a.title);
    const filename = `${String(nextId).padStart(3, "0")}-${slug}.md`;
    const md = genMd(nextId, a, a.member, doi, pi);

    if (DRY_RUN) {
      console.log(`     📝 [DRY] ${filename}`);
    } else {
      fs.writeFileSync(path.join(PUB_DIR, filename), md, "utf-8");
      console.log(`     ✅ ${filename}`);
    }
    nextId++;
    created++;
    await new Promise((r) => setTimeout(r, 500)); // CrossRef 限流
  }

  console.log(`\n🎉 ${DRY_RUN ? "预览" : "创建"}了 ${created} 篇新论文\n`);
  if (!DRY_RUN) {
    console.log("📦 运行 build-content.js 更新数据...\n");
    const { execSync } = require("child_process");
    execSync("node scripts/build-content.js", { cwd: path.join(__dirname, ".."), stdio: "inherit" });
    console.log("\n✅ 同步完成！请检查新生成的论文文件，补充中文摘要和研究亮点。\n");
  }
}

main().catch((e) => { console.error("❌ 错误:", e.message); process.exit(1); });

