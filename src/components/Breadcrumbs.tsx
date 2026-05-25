import { withBase } from '../lib/paths';

interface Props {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="面包屑导航" className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <a href={withBase('/')} className="hover:underline" style={{ color: 'var(--accent)' }}>首页</a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            {item.href ? (
              <a href={withBase(item.href)} className="hover:underline" style={{ color: 'var(--accent)' }}>
                {item.label}
              </a>
            ) : (
              <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
