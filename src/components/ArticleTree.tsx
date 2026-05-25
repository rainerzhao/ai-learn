import type { NavSection, NavArticle } from '../lib/navigation';

interface Props {
  items: (NavSection | NavArticle)[];
  depth?: number;
}

export default function ArticleTree({ items, depth = 0 }: Props) {
  return (
    <ul className={depth === 0 ? 'space-y-1' : 'ml-4 mt-1 space-y-0.5'}>
      {items.map((child, i) => {
        if ('children' in child && child.children.length > 0) {
          return (
            <li key={i}>
              <details open={depth < 1} className="group">
                <summary
                  className="cursor-pointer font-medium text-sm py-1 px-2 rounded transition-colors hover:bg-[var(--bg-card-hover)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  📁 {child.title}
                </summary>
                <ArticleTree items={child.children} depth={depth + 1} />
              </details>
            </li>
          );
        }
        return (
          <li key={i}>
            <a
              href={(child as NavArticle).href}
              className="block text-sm py-1 px-2 rounded transition-colors hover:bg-[var(--bg-card-hover)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              📄 {child.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
