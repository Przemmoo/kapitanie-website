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
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunks
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Bundle splitting for better caching
          manualChunks: {
            // Vendor libraries
            vendor: ['react', 'react-dom'],
            // Utility libraries
            utils: ['marked', 'lucide-react'],
            // Astro core
            astro: ['astro/runtime/client/*']
          },
          // Optimize asset file names
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    // Preload optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'marked', 'lucide-react']
    }
  },
  integrations: [react(), sitemap()]
});