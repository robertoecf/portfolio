import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GITHUB_URL, PROJECTS } from '../../content/profile';

const featured = PROJECTS.filter((p) => p.featured);
const others = PROJECTS.filter((p) => !p.featured);

export const Work: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="work" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-14">
      <h2 className="text-[13px] uppercase tracking-[0.18em] border-b border-ink pb-3">{t('work.label')}</h2>

      {featured.map((p, i) => (
        <a
          key={p.id}
          href={p.links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-12 gap-x-6 gap-y-4 py-10 border-b border-ink/20 hover:bg-paper-deep transition-colors"
        >
          <span className="col-span-2 sm:col-span-1 font-serif text-2xl text-teal">0{i + 1}</span>
          <div className="col-span-10 sm:col-span-5">
            <h3 className="font-serif text-[40px] sm:text-[48px] leading-none group-hover:italic">{p.name}</h3>
            <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">{p.category[language]}</p>
          </div>
          <div className="col-span-12 sm:col-span-6 text-[15px] leading-relaxed text-body">
            <p>{p.description[language]}</p>
            {p.highlight && <p className="mt-3 font-serif italic text-[17px] text-muted">“{p.highlight[language]}”</p>}
            <p className="mt-4 text-[13px] underline underline-offset-4 decoration-teal">{p.links[0].label} ↗</p>
          </div>
        </a>
      ))}

      <h3 className="mt-20 text-[13px] uppercase tracking-[0.18em] border-b border-ink pb-3">{t('work.more')}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {others.map((p) => (
          <li key={p.id} className="py-6 border-b border-ink/20">
            <div className="flex items-baseline justify-between gap-4">
              <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" className="font-serif text-[26px] leading-tight hover:italic">
                {p.name}
              </a>
              {p.status && <span className="font-mono text-[11px] text-muted shrink-0">{p.status}</span>}
            </div>
            <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted">{p.category[language]}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-body">{p.description[language]}</p>
            <p className="mt-3 flex gap-4 text-[13px]">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-teal">
                  {l.label} ↗
                </a>
              ))}
            </p>
          </li>
        ))}
      </ul>

      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="press inline-block mt-12 px-6 py-3 bg-paper text-sm border-2 border-ink">
        {t('work.all')} ↗
      </a>
    </section>
  );
};
