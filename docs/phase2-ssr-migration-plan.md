# Phase 2 SSR/SSG Migration Plan for SEO+GEO

## Next.js vs Astro Comparison for This Portfolio

This portfolio is a React-based SPA using Vite, TypeScript, Lucide icons, Recharts for charts, and Google GenAI integration. It's primarily static content (sections like about, projects, skills), making it suitable for SSG.

### Next.js Pros:
- Seamless React integration; minimal changes to existing components.
- Full SSR/SSG/ISR support; flexible rendering per page.
- Rich ecosystem (middleware, API routes) for potential future expansions.
- Easier migration from Vite SPA (similar build process).

### Next.js Cons:
- Heavier bundle; more JS shipped compared to Astro.
- App router learning curve if not familiar.
- Overkill for a static portfolio; may not leverage full potential.

### Astro Pros:
- Excellent performance; ships zero JS by default, hydrates only interactive parts.
- Multi-framework support; can keep React components or migrate gradually.
- Superior SEO out-of-the-box for content-heavy sites; static HTML ready for crawlers.
- Faster builds and smaller bundles for static sites.

### Astro Cons:
- Learning new syntax (Astro components vs JSX).
- Less flexible for dynamic server-side features (though SSR is available).
- Migration requires adapting components to Astro's island architecture.

## Recommendation: Astro

**Rationale:** For a portfolio focused on SEO and GEO (geographic indexing), Astro provides better performance and crawlability. As a content-driven site, it minimizes JS, ensuring faster load times and better search engine indexing. Migration involves React integration, keeping most components intact.

## Minimal Migration Steps (Day-by-Day)

### Day 1: Setup and Initial Structure
- Install Astro: `npm create astro@latest portfolio-ssr --template minimal --yes`
- Add React integration: `npx astro add react`
- Copy existing components, assets, and styles to new Astro project.
- Set up basic routing (pages/index.astro, etc.).

### Day 2: Component Migration
- Migrate React components to Astro pages/components.
- Use client directives for interactive parts (e.g., `<Chart client:load />` for Recharts).
- Integrate Lucide icons and Google GenAI in Astro components.

### Day 3: Build and Testing
- Configure SSG mode in astro.config.mjs.
- Run `npm run build` and `npm run preview` to test static output.
- Validate SEO: Check meta tags, Open Graph, and page speed.

### Day 4: Optimization and Deployment
- Optimize images and assets.
- Set up deployment (e.g., Vercel, Netlify) with SSG.
- Test on multiple devices and browsers.

### Day 5: Rollback Prep and Go-Live
- Ensure rollback to Vite SPA is possible (keep original branch).
- Deploy and monitor performance/SEO improvements.

## Risks and Rollback Strategy

### Risks:
- Component hydration issues in Astro (interactive parts may not work as expected).
- Build failures due to Astro's stricter component rules.
- SEO regressions if meta tags aren't properly set.
- Learning curve for Astro syntax.

### Rollback Strategy:
- Maintain the original Vite SPA in a separate branch (`main` or `vite-spa`).
- If issues arise post-migration, switch deployment back to Vite build.
- Document changes for quick revert; use Git to cherry-pick fixes if needed.

## SEO/GEO Acceptance Checklist

- [ ] Pages load static HTML without JS (check in browser dev tools).
- [ ] Meta tags (title, description, OG) render correctly for each page.
- [ ] Page speed improved (Lighthouse score >90).
- [ ] Crawlable content: No hidden JS-dependent text.
- [ ] GEO indexing: Test with Google Search Console for regional visibility.
- [ ] Core Web Vitals pass (CLS, FID, LCP).
- [ ] No console errors on load.