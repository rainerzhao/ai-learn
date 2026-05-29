import { useState, useEffect, useRef } from 'react';
import { withBase } from '../lib/paths';

interface SearchResult {
  id: string;
  url: string;
  meta: {
    title?: string;
  };
  excerpt: string;
}

type SearchStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error';

interface PagefindModule {
  init?: () => Promise<void> | void;
  options?: (options: Record<string, unknown>) => Promise<void> | void;
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<SearchResult>;
    }>;
  }>;
}

declare global {
  interface Window {
    __pagefindLoading?: Promise<PagefindModule>;
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  }
}

const pagefindScriptSrc = withBase('/pagefind/pagefind.js');

async function loadPagefind(): Promise<PagefindModule> {
  if (window.__pagefindLoading) return window.__pagefindLoading;

  window.__pagefindLoading = import(/* @vite-ignore */ pagefindScriptSrc).then(async module => {
    const pagefind = module as PagefindModule;
    if (pagefind.init) await pagefind.init();
    if (pagefind.options) await pagefind.options({ language: 'zh' });
    return pagefind;
  });

  return window.__pagefindLoading;
}

function warmPagefind() {
  void loadPagefind().catch(() => {});
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleOpenSearch(e: Event) {
      const detail = (e as CustomEvent<{ query?: string }>).detail;
      setOpen(true);
      if (detail?.query) setQuery(detail.query);
    }

    window.addEventListener('open-site-search', handleOpenSearch);
    return () => window.removeEventListener('open-site-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.requestIdleCallback) {
      const handle = window.requestIdleCallback(warmPagefind, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(warmPagefind, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('site-search-open', open);
    return () => document.body.classList.remove('site-search-open');
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      warmPagefind();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setStatus('idle');
      setResults([]);
      return;
    }

    let cancelled = false;
    setStatus('loading');

    const timer = window.setTimeout(async () => {
      try {
        const pagefind = await loadPagefind();
        const search = await pagefind.search(trimmed);
        const data = await Promise.all((search?.results ?? []).slice(0, 8).map(result => result.data()));

        if (cancelled) return;
        setResults(data);
        setStatus(data.length > 0 ? 'ready' : 'empty');
      } catch {
        if (!cancelled) {
          setResults([]);
          setStatus('error');
        }
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [open, query]);

  function closeSearch() {
    setOpen(false);
    setQuery('');
    setResults([]);
    setStatus('idle');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={warmPagefind}
        onFocus={warmPagefind}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{
          color: 'var(--text-secondary)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
        }}
        aria-label="搜索"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">搜索</span>
        <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[13vh] px-4"
          style={{ background: 'var(--modal-overlay)', backdropFilter: 'blur(4px)' }}
        >
          <div
            ref={containerRef}
            className="w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--text-muted)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                id="pagefind-search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="搜索文章..."
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: 'var(--text-primary)' }}
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>ESC</kbd>
            </div>
            <div id="pagefind-search-results" className="max-h-[60vh] overflow-y-auto p-2">
              {status === 'idle' && (
                <div className="px-4 py-5">
                  <div className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                    输入关键词搜索文章，或者先从这些入口开始：
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['gpu', 'cuda', '推理', 'rag', 'agent', 'kv cache'].map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-[var(--bg-card-hover)]"
                        style={{
                          color: 'var(--accent)',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {status === 'loading' && (
                <div className="px-4 py-6" style={{ color: 'var(--text-muted)' }}>
                  <div className="search-skeleton" />
                  <div className="search-skeleton search-skeleton--short" />
                </div>
              )}

              {status === 'empty' && (
                <div className="px-4 py-6" style={{ color: 'var(--text-muted)' }}>
                  <div className="font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>没有找到相关内容</div>
                  <div className="text-sm mb-3">可以换成更短的技术词，或者从热门主题重新开始。</div>
                  <div className="flex flex-wrap gap-2">
                    {['gpu', '推理', 'agent', 'rag'].map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ color: 'var(--accent)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="text-center py-8" style={{ color: 'var(--secondary)' }}>
                  搜索索引暂时不可用
                </div>
              )}

              {status === 'ready' && (
                <div className="space-y-1">
                  {results.map(result => (
                    <a
                      key={result.id}
                      href={withBase(result.url)}
                      onClick={closeSearch}
                      className="block rounded-lg px-3 py-2 transition-colors hover:bg-[var(--bg-card-hover)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <div className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                        {result.meta.title || result.url}
                      </div>
                      <div
                        className="mt-1 text-xs leading-5"
                        style={{ color: 'var(--text-secondary)' }}
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
