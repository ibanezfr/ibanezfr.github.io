import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    date: z.coerce.date(),
    tags: z.string(),
    /** Links this post to its translation. Required when EN and ES filenames differ. */
    translationKey: z.string().optional(),
    /** External URL. Omit to host the post on this site at /blog/[slug]. */
    url: z.string().optional(),
  }),
});

export const collections = { blog };
