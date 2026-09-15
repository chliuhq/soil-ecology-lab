# Soil Ecology Lab 网站规则（强制）

> 适用于仓库 `e:\Claude\Github_SoilEcoloy` 下的 `soil-ecology-lab/` 网站项目。完整操作见 `.clinerules/workflows/soilecology workflows.md`，技能详情见 `.agents/skills/soilecology/SKILL.md`。

## 项目识别

1. 所有网站操作**必须**在 `soil-ecology-lab/` 子目录内进行。仓库根目录另有一套旧 `src/` Next 项目，禁止混淆或修改。
2. npm 命令统一使用 `npm --prefix soil-ecology-lab <script>`。
3. 开发服务器使用 **3100 端口**：`npm --prefix soil-ecology-lab run dev -- -p 3100`（3002 被旧项目占用）。
4. 在线站点：`https://soil-ecology-lab.vercel.app`。

## 内容管道（必须遵守）

1. 内容源是 `soil-ecology-lab/content/` 下的 Markdown；页面读取的是 `src/data/*.json` 构建产物。
2. **禁止手工编辑** `soil-ecology-lab/src/data/` 下的任何 JSON。
3. 每次修改 `content/` 后，必须运行 `npm --prefix soil-ecology-lab run content` 重新生成，否则变更不会生效。
4. 变更前后都必须验证：内容构建条数、列表页渲染、详情页 200、中英文切换。

## 双语规则

1. 所有条目必须同时提供中文与英文（标题、正文、摘要）。
2. 正文分节标题固定为 `## 中文` 与 `## English`（news）；`## 中文摘要`/`## English Summary`（publications）。构建脚本按这些标题解析，不得改写。
3. 人名使用规范英文拼写：罗曼玉=Manyu Luo、刘华清=Huaqing Liu、杨佳慧=Jiahui Yang。
4. 日期格式：`YYYY-MM-DD`（news 的 `date` 字段，加引号）。

## link 字段规则（重点）

1. news 条目的 `link` 是**可选**字段；默认不添加。
2. 仅当用户明确要求、且目标路由在 `src/app/` 下真实存在时才添加 `link`。
3. 有效路由：`/`、`/news`、`/news/[id]`、`/people`、`/projects`、`/publications`、`/research`、`/resources`、`/joinus`、`/contact`。
4. `link` 存在时详情页会渲染"查看相关页面 →"按钮；误加会指向无关页面。验证时须确认无 `link` 的条目不出现该按钮。
5. **合规使用场景**（参考 `006-nsfc-youth-c.md`）：项目/基金获批类新闻与项目页直接相关，可添加 `link: '/projects'`。

## 项目获批新闻规范（参考 006）

1. 标题惯例：中文「祝贺 + 姓名 + 获批/获奖 + 事项」；英文 `Congratulations to Dr. <姓名拼音> on ...`。
2. 正文必须包含关键事实：经费金额、执行期、主持人、项目题目；中英文信息一一对应。
3. 基金/项目获批时，应**同步**创建 news 祝贺条目与对应的 projects 条目（`member` 指向主持人、`status: ongoing`、`period` 与执行期一致），一次 `npm run content` 构建，并在 `/news`、`/projects` 两页验证。

## 编号与命名

1. 新增条目前先列出目录现有文件（`dir /B soil-ecology-lab\content\<dir>\*.md`），取下一个可用编号。
2. 文件名格式：`NNN-slug.md`（三位数字前缀 + 小写连字符 slug）。
3. publications 的展示顺序与编号由构建脚本按 `year` 升序重排重编号，属正常行为，禁止手工调整。

## 引用一致性

1. `projects.member`、`publications.member`、`students.advisor` 必须与 `content/members/` 中已有的 `id` 完全一致。
2. 现有成员 id：`huaqing-liu`、`jiahui-yang`、`manyu-luo`（以实际目录为准）。

## 图片压缩规则（强制）

1. 相机/手机原图（JPG，常 >1MB）**禁止**直接在 Markdown 中引用；必须先压缩为 WebP 再引用。
2. 压缩参数：最长边 1280 px（LANCZOS）、quality 80、method 6、EXIF 方向校正（`ImageOps.exif_transpose`）、转 RGB。
3. 统一命令（仓库根目录执行）：`python -X utf8 soil-ecology-lab/scripts/compress_images.py <图片目录>`；脚本在同目录生成同名 `.webp`，不删除原图。
4. Markdown 一律引用 `.webp` 路径（与 007 新闻一致）；原图（`.JPG`/`.jpg`）保留在同目录仅作存档，不被页面引用。
5. 压缩后单张 webp 应 ≤200 KB（典型 30–150 KB）；超出时检查参数是否被改动。
6. 修改图片引用后必须运行 `npm --prefix soil-ecology-lab run content` 重新构建，并验证详情页图片正常加载。

## 验证与发布

1. 列表页验证：`curl -s -L http://localhost:3100/<page>` 输出到文件后用 `findstr` 检查（超长 HTML 勿直接管道匹配）。
2. 详情页验证：`curl -s -o NUL -w "%%{http_code}" http://localhost:3100/<page>/<id>` 应返回 200。
3. 发布：`npm --prefix soil-ecology-lab run build`，再运行根目录 `publish.bat` / `publish.ps1` 部署 Vercel。

## Windows 环境注意

1. 中文输出用 `python -X utf8` 包装脚本，避免 GBK 乱码。
2. `findstr` 遇到超长单行会报"打开的文件太多"，先 `> 文件` 再搜索。
3. 路径使用 `path.join`/`Join-Path` 拼接，遵循 `Path Safety.md`；`soil-ecology-lab` 路径为纯 ASCII，无中文风险。