// Generators for everything crawlers, social cards and LLMs read, all derived from content/profile.ts.
// Used at build time by vite.config.ts, at request time by functions/_middleware.ts (per-domain
// <head>) and by functions/api/chat.ts (assistant context). Keep this file free of DOM/Node APIs.

import {
  CONTACT,
  CREDENTIALS,
  EDUCATION,
  EXPERIENCE,
  EXPERTISE,
  formatPeriod,
  LANGUAGES,
  LOCALE,
  PERSON,
  PROJECTS,
  SEO,
  SITE_URL,
  SOCIALS,
  type Lang,
} from './profile';

const LANGS: Lang[] = ['en', 'pt'];

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const home = (lang: Lang) => `${SITE_URL[lang]}/`;
const knowledgeUrl = (lang: Lang) => `${SITE_URL[lang]}/knowledge/${lang}`;
const profileLinks = SOCIALS.filter((s) => s.profile);

export function personJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON.name,
    alternateName: PERSON.shortName,
    url: home(lang),
    image: `${SITE_URL[lang]}${PERSON.photo}`,
    jobTitle: PERSON.headline[lang],
    description: SEO.description[lang],
    email: `mailto:${CONTACT.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSON.location.city,
      addressRegion: PERSON.location.region,
      addressCountry: PERSON.location.country,
    },
    sameAs: profileLinks.map((s) => s.url),
    knowsLanguage: ['pt-BR', 'en', 'es'],
    alumniOf: EDUCATION.map((e) => ({ '@type': 'EducationalOrganization', name: e.school[lang] })),
    hasCredential: CREDENTIALS.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `${c.name.en} (${c.detail.en})`,
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    })),
    knowsAbout: EXPERTISE.flatMap((a) => a.items[lang]).filter((i) => !i.includes('®')),
  };
}

/** Everything between the SEO markers in index.html. Swapped per domain by functions/_middleware.ts. */
export function headTags(lang: Lang): string {
  const title = esc(SEO.title[lang]);
  const desc = esc(SEO.description[lang]);
  const image = `${SITE_URL[lang]}${PERSON.photo}`;
  // "<" is escaped so the JSON can never close the script tag early.
  const jsonLd = JSON.stringify(personJsonLd(lang)).replace(/</g, '\\u003c');
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<link rel="canonical" href="${home(lang)}" />`,
    `<link rel="alternate" hreflang="en" href="${home('en')}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${home('pt')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${home('en')}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:locale" content="${lang === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${home(lang)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

export const SEO_START = '<!-- seo:start -->';
export const SEO_END = '<!-- seo:end -->';

export function localizeIndexHtml(html: string, lang: Lang): string {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END);
  if (start === -1 || end === -1) return html;
  return (
    html.slice(0, start + SEO_START.length) +
    '\n    ' +
    headTags(lang) +
    '\n    ' +
    html.slice(end)
  ).replace(/<html lang="[^"]*"/, `<html lang="${LOCALE[lang]}"`);
}

/** Plain-text profile shared by the chat assistant and llms-full.txt. */
export function resumeText(lang: Lang): string {
  const pt = lang === 'pt';
  const lines: string[] = [];
  lines.push(`${PERSON.displayName}`, PERSON.headline[lang]);
  lines.push(`${pt ? 'Localização' : 'Location'}: ${PERSON.location.label}`);
  lines.push(`Email: ${CONTACT.email} | WhatsApp: ${CONTACT.whatsapp.display}`);
  lines.push(...profileLinks.map((s) => `${s.label}: ${s.url}`));
  lines.push('', pt ? 'RESUMO' : 'PROFESSIONAL SUMMARY', PERSON.summary[lang]);
  lines.push('', pt ? 'COMPETÊNCIAS' : 'CORE SKILLS');
  EXPERTISE.forEach((a) => lines.push(`${a.title[lang]}: ${a.items[lang].join(', ')}.`));
  lines.push('', pt ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE');
  EXPERIENCE.forEach((j) => {
    lines.push(`${j.company} — ${j.title[lang]}`, `${j.location[lang]} | ${formatPeriod(j, lang)}`);
    j.bullets[lang].forEach((b) => lines.push(`• ${b}`));
    lines.push('');
  });
  lines.push(pt ? 'PROJETOS OPEN SOURCE' : 'OPEN-SOURCE PROJECTS');
  PROJECTS.forEach((p) => lines.push(`• ${p.name} (${p.links[0].url}): ${p.description[lang]}`));
  lines.push('', pt ? 'FORMAÇÃO' : 'EDUCATION');
  EDUCATION.forEach((e) => lines.push(`${e.school[lang]} — ${e.degree[lang]} (${e.period[lang]})`));
  lines.push('', pt ? 'CERTIFICAÇÕES' : 'CERTIFICATIONS');
  CREDENTIALS.forEach((c) => lines.push(`${c.name[lang]} — ${c.detail[lang]} (${c.issuer})`));
  lines.push('', pt ? 'IDIOMAS' : 'LANGUAGES');
  lines.push(LANGUAGES.map((l) => `${l.name[lang]} (${l.level[lang]})`).join(', '));
  return lines.join('\n');
}

export function buildLlmsTxt(): string {
  return `# ${PERSON.name}

> ${SEO.description.en}

Roberto E. C. Freitas (CFP®, CEA) is a Brazilian financial planner based in São Paulo who builds software for wealth management and still advises clients. 8+ years in fintech and wealth management (Warren Investimentos), Subject-Matter Expert evaluating LLMs for financial services (via Mercor), builder of Wealthuman OS and Futuro em Foco, and maintainer of open-source tools for Brazilian financial data and AI coding agents.

The English site (${home('en')}) and the Portuguese site (${home('pt')}) share the same facts with a different emphasis: the English site leads with the software he builds; the Portuguese site leads with his financial planning practice for clients.

## Profile

- [Full profile in English](${knowledgeUrl('en')}): career, skills, projects, education, certifications
- [Perfil completo em português](${knowledgeUrl('pt')}): trajetória, competências, projetos, formação, certificações
- [Extended plain-text context](${SITE_URL.en}/llms-full.txt): both profiles in one file

## Projects

${PROJECTS.map((p) => `- [${p.name}](${p.links[0].url}): ${p.description.en}`).join('\n')}

## Links

${SOCIALS.map((s) => `- ${s.label}: ${s.url}`).join('\n')}
`;
}

export function buildLlmsFullTxt(): string {
  return `# ${PERSON.name} — Extended profile for AI systems

Canonical: ${home('en')} (EN) · ${home('pt')} (PT-BR)

---

## English profile

${resumeText('en')}

---

## Perfil em português

${resumeText('pt')}
`;
}

export function buildKnowledgePage(lang: Lang): string {
  const pt = lang === 'pt';
  const h = (s: string) => esc(s);
  const section = (title: string, body: string) => `<section><h2>${h(title)}</h2>${body}</section>`;
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  const other: Lang = pt ? 'en' : 'pt';

  const body = [
    `<header><h1>${h(PERSON.displayName)}</h1><p>${h(PERSON.headline[lang])} · ${h(PERSON.location.label)}</p>`,
    `<p>${SOCIALS.map((s) => `<a href="${h(s.url)}">${h(s.label)}</a>`).join(' · ')}</p></header>`,
    section(pt ? 'Resumo' : 'Summary', `<p>${h(PERSON.summary[lang])}</p>`),
    section(
      pt ? 'Competências' : 'Expertise',
      EXPERTISE.map((a) => `<h3>${h(a.title[lang])}</h3>${list(a.items[lang].map(h))}`).join(''),
    ),
    section(
      pt ? 'Trajetória' : 'Experience',
      EXPERIENCE.map(
        (j) =>
          `<article><h3>${h(j.company)} — ${h(j.title[lang])}</h3><p>${h(j.location[lang])} · ${h(formatPeriod(j, lang))}</p>${list(j.bullets[lang].map(h))}</article>`,
      ).join(''),
    ),
    section(
      pt ? 'Projetos' : 'Projects',
      list(
        PROJECTS.map(
          (p) =>
            `<a href="${h(p.links[0].url)}"><strong>${h(p.name)}</strong></a> (${h(p.category[lang])}): ${h(p.description[lang])}`,
        ),
      ),
    ),
    section(
      pt ? 'Formação' : 'Education',
      list(EDUCATION.map((e) => `${h(e.degree[lang])}, ${h(e.school[lang])} (${h(e.period[lang])})`)),
    ),
    section(
      pt ? 'Certificações e idiomas' : 'Certifications & languages',
      list([
        ...CREDENTIALS.map((c) => `${h(c.name[lang])}: ${h(c.detail[lang])} (${h(c.issuer)})`),
        LANGUAGES.map((l) => `${h(l.name[lang])} (${h(l.level[lang])})`).join(', '),
      ]),
    ),
    `<footer><p><a href="${home(lang)}">${pt ? 'Site principal com assistente virtual' : 'Main site with AI assistant'}</a> · <a href="${knowledgeUrl(other)}" hreflang="${LOCALE[other]}">${pt ? 'English version' : 'Versão em português'}</a></p></footer>`,
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="${LOCALE[lang]}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${h(PERSON.displayName)} — ${pt ? 'Perfil profissional' : 'Professional profile'}</title>
<meta name="description" content="${h(SEO.description[lang])}" />
<link rel="canonical" href="${knowledgeUrl(lang)}" />
${LANGS.map((l) => `<link rel="alternate" hreflang="${LOCALE[l]}" href="${knowledgeUrl(l)}" />`).join('\n')}
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 16px;color:#1e293b;background:#fff}h1{margin-bottom:0}h2{margin-top:2em;border-bottom:1px solid #e2e8f0}a{color:#0369a1}@media (prefers-color-scheme:dark){body{background:#050a10;color:#e2e8f0}a{color:#7dd3fc}h2{border-color:#1e293b}}</style>
</head>
<body>
${body}
</body>
</html>
`;
}

export function buildSitemap(): string {
  const alt = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${LOCALE[l]}" href="${home(l)}"/>`).join('');
  const kAlt = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${LOCALE[l]}" href="${knowledgeUrl(l)}"/>`).join('');
  const urls = [
    ...LANGS.map((l) => `<url><loc>${home(l)}</loc>${alt}</url>`),
    ...LANGS.map((l) => `<url><loc>${knowledgeUrl(l)}</loc>${kAlt}</url>`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

export function buildRobotsTxt(): string {
  return `# All content is public and intentionally readable by search engines and AI crawlers.
User-agent: *
Allow: /

Sitemap: ${SITE_URL.en}/sitemap.xml
`;
}

/** Static files emitted into dist/ at build time (and served by the dev server). */
export function staticSeoFiles(): Record<string, string> {
  return {
    'robots.txt': buildRobotsTxt(),
    'sitemap.xml': buildSitemap(),
    'llms.txt': buildLlmsTxt(),
    'llms-full.txt': buildLlmsFullTxt(),
    'knowledge/en.html': buildKnowledgePage('en'),
    'knowledge/pt.html': buildKnowledgePage('pt'),
  };
}
