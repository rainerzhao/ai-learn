interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const filtered = headings.filter(h => h.depth >= 2 && h.depth <= 3);
  if (filtered.length === 0) return null;

  return (
    <nav
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="目录"
    >
      <h2
        className="text-xs font-bold uppercase tracking-wider mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        目录
      </h2>
      <ul className="space-y-1.5 text-sm border-l-2" style={{ borderColor: 'var(--border)' }}>
        {filtered.map(heading => (
          <li key={heading.slug} style={{ paddingLeft: heading.depth === 3 ? '1rem' : '0' }}>
            <a
              href={`#${heading.slug}`}
              className="block py-0.5 pl-3 transition-colors hover:text-[var(--accent)]"
              style={{
                color: 'var(--text-secondary)',
                borderLeft: '2px solid transparent',
                marginLeft: '-2px',
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
