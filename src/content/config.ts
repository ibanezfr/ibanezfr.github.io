import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    date: z.coerce.date(),
    tags: z.string(),
    /** External URL. Omit to host the post on this site at /blog/[slug]. */
    url: z.string().optional(),
  }),
});

export const collections = { blog };
