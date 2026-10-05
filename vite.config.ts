import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { localizeIndexHtml, staticSeoFiles } from './content/seo';

const CONTENT_TYPES: Record<string, string> = {
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
};

// Injects the English <head> SEO block into index.html and emits robots.txt, sitemap.xml,
// llms.txt and the knowledge pages, all generated from content/profile.ts.
function seoFromProfile(): Plugin {
  return {
    name: 'seo-from-profile',
    transformIndexHtml: (html) => localizeIndexHtml(html, 'en'),
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = req.url?.split('?')[0].replace(/^\//, '') ?? '';
        const body = staticSeoFiles()[file];
        if (!body) return next();
        res.setHeader('Content-Type', CONTENT_TYPES[path.extname(file)] ?? 'text/plain');
        res.end(body);
      });
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(staticSeoFiles())) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), seoFromProfile()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
