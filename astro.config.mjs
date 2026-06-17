import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import rehypeRemoveFirstH1 from './src/lib/rehype-remove-first-h1';
import rehypeRewriteMarkdownLinks from './src/lib/rehype-rewrite-md-links';

export default defineConfig({
  base: '/ai-learn',
  integrations: [
    react(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: ['rehype-katex', 'rehype-slug', rehypeRemoveFirstH1, rehypeRewriteMarkdownLinks, 'rehype-autolink-headings'],
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
  output: 'static',
});
