import { languageForHost } from '../content/profile';
import { localizeIndexHtml } from '../content/seo';

// The same static index.html is served on robertoecf.com and robertoecf.com.br.
// For the .com.br domain, swap the <head> SEO block (title, description, canonical,
// og:*, JSON-LD) and <html lang> to Portuguese so each domain is indexed in its language.
// public/_routes.json limits this middleware to HTML entry points and the API.
export const onRequest: PagesFunction = async ({ request, next }) => {
  const response = await next();
  const lang = languageForHost(new URL(request.url).hostname);
  const isHtml = response.headers.get('content-type')?.includes('text/html');
  if (lang === 'en' || !isHtml) return response;

  const html = localizeIndexHtml(await response.text(), lang);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('etag');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};
