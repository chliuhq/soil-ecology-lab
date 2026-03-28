# 课题组网站 - 资源平台页面设计方案

日期：2026-03-28

## 目标

新增 /resources 页面，展示课题组为学生提供的资源和工具，增强招生吸引力。

## 页面结构

### 1. GXUAI 智慧平台（AI 科研工具）
- 简介：课题组自主开发的 AI 服务平台，面向高校师生
- 核心功能：GPT-5 / Claude / DeepSeek 等 15+ 模型，国内直连
- 使用场景：论文写作、文献翻译、代码调试、数据分析
- 链接：https://gxuai.cn/
- 注册说明：需 .edu.cn 教育邮箱

### 2. 课程教材（数字教材）
- 《数据采集与预处理》2027 春季学期
- 课程特色：数据驱动的可重复性研究、R/Python 实践
- 链接：https://data-collection-and-preprocessing.github.io/Data-collection-and-preprocessing-2027-Spring/
- GitHub 组织：https://github.com/Data-collection-and-preprocessing

### 3. 学术工具推荐
- 文献管理：Zotero
- 数据分析：R / Python
- 写作工具：LaTeX / Overleaf
- 遥感平台：Google Earth Engine
- 版本控制：Git / GitHub
（每个工具一行：图标 + 名称 + 一句话说明 + 链接）

### 4. 课题组内部资料
- 保留现有 WPS 链接形式
- 标注"课题组成员专用"

## 技术实现

- 新增 src/app/resources/page.tsx
- 新增 src/data/resources.json（数据驱动，方便后续更新）
- 导航栏 Navbar.tsx 加入"资源平台"入口
- i18n 中英文支持（zh.json / en.json）
- 响应式设计，与现有页面风格一致

## 任务拆分

1. 创建 resources.json 数据文件
2. 创建 /resources 页面组件
3. 更新 Navbar 导航栏
4. 更新 i18n 翻译文件
5. 构建测试 + Git 提交推送
