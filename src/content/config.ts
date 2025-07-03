import { defineCollection, z } from 'astro:content';

const realizacje = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    date: z.date(),
    category: z.enum(['Konferencja', 'Gala', 'Koncert', 'Event Firmowy']),
    featured_image: z.string().optional(),
    gallery: z.array(z.object({
      image: z.string(),
    })).optional(),
    description: z.string(),
    challenge: z.string(),
    solution: z.string(),
    results: z.string().optional(),
  }),
});

const ustawienia = defineCollection({
  type: 'data',
  schema: z.object({
    site_name: z.string(),
    site_description: z.string(),
    company_name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    social_media: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  'realizacje': realizacje,
  'ustawienia': ustawienia,
};
