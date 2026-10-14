import { languageForHost } from '../content/profile';

// The build emits the English page at / and the Portuguese one at /pt/.
// On .com.br the root serves the Portuguese page so each domain is indexed in its language.
// public/_routes.json limits this middleware to those entry points and the API.
export const onRequest: PagesFunction<{ ASSETS: Fetcher }> = ({ request, env, next }) => {
  const url = new URL(request.url);
  if (languageForHost(url.hostname) === 'pt' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return env.ASSETS.fetch(new URL('/pt/', url));
  }
  return next();
};
