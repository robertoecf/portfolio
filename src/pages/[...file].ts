import type { APIRoute, GetStaticPaths } from 'astro';
import { staticSeoFiles } from '../../content/seo';

// Emits the generated SEO files at their existing paths during the static build.
const TYPES: Record<string, string> = { txt: 'text/plain; charset=utf-8', xml: 'application/xml; charset=utf-8', html: 'text/html; charset=utf-8' };
export const getStaticPaths = (() => Object.keys(staticSeoFiles()).map((file) => ({ params: { file } }))) satisfies GetStaticPaths;
export const GET: APIRoute = ({ params }) => {
  const file = params.file!;
  const body = staticSeoFiles()[file];
  const ext = file.split('.').pop()!;
  return new Response(body, { headers: { 'Content-Type': TYPES[ext] } });
};
