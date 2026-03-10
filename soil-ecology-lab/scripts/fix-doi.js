// 查找缺少 DOI 的论文并从 CrossRef 补全
const https = require("https");
const fs = require("fs");
const path = require("path");

const PUB_DIR = path.join(__dirname, "..", "content", "publications");

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

async function main() {
  console.log("\n🔍 查找缺少 DOI 的论文...\n");
  const files = fs.readdirSync(PUB_DIR).filter((f) => f.endsWith(".md"));
  const missing = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(PUB_DIR, file), "utf-8");
    const lines = content.split(/\r?\n/);
    let inFm = false, doi = "", title = "", doiLine = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "---") { if (!inFm) { inFm = true; continue; } else break; }
      if (inFm) {
        if (lines[i].match(/^doi:/)) { doi = lines[i].replace(/^doi:\s*/, "").replace(/"/g, "").trim(); doiLine = i; }
        if (lines[i].match(/^title:/)) { title = lines[i].replace(/^title:\s*/, "").replace(/"/g, "").trim(); }
      }
    }
    if (!doi) missing.push({ file, title, doiLine, lines, fullPath: path.join(PUB_DIR, file) });
  }

  console.log(`📂 共 ${files.length} 篇论文，${missing.length} 篇缺少 DOI\n`);
  if (!missing.length) { console.log("✅ 所有论文都有 DOI！\n"); return; }

  for (const m of missing) {
    console.log(`  📄 ${m.file}`);
    console.log(`     ${m.title.substring(0, 70)}`);
    const doi = await lookupDOI(m.title);
    if (doi) {
      console.log(`     ✅ 找到 DOI: ${doi}`);
      // 替换 doi 行
      if (m.doiLine >= 0) {
        m.lines[m.doiLine] = `doi: "${doi}"`;
      } else {
        // 在 title 行后插入 doi
        for (let i = 0; i < m.lines.length; i++) {
          if (m.lines[i].match(/^doi:/)) { m.lines[i] = `doi: "${doi}"`; break; }
        }
      }
      fs.writeFileSync(m.fullPath, m.lines.join("\n"), "utf-8");
    } else {
      console.log(`     ❌ 未找到 DOI`);
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log("\n✅ DOI 补全完成！\n");
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });

