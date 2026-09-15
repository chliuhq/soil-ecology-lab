---
name: soilecology
description: Soil Ecology Lab website (soil-ecology-lab) content management and development skill. Handles adding/editing news, projects, publications, research areas, and team members; bilingual (zh/en) content conventions; Next.js content-pipeline (Markdown → JSON) dev-server workflow; and post-change verification. Use whenever working inside the soil-ecology-lab/ project or adding/editing any website content.
---

# Soil Ecology Lab Website Skill

土壤生态与水土保持课题组网站（`soil-ecology-lab/`）的内容管理与开发技能。适用于：新增/修改新闻动态（news）、科研项目（projects）、论文成果（publications）、研究方向（research）、团队成员（members）等双语内容，以及网站调试、验证和发布。

## Project Overview

- **技术栈**：Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **项目目录**：`soil-ecology-lab/`（⚠️ 仓库根目录另有一个独立的旧 `src/` 项目，勿混淆；一切操作都在 `soil-ecology-lab/` 内）
- **内容来源**：`soil-ecology-lab/content/`（Markdown 文件）
- **构建产物**：`soil-ecology-lab/src/data/*.json`（由 `scripts/build-content.js` 生成，**勿手工编辑**）
- **核心要点**：页面读取的是 `src/data/*.json`，**不是直接读取 Markdown**。修改 `content/` 后**必须重新运行内容构建**才能生效。
- **在线站点**：`https://soil-ecology-lab.vercel.app`

## Directory Structure

```
soil-ecology-lab/
├── content/
│   ├── news/          # 新闻动态（编号前缀 001-…；图片用日期前缀 *.jpg 或子目录）
│   ├── projects/      # 科研项目（编号前缀 000-…）
│   ├── publications/  # 论文成果（编号前缀，编号不代表显示顺序）
│   ├── research/      # 研究方向（erosion / remote-sensing / soc / soil-water-carbon）
│   └── members/
│       ├── pi/        # 课题组负责人
│       ├── students/  # 在读学生
│       └── alumni/    # 已毕业成员
├── src/
│   ├── app/           # 路由：/ news projects publications research resources people joinus contact + /news/[id]
│   ├── data/          # 构建产物 .json（勿手工编辑）
│   └── lib/           # i18n、工具函数
└── scripts/
    └── build-content.js   # Markdown → JSON 构建脚本
```

## Content Pipeline（构建脚本行为）

`scripts/build-content.js` 生成以下产物：

| 输出 | 说明 |
|------|------|
| `news.json` | 按文件名读取；`id` = 文件名去 `.md`；正文按 `## 中文` / `## English` 分节 |
| `research.json` | 含 `methods_zh/en`、正文转 HTML（`marked`） |
| `projects.json` | 仅 frontmatter 字段 |
| `publications.json` | **按 `year` 升序、同年按 `id` 升序重排，`id` 重新从 1 编号**；摘要按 `## 中文摘要`+`### 研究亮点`、`## English Summary`+`### Highlights` 解析并转 HTML |
| `members.json` | `{ pi, students, alumni }`；PI 正文按 `---` 分隔中英文简介 |
| `knowledge-base.json` | 汇总研究方向/成员/论文/项目/招生信息（供 AI 检索） |

> ⚠️ **publications 显示编号由构建脚本重排**：新增论文时 `id` 只需取当前最大值 +1（或任意唯一值），最终展示顺序按 `year` 决定，不要手工调整编号顺序。

## Content Conventions（各类型模板）

### News 条目（`content/news/NNN-slug.md`）

```yaml
---
date: 'YYYY-MM-DD'          # ISO 日期，字符串加引号
title_zh: '中文标题'
title_en: 'English Title'
# link: '/xxx'              # 可选：仅当确有对应页面时才添加
---

## 中文

中文正文（Markdown，可含 emoji）

## English

English body (Markdown)
```

**真实示例**（`006-nsfc-youth-c.md`，项目获批类新闻，`link` 的合规用法）：

```yaml
---
date: '2026-08-26'
title_zh: '祝贺刘华清获批国家自然科学基金青年基金项目（C类）'
title_en: 'Congratulations to Dr. Huaqing Liu on receiving an NSFC Youth Fund award (Category C)'
link: '/projects'
---
```

要点：
- 项目/基金获批类新闻属于 `link` 的**正当使用场景**——新闻与 `/projects` 页面直接相关，可加 `link: '/projects'`。
- 祝贺类标题惯例：中文「祝贺 + 姓名 + 获批/获奖 + 事项」；英文 `Congratulations to Dr. <姓名拼音> on ...`。
- 正文需包含关键事实：经费金额、执行期、主持人、项目题目；中英文信息一一对应。
- 此类新闻通常与新增 projects 条目**联动**（见下方"项目获批联动工作流"）。

### Projects 条目（`content/projects/NNN-slug.md`）

```yaml
---
title_zh: "项目中文名"
title_en: "Project English Title"
funding_zh: "资助机构"
funding_en: "Funding Agency"
period: "YYYY.MM–YYYY.MM"
role: "pi"                  # pi / participant
member: "huaqing-liu"       # 对应 members 条目的 id
status: "ongoing"           # ongoing / completed
---
```

（projects 正文可为空。）

### Publications 条目（`content/publications/NNN-slug.md`）

```yaml
---
id: 26
authors: "First Author, Second Author, ..."
title: "Paper Title"
journal: "Journal Name"
year: 2026
volume: "266"
pages: "105647"
doi: "10.1016/j.xxx.2026.105647"
category:                 # 可多个：如 erosion / soc / remote-sensing / featured
  - "featured"
member: "jiahui-yang"     # 对应 members 条目的 id
images: []                # 可选：[{src, caption_zh, caption_en}]
---

## 中文摘要

中文摘要段落。

### 研究亮点
- 亮点一
- 亮点二

## English Summary

English abstract paragraph.

### Highlights
- Highlight one
- Highlight two
```

### Research 条目（`content/research/slug.md`）

```yaml
---
id: "erosion"
title_zh: "水土流失过程与机制"
title_en: "Soil Erosion Processes and Mechanisms"
description_zh: "一句话中文描述"
description_en: "One-sentence English description"
icon: "..."                # 图标名
image: "/images/..."       # 配图路径
methods_zh: "研究方法（中文）"
methods_en: "Research methods (English)"
---

正文 Markdown（将转为 HTML 展示）
```

### Members 条目

**PI**（`content/members/pi/slug.md`）：`id`、`name_zh/en`、`title_zh/en`、`department_zh/en`、`departmentUrl`、`universityUrl`、`admissionUrl`、`email`、`photo`、`researchgate`、`googlescholar`、`homepage`、`education`（数组，每项含 `period`、`institution_zh/en`、`url`、`degree_zh/en`）、`courses_zh/en`（数组）、`enrollment_zh/en`。正文用 `---` 分隔中文简介与英文简介。

**Students**（`content/members/students/slug.md`）：
```yaml
---
id: "manyu-luo"
name_zh: "罗曼玉"
name_en: "Manyu Luo"
major_zh: "资源利用与植物保护（专硕）"
major_en: "Resource Utilization and Plant Protection (Professional Master)"
enrollment: "2025.09"
undergraduate_zh: "福州大学"
undergraduate_en: "Fuzhou University"
advisor: "jiahui-yang"    # 对应 PI 的 id
---
```

**Alumni**（`content/members/alumni/slug.md`）：`id`、`name_zh/en`、`degree_zh/en`、`graduation`、`currentPosition_zh/en`。

## ⚠️ 关键规则

1. **不要随意添加 `link` 字段**（news）。`link` 是可选的；没有真实对应页面就不要写（或留空 `link: ''`）。详情页在 `link` 存在时会渲染"查看相关页面 →"按钮，随意添加会指向无关页面。添加前必须确认目标路由在 `src/app/` 下真实存在（有效路由：`/`、`/news`、`/news/[id]`、`/people`、`/projects`、`/publications`、`/research`、`/resources`、`/joinus`、`/contact`）。
2. **双语齐全**：所有内容条目必须同时提供中英文（`title_zh`/`title_en`、`## 中文`/`## English`、摘要双语等）。英文人名使用规范拼写（Manyu Luo、Huaqing Liu、Jiahui Yang）。
3. **编号规则**：新增条目前先 `dir /B` 列出目录已有编号，取下一个可用编号；使用小写连字符 slug。
4. **member/advisor 一致性**：`projects.member`、`publications.member`、`students.advisor` 必须与 `members/` 中已存在的 `id` 完全一致。

## Development Workflow

### 1. 启动开发服务器

```powershell
npm --prefix soil-ecology-lab run dev -- -p 3100
```

- 使用 **3100 端口**（3002 端口被根目录的旧 Next 项目占用，易混淆）。
- `predev` 钩子会在启动时自动运行内容构建（Markdown → JSON）。启动时确认终端输出中 content 构建成功、各产物条数正确。

### 2. 修改内容后重新生成

服务器运行期间新增/修改了 `content/` 下的 Markdown，需重新构建：

```powershell
npm --prefix soil-ecology-lab run content
```

（脚本名为 `content`；`prebuild`/`predev`/`build` 也会触发。）或直接重启开发服务器触发 `predev`。

### 3. 验证（必须逐项执行）

```powershell
# 列表页渲染（条目出现、日期、排序）
curl -s -L http://localhost:3100/news > %TEMP%\news.html
findstr /C:"new-slug" %TEMP%\news.html

# 详情页可访问（应为 200）
curl -s -o NUL -w "%%{http_code}" http://localhost:3100/news/new-slug

# 检查不应出现的元素（如误加的链接按钮）
curl -s http://localhost:3100/news/new-slug > %TEMP%\d.html
findstr /C:"查看相关页面" %TEMP%\d.html || echo NO_LINK_OK
```

验证清单：
- [ ] 内容构建成功（JSON 条目数量正确）
- [ ] 列表页显示新条目，日期/标题正确，news 按日期倒序
- [ ] 详情页 200 且内容渲染正确
- [ ] 未设置 `link` 时，详情页不出现"查看相关页面"按钮
- [ ] 中英文切换均正常

### 4. 发布

```powershell
npm --prefix soil-ecology-lab run build
# 或运行仓库根目录的 publish.bat / publish.ps1（部署到 Vercel）
```

## Common Pitfalls

1. **改了 Markdown 但页面没变** → `src/data/*.json` 是缓存产物，必须重新运行 `npm run content`。
2. **3002 端口内容不对** → 那是根目录旧项目，不是 `soil-ecology-lab`。始终用 3100 端口验证。
3. **论文顺序对不上** → publications 按 `year` 升序重排并重新编号，属正常行为，勿手工改编号。
4. **Windows 控制台乱码** → 中文输出用 `python -X utf8` 包装；`findstr` 匹配中文时注意编码。
5. **`findstr` 报"打开的文件太多"** → HTML 单行超长导致，先输出到文件再搜索，或用 Python 解析。
6. **随意添加 `link`** → 见关键规则 1。
7. **编号冲突** → 新增前先 `dir /B soil-ecology-lab\content\<dir>\*.md` 列出已有编号。

## 项目获批联动工作流（参考 006 示例）

基金/项目获批时，通常需要同步完成两件事：

1. **新增 news 条目**：祝贺类新闻（格式见上方真实示例），因与项目页直接相关，可合规添加 `link: '/projects'`。正文包含经费、执行期、主持人、项目题目。
2. **新增 projects 条目**：frontmatter 中 `member` 指向主持人（如 `huaqing-liu`）、`role: "pi"`、`status: "ongoing"`、`period` 与新闻中的执行期一致。
3. 两个条目均创建后，一次 `npm run content` 构建，并在 `/news`、`/projects` 两页分别验证。

## Steps: Adding a New Item

1. 列出对应 `content/<type>/` 现有文件，确定下一个可用编号。
2. 按上文模板创建 `NNN-slug.md`，frontmatter 字段齐全；双语正文完整。
3. 仅当确有相关页面时才加 `link`；`member`/`advisor` 引用已存在的 id。
4. 运行 `npm --prefix soil-ecology-lab run content`（或重启服务器）。
5. 用 `curl` 验证列表页 + 详情页 + 语言切换。
6. 提交时使用清晰的 commit message（如 `news: add NNN-slug`）。