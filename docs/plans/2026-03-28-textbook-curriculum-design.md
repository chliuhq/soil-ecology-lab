# 《数据采集与预处理》16 周课程大纲设计方案

日期：2026-03-28
课程定位：生态学大二本科生，32 课时（16 周 × 2 课时/周）
教材格式：Quarto Book，GitHub Pages 部署
核心理念：数据驱动的可重复性研究
编程语言：R 为主（数据处理、分析、可视化），Python 为辅（数据采集：爬虫、API 调用）

## 现状分析

### 已有内容（可直接使用或修改）
- 第一部分 绪论：可重复性危机、数据采集概念、数据预处理概念（内容较完整）
- 第二部分 数据采集方法：观测、实验、模型、公共数据、文献引用（内容较完整）
- 第三部分 数据预处理方法：仅有标题占位（pandas 数据清洗、特征工程）
- 第四部分 数据采集实战：仅有标题占位

### 缺失内容
- 编程基础（R/Python 入门）— 大二本科生需要
- 版本控制（Git/GitHub）— 课程考核依赖
- 数据可视化
- 统计分析基础
- 生态学案例实战
- 期末项目指导

## 16 周课程大纲

### 第一单元：绪论与环境搭建（第 1-2 周，4 课时）

**第 1 周：课程导论与可重复性研究**
- 课程介绍、考核方式、分组
- 什么是可重复性研究？为什么重要？
- 可重复性危机案例（生态学领域）
- 对应章节：0101-what-is-data-collection.qmd（已有）

**第 2 周：研究环境搭建**
- R/RStudio 安装与基本操作
- Python/Anaconda 安装
- Git/GitHub 入门：注册、创建仓库、基本命令
- Quarto 简介
- 新增章节：0104-environment-setup.qmd

### 第二单元：编程基础（第 3-5 周，6 课时）

**第 3 周：R 语言基础**
- 数据类型、向量、数据框
- 读取 CSV/Excel 文件（readr, readxl）
- 基本统计函数（mean, sd, summary）
- tidyverse 简介
- 实践：读取一个生态学数据集
- 新增章节：0105-r-basics.qmd

**第 4 周：R 数据处理进阶**
- dplyr：filter, select, mutate, summarise, group_by
- tidyr：pivot_longer, pivot_wider
- 管道操作符 |>
- 实践：清洗和整理一个真实的物种调查数据集
- 新增章节：0106-r-data-wrangling.qmd

**第 5 周：版本控制与协作**
- Git 工作流：add, commit, push, pull
- GitHub 协作：fork, branch, pull request
- 项目文件组织规范
- 实践：分组创建项目仓库
- 新增章节：0107-git-collaboration.qmd

### 第三单元：数据采集方法（第 6-8 周，6 课时）

**第 6 周：观测与实验数据采集**
- 野外调查数据采集规范
- 实验设计基础（对照、重复、随机化）
- 数据记录表设计
- 对应章节：0201-0203（已有，需补充实践案例）

**第 7 周：公共数据与网络数据采集**
- 生态学公共数据库介绍（GBIF, WorldClim, NEON, ChinaFlux）
- Python 数据采集：requests + BeautifulSoup 基础
- API 数据获取（Python requests 示例）
- 遥感数据简介（GEE）
- 对应章节：0204-0205（已有，需补充代码示例）
- 新增章节：0208-python-data-collection.qmd

**第 8 周：文献数据采集与荟萃分析入门**
- 文献检索策略（Web of Science, CNKI）
- 从论文中提取数据
- 荟萃分析（Meta-analysis）概念
- 对应章节：0206（已有，需扩充）
- 新增章节：0207-meta-analysis-intro.qmd

### 第四单元：数据预处理（第 9-11 周，6 课时）

**第 9 周：数据清洗**
- 缺失值处理（删除、插值、多重插补）
- 异常值检测与处理
- 数据类型转换
- R: tidyverse（dplyr, tidyr） / Python: pandas（仅对比参考）
- 重写章节：0301-data-cleaning.qmd

**第 10 周：数据转换与特征工程**
- 数据标准化与归一化
- 变量变换（对数、Box-Cox）
- 分类变量编码
- 数据合并与重塑（join, pivot）
- 重写章节：0302-feature-engineering.qmd

**第 11 周：数据质量控制**
- 数据验证与一致性检查
- 元数据（metadata）编写规范
- 数据存储格式选择（CSV vs Parquet vs RDS）
- 数据文档化（README, codebook）
- 新增章节：0303-data-quality.qmd

### 第五单元：数据可视化与探索性分析（第 12-13 周，4 课时）

**第 12 周：数据可视化基础**
- ggplot2（R）：散点图、箱线图、直方图、热力图
- 科研论文级图表制作（主题、字体、配色）
- 实践：用 ggplot2 复现一篇论文的图表
- 新增章节：0501-visualization-basics.qmd

**第 13 周：探索性数据分析（EDA）**
- 描述性统计
- 相关性分析
- 分布检验
- 生态学数据 EDA 案例（物种多样性数据）
- 新增章节：0502-eda.qmd

### 第六单元：实战与项目（第 14-16 周，6 课时）

**第 14 周：综合实战案例**
- 完整案例：从数据采集到可视化报告
- 案例选择（以下任选一个深入讲解）：
  - 植物多样性与土壤性质关系分析
  - 气候数据下载与区域趋势分析
  - 文献数据提取与荟萃分析
- 新增章节：0601-case-study.qmd

**第 15 周：项目工作坊**
- 各组项目进展汇报
- 代码审查与问题解决
- 可重复性检查清单
- 新增章节：0602-project-workshop.qmd

**第 16 周：项目展示与课程总结**
- 各组项目展示（10 分钟/组）
- 互评与反馈
- 课程总结：从数据到知识的完整链路
- 新增章节：0603-summary.qmd

## 章节文件规划

### 需要新增的 .qmd 文件（11 个）
1. 0104-environment-setup.qmd — 环境搭建（R/RStudio/Git）
2. 0105-r-basics.qmd — R 语言基础
3. 0106-r-data-wrangling.qmd — R 数据处理进阶（tidyverse）
4. 0107-git-collaboration.qmd — Git 与协作
5. 0207-meta-analysis-intro.qmd — 荟萃分析入门
6. 0303-data-quality.qmd — 数据质量控制
7. 0501-visualization-basics.qmd — 数据可视化
8. 0502-eda.qmd — 探索性数据分析
9. 0601-case-study.qmd — 综合实战案例
10. 0602-project-workshop.qmd — 项目工作坊
11. 0603-summary.qmd — 课程总结

### 需要重写/大幅扩充的文件（4 个）
1. 0301-data-cleaning-pandas.qmd → 0301-data-cleaning.qmd
2. 0302-feature-engineering.qmd（扩充）
3. 0401-data-cleaning-pandas.qmd → 删除（与 0301 重复）
4. 0402-feature-engineering.qmd → 删除（与 0302 重复）

### 需要补充代码示例的文件（3 个）
1. 0202-observation.qmd — 加 R/Python 数据记录示例
2. 0204-modeling.qmd — 加简单模型代码
3. 0205-public-data.qmd — 加 API 获取数据代码

## _quarto.yml 更新后的结构

```yaml
chapters:
  - index.qmd
  - part: "第一单元：绪论与环境搭建"
    chapters:
      - 0101-what-is-data-collection.qmd
      - 0102-what-is-data-preprocessing.qmd
      - 0104-environment-setup.qmd
  - part: "第二单元：编程基础"
    chapters:
      - 0105-r-basics.qmd
      - 0106-r-data-wrangling.qmd
      - 0107-git-collaboration.qmd
  - part: "第三单元：数据采集方法"
    chapters:
      - 0201-data-collection-method.qmd
      - 0202-observation.qmd
      - 0203-experimentation.qmd
      - 0204-modeling.qmd
      - 0205-public-data.qmd
      - 0206-references.qmd
      - 0207-meta-analysis-intro.qmd
  - part: "第四单元：数据预处理"
    chapters:
      - 0301-data-cleaning.qmd
      - 0302-feature-engineering.qmd
      - 0303-data-quality.qmd
  - part: "第五单元：数据可视化与探索性分析"
    chapters:
      - 0501-visualization-basics.qmd
      - 0502-eda.qmd
  - part: "第六单元：实战与项目"
    chapters:
      - 0601-case-study.qmd
      - 0602-project-workshop.qmd
      - 0603-summary.qmd
  - 010-references.qmd
```

## 执行优先级

1. **P0 — 结构调整**：更新 _quarto.yml，删除重复文件，重命名
2. **P1 — 编程基础**（第 3-5 周内容）：大二学生最需要的基础
3. **P2 — 数据预处理**（第 9-11 周）：当前最空的部分
4. **P3 — 可视化与 EDA**（第 12-13 周）
5. **P4 — 实战案例**（第 14 周）
6. **P5 — 补充已有章节的代码示例**
