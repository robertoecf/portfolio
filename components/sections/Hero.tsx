import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PERSON } from '../../content/profile';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="max-w-6xl mx-auto px-6 pt-14 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 flex flex-col justify-between gap-10">
        <p className="text-[13px] uppercase tracking-[0.18em] text-teal">{t('hero.kicker')}</p>

        <h1 className="font-serif text-[44px] sm:text-[64px] leading-[1.02] tracking-[-0.01em]">
          {t('hero.title')} <em className="text-teal">{t('hero.titleAccent')}</em>
        </h1>

        <div className="flex flex-wrap gap-4">
          <a href={t('hero.ctaHref')} className="press [--press:var(--color-teal)] px-6 py-3 bg-ink text-paper text-sm border-2 border-ink">
            {t('hero.cta')} ↓
          </a>
          <a href={t('hero.secondaryHref')} className="press px-6 py-3 bg-paper text-ink text-sm border-2 border-ink">
            {t('hero.secondary')}
          </a>
        </div>

        <ol className="text-[13px] text-muted space-y-1 border-t border-ink/20 pt-4">
          {(t('hero.notes') as string[]).map((note, i) => (
            <li key={note}><sup className="mr-1">{i + 1}</sup>{note}</li>
          ))}
        </ol>
      </div>

      <figure className="lg:col-span-5 relative">
        <div className="aspect-[4/5] overflow-hidden bg-paper-deep border-2 border-ink">
          <img
            src={PERSON.portrait}
            alt={PERSON.shortName}
            width={1400}
            height={2099}
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute -top-4 -right-3 sm:-right-5 rotate-[6deg] px-4 py-2 bg-teal text-paper font-mono text-sm uppercase tracking-wide border-2 border-ink shadow-[4px_4px_0_var(--color-ink)]"
        >
          {t('hero.sticker')}
        </span>
        <figcaption className="mt-3 font-serif italic text-[13px] text-muted">{t('hero.caption')}</figcaption>
      </figure>
    </section>
  );
};
