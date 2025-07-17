import { defineCollection, z } from 'astro:content';

const realizacje = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    date: z.coerce.string(),
    category: z.string(), // Zmienione z enum na string dla elastyczności
    featured_image: z.string().optional(),
    gallery: z.array(z.object({
      image: z.string(),
    })).optional(),
    description: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    results: z.string().optional(),
    tags: z.array(z.string()).optional(), // Dodane tagowanie
    featured: z.boolean().optional(), // Dodane wyróżnianie projektów
  }),
});

const kategorieRealizacji = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    order: z.number(),
    color: z.string().optional(),
    active: z.boolean().default(true),
    icon: z.string().optional(),
  }),
});

const ustawienia = defineCollection({
  type: 'data',
  schema: z.object({
    site_name: z.string(),
    site_description: z.string(),
    company_name: z.string(),
    company_description: z.string().optional(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    nip: z.string().optional(),
    social_media: z.object({
      show_social_media: z.boolean().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
  }),
});

const sekcje = defineCollection({
  type: 'data',
  schema: z.object({
    // Możliwe pola ze wszystkich sekcji - Zod zignoruje nieistniejące
    section_type: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    intro: z.string().optional(),
    
    // Hero section fields
    cta1_text: z.string().optional(),
    cta1_link: z.string().optional(),
    cta2_text: z.string().optional(),
    cta2_link: z.string().optional(),
    video_mp4: z.string().optional(),
    video_webm: z.string().optional(),
    poster_image: z.string().optional(),
    
    // About section fields
    team_image: z.string().optional(),
    pillars: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
      content: z.string().optional(),
    })).optional(),
    
    // App section fields
    mockup_image: z.string().optional(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
    
    // Clients section fields
    hidden: z.boolean().optional(),
    hide_testimonials: z.boolean().optional(),
    client_logos: z.array(z.object({
      name: z.string(),
      logo: z.string(),
      website: z.string().optional(),
    })).optional(),
    testimonials: z.array(z.object({
      name: z.string(),
      position: z.string(),
      company: z.string(),
      quote: z.string(),
      photo: z.string().optional(),
      rating: z.number().min(1).max(5),
    })).optional(),
    
    // Contact section fields
    contact_methods: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      value: z.string(),
      link: z.string().optional(),
    })).optional(),
    
    // Shared fields
    stats: z.array(z.object({
      number: z.string(),
      label: z.string(),
    })).optional(),
  }),
});

const podstrony = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
  }),
});

const header = defineCollection({
  type: 'data',
  schema: z.object({
    logo: z.string().optional(),
    logo_text: z.string().optional(),
    nav: z.array(z.object({
      label: z.string(),
      link: z.string(),
    })).optional(),
    show_cta: z.boolean().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
  }),
});

export const collections = {
  'realizacje': realizacje,
  'kategorie-realizacji': kategorieRealizacji,
  'ustawienia': ustawienia,
  'sekcje': sekcje,
  'podstrony': podstrony,
  'header': header,
};
