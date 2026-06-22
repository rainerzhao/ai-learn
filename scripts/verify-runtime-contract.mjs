import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const checks = [
  {
    file: 'dist/index.html',
    absent: [
      'ClientRouter',
      'HeroSection',
      'ReadingProgressBar.',
      '_astro/client',
      'React',
      'import.meta',
      'fonts.googleapis',
      'fonts.gstatic',
      'cdn.jsdelivr.net',
      'pagefind-entry',
      'wasm.unknown.pagefind',
      'rel="preload"',
      'rel="modulepreload"',
      'id="reading-progress-bar"',
    ],
    present: [
      'data-open-site-search="gpu"',
      'id="site-search-modal"',
    ],
    cssAbsent: ['KaTeX_', '.katex'],
  },
  {
    file: 'dist/01_hardware_architecture/index.html',
    absent: [
      'ClientRouter',
      '_astro/client',
      'React',
      'import.meta',
      'fonts.googleapis',
      'fonts.gstatic',
      'cdn.jsdelivr.net',
      'pagefind-entry',
      'wasm.unknown.pagefind',
      'rel="preload"',
      'rel="modulepreload"',
    ],
    cssAbsent: ['KaTeX_', '.katex'],
  },
  {
    file: 'dist/01_hardware_architecture/advanced_packaging/01_2_5d_3d_abf_glass_substrate/index.html',
    absent: [
      'ClientRouter',
      '_astro/client',
      'React',
      'import.meta',
      'fonts.googleapis',
      'fonts.gstatic',
      'cdn.jsdelivr.net',
      'pagefind-entry',
      'wasm.unknown.pagefind',
      'rel="preload"',
      'rel="modulepreload"',
    ],
    present: [
      'id="reading-progress-bar"',
    ],
    cssPresent: ['.katex'],
  },
  {
    file: 'dist/sketches/index.html',
    absent: [
      'ClientRouter',
      '_astro/client',
      'React',
      'import.meta',
      'fonts.googleapis',
      'fonts.gstatic',
      'cdn.jsdelivr.net',
      'pagefind-entry',
      'wasm.unknown.pagefind',
      'rel="preload"',
      'rel="modulepreload"',
    ],
    cssAbsent: ['KaTeX_', '.katex'],
  },
];

const failures = [];

for (const check of checks) {
  const html = readFileSync(check.file, 'utf8');

  for (const pattern of check.absent ?? []) {
    if (html.includes(pattern)) {
      failures.push(`${check.file} should not contain ${pattern}`);
    }
  }

  for (const pattern of check.present ?? []) {
    if (!html.includes(pattern)) {
      failures.push(`${check.file} should contain ${pattern}`);
    }
  }

  const linkedCss = Array.from(html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g))
    .map(match => match[1])
    .map(href => href.replace(/^\/ai-learn\//, 'dist/').replace(/^\//, 'dist/'))
    .map(path => readFileSync(path, 'utf8'))
    .join('\n');

  for (const pattern of check.cssAbsent ?? []) {
    if (linkedCss.includes(pattern)) {
      failures.push(`${check.file} linked CSS should not contain ${pattern}`);
    }
  }

  for (const pattern of check.cssPresent ?? []) {
    if (!linkedCss.includes(pattern)) {
      failures.push(`${check.file} linked CSS should contain ${pattern}`);
    }
  }
}

const cssBundle = readdirSync('dist/_astro')
  .filter(file => file.endsWith('.css'))
  .map(file => readFileSync(join('dist/_astro', file), 'utf8'))
  .join('\n');

if (!/\[hidden\][^{]*\{[^}]*display:\s*none\s*!important/i.test(cssBundle)) {
  failures.push('dist CSS should force [hidden] to display:none!important so utility display classes cannot reveal hidden UI');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Runtime contract checks passed.');
