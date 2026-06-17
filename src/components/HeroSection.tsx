import { withBase } from '../lib/paths';

interface Props {
  moduleCount: number;
  articleCount: number;
  sketchCount: number;
}

const targets = [
  {
    label: '30 天',
    title: '补齐 AI Infra 底层语言',
    desc: 'GPU、HBM、NVLink、PCIe、封装、机柜这些词能和成本、容量、故障联系起来。',
  },
  {
    label: '90 天',
    title: '能设计一条 AI 系统链路',
    desc: '从训练/推理任务出发，画出资源池、调度、网络、存储、SLO 和观测闭环。',
  },
  {
    label: '180 天',
    title: '沉淀 AI 架构判断力',
    desc: '能拆模型平台、推理服务、RAG/Agent、成本结构和技术更新节奏。',
  },
];

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

export default function HeroSection({ moduleCount, articleCount, sketchCount }: Props) {
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
            AI 架构转型驾驶舱
            <span style={{ color: 'var(--text-muted)' }}>目标模式</span>
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
            给 IaaS 架构师的 AI 架构目标模式。
          </h1>
          <p className="max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            把资源池、网络、存储、SRE 和成本经验，翻译成 GPU 集群、先进封装、NVL 机柜、
            模型平台、推理服务、RAG 与 Agent 的架构任务流。目标不是看完资料，而是能做架构判断。
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <a
              href="#target-mode"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: '0 10px 28px rgba(20,184,166,0.22)' }}
            >
              查看目标模式
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
              <strong>{sketchCount}</strong>
              <span>手绘卡片</span>
            </div>
          </div>
        </div>

        <div
          id="target-mode"
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
                Target mode
              </div>
              <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                先定义转型结果，再选择路线
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

          <div className="target-steps" aria-label="30/90/180 天目标模式">
            {targets.map(target => (
              <div className="target-step" key={target.label}>
                <span>{target.label}</span>
                <strong>{target.title}</strong>
                <small>{target.desc}</small>
              </div>
            ))}
          </div>

          <div className="route-panel-label">按当前角色切入</div>
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
