import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://robertoecf.com',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  server: { port: 4317, host: '127.0.0.1' },
});
