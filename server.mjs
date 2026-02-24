import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(express.json({ limit: '1mb' }));

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
app.use(express.static(distDir, { extensions: ['html'] }));

// Runtime SSR: load the server bundle produced by `vite build --ssr`.
// When present, every HTML request is rendered fresh via renderToString so
// crawlers and LLMs always receive fully-populated HTML even if the
// pre-rendered dist/index.html is stale or absent.
let ssrRender = null;
const ssrBundle = path.join(distDir, 'server/entry-server.js');
if (existsSync(ssrBundle)) {
  try {
    const { render } = await import(ssrBundle);
    ssrRender = render;
    console.log('[ssr] runtime renderer loaded');
  } catch (err) {
    console.warn('[ssr] failed to load renderer, falling back to static HTML:', err.message);
  }
}

const staticFileRoutes = [
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/knowledge/pt.html',
  '/knowledge/en.html',
];

for (const route of staticFileRoutes) {
  app.get(route, (_req, res, next) => {
    const rel = route.replace(/^\//, '');
    res.sendFile(path.join(distDir, rel), (err) => {
      if (!err) return;
      res.sendFile(path.join(publicDir, rel), (err2) => {
        if (err2) next();
      });
    });
  });
}

const langInstruction = (language = 'pt') =>
  language === 'pt'
    ? 'ATENÇÃO: Responda em Português (PT-BR) como assistente profissional de Roberto com foco em consultoria financeira e planejamento patrimonial.'
    : "ATTENTION: Respond in English as Roberto's professional assistant, emphasizing strategy, operations, and fintech/AI execution.";

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'missing_server_api_key' });
  }

  try {
    const { history = [], newMessage = '', language = 'pt', activeContext = '' } = req.body || {};
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Previous conversation:\n${history
      .map((h) => `${h.role}: ${h.text}`)
      .join('\n')}\n\nUser: ${newMessage}\n\nRespond as Roberto's AI assistant.`;

    const systemInstruction = `You are the AI digital assistant for Roberto E. C. Freitas.\n${langInstruction(
      language,
    )}\n\nResume context:\n${activeContext}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction },
    });

    return res.status(200).json({ text: response.text || '' });
  } catch (error) {
    console.error('chat_failed', error);
    return res.status(500).json({ error: 'chat_failed' });
  }
});

app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});

app.get('*', async (_req, res) => {
  // Use runtime SSR when the bundle is available (template.html is the clean
  // shell saved by prerender.mjs before it injected the build-time HTML).
  if (ssrRender) {
    try {
      const template = await readFile(path.join(distDir, 'template.html'), 'utf-8');
      const appHtml = ssrRender();
      const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      return res.setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    } catch (err) {
      console.error('[ssr] render error, falling back to static file:', err.message);
    }
  }
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`server listening on :${port}`);
});
