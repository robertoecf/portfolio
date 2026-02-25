<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Roberto E. C. Freitas — Portfolio

Personal portfolio and professional profile site for Roberto E. C. Freitas, CFP® — financial advisor, strategy & operations professional, and LLM evaluator based in São Paulo, Brazil.

**Live:** [robertoecf.com](https://robertoecf.com)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript |
| Build tool | Vite 6 |
| Server | Express (Node.js) |
| AI chat | Google Gemini 2.5 Flash via `/api/chat` |
| Styling | Tailwind CSS (CDN) |
| SSR | Vite SSR + `react-dom/server` (no Next.js) |

---

## Running locally

**Prerequisites:** Node.js 18+, a `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/)

```bash
npm install
GEMINI_API_KEY=your_key npm run dev   # Vite dev server on :3000
```

The dev server proxies nothing — the AI chat won't work without the key, but the rest of the site loads fine.

---

## Building for production

```bash
npm run build   # three steps, runs automatically in sequence
npm start       # Express on :8080
```

The build pipeline:

```
vite build                                      → dist/ (client bundle + assets)
vite build --ssr entry-server.tsx               → dist/server/entry-server.js
node prerender.mjs                              → dist/template.html  (clean shell)
                                                → dist/index.html     (pre-rendered)
```

**`dist/template.html`** — the clean HTML shell, used by the Express server for per-request SSR.
**`dist/index.html`** — same shell with the full React tree already injected, for static/CDN hosts.

At runtime, Express loads `dist/server/entry-server.js` and renders the React app on every request so crawlers and LLMs always receive fully-populated HTML without executing JavaScript.

---

## Project structure

```
├── App.tsx                    # Root React component
├── index.tsx                  # Client entry (hydrateRoot in prod, createRoot in dev)
├── entry-server.tsx           # Server entry (renderToString for SSR)
├── prerender.mjs              # Post-build: saves template.html, pre-renders index.html
├── server.mjs                 # Express server (runtime SSR + /api/chat)
├── vite.config.ts
├── components/
│   ├── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Expertise.tsx
│   │   ├── Experience.tsx
│   │   └── AIChat.tsx
│   └── ui/Button.tsx
├── contexts/LanguageContext.tsx   # PT/EN i18n (all translations inline)
├── services/gemini.ts             # fetch wrapper for /api/chat
└── public/
    ├── robots.txt             # explicit Allow for all major AI crawlers
    ├── sitemap.xml
    ├── llms.txt               # llms.txt convention — resource index for AI systems
    ├── llms-full.txt          # full bilingual resume for LLM retrieval
    └── knowledge/
        ├── pt.html            # full Portuguese profile (static, no JS required)
        └── en.html            # full English profile (static, no JS required)
```

---

## SEO / GEO

The site is optimized for both traditional search engines and LLM-based retrieval (GEO):

- **Pre-rendered HTML** — `dist/index.html` and runtime SSR both serve complete HTML to every crawler, no JavaScript required
- **`/knowledge/pt.html`** and **`/knowledge/en.html`** — full static profiles in both languages, crawlable independently
- **`/llms.txt`** — resource index following the [llms.txt convention](https://llmstxt.org/)
- **`/llms-full.txt`** — complete bilingual resume for LLM retrieval systems
- **`robots.txt`** — explicit `Allow` for GPTBot, ClaudeBot, PerplexityBot, and other AI crawlers
- **`sitemap.xml`** — all URLs with `lastmod`, `changefreq`, and `priority`
- **JSON-LD** `Person` schema and full OpenGraph/Twitter Card tags in `index.html`

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes (for AI chat) | Google AI Studio key — never exposed to the client |
| `PORT` | No (default `8080`) | Port for the Express server |
