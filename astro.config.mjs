// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kapitanie.com',
  base: '/',
  trailingSlash: 'ignore',
  // output: 'server',
  build: {
    assets: '_astro'
  },
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [react(), sitemap()]
});