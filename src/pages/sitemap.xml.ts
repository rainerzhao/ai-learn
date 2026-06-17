import { getCollection } from 'astro:content';
import { getModules } from '../lib/modules';
import { isPublishableArticleId } from '../lib/content-filters';
import { contentIdToPath } from '../lib/content-routes';

const SITE_URL = 'https://rainerzhao.github.io/ai-learn';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function absoluteUrl(path: string): string {
  return encodeURI(`${SITE_URL}${path}`);
}

export async function GET() {
  const articles = await getCollection('articles', ({ id }) => isPublishableArticleId(id));
  const modules = getModules();
  const urls = new Map<string, string | undefined>();

  urls.set('/', undefined);
  urls.set('/tags/', undefined);
  urls.set('/sketches/', undefined);

  for (const mod of modules) {
    urls.set(`/${mod.dirName}/`, undefined);
  }

  for (const article of articles) {
    const updated = article.data.last_updated || article.data.date;
    urls.set(contentIdToPath(article.id), updated ? updated.toISOString().slice(0, 10) : undefined);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls.entries()]
  .sort(([a], [b]) => a.localeCompare(b, 'zh-CN'))
  .map(([path, lastmod]) => {
    const lastmodNode = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>${lastmodNode}\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
