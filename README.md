<div align="center">

# ⚡ AI Fundamentals

**AI 基础设施知识体系 — 从硬件到应用的全栈技术指南**

[![Deploy](https://github.com/rainerzhao/ai-learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/rainerzhao/ai-learn/actions/workflows/deploy.yml)
[![Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://rainerzhao.github.io/ai-learn)

[🌐 在线访问](https://rainerzhao.github.io/ai-learn) · [📖 知识模块](#-知识模块) · [🚀 快速开始](#-快速开始) · [🎨 主题预览](#-主题预览)

</div>

---

## ✨ 项目亮点

- **12 大知识模块** — 覆盖从 GPU 硬件架构到智能体系统的 AI Infra 全栈
- **250+ 篇技术文章** — 原创深度内容，含代码示例、架构图、性能分析
- **学习路线导航** — 每个模块提供结构化学习路径与核心知识点推荐
- **全文搜索** — Pagefind 驱动的中文全文检索，毫秒级响应
- **暗夜琥珀主题** — 精心调校的深色主题，长时间阅读不疲劳
- **SPA 级体验** — Astro View Transitions 无刷新页面切换

## 📚 知识模块

| # | 模块 | 核心内容 |
|---|------|---------|
| ⚡ 01 | [硬件架构](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/) | GPU/TPU 架构、NVLink、GPUDirect |
| 🔧 02 | [GPU 编程](https://rainerzhao.github.io/ai-learn/02_gpu_programming/) | CUDA、Triton、Kernel 优化 |
| 🖧 03 | [AI 集群运维](https://rainerzhao.github.io/ai-learn/03_ai_cluster_operations/) | InfiniBand、NCCL、GPU 运维 |
| ☁️ 04 | [云原生 AI 平台](https://rainerzhao.github.io/ai-learn/04_cloud_native_ai_platform/) | K8s GPU 调度、HAMi、KubeRay |
| 🎯 05 | [模型训练与微调](https://rainerzhao.github.io/ai-learn/05_model_training_and_fine_tuning/) | 3D 并行、LoRA/QLoRA、DeepSpeed |
| 🧠 06 | [LLM 理论与基础](https://rainerzhao.github.io/ai-learn/06_llm_theory_and_foundation/) | 量化、MoE、Embedding |
| 🔍 07 | [RAG 与工具](https://rainerzhao.github.io/ai-learn/07_rag_and_tools/) | GraphRAG、向量数据库、文档解析 |
| 🤖 08 | [智能体系统](https://rainerzhao.github.io/ai-learn/08_agentic_system/) | Agent 模式、MCP、多智能体协作 |
| ⚙️ 09 | [推理系统](https://rainerzhao.github.io/ai-learn/09_inference_system/) | vLLM、KV Cache、Speculative Decoding |
| 🎓 10 | [AI 相关课程](https://rainerzhao.github.io/ai-learn/10_ai_related_course/) | AI Infra 入门、编程实战 |
| 💻 11 | [LLM 编程](https://rainerzhao.github.io/ai-learn/98_llm_programming/) | LangGraph、Spring AI |
| 🛠️ 12 | [实用工具与杂项](https://rainerzhao.github.io/ai-learn/99_tools_and_misc/) | Ollama、本地部署、基准测试 |

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/rainerzhao/ai-learn.git
cd ai-learn

# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建静态站点（含 Pagefind 搜索索引）
npm run build

# 预览构建产物
npm run preview
```

## 🎨 主题预览

**暗夜琥珀 (Dark Amber)** — 默认深色主题，琥珀色强调

| 元素 | 深色 | 浅色 |
|------|------|------|
| 背景 | `#0f1117` | `#fefce8` |
| 卡片 | `#1e2030` | `#ffffff` |
| 文字 | `#e4e4e7` | `#1c1917` |
| 强调 | `#f59e0b` | `#d97706` |

支持深色/浅色一键切换，偏好自动记忆。

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Astro 6 (SSG) + React 19 |
| 样式 | Tailwind CSS 3 + CSS 变量主题系统 |
| 内容 | Markdown + Astro Content Collections |
| 数学 | KaTeX (remark-math + rehype-katex) |
| 代码 | Shiki (one-dark-pro) |
| 搜索 | Pagefind (中文分词) |
| 导航 | Astro View Transitions (ClientRouter) |
| 部署 | GitHub Actions → GitHub Pages |
| 大文件 | Git LFS |

## 📁 项目结构

```
ai-learn/
├── content-md/          # 250+ 篇 Markdown 文章（12 模块）
├── _data/modules.yml    # 模块元数据与学习路线
├── src/
│   ├── components/      # React 组件（Header、SearchModal、ModuleCard...）
│   ├── layouts/         # 页面布局（BaseLayout、ArticleLayout）
│   ├── pages/           # 路由页面（首页、模块页、文章页、标签页、404）
│   ├── lib/             # 工具库（模块解析、导航树、路径工具）
│   └── styles/          # 全局样式与主题变量
├── .github/workflows/   # CI/CD 自动部署
└── astro.config.mjs     # Astro 核心配置
```

## 📜 许可

内容版权归原作者所有，本项目仅用于知识学习与分享。
