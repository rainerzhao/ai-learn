import { useEffect, useMemo, useState } from 'react';

type CompanionMode = 'reading' | 'quiet' | 'help';

const TIPS = [
  {
    text: '第一次来？从 GPU 基础和 CUDA 开始会顺很多。',
    query: 'gpu cuda',
    action: '找入门路线',
  },
  {
    text: '想做工程落地，可以从推理、K8s GPU、NCCL 这几个词钻进去。',
    query: '推理 K8s GPU NCCL',
    action: '搜工程线索',
  },
  {
    text: '长文先看目录，再挑一条学习路径往下钻。',
    query: '学习路径',
    action: '找学习路径',
  },
  {
    text: '不确定搜什么？试试 RAG、Agent 或 KV Cache。',
    query: 'rag agent kv cache',
    action: '搜热门主题',
  },
];

export default function StudyCompanion() {
  const [hidden, setHidden] = useState(false);
  const [mode, setMode] = useState<CompanionMode>('reading');
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setHidden(localStorage.getItem('studyCompanionHidden') === 'true');
    const savedMode = localStorage.getItem('studyCompanionMode');
    if (savedMode === 'quiet' || savedMode === 'help' || savedMode === 'reading') {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (hidden || mode !== 'reading') return;
    const timer = window.setInterval(() => {
      setTipIndex(index => (index + 1) % TIPS.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [hidden, mode]);

  const currentTip = useMemo(() => TIPS[tipIndex], [tipIndex]);
  const bubbleText =
    mode === 'help'
      ? '我可以帮你把问题变成搜索词。先试试 GPU、推理、RAG、Agent 这些入口。'
      : currentTip.text;
  const actionLabel = mode === 'help' ? '打开搜索' : currentTip.action;
  const actionQuery = mode === 'help' ? 'gpu 推理 rag agent' : currentTip.query;

  function openSearch() {
    window.dispatchEvent(new CustomEvent('open-site-search', { detail: { query: actionQuery } }));
  }

  function switchMode(next: CompanionMode) {
    setMode(next);
    setHidden(false);
    localStorage.setItem('studyCompanionMode', next);
    localStorage.setItem('studyCompanionHidden', 'false');
  }

  function hide() {
    setHidden(true);
    localStorage.setItem('studyCompanionHidden', 'true');
  }

  function wake() {
    setHidden(false);
    setMode('reading');
    localStorage.setItem('studyCompanionHidden', 'false');
    localStorage.setItem('studyCompanionMode', 'reading');
  }

  if (hidden) {
    return (
      <aside className="study-companion study-companion--hidden" aria-label="学习伙伴已隐藏">
        <button type="button" className="study-companion__wake" onClick={wake}>
          唤醒猫咪
        </button>
      </aside>
    );
  }

  return (
    <aside className={`study-companion is-${mode}`} aria-label="学习伙伴">
      {mode !== 'quiet' && (
        <div className="study-companion__bubble">
          <p>{bubbleText}</p>
          <button type="button" onClick={openSearch}>
            {actionLabel}
          </button>
        </div>
      )}

      <button
        type="button"
        className="study-companion__body"
        onClick={() => switchMode(mode === 'quiet' ? 'reading' : 'help')}
        aria-label={mode === 'quiet' ? '进入陪读模式' : '进入求助模式'}
      >
        <svg className="study-companion__cat" viewBox="0 0 120 112" role="img" aria-hidden="true">
          <path className="cat-tail" d="M89 74c21-12 25 13 12 18-10 4-19-2-17-11" />
          <path className="cat-body" d="M31 61c1-18 13-31 30-31s30 13 30 31v14c0 17-12 27-30 27S31 92 31 75V61Z" />
          <path className="cat-ear cat-ear-left" d="M38 38 44 14l17 20" />
          <path className="cat-ear cat-ear-right" d="M82 38 76 14 59 34" />
          <path className="cat-face" d="M25 58c0-22 15-36 35-36s35 14 35 36c0 21-13 34-35 34S25 79 25 58Z" />
          <path className="cat-patch" d="M51 23c8-6 18-3 23 3-2 8-7 13-14 13-6 0-10-5-9-16Z" />
          <ellipse className="cat-eye" cx="47" cy="58" rx="4.5" ry="6" />
          <ellipse className="cat-eye" cx="73" cy="58" rx="4.5" ry="6" />
          <path className="cat-eye-shine" d="M45 55h2M71 55h2" />
          <path className="cat-nose" d="M60 65 56 69h8l-4-4Z" />
          <path className="cat-mouth" d="M60 70c-2 4-7 5-10 2M60 70c2 4 7 5 10 2" />
          <path className="cat-whisker" d="M39 67H19M40 73l-18 5M81 67h20M80 73l18 5" />
          <path className="cat-paw cat-paw-left" d="M46 88c-2 7-8 8-12 3" />
          <path className="cat-paw cat-paw-right" d="M74 88c2 7 8 8 12 3" />
        </svg>
      </button>

      <div className="study-companion__controls">
        <button type="button" className={mode === 'reading' ? 'is-active' : ''} onClick={() => switchMode('reading')}>
          陪读
        </button>
        <button type="button" className={mode === 'quiet' ? 'is-active' : ''} onClick={() => switchMode('quiet')}>
          安静
        </button>
        <button type="button" className={mode === 'help' ? 'is-active' : ''} onClick={() => switchMode('help')}>
          求助
        </button>
        <button type="button" onClick={hide} aria-label="隐藏学习伙伴">
          ×
        </button>
      </div>
    </aside>
  );
}
