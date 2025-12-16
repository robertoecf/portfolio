import React from 'react';
import { ArrowRight, Activity, Globe, Cpu } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-ethereal-blue/30 border border-ethereal-blue/50 text-[10px] font-mono tracking-[0.2em] uppercase text-blue-200 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {t('hero.systemReady')}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter text-white leading-[0.9] mix-blend-overlay opacity-90">
              Roberto<br />
              Freitas
            </h1>
            <h2 className="text-xl sm:text-2xl font-mono text-ethereal-orange/80 pt-2 flex items-center gap-4">
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span>{t('hero.roles.strategy')}</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span>{t('hero.roles.ops')}</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span>{t('hero.roles.product')}</span>
            </h2>
          </div>
          
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-light border-l border-ethereal-border pl-6 py-2">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.viewExp')}
            </Button>
            <Button variant="ghost" size="lg" onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })} className="group">
              <span className="mr-2 font-mono text-xs text-slate-400 group-hover:text-white">{t('hero.initChat')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Abstract Visual / HUD */}
        <div className="lg:col-span-5 relative hidden lg:block">
           <div className="relative w-full aspect-square max-w-[450px] mx-auto animate-float">
              
              {/* Glass Card HUD */}
              <div className="absolute inset-0 glass-panel rounded-3xl p-8 flex flex-col justify-between overflow-hidden group">
                
                {/* HUD Header */}
                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 mb-1">{t('hero.hud.status')}</div>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono font-bold">
                      <Activity className="w-4 h-4" />
                      {t('hero.hud.optimal')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">{t('hero.hud.location')}</div>
                    <div className="text-white text-sm font-medium">São Paulo, BR</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-ethereal-blue/50 transition-colors duration-300">
                    <Cpu className="w-5 h-5 text-ethereal-blue mb-2" />
                    <div className="text-2xl font-bold text-white">98.2%</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">{t('hero.hud.evalAcc')}</div>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-ethereal-green/50 transition-colors duration-300">
                    <Globe className="w-5 h-5 text-ethereal-green mb-2" />
                    <div className="text-2xl font-bold text-white">{t('hero.hud.aumValue')}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">{t('hero.hud.aum')}</div>
                  </div>
                </div>

                {/* Bottom Code Snippet */}
                <div className="bg-black/40 rounded-lg p-4 border border-white/5 font-mono text-[10px] text-slate-400 overflow-hidden">
                  <div className="flex gap-2 mb-2 border-b border-white/5 pb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <span className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <p className="opacity-70">
                    <span className="text-purple-400">function</span> <span className="text-blue-400">optimizeGrowth</span>() {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-emerald-400">return</span> integration(finance, tech);<br/>
                    {'}'}
                  </p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};