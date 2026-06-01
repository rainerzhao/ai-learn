# 09 推理系统

<div class="module-info" style="margin: 2rem 0; padding: 1.5rem; background: var(--md-code-bg-color); border-radius: 12px;">
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚙️</div>
    <div style="font-size: 1rem; color: var(--md-default-fg-color--light); margin-bottom: 0.5rem;">高性能 LLM 推理工程：vLLM 源码深度解析、KV Cache 压缩优化与 DeepSeek 推理实践</div>
    <div style="display: inline-block; background: var(--md-primary-fg-color); color: white; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">共 63 篇文章</div>
</div>

## 文章列表

推荐学习路径：

1. 先读 KV Cache 原理、显存估算和 capacity planning，理解推理系统的核心瓶颈。
2. 再读 vLLM、PagedAttention、prefix caching、KV offloading 和 compression，掌握吞吐、延迟、显存之间的取舍。
3. 最后读成本分析、参考架构和真实部署案例，把单机优化扩展到集群服务设计。
