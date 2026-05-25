interface Props {
  moduleCount: number;
  articleCount: number;
}

export default function HeroSection({ moduleCount, articleCount }: Props) {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        background: 'linear-gradient(145deg, var(--bg-primary) 0%, var(--bg-secondary) 40%, #2d1f0e 100%)',
        padding: '4rem 1.5rem 3rem',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(239,68,68,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
          style={{
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.4)',
            color: 'var(--accent)',
          }}
        >
          🚀 AI 基础设施知识库
        </div>
        <h1
          className="mb-2"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            background: 'linear-gradient(100deg, #fbbf24 30%, var(--accent) 60%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          AI Fundamentals
        </h1>
        <p className="font-display text-xl mb-2" style={{ color: 'var(--accent-hover)' }}>
          完整的人工智能基础设施知识体系
        </p>
        <p className="max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          覆盖从 GPU 硬件架构、CUDA 并行编程，到大模型训练、推理优化、RAG、
          Agent 系统的全链路技术栈
        </p>

        <div className="flex justify-center gap-8 sm:gap-14 flex-wrap mb-8">
          <div className="text-center">
            <div className="text-3xl font-extrabold" style={{ color: 'var(--accent)' }}>{moduleCount}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>内容模块</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold" style={{ color: 'var(--accent)' }}>{articleCount}+</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>技术文章</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold" style={{ color: 'var(--accent)' }}>持续</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>追踪更新</div>
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="#modules"
            className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(217,119,6,0.4)' }}
          >
            开始探索 →
          </a>
          <a
            href="https://github.com/rainerzhao/ai-learn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{
              color: 'var(--accent)',
              border: '1.5px solid rgba(245,158,11,0.4)',
              background: 'transparent',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
