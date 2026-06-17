import { withBase } from './paths';

export function normalizeContentId(id: string): string {
  const parts = id.split('/').filter(Boolean);
  if (parts[parts.length - 1] === 'index') {
    parts.pop();
  }
  return parts.join('/');
}

export function contentIdToPath(id: string): string {
  const routeId = normalizeContentId(id);
  return routeId ? `/${routeId}/` : '/';
}

export function contentIdToHref(id: string): string {
  return withBase(contentIdToPath(id));
}
