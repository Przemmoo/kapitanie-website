// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kapitanie-website.pages.dev',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    assets: '_astro'
  },
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
});
