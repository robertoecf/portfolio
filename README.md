<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Portfolio — SEO + GEO ready baseline

This project now includes a practical SEO/GEO baseline for better search and LLM discoverability.

## What's included

1. `robots.txt` + `sitemap.xml`
2. `llms.txt` + `llms-full.txt`
3. Crawlable knowledge pages:
   * `/knowledge/pt.html`
   * `/knowledge/en.html`
4. Canonical/hreflang + OpenGraph/Twitter tags
5. JSON-LD `Person` structured data
6. Chat API moved server-side (`/api/chat`) to avoid exposing API key in client bundle

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set `GEMINI_API_KEY` in your runtime environment (for `/api/chat`)
3. Run:
   `npm run dev`

## Deployment notes

* For Vercel, keep `GEMINI_API_KEY` as a server env var.
* Do not expose API keys through Vite `define` or client-side code.
