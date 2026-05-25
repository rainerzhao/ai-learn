import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './content-md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    module: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    last_updated: z.coerce.date().optional(),
    authors: z.array(z.string()).default([]),
    original_url: z.string().optional(),
    draft: z.boolean().default(false),
    version: z.string().optional(),
  }),
});

export const collections = { articles };
