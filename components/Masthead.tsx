import React from 'react';
import { translator } from '../content/ui';
import { PERSON, SITE_URL, type Lang } from '../content/profile';

const LINKS = [
  { href: '#work', key: 'nav.work' },
  { href: '#career', key: 'nav.career' },
  { href: '#chat', key: 'nav.ask' },
  { href: '#contact', key: 'nav.contact' },
];

export const Masthead: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = translator(lang);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6 text-[13px]">
        <a href="#top" className="font-semibold tracking-tight">{PERSON.displayName}</a>

        <nav aria-label={lang === 'pt' ? 'Seções' : 'Sections'} className="hidden md:flex gap-7 text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{t(l.key)}</a>
          ))}
        </nav>

        <div className="flex gap-3">
          {(['pt', 'en'] as const).map((code) => (
            <a
              key={code}
              href={`${SITE_URL[code]}/`}
              aria-current={lang === code ? 'true' : undefined}
              lang={code === 'pt' ? 'pt-BR' : 'en'}
              hrefLang={code === 'pt' ? 'pt-BR' : 'en'}
              className={lang === code ? 'underline underline-offset-4 decoration-teal' : 'text-muted hover:text-ink'}
            >
              {code.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
