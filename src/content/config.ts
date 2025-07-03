import { defineCollection, z } from 'astro:content';

const realizacje = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    date: z.date(),
    category: z.enum(['Konferencja', 'Gala', 'Koncert', 'Event Firmowy']),
    featured_image: z.string(),
    gallery: z.array(z.object({
      image: z.string(),
    })).optional(),
    description: z.string(),
    challenge: z.string(),
    solution: z.string(),
    results: z.string().optional(),
  }),
});

export const collections = {
  'realizacje': realizacje,
};
