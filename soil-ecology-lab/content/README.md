# 📝 网站内容编辑指南

本指南面向**没有编程经验**的用户，帮助你通过编辑 Markdown 文件来更新网站内容。

---

## 什么是 Markdown？

Markdown 是一种简单的文本格式，用 `---` 包裹的部分是"属性区"（填写固定信息），下方是正文内容。

---

## 📁 文件目录说明

所有内容文件都在 `content/` 文件夹下：

```
content/
├── news/          ← 新闻动态
├── publications/  ← 发表论文
├── projects/      ← 科研项目
├── research/      ← 研究方向
└── members/       ← 团队成员
    ├── pi/        ← 导师/PI
    ├── students/  ← 在读学生
    └── alumni/    ← 已毕业学生
```

---

## ✏️ 如何编辑内容

### 1. 添加新闻

在 `content/news/` 下新建一个 `.md` 文件，例如 `002-new-paper.md`：

```yaml
---
date: "2025-09"
title_zh: "课题组发表新论文"
title_en: "New paper published"
---
```

### 2. 添加论文

在 `content/publications/` 下新建文件，例如 `026-new-paper.md`：

```yaml
---
id: 26
authors: "作者1, 作者2*, 作者3"
title: "论文英文标题"
journal: "期刊名称"
year: 2025
volume: "1"
pages: "1-10"
doi: "10.xxxx/xxxxx"
pdf: "/papers/pub-26-short-name.pdf"
category:
  - "soil-water-carbon"
member: "huaqing-liu"
images:
  - src: "/images/papers/pub-26-ga.jpg"
    caption_zh: "图文摘要：中文说明"
    caption_en: "Graphical Abstract: English caption"
---

## 中文摘要

在这里写中文摘要...

### 研究亮点
- 亮点1
- 亮点2

## English Summary

Write English summary here...

### Highlights
- Highlight 1
- Highlight 2
```

**category 可选值：** `soil-water-carbon`、`soc`、`erosion`、`remote-sensing`、`featured`（精选论文加上 featured）

**member 可选值：** `huaqing-liu`、`jiahui-yang`

**pdf 字段：** 如果有 PDF 文件，填写路径（见下方"图片与PDF"章节）；没有则删掉这一行或留空

### 3. 添加科研项目

在 `content/projects/` 下新建文件：

```yaml
---
title_zh: "项目中文名称"
title_en: "Project English Title"
funding_zh: "资助来源中文"
funding_en: "Funding Source English"
period: "2025.01–2028.12"
role: "pi"
member: "huaqing-liu"
status: "ongoing"
---
```

**role 可选值：** `pi`（主持）、`co`（参与）
**status 可选值：** `ongoing`（在研）、`completed`（结题）

### 4. 添加新学生

在 `content/members/students/` 下新建文件：

```yaml
---
id: "student-name"
name_zh: "学生姓名"
name_en: "Student Name"
major_zh: "专业名称（中文）"
major_en: "Major Name (English)"
enrollment: "2025.09"
undergraduate_zh: "本科院校"
undergraduate_en: "Undergraduate University"
advisor: "huaqing-liu"
---
```

### 5. 添加毕业生

在 `content/members/alumni/` 下新建文件：

```yaml
---
id: "alumni-name"
name_zh: "姓名"
name_en: "Name"
degree_zh: "学位"
degree_en: "Degree"
graduation: "2028.06"
currentPosition_zh: "当前去向"
currentPosition_en: "Current Position"
---
```

---

## 🚀 如何发布更新

### 方式一：一键发布（推荐）

编辑完 Markdown 文件后，双击项目根目录下的 `publish.bat`，脚本会自动完成：
1. 从 Markdown 生成网站数据
2. 构建网站
3. 提交并推送到 GitHub

等待几分钟后网站就会自动更新。

### 方式二：手动运行命令

在 `soil-ecology-lab` 目录下运行：

```bash
# 第一次使用需要安装依赖（只需运行一次）
npm install

# 生成网站数据（每次编辑后运行）
npm run content

# 构建网站（准备发布时运行）
npm run build
```

构建完成后还需要用 Git 提交推送：

```bash
cd ..
git add .
git commit -m "更新网站内容"
git push
```

---

## 🖼️ 图片与 PDF 文件说明

所有图片和 PDF 文件都放在 `public/` 文件夹下，目录结构如下：

```
public/
├── images/
│   ├── team/           ← 团队成员照片
│   ├── papers/         ← 论文图文摘要（Graphical Abstract）
│   └── research/       ← 研究方向配图
└── papers/             ← 论文 PDF 文件
```

### 团队成员照片

| 项目 | 说明 |
|------|------|
| 存放位置 | `public/images/team/` |
| 命名规则 | `姓名拼音.jpg`，首字母大写，如 `HuaqingLiu.jpg` |
| 格式要求 | JPG 或 PNG，建议正方形，尺寸 400×400 像素以上 |
| 在 Markdown 中引用 | `photo: "/images/team/HuaqingLiu.jpg"` |

### 论文图文摘要（Graphical Abstract）

| 项目 | 说明 |
|------|------|
| 存放位置 | `public/images/papers/` |
| 命名规则 | `pub-{论文编号}-ga.jpg`，如 `pub-1-ga.jpg`、`pub-26-ga.jpg` |
| 格式要求 | JPG 或 PNG，建议宽度 800 像素以上 |
| 在 Markdown 中引用 | 在论文 `.md` 文件的 `images` 属性中填写： |

```yaml
images:
  - src: "/images/papers/pub-26-ga.jpg"
    caption_zh: "图文摘要：中文说明"
    caption_en: "Graphical Abstract: English description"
```

如果一篇论文有多张图片，可以添加多个条目：

```yaml
images:
  - src: "/images/papers/pub-26-ga.jpg"
    caption_zh: "图文摘要"
    caption_en: "Graphical Abstract"
  - src: "/images/papers/pub-26-fig1.jpg"
    caption_zh: "图1：实验设计"
    caption_en: "Figure 1: Experimental design"
```

如果没有图片，写 `images: []`

### 研究方向配图

| 项目 | 说明 |
|------|------|
| 存放位置 | `public/images/research/` |
| 命名规则 | 与研究方向 id 一致，如 `soil-water-carbon.jpg`、`erosion.jpg` |
| 在 Markdown 中引用 | `image: "/images/research/soil-water-carbon.jpg"` |

### 论文 PDF 文件

| 项目 | 说明 |
|------|------|
| 存放位置 | `public/papers/` |
| 命名规则 | `pub-{论文编号}-{简短英文名}.pdf`，如 `pub-1-grass-diversity.pdf` |
| 在 Markdown 中引用 | 在论文 `.md` 文件的属性区添加 `pdf` 字段： |

```yaml
pdf: "/papers/pub-1-grass-diversity.pdf"
```

如果没有 PDF，不写 `pdf` 这一行即可，网站上就不会显示 PDF 下载按钮。

---

## ⚠️ 注意事项

1. **文件名**：建议用数字编号开头，如 `001-xxx.md`、`002-xxx.md`
2. **`---` 分隔符**：属性区必须用三个短横线 `---` 包裹，不要漏掉
3. **引号**：属性值中如果包含冒号 `:` 或特殊字符，需要用引号包裹
4. **编码**：文件必须保存为 UTF-8 编码（Windows 记事本默认即可）
5. **图片格式**：推荐使用 `.jpg` 或 `.png` 格式
6. **PDF 大小**：建议单个 PDF 不超过 10MB，过大会影响网站加载速度
7. **路径注意**：图片和 PDF 路径以 `/` 开头，不要写成 `public/...`

