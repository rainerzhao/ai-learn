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
  '#f59e0b', '#14b8a6', '#38bdf8', '#a78bfa',
  '#f97316', '#22c55e', '#e879f9', '#60a5fa',
  '#fb7185', '#84cc16', '#facc15', '#2dd4bf',
];

export { MODULE_ACCENTS };

export default function ModuleCard({ icon, num, title, description, href, articleCount, tags, accentColor }: Props) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col rounded-lg p-5 transition-all duration-200 hover:-translate-y-0.5"
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
      <div
        className="grid place-items-center w-10 h-10 rounded-lg mb-3 text-2xl leading-none"
        style={{ background: accentBg(accentColor) }}
      >
        {icon}
      </div>
      <div className="text-xs font-bold tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
        MODULE {num}
      </div>
      <div className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{title}</div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="flex items-center justify-between mt-auto pt-3">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-xs font-semibold"
              style={{
                background: accentBg(accentColor),
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

function accentBg(accent: string): string {
  return `${accent}1f`;
}
