export default function Footer() {
  return (
    <footer className="border-t mt-auto py-8" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ color: 'var(--text-muted)' }}>
        <p className="text-sm">
          AI Fundamentals — 完整的 AI 基础设施知识体系
        </p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <a
            href="https://github.com/rainerzhao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            GitHub
          </a>
          <span style={{ color: 'var(--border)' }}>|</span>
          <a
            href="/tags/"
            className="text-xs hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            标签索引
          </a>
        </div>
        <p className="text-xs mt-2">
          持续追踪 AI 基础设施领域最新技术进展
        </p>
      </div>
    </footer>
  );
}
