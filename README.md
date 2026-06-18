<div align="center">

# AI Fundamentals

**面向 IaaS 架构师转型 AI 架构师的 AI Infra 知识驾驶舱**

[![Deploy](https://github.com/rainerzhao/ai-learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/rainerzhao/ai-learn/actions/workflows/deploy.yml)
[![Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://rainerzhao.github.io/ai-learn)

[在线访问](https://rainerzhao.github.io/ai-learn) · [知识模块](#-知识模块) · [转型路线](#-转型路线) · [快速开始](#-快速开始)

</div>

---

## ✨ 项目亮点

- **AI 架构师转型驾驶舱** — 围绕 IaaS 运维架构师到 AI 架构师的 30 / 90 / 180 天路线组织内容
- **12 大知识模块** — 覆盖硬件、GPU 编程、集群运维、云原生 AI 平台、模型、RAG、Agent、推理系统
- **270+ 个页面** — 原创深度内容，含代码示例、架构图、性能分析、专题拆解
- **底层硬件深度专题** — 新增先进封装、SerDes、ABF/玻璃基板、NVIDIA NVL 机柜成本层级拆解
- **持续更新机制** — 用每周知识雷达、月度专题和来源分级机制跟踪模型、硬件、推理框架和 Agent 工程变化
- **全文搜索** — Pagefind 驱动的中文全文检索，首屏不预加载搜索索引，打开搜索时再懒加载
- **猫咪陪读与手绘卡片** — 保留轻量陪读角色和手绘知识卡片，用故事线串起 AI 架构知识
- **轻量运行时** — 全站核心交互使用 Astro 静态组件和原生脚本，首屏不再加载 React runtime

## 🧭 转型路线

首页已从普通知识库入口升级为 AI 架构师转型驾驶舱，重点回答三个问题：

| 阶段 | 目标 | 关键能力 |
|------|------|----------|
| 30 天 | 补齐 AI Infra 底层语言 | GPU/CPU/HBM/NVLink/NVSwitch、网络、电力、散热、封装基础 |
| 90 天 | 能设计 AI 系统链路 | GPU 集群、推理服务、RAG/Agent 链路、KV Cache、云原生调度 |
| 180 天 | 能做 AI 平台架构闭环 | 成本、稳定性、容量规划、治理、监控、知识更新机制 |

学习成果不只按文章数量衡量，而是看能否完成这些架构判断：

- 拆解 GPU、CPU、HBM、NVLink、NVSwitch、网络、电力、散热之间的约束关系。
- 读懂 2.5D/3D 封装、CoWoS、ABF、玻璃基板、SerDes、D2D PHY 对 AI 计算系统的影响。
- 用“架构师看 BOM”的方式拆 NVIDIA NVL 机柜成本层级，并明确外部估算与官方资料的边界。
- 把 IaaS 运维经验迁移到 AI 平台架构、推理系统、RAG/Agent 工程和成本治理。

## 📚 知识模块

| # | 模块 | 核心内容 |
|---|------|---------|
| ⚡ 01 | [硬件架构](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/) | GPU/TPU 架构、NVLink、GPUDirect、先进封装、NVL 机柜 |
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
| 🛠️ 12 | [实用工具与杂项](https://rainerzhao.github.io/ai-learn/99_tools_and_misc/) | Ollama、本地部署、基准测试、知识更新工作流 |

## 🔬 底层硬件专题

`01_hardware_architecture/advanced_packaging/` 现在作为底层硬件深度专题入口，不再是孤立文章：

- [先进封装与 AI Infra 硬件主线](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/advanced_packaging/)
- [从 2.5D/3D 封装、ABF 到玻璃基板](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/advanced_packaging/01_2_5d_3d_abf_glass_substrate/)
- [SerDes 与封装链路预算](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/advanced_packaging/02_serdes_package_interconnect/)
- [NVIDIA NVL 机柜成本层级拆解](https://rainerzhao.github.io/ai-learn/01_hardware_architecture/advanced_packaging/03_nvidia_nvl_rack_cost_stack/)

NVL 机柜成本拆解文章中的金额、托盘数量、内存成本占比等数字只作为公开媒体和分析师估算线索，必须保留来源、日期、可信度标签和“非官方 BOM”说明。

## 🔁 知识更新机制

新增 [AI 知识定期更新工作流](https://rainerzhao.github.io/ai-learn/99_tools_and_misc/ai_knowledge_update_workflow/)，用于把最新 AI 知识稳定更新到站点：

- 每周更新：模型、推理框架、NVIDIA/AMD/云厂商硬件新闻。
- 每月专题：封装、机柜、网络、存储、推理成本、Agent 工程。
- 每篇新增内容必须包含来源链接、更新时间、可信度标签、对 IaaS 架构师的影响、应该更新到的模块。
- 可信度标签包括官方、论文/标准、工程实测、媒体、分析师估算。

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

# 检查运行时资源合同（无 React runtime、无外部字体/CDN、搜索懒加载）
npm run verify:runtime

# 预览构建产物
npm run preview
```

## ✅ 上线前检查

前端和内容变更上线前必须完成：

```bash
npm run build
npm run verify:runtime
npm run preview
```

然后在本地浏览器检查：

- 首页、模块页、文章页能正常打开。
- 新增入口和关键链接可点击。
- 桌面端无控制台错误。
- 移动端无页面级横向溢出；长表格可以使用内部横向滚动。

如果本地浏览器验证失败或浏览器工具断连，不把工作标记为最终完成。

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
| 框架 | Astro 6 (SSG) |
| 样式 | Tailwind CSS 3 + CSS 变量主题系统 |
| 内容 | Markdown + Astro Content Collections |
| 数学 | KaTeX (remark-math + rehype-katex) |
| 代码 | Shiki (one-dark-pro) |
| 搜索 | Pagefind (中文分词) |
| 交互 | Astro 静态组件 + 原生浏览器脚本 |
| 部署 | GitHub Actions → GitHub Pages |
| 大文件 | Git LFS |

## 📁 项目结构

```
ai-learn/
├── content-md/          # Markdown 文章与专题内容（12 模块）
│   ├── 01_hardware_architecture/
│   │   └── advanced_packaging/  # 先进封装、SerDes、NVL 机柜成本专题
│   └── 99_tools_and_misc/
│       └── ai_knowledge_update_workflow.md
├── _data/modules.yml    # 模块元数据与学习路线
├── src/
│   ├── components/      # Astro 静态组件（Header、SearchModal、ModuleCard...）
│   ├── layouts/         # 页面布局（BaseLayout、ArticleLayout）
│   ├── pages/           # 路由页面（首页、模块页、文章页、标签页、404）
│   ├── lib/             # 工具库（模块解析、导航树、路径工具）
│   └── styles/          # 全局样式与主题变量
├── .github/workflows/   # CI/CD 自动部署
└── astro.config.mjs     # Astro 核心配置
```

## 📜 许可

内容版权归原作者所有，本项目仅用于知识学习与分享。
