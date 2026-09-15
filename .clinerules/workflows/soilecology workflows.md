# Soil Ecology Lab 内容管理工作流

> 适用于 `soil-ecology-lab/` 网站的内容新增、修改、验证与发布。核心约定见 `.clinerules/soilecology rules.md`，技能详情见 `.agents/skills/soilecology/SKILL.md`。

---

## 工作流 0：通用前置（每次任务必做）

1. 确认工作目录为仓库根目录 `e:\Claude\Github_SoilEcoloy`。
2. 所有 npm 命令使用 `npm --prefix soil-ecology-lab ...`，**不进入**根目录的旧 `src/` 项目。
3. 开发服务器固定使用 **3100 端口**：
   ```powershell
   npm --prefix soil-ecology-lab run dev -- -p 3100
   ```
4. 修改 `content/` 后必须重新构建内容：
   ```powershell
   npm --prefix soil-ecology-lab run content
   ```

---

## 工作流 1：新增新闻动态（news）

1. **确定编号**：`dir /B soil-ecology-lab\content\news\*.md`，取下一个可用编号（如现有最大 009 → 新建 `010-*.md`）。
2. **创建文件** `soil-ecology-lab/content/news/NNN-slug.md`：
   ```yaml
   ---
   date: 'YYYY-MM-DD'
   title_zh: '中文标题'
   title_en: 'English Title'
   ---

   ## 中文

   中文正文

   ## English

   English body
   ```
   - ⚠️ **不要添加 `link` 字段**，除非用户明确要求且确认目标页面真实存在。
   - **合规 `link` 场景**（参考 `006-nsfc-youth-c.md`）：项目/基金获批类新闻与 `/projects` 页面直接相关，可添加 `link: '/projects'`。此类祝贺类新闻标题惯例——中文「祝贺 + 姓名 + 获批/获奖 + 事项」，英文 `Congratulations to Dr. <姓名拼音> on ...`；正文须含经费金额、执行期、主持人、项目题目。
   - 英文人名规范拼写：Manyu Luo、Huaqing Liu、Jiahui Yang。
3. **重新构建**：`npm --prefix soil-ecology-lab run content`，确认 `news.json` 条数 +1。
4. **验证**：
   ```powershell
   curl -s -L http://localhost:3100/news > %TEMP%\news.html
   findstr /C:"NNN-slug" %TEMP%\news.html
   curl -s -o NUL -w "%%{http_code}" http://localhost:3100/news/NNN-slug
   ```
   - 列表页出现新条目、日期正确、位于顶部（按日期倒序）。
   - 详情页返回 200，中英文内容渲染正确。
   - 无 `link` 时，详情页**不应**出现"查看相关页面"按钮；反之，有 `link`（如 `006` 的 `link: '/projects'`）时，详情页**应**出现该按钮且跳转目标正确。

---

## 工作流 2：新增科研项目（projects）

> **联动提示**（参考 `006-nsfc-youth-c.md`）：当新增项目是因基金/项目获批时，应**同步**创建对应的 news 祝贺条目（见工作流 1）与本 projects 条目，一次 `npm run content` 构建，并在 `/news`、`/projects` 两页分别验证。

1. `dir /B soil-ecology-lab\content\projects\*.md` 确定编号。
2. 创建 `NNN-slug.md`，frontmatter 包含：`title_zh/en`、`funding_zh/en`、`period`、`role`、`member`、`status`。
3. `member` 必须与 `content/members/` 中已有 `id` 一致（现有：`huaqing-liu`、`jiahui-yang`、`manyu-luo`）。
4. 重新构建 + 在 `/projects` 页验证。

---

## 工作流 3：新增论文成果（publications）

1. `dir /B soil-ecology-lab\content\publications\*.md` 确定编号（`id` 取当前最大值 +1）。
2. 创建文件，frontmatter 包含：`id`、`authors`、`title`、`journal`、`year`、`volume`、`pages`、`doi`、`category`、`member`、`images`。
3. 正文结构（四个小节，标题文字需包含关键词以便解析）：
   - `## 中文摘要` + `### 研究亮点`（`- ` 列表）
   - `## English Summary` + `### Highlights`（`- ` 列表）
4. ⚠️ 构建脚本按 `year` 升序重排并重新编号，展示顺序由年份决定，勿手工调整。
5. 重新构建 + 在 `/publications` 页验证（条目、年份分组、摘要展开）。

---

## 工作流 4：新增/修改研究方向（research）与团队成员（members）

- **research**：修改 `content/research/*.md` 的 frontmatter（`title_zh/en`、`description_zh/en`、`icon`、`image`、`methods_zh/en`）与正文。
- **PI / students / alumni**：按 SKILL.md 中的字段模板编辑；学生 `advisor` 引用 PI 的 `id`；PI 正文用 `---` 分隔中英文简介。
- 重新构建后在 `/research`、`/people` 页验证。

---

## 工作流 5：验证与发布

### 验证清单（每次内容变更后）

- [ ] `npm --prefix soil-ecology-lab run content` 成功，各 JSON 条数正确
- [ ] 列表页渲染新条目（`curl` + `findstr` 确认）
- [ ] 详情页 HTTP 200
- [ ] 未设 `link` 的 news 详情页无"查看相关页面"按钮
- [ ] 中英文切换正常
- [ ] 需要浏览器级验证时使用 `browser_action` 打开 `http://localhost:3100/...` 截图确认

### 发布

```powershell
npm --prefix soil-ecology-lab run build
```

构建成功后可运行仓库根目录 `publish.bat` / `publish.ps1` 部署到 Vercel（站点：https://soil-ecology-lab.vercel.app）。

---

## 故障排查速查

| 症状 | 原因 | 处理 |
|------|------|------|
| 改了 Markdown 页面没变 | `src/data/*.json` 未重新生成 | `npm --prefix soil-ecology-lab run content` |
| 3002 端口内容不对 | 命中根目录旧项目 | 改用 3100 端口 |
| 论文顺序/编号与文件名不符 | 构建脚本按年份重排重编号 | 正常行为，勿手工改 |
| `findstr` 匹配失败或乱码 | 编码/超长行 | 先写文件再搜索，或 `python -X utf8` 解析 |
| `member`/`advisor` 显示异常 | id 与 members 不一致 | 核对 `content/members/` 中的 `id` |