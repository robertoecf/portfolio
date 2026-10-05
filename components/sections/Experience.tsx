import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CREDENTIALS, EDUCATION, EXPERIENCE, LANGUAGES, formatPeriod } from '../../content/profile';

const ResumeItem = ({ 
  period, 
  title, 
  company, 
  description 
}: { 
  period: string; 
  title: string; 
  company: string; 
  description: string[] 
}) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-12 group hover:bg-white/[0.02] transition-colors rounded-xl md:p-6 -mx-6">
    
    {/* Period */}
    <div className="md:col-span-3 mb-2 md:mb-0 md:text-right pt-1">
      <span className="inline-block font-mono text-xs text-ethereal-orange tracking-wider mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
        {period}
      </span>
      <div className="hidden md:block text-slate-500 text-sm font-medium">{company}</div>
    </div>

    {/* Line/Dot */}
    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-ethereal-border md:hidden" />
    <div className="absolute left-[-4px] top-8 w-2 h-2 rounded-full bg-ethereal-orange md:hidden shadow-[0_0_10px_#E48200]" />

    {/* Content */}
    <div className="md:col-span-9 relative border-l border-transparent md:border-ethereal-border md:pl-12">
      {/* Desktop Dot */}
      <div className="hidden md:block absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 group-hover:border-ethereal-orange group-hover:bg-ethereal-orange transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(228,130,0,0.6)]" />
      
      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{title}</h4>
      <div className="md:hidden text-slate-400 mb-4 font-medium text-sm">{company}</div>
      
      <ul className="space-y-3 mt-4">
        {description.map((item, i) => (
          <li key={i} className="text-slate-400 text-sm leading-relaxed flex items-start gap-3 group-hover:text-slate-300 transition-colors">
            <span className="text-slate-700 mt-2 text-[6px] opacity-50">■</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Experience: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 pl-6 border-l-2 border-ethereal-blue">
          <h2 className="text-4xl font-bold text-white mb-2">{t('experience.title')}</h2>
          <p className="text-slate-400 font-mono text-xs tracking-widest uppercase">{t('experience.logs')}</p>
        </div>

        <div className="space-y-8 relative">
          {/* Vertical Line Desktop */}
          <div className="absolute left-[25%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ethereal-border to-transparent hidden md:block" />

          {EXPERIENCE.map((job) => (
            <ResumeItem
              key={job.id}
              period={formatPeriod(job, language)}
              title={job.title[language]}
              company={job.company}
              description={job.bullets[language]}
            />
          ))}
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl">
                <h3 className="font-mono text-xs text-sky-400 mb-6 uppercase tracking-widest">{t('experience.education')}</h3>
                <div className="space-y-6">
                    {EDUCATION.map((edu) => (
                      <div key={edu.id} className="group">
                          <div className="text-white font-bold group-hover:text-sky-300 transition-colors">{edu.degree[language]}</div>
                          <div className="text-slate-500 text-sm mb-1">{edu.school[language]}</div>
                          <div className="text-slate-600 font-mono text-[10px]">{edu.period}</div>
                      </div>
                    ))}
                </div>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl">
                <h3 className="font-mono text-xs text-emerald-500 mb-6 uppercase tracking-widest">{t('experience.credentials')}</h3>
                <div className="space-y-8">
                    {CREDENTIALS.map((cred) => (
                      <div key={cred.id}>
                          <div className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            {cred.name[language]}
                          </div>
                          <div className="text-slate-500 text-sm">{cred.detail[language]}</div>
                          <div className="text-slate-600 text-xs mt-1">{cred.issuer}</div>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {LANGUAGES.map((lang) => (
                          <div key={lang.name.en} className="p-3 rounded bg-black/40 border border-white/5">
                              <div className="text-slate-300 text-sm font-medium">{lang.name[language]}</div>
                              <div className="text-slate-600 text-[10px] font-mono uppercase">{lang.level[language]}</div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};