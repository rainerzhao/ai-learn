import { withBase } from '../lib/paths';

interface Props {
  moduleCount: number;
  articleCount: number;
}

const tracks = [
  {
    name: '平台/运维 -> AI Infra 架构',
    desc: '资源池、GPU、网络、存储、容量与成本',
    href: withBase('/sketches/#story-rename'),
    first: '先重命名旧能力',
    intent: '我负责平台和运维',
    tone: '#38bdf8',
  },
  {
    name: '云原生/SRE -> AI 平台架构',
    desc: '模型生命周期、推理服务、SLO、治理闭环',
    href: withBase('/sketches/#story-model'),
    first: '先把模型变成平台对象',
    intent: '我负责稳定性和平台',
    tone: '#14b8a6',
  },
  {
    name: '应用架构 -> RAG/Agent 架构',
    desc: '上下文、工具协议、Agent 工作流与边界',
    href: withBase('/sketches/#story-application'),
    first: '先接进真实工作流',
    intent: '我负责应用落地',
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
            给 IaaS 架构师的 AI 架构转型地图。
          </h1>
          <p className="max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            把资源池、网络、存储、SRE 和成本经验，翻译成 GPU 集群、模型平台、推理服务、
            RAG 与 Agent 的架构任务流。不是资料堆场，而是一张能指导转型的路线产品。
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <a
              href="#learning-routes"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: '0 10px 28px rgba(20,184,166,0.22)' }}
            >
              选择转型路线
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
                Architect routes
              </div>
              <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                你从哪个架构角色切入？
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
                  <span className="route-card__intent">{track.intent}</span>
                  <strong>{track.name}</strong>
                  <small>{track.desc}</small>
                  <em>{track.first}</em>
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
