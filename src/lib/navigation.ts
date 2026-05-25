import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getModules, type Module } from './modules';
import { withBase } from './paths';

export interface NavArticle {
  slug: string;
  title: string;
  href: string;
  tags: string[];
}

export interface NavSection {
  slug: string;
  title: string;
  href: string;
  children: (NavSection | NavArticle)[];
}

export interface NavModule extends NavSection {
  module: Module;
  articleCount: number;
}

const EXCLUDE_DIRS = new Set(['assets', 'images', 'img', 'code', 'scripts', 'demo', '.dSYM', 'references']);

function getTitleFromFile(filePath: string): string {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    if (data.title) return data.title;

    const headingMatch = content.match(/^#\s+(.+)$/m);
    if (headingMatch) return headingMatch[1].trim();

    return path.basename(filePath, '.md').replace(/[-_]/g, ' ');
  } catch {
    return path.basename(filePath, '.md').replace(/[-_]/g, ' ');
  }
}

function getTagsFromFile(filePath: string): string[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return Array.isArray(data.tags) ? data.tags : [];
  } catch {
    return [];
  }
}

function buildTree(dir: string, basePath: string): (NavSection | NavArticle)[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const children: (NavSection | NavArticle)[] = [];

  const dirs = entries.filter(e => e.isDirectory() && !EXCLUDE_DIRS.has(e.name));
  const mdFiles = entries.filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md');

  for (const d of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
    const childPath = path.join(dir, d.name);
    const childBase = `${basePath}/${d.name}`;
    const indexPath = path.join(childPath, 'index.md');
    const title = fs.existsSync(indexPath) ? getTitleFromFile(indexPath) : d.name.replace(/[-_]/g, ' ');

    const subChildren = buildTree(childPath, childBase);
    const section: NavSection = { slug: d.name, title, href: withBase(childBase), children: subChildren };
    children.push(section);
  }

  for (const f of mdFiles.sort((a, b) => a.name.localeCompare(b.name))) {
    const filePath = path.join(dir, f.name);
    const slug = f.name.replace(/\.md$/, '');
    const href = withBase(`${basePath}/${slug}`);
    const title = getTitleFromFile(filePath);
    const tags = getTagsFromFile(filePath);
    children.push({ slug, title, href, tags });
  }

  return children;
}

export function buildNavigation(): NavModule[] {
  const modules = getModules();
  const contentRoot = path.resolve(process.cwd(), 'content-md');

  return modules.map(mod => {
    const moduleDir = path.join(contentRoot, mod.dirName);
    if (!fs.existsSync(moduleDir)) {
      return { slug: mod.dirName, title: mod.name, href: withBase(`/${mod.dirName}`), children: [], module: mod, articleCount: 0 };
    }

    const children = buildTree(moduleDir, `/${mod.dirName}`);
    const articleCount = countArticles(children);

    return { slug: mod.dirName, title: mod.name, href: withBase(`/${mod.dirName}`), children, module: mod, articleCount };
  });
}

function countArticles(children: (NavSection | NavArticle)[]): number {
  let count = 0;
  for (const child of children) {
    if ('children' in child) {
      count += countArticles(child.children);
    } else {
      count++;
    }
  }
  return count;
}

export function flattenArticles(children: (NavSection | NavArticle)[]): NavArticle[] {
  const result: NavArticle[] = [];
  for (const child of children) {
    if ('children' in child) {
      result.push(...flattenArticles(child.children));
    } else {
      result.push(child);
    }
  }
  return result;
}
