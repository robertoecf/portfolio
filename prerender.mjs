/**
 * Build-time prerender script.
 * Runs after `vite build` and `vite build --ssr entry-server.tsx`.
 * Injects the server-rendered HTML into dist/index.html so crawlers
 * and LLMs see fully-rendered content without JavaScript.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { render } = await import('./dist/server/entry-server.js');

const template = readFileSync(join(__dirname, 'dist/index.html'), 'utf-8');

// Save the clean template before SSR injection so the runtime server can
// use it to render fresh HTML per-request without a stale pre-rendered div.
writeFileSync(join(__dirname, 'dist/template.html'), template);

const appHtml = render();

const html = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

writeFileSync(join(__dirname, 'dist/index.html'), html);
console.log('[prerender] template.html saved and index.html pre-rendered to static HTML.');
