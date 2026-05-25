import { useState, useEffect, useRef } from 'react';
import SearchModal from './SearchModal';
import { withBase } from '../lib/paths';

interface Module {
  id: string;
  dirName: string;
  name: string;
  icon: string;
}

const MODULES: Module[] = [
  { id: '01', dirName: '01_hardware_architecture', name: '硬件架构', icon: '⚡' },
  { id: '02', dirName: '02_gpu_programming', name: 'GPU 编程', icon: '🔧' },
  { id: '03', dirName: '03_ai_cluster_operations', name: 'AI 集群运维', icon: '🖧' },
  { id: '04', dirName: '04_cloud_native_ai_platform', name: '云原生 AI 平台', icon: '☁️' },
  { id: '05', dirName: '05_model_training_and_fine_tuning', name: '模型训练与微调', icon: '🎯' },
  { id: '06', dirName: '06_llm_theory_and_foundation', name: 'LLM 理论与基础', icon: '🧠' },
  { id: '07', dirName: '07_rag_and_tools', name: 'RAG 与工具', icon: '🔍' },
  { id: '08', dirName: '08_agentic_system', name: '智能体系统', icon: '🤖' },
  { id: '09', dirName: '09_inference_system', name: '推理系统', icon: '⚙️' },
  { id: '10', dirName: '10_ai_related_course', name: 'AI 相关课程', icon: '🎓' },
  { id: '11', dirName: '98_llm_programming', name: 'LLM 编程', icon: '💻' },
  { id: '12', dirName: '99_tools_and_misc', name: '实用工具与杂项', icon: '🛠️' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const modules = MODULES;

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        background: dark ? 'rgba(15,17,23,0.85)' : 'rgba(254,252,232,0.85)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href={withBase('/')} className="flex items-center gap-2 text-lg font-bold" style={{ color: 'var(--accent)' }}>
            <span className="text-2xl">⚡</span>
            <span>AI Fundamentals</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <SearchModal />

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                知识模块
                <svg className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] p-4 rounded-xl shadow-2xl border grid grid-cols-3 gap-2"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {modules.map(mod => (
                    <a
                      key={mod.id}
                      href={withBase(`/${mod.dirName}/`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--bg-card-hover)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span className="text-lg">{mod.icon}</span>
                      <span className="font-medium truncate">{mod.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href={withBase('/tags/')} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              标签
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="切换主题"
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a
              href="https://github.com/rainerzhao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </nav>

          {/* Mobile: search + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <SearchModal />
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--text-primary)' }}
              aria-label="菜单"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="grid grid-cols-2 gap-2 pt-4">
              {modules.map(mod => (
                <a
                  key={mod.id}
                  href={withBase(`/${mod.dirName}/`)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{ color: 'var(--text-primary)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{mod.icon}</span>
                  <span className="font-medium">{mod.name}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <a href={withBase('/tags/')} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                标签
              </a>
              <button onClick={toggleTheme} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {dark ? '☀ 浅色' : '🌙 深色'}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
