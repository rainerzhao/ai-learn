# AI Fundamentals

本仓库是一个全面的人工智能基础设施（AI Infrastructure）学习资源集合，涵盖从硬件基础到高级应用的完整技术栈。内容包括 GPU 架构与编程、CUDA 开发、大语言模型、AI 系统设计、性能优化、企业级部署等核心领域，旨在为 AI 工程师、研究人员和技术爱好者提供系统性的学习路径和实践指导。

> - **适用人群**：AI 工程师、系统架构师、GPU 编程开发者、大模型应用开发者、技术研究人员。
> - **技术栈**：CUDA、GPU 架构、LLM、AI 系统、分布式计算、容器化部署、性能优化。

---

## 知识模块导航

| 模块 | 描述 | 核心内容 |
|------|------|----------|
| [**硬件架构与互连技术**](01_hardware_architecture/index.md) | GPU/NPU 芯片架构、高速互连协议 | NVLink、PCIe、GPUDirect、Blackwell 架构 |
| [**GPU 编程与性能优化**](02_gpu_programming/index.md) | CUDA 编程模型、算子开发 | CUDA 核心、TileLang、带宽调优、性能分析 |
| [**AI 集群运维与通信**](03_ai_cluster_operations/index.md) | 集群监控、高速网络、分布式通信 | nvidia-smi、InfiniBand、NCCL 测试 |
| [**云原生 AI 基础设施**](04_cloud_native_ai_platform/index.md) | Kubernetes、虚拟化、分布式存储 | LWS 调度、HAMi 虚拟化、LMCache、JuiceFS |
| [**模型训练与微调**](05_model_training_and_fine_tuning/index.md) | SFT、大规模训练、评估体系 | Qwen2 微调、70B 模型训练实战、AIOps |
| [**大模型理论与基础**](06_llm_theory_and_foundation/index.md) | Tokenizer、Embedding、MoE、量化 | MLA 架构、Deep Research、工作流编排 |
| [**RAG 与文档智能**](07_rag_and_tools/index.md) | 检索增强、图推理、文档解析 | GraphRAG、MinerU、Neo4j、向量数据库 |
| [**智能体系统开发**](08_agentic_system/index.md) | Agent 架构、多智能体、MCP 协议 | LangGraph、记忆系统、上下文工程、基础设施 |
| [**推理系统架构与优化**](09_inference_system/index.md) | vLLM、KV Cache、推理服务架构 | Prefix Caching、LMCache、Speculative Decoding |
| [**AI 课程与学习路径**](10_ai_related_course/index.md) | 系统课程、实战项目、培训资源 | ZOMI 酱 AI System、Trae 编程、多智能体培训 |

---

## 快速开始

1. **新手入门**：建议从 [AI 相关课程](10_ai_related_course/index.md) 开始，建立基础认知
2. **硬件方向**：深入 [硬件架构](01_hardware_architecture/index.md) → [GPU 编程](02_gpu_programming/index.md) → [集群运维](03_ai_cluster_operations/index.md)
3. **大模型方向**：推荐 [大模型理论](06_llm_theory_and_foundation/index.md) → [模型训练](05_model_training_and_fine_tuning/index.md) → [推理系统](09_inference_system/index.md)
4. **应用开发方向**：选择 [RAG 与工具](07_rag_and_tools/index.md) → [智能体系统](08_agentic_system/index.md)

---

*本知识库基于 forceinjection.github.io 更新维护，持续追踪 AI 基础设施领域最新技术进展。*
