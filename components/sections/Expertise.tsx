import React from 'react';
import { Brain, Layout, Database, Coins } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { EXPERTISE } from '../../content/profile';

const ICONS = { strategy: Brain, product: Layout, data: Database, finance: Coins };

const SkillCard = ({ title, icon: Icon, skills, index }: { title: string, icon: any, skills: string[], index: string }) => (
  <div className="group relative p-8 glass-panel rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 border border-white/5">
          <Icon className="w-6 h-6 text-slate-200" />
        </div>
        <span className="font-mono text-xs text-slate-600">{index}</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{title}</h3>
      
      <ul className="space-y-3 mt-auto">
        {skills.map((skill, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
            <span className="w-1 h-1 rounded-full bg-ethereal-orange/50" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Expertise: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="expertise" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-ethereal-border pb-8">
           <div className="max-w-2xl">
             <h2 className="text-xs font-mono text-ethereal-orange mb-4 tracking-[0.2em] uppercase">{t('expertise.core')}</h2>
             <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight md:leading-none">
               {t('expertise.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-ethereal-green">{t('expertise.title.finance')}</span> {t('expertise.title.mid')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">{t('expertise.title.tech')}</span>{t('expertise.title.suffix')}
             </h3>
           </div>
           <p className="text-slate-400 max-w-xs text-sm leading-relaxed">
             {t('expertise.desc')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTISE.map((area, i) => (
            <SkillCard
              key={area.id}
              index={String(i + 1).padStart(2, '0')}
              title={area.title[language]}
              icon={ICONS[area.id]}
              skills={area.items[language]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};