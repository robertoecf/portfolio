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
const appHtml = render();

const html = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

writeFileSync(join(__dirname, 'dist/index.html'), html);
console.log('[prerender] index.html successfully pre-rendered to static HTML.');
