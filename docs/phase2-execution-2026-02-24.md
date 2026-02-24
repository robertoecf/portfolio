# Phase 2 SSR/SSG — Decision & Execution Kickoff (2026-02-24)

## Decision
* Chosen path: **Astro migration** (with React islands)
* Why:
  1. Portfolio is mostly content/static and benefits from zero-JS-by-default.
  2. Better crawlability and lower JS payload for SEO/GEO targets.
  3. Keeps React components where interactivity is needed.

## Execution Scope Started Today
* Deployment pipeline fixed for current Vite app on GitHub Pages.
* Build now supports Pages base path (`/portfolio/`) to avoid broken assets.
* This stabilizes production while migration runs in parallel.

## Migration Plan (Immediate)
1. Create branch `feat/phase2-astro`.
2. Scaffold Astro app (`astro + react`) in `phase2/astro/`.
3. Port static content pages first (`index`, `knowledge/pt`, `knowledge/en`).
4. Move interactive parts (charts/chat widgets) to React islands with selective hydration.
5. Compare against current app with Lighthouse + Core Web Vitals.
6. Cut over only after acceptance checklist passes.

## Acceptance Gates
* Lighthouse Performance >= 90 (mobile) for main page.
* HTML-first rendering validated (critical content present without JS).
* Metadata parity: canonical, hreflang, OG/Twitter, JSON-LD Person.
* `robots.txt`, `sitemap.xml`, `llms.txt` reachable in production.
