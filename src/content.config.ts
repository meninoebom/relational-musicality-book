import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/chapters' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    chapter: z.number(),
    audioLoop: z.string().optional(),
  }),
});

export const collections = { chapters };
