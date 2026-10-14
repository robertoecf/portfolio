import React from 'react';
import { translator } from '../../content/ui';
import { GITHUB_URL, PROJECTS, type Lang, type Project } from '../../content/profile';

const featured = PROJECTS.filter((p) => p.featured);
const pinned = PROJECTS.filter((p) => !p.featured && p.pinned);

// One loud card per pinned repo: ink, teal, then paper.
const PINNED_SKINS = [
  'bg-ink text-paper [--press:var(--color-teal)]',
  'bg-teal text-paper',
  'bg-paper text-ink [--press:var(--color-teal)]',
];

const StretchedName: React.FC<{ p: Project; className: string }> = ({ p, className }) => (
  <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" className={`${className} after:absolute after:inset-0`}>
    {p.name}
  </a>
);

const ExtraLinks: React.FC<{ p: Project }> = ({ p }) =>
  p.links.length > 1 ? (
    <span className="relative z-10 flex gap-3">
      {p.links.slice(1).map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
          {l.label} ↗
        </a>
      ))}
    </span>
  ) : null;

export const Work: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = translator(lang);

  return (
    <section id="work" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-14">
      <h2 className="text-[13px] uppercase tracking-[0.18em] font-semibold border-b-[0.5px] border-ink pb-3">{t('work.label')}</h2>

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
            <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">{p.category[lang]}</p>
          </div>
          <div className="col-span-12 sm:col-span-6 text-[15px] leading-relaxed text-body">
            <p>{p.description[lang]}</p>
            {p.highlight && <p className="mt-3 font-serif italic text-[17px] text-muted">“{p.highlight[lang]}”</p>}
            <p className="mt-4 text-[13px] underline underline-offset-4 decoration-teal">{p.links[0].label} ↗</p>
          </div>
        </a>
      ))}

      <h3 className="mt-20 text-[13px] uppercase tracking-[0.18em] font-semibold border-b-[0.5px] border-ink pb-3">{t('work.more')}</h3>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pinned.map((p, i) => (
          <li
            key={p.id}
            className={`press relative flex flex-col min-h-[340px] p-6 border-2 border-ink ${PINNED_SKINS[i % PINNED_SKINS.length]}`}
          >
            <div className="flex items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-wide">
              <span className="px-2 py-1 border border-current">{t('work.pinned')}</span>
              {p.status && <span className="opacity-70">{p.status}</span>}
            </div>
            <StretchedName p={p} className="mt-8 font-serif text-[40px] leading-[0.95] break-words hover:italic" />
            <p className="mt-2 text-[12px] uppercase tracking-[0.14em] opacity-70">{p.category[lang]}</p>
            <p className="mt-5 text-[14px] leading-relaxed opacity-90">{p.description[lang]}</p>
            <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
              <span className="opacity-70">{p.tags.join(' / ')}</span>
              <ExtraLinks p={p} />
              <span aria-hidden="true" className="text-xl leading-none">↗</span>
            </div>
          </li>
        ))}
      </ul>

      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="press inline-block mt-12 px-6 py-3 bg-paper text-sm border-2 border-ink">
        {t('work.all')} ↗
      </a>
    </section>
  );
};
