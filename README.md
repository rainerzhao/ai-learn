# AI Fundamentals 知识网站

完整的 AI 基础设施知识体系 — 从硬件到应用的全栈技术指南。

## 技术栈

- **框架**: Astro 6 + React 19
- **样式**: Tailwind CSS 3 + 自定义 CSS 变量
- **内容**: Markdown + Astro Content Collections (glob loader)
- **数学公式**: KaTeX
- **代码高亮**: Shiki (github-dark)
- **图标字体**: Inter / Ma Shan Zheng / JetBrains Mono

## 快速开始

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器（端口 4321）
npm run dev

# 构建静态站点到 dist/
npm run build

# 本地预览构建产物
npm run preview
```

## 项目结构

```
ai-knowledge-website/
├── astro.config.mjs           # Astro 配置
├── tailwind.config.mjs        # Tailwind 主题
├── tsconfig.json
├── package.json
├── public/                    # 静态资源
│   └── favicon.svg
├── content-md/                # 所有 markdown 文章（12 个模块）
│   ├── 01_hardware_architecture/
│   ├── 02_gpu_programming/
│   ├── ...
│   └── 99_tools_and_misc/
├── _data/
│   └── modules.yml            # 模块元数据（图标、名称、描述）
├── src/
│   ├── components/            # React 组件
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── ArticleTree.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ReadingProgressBar.tsx
│   │   └── Footer.tsx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   ├── lib/
│   │   ├── modules.ts         # 解析 modules.yml
│   │   └── navigation.ts      # 文件系统导航树构建
│   ├── pages/
│   │   ├── index.astro        # 首页
│   │   ├── [module].astro     # 模块页
│   │   ├── [module]/[...slug].astro  # 文章页
│   │   └── tags/
│   ├── styles/
│   │   └── global.css         # 暗夜琥珀主题
│   └── content.config.ts      # Astro 内容集合配置
└── .github/workflows/
    └── deploy.yml             # GitHub Pages 自动部署
```

## 主题：暗夜琥珀 (Dark Amber)

| 用途 | 深色模式 | 浅色模式 |
|------|---------|---------|
| 主背景 | `#0f1117` | `#fefce8` |
| 次背景 | `#1a1c2e` | `#fef9c3` |
| 卡片 | `#1e2030` | `#ffffff` |
| 主文字 | `#e4e4e7` | `#1c1917` |
| 强调色 | `#f59e0b` | `#d97706` |
| 次强调 | `#ef4444` | `#dc2626` |

支持深色/浅色模式切换，默认深色，偏好持久化在 localStorage。

## 内容统计

| ID | 模块 | 图标 |
|----|------|------|
| 01 | 硬件架构 | ⚡ |
| 02 | GPU 编程 | 🔧 |
| 03 | AI 集群运维 | 🖧 |
| 04 | 云原生 AI 平台 | ☁️ |
| 05 | 模型训练与微调 | 🎯 |
| 06 | LLM 理论与基础 | 🧠 |
| 07 | RAG 与工具 | 🔍 |
| 08 | 智能体系统 | 🤖 |
| 09 | 推理系统 | ⚙️ |
| 10 | AI 相关课程 | 🎓 |
| 98 | LLM 编程 | 💻 |
| 99 | 实用工具与杂项 | 🛠️ |

共 237+ 篇技术文章。

## 部署

推送到 `main` 分支会自动通过 GitHub Actions 构建并部署到 GitHub Pages。

## 注意事项

- 内容版权归原作者所有，本项目仅用于知识学习与分享
- 数学公式使用 `$...$` 内联，`$$...$$` 块级
- Mermaid 图表暂未启用（按需添加）
