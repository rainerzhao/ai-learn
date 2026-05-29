import { useEffect, useMemo, useState } from 'react';

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
  const [quiet, setQuiet] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setHidden(localStorage.getItem('studyCompanionHidden') === 'true');
    setQuiet(localStorage.getItem('studyCompanionQuiet') === 'true');
  }, []);

  useEffect(() => {
    if (hidden || quiet) return;
    const timer = window.setInterval(() => {
      setTipIndex(index => (index + 1) % TIPS.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [hidden, quiet]);

  const currentTip = useMemo(() => TIPS[tipIndex], [tipIndex]);

  function openSearch() {
    window.dispatchEvent(new CustomEvent('open-site-search', { detail: { query: currentTip.query } }));
  }

  function toggleQuiet() {
    const next = !quiet;
    setQuiet(next);
    localStorage.setItem('studyCompanionQuiet', String(next));
  }

  function hide() {
    setHidden(true);
    localStorage.setItem('studyCompanionHidden', 'true');
  }

  if (hidden) return null;

  return (
    <aside className={`study-companion ${quiet ? 'is-quiet' : ''}`} aria-label="学习伙伴">
      {!quiet && (
        <div className="study-companion__bubble">
          <p>{currentTip.text}</p>
          <button type="button" onClick={openSearch}>
            {currentTip.action}
          </button>
        </div>
      )}

      <div className="study-companion__body" aria-hidden="true">
        <div className="study-companion__ear study-companion__ear--left" />
        <div className="study-companion__ear study-companion__ear--right" />
        <div className="study-companion__face">
          <span className="study-companion__eye" />
          <span className="study-companion__eye" />
          <span className="study-companion__nose" />
          <span className="study-companion__whisker study-companion__whisker--left" />
          <span className="study-companion__whisker study-companion__whisker--right" />
        </div>
        <div className="study-companion__tail" />
      </div>

      <div className="study-companion__controls">
        <button type="button" onClick={toggleQuiet}>
          {quiet ? '唤醒' : '安静'}
        </button>
        <button type="button" onClick={hide} aria-label="隐藏学习伙伴">
          ×
        </button>
      </div>
    </aside>
  );
}
