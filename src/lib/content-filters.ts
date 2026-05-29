export const EXCLUDED_CONTENT_DIRS = new Set([
  'assets',
  'images',
  'img',
  'code',
  'scripts',
  'demo',
  '.dSYM',
  'references',
]);

export const EXCLUDED_CONTENT_FILES = new Set([
  'SKILL.md',
  'test_output.md',
]);

export function isPublishableArticleId(id: string): boolean {
  const parts = id.split('/');
  const fileName = parts[parts.length - 1];

  if (!fileName || fileName === 'index') return false;
  if (EXCLUDED_CONTENT_FILES.has(`${fileName}.md`)) return false;
  if (parts.some(part => EXCLUDED_CONTENT_DIRS.has(part))) return false;

  return true;
}
