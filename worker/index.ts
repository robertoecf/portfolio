import { languageForHost } from '../content/profile';
import { chat, type Env as ChatEnv } from './chat';

interface Env extends ChatEnv {
  ASSETS: Fetcher;
}

// Static assets come from the Astro build in dist/. wrangler.jsonc runs this
// script first only for /, /index.html and /api/*; every other path is served
// straight from the assets.
export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      return request.method === 'POST'
        ? chat(request, env)
        : new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
    }

    // The build emits the English page at / and the Portuguese one at /pt/.
    // On .com.br the root serves the Portuguese page so each domain is indexed in its language.
    if (languageForHost(url.hostname) === 'pt' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return env.ASSETS.fetch(new URL('/pt/', url));
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
