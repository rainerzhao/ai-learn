const baseUrl = import.meta.env.BASE_URL ?? '/';

export function withBase(url: string): string {
  if (
    url.startsWith('#') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  ) {
    return url;
  }

  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const path = url.startsWith('/') ? url : `/${url}`;

  if (!base || base === '/') return path;
  if (path === base || path.startsWith(`${base}/`)) return path;
  if (path === '/') return `${base}/`;

  return `${base}${path}`;
}
