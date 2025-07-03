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
  server: {
    // Obsługa plików statycznych w dev mode
    fs: {
      allow: ['..']
    }
  },
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      // Proxy dla /admin w dev mode
      proxy: {
        '/admin': {
          target: 'http://localhost:4322/admin/',
          changeOrigin: true,
          configure: (proxy, options) => {
            // Obsługa plików statycznych z public/admin/
            proxy.on('proxyReq', (proxyReq, req, res) => {
              if (req.url.startsWith('/admin/')) {
                // Przekieruj na pliki w public/admin/
                proxyReq.path = req.url.replace('/admin', '/admin');
              }
            });
          }
        }
      }
    }
  },
});
