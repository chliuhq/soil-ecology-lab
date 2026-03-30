# 课题组网站项目 — 踩坑记录

> 每次犯错后更新，避免重复踩坑。

## 数据修改

### ❌ 不要直接改 src/data/*.json
- prebuild 脚本 (`scripts/build-content.js`) 每次构建都会从 `content/` 目录重新生成 JSON
- 直接改 JSON 会被覆盖，Vercel 部署后看不到变化
- **正确做法**：改 `content/` 目录下对应的 Markdown 源文件

### ❌ 不要编造新闻内容
- 新闻必须基于真实事件，不能标注"示例新闻"
- 人名、院系、时间、职称必须与 members.json / projects.json 一致
- 刘华清 → 林学院（不是农学院）
- 杨佳慧 → 农学院
- 涉及多人的事件（参会、获批项目）不能漏人

## 代码修改

### ❌ 不要用 PowerShell Set-Content 改含中文的源码文件
- PowerShell 的 `-replace` + `Set-Content` 会破坏 UTF-8 多字节字符
- 会导致 webpack 构建失败（"Failed to read source code"）
- **正确做法**：用 Claude Code 或 edit 工具修改

### ❌ 导航栏不要硬塞太多项
- 8个四字中文标签 + 2个按钮在一行放不下
- **正确做法**：用下拉菜单分组，控制顶级项在 4-6 个

## 部署

### Vercel 自动部署流程
1. 推送到 GitHub main 分支
2. Vercel 触发构建：`node scripts/build-content.js && next build`
3. prebuild 脚本从 content/ 生成 src/data/ 下的 JSON
4. Next.js 构建静态页面
5. 部署到 CDN

### 线上部署的是 soil-ecology-lab/ 子目录
- 不是仓库根目录
- 改代码要改子目录里的文件
