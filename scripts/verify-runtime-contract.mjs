import { readFileSync } from 'node:fs';

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
    ],
    present: [
      'data-open-site-search="gpu"',
      'id="reading-progress-bar"',
    ],
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
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Runtime contract checks passed.');
