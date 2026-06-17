import path from 'node:path';
import { withBase } from './paths';

function isElement(node: any): boolean {
  return node && node.type === 'element';
}

function visit(node: any, visitor: (node: any) => void) {
  if (!node) return;
  visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child, visitor);
  }
}

function sourceDirFromFile(file: any): string {
  const filePath = String(file?.history?.[0] || file?.path || '').replaceAll('\\', '/');
  const marker = '/content-md/';
  const markerIndex = filePath.lastIndexOf(marker);
  if (markerIndex === -1) return '';

  const id = filePath.slice(markerIndex + marker.length).replace(/\.md$/, '');
  const parts = id.split('/');
  parts.pop();
  return parts.join('/');
}

function normalizeRoute(routeId: string): string {
  const parts = routeId.split('/').filter(Boolean);
  if (parts[parts.length - 1] === 'index') {
    parts.pop();
  }
  return withBase(`/${parts.join('/')}/`);
}

function rewriteMarkdownHref(href: string, sourceDir: string): string {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return href;
  }

  const [rawPath, rawHash] = href.split('#');
  if (!rawPath.endsWith('.md')) return href;

  const hash = rawHash ? `#${rawHash.replace(/\.md$/, '')}` : '';
  const withoutExt = decodeURI(rawPath).replace(/\.md$/, '');

  if (withoutExt.startsWith('/ai-learn/')) {
    return `${normalizeRoute(withoutExt.replace(/^\/ai-learn\//, ''))}${hash}`;
  }

  if (withoutExt.startsWith('/')) {
    return `${normalizeRoute(withoutExt)}${hash}`;
  }

  const routeId = path.posix.normalize(path.posix.join(sourceDir, withoutExt));
  return `${normalizeRoute(routeId)}${hash}`;
}

export default function rehypeRewriteMarkdownLinks() {
  return (tree: any, file: any) => {
    const sourceDir = sourceDirFromFile(file);

    visit(tree, (node) => {
      if (!isElement(node) || node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
      node.properties.href = rewriteMarkdownHref(href, sourceDir);
    });
  };
}
