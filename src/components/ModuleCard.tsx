interface Props {
  icon: string;
  num: string;
  title: string;
  description: string;
  href: string;
  articleCount: number;
  tags: string[];
  accentColor: string;
}

const MODULE_ACCENTS = [
  '#f59e0b', '#f97316', '#d97706', '#b45309',
  '#ea580c', '#fbbf24', '#ca8a04', '#c2410c',
  '#f59e0b', '#b45309', '#92400e', '#a16207',
];

export { MODULE_ACCENTS };

export default function ModuleCard({ icon, num, title, description, href, articleCount, tags, accentColor }: Props) {
  return (
    <a
      href={href}
      className="group block rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border)',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = accentColor)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div
        className="h-[4px] rounded-full mb-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
        style={{ background: accentColor }}
      />
      <div className="text-3xl mb-2 leading-none">{icon}</div>
      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
        MODULE {num}
      </div>
      <div className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{title}</div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-xs font-semibold"
              style={{
                background: darkModeTagBg(accentColor),
                color: accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {articleCount} 篇
        </span>
      </div>
    </a>
  );
}

function darkModeTagBg(accent: string): string {
  const map: Record<string, string> = {
    '#f59e0b': 'rgba(245,158,11,0.12)',
    '#ef4444': 'rgba(239,68,68,0.12)',
    '#d97706': 'rgba(217,119,6,0.12)',
    '#b45309': 'rgba(180,83,9,0.12)',
    '#f97316': 'rgba(249,115,22,0.12)',
    '#eab308': 'rgba(234,179,8,0.12)',
    '#ca8a04': 'rgba(202,138,4,0.12)',
    '#dc2626': 'rgba(220,38,38,0.12)',
    '#ea580c': 'rgba(234,88,12,0.12)',
    '#c2410c': 'rgba(194,65,12,0.12)',
    '#a16207': 'rgba(161,98,7,0.12)',
    '#9a3412': 'rgba(154,52,18,0.12)',
  };
  return map[accent] ?? 'rgba(245,158,11,0.12)';
}
