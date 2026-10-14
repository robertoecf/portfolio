import React from 'react';
import { translator } from '../../content/ui';
import { CREDENTIALS, EDUCATION, EXPERIENCE, LANGUAGES, formatPeriod, type Lang } from '../../content/profile';

export const Career: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = translator(lang);

  return (
    <section id="career" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-14">
      <h2 className="text-[13px] uppercase tracking-[0.18em] font-semibold border-b-[0.5px] border-ink pb-3">{t('career.label')}</h2>

      {EXPERIENCE.map((job) => (
        <article key={job.id} className="grid grid-cols-12 gap-x-6 gap-y-3 py-10 border-b border-ink/20">
          <div className="col-span-12 sm:col-span-3">
            <p className="font-mono text-[12px] text-teal">{formatPeriod(job, lang)}</p>
            <p className="mt-1 font-medium">{job.company}</p>
            <p className="text-[13px] text-muted">{job.location[lang]}</p>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <h3 className="font-serif text-[30px] leading-tight">{job.title[lang]}</h3>
            {job.bullets[lang].length > 0 && <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-body">
              {job.bullets[lang].map((b) => (
                <li key={b} className="pl-5 relative">
                  <span aria-hidden="true" className="absolute left-0 top-[0.6em] w-1.5 h-1.5 bg-teal" />
                  {b}
                </li>
              ))}
            </ul>}
          </div>
        </article>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 text-[14px]">
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.14em] text-muted">{t('career.credentials')}</h3>
          <ul className="mt-3 space-y-3">
            {CREDENTIALS.map((c) => (
              <li key={c.id}>
                <span className="font-serif text-[22px]">{c.short}</span>
                <span className="block text-body">{c.detail[lang]}</span>
                <span className="block text-muted text-[13px]">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.14em] text-muted">{t('career.education')}</h3>
          <ul className="mt-3 space-y-3">
            {EDUCATION.map((e) => (
              <li key={e.id}>
                <span className="block font-medium">{e.degree[lang]}</span>
                <span className="block text-body">{e.school[lang]}</span>
                <span className="block font-mono text-[12px] text-muted">{e.period[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.14em] text-muted">{t('career.languages')}</h3>
          <ul className="mt-3 space-y-2">
            {LANGUAGES.map((l) => (
              <li key={l.name.en} className="flex justify-between border-b border-ink/10 pb-2">
                <span>{l.name[lang]}</span>
                <span className="text-muted">{l.level[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
