interface Props {
  moduleCount: number;
  articleCount: number;
}

const tracks = [
  {
    name: '从硬件入门',
    desc: 'GPU 架构 -> CUDA -> NCCL',
    href: '#modules',
    tone: '#38bdf8',
  },
  {
    name: '做推理工程',
    desc: 'KV Cache -> vLLM -> 成本分析',
    href: '#modules',
    tone: '#14b8a6',
  },
  {
    name: '搭应用系统',
    desc: 'Embedding -> RAG -> Agent',
    href: '#modules',
    tone: '#a78bfa',
  },
];

export default function HeroSection({ moduleCount, articleCount }: Props) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--hero-bg)',
        padding: '4.75rem 1.5rem 3.5rem',
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'var(--border)' }} />
      <div className="relative z-10 max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: 'var(--chip-bg)',
              border: '1px solid var(--border)',
              color: 'var(--accent)',
            }}
          >
            AI 基础设施知识库
            <span style={{ color: 'var(--text-muted)' }}>持续整理中</span>
          </div>
          <h1
            className="mb-4"
            style={{
              fontSize: 'clamp(2.35rem, 5.2vw, 4.35rem)',
              fontWeight: 850,
              color: 'var(--text-primary)',
              letterSpacing: 0,
              lineHeight: 1.02,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            把 AI 工程的硬骨头，拆成能走下去的路线。
          </h1>
          <p className="max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            从 GPU、CUDA、集群运维，到训练、推理、RAG 和 Agent，这里不是资料堆场，
            而是一张可以反复回来查、继续往前学的工程地图。
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <a
              href="#learning-routes"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: '0 10px 28px rgba(20,184,166,0.22)' }}
            >
              选一条路线
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-site-search', { detail: { query: 'gpu' } }))}
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              搜 gpu 看看
            </button>
          </div>

          <div className="grid grid-cols-3 max-w-xl gap-3">
            <div className="hero-stat">
              <strong>{moduleCount}</strong>
              <span>模块</span>
            </div>
            <div className="hero-stat">
              <strong>{articleCount}+</strong>
              <span>文章</span>
            </div>
            <div className="hero-stat">
              <strong>3</strong>
              <span>学习路线</span>
            </div>
          </div>
        </div>

        <div
          id="learning-routes"
          className="rounded-xl p-4 sm:p-5"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--soft-shadow)',
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>
                Start here
              </div>
              <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                今天想解决哪类问题？
              </h2>
            </div>
            <a
              href="https://github.com/rainerzhao/ai-learn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold"
              style={{ color: 'var(--text-muted)' }}
            >
              GitHub
            </a>
          </div>

          <div className="space-y-3">
            {tracks.map((track, index) => (
              <a
                key={track.name}
                href={track.href}
                className="route-card group"
                style={{ ['--route-tone' as string]: track.tone }}
              >
                <span className="route-card__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="route-card__copy">
                  <strong>{track.name}</strong>
                  <small>{track.desc}</small>
                </span>
                <span className="route-card__arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
