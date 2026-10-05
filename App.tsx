import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Expertise } from './components/sections/Expertise';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { AIChat } from './components/sections/AIChat';
import { SocialLinks } from './components/SocialLinks';
import { useLanguage } from './contexts/LanguageContext';
import { PERSON } from './content/profile';

// CONFIGURATION: Set to true to enable the colorful background blobs
const ENABLE_AURORA = false;

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const { t } = useLanguage();

  useEffect(() => {
    // Ensure page starts at top on refresh/load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-ethereal-dark text-ethereal-white selection:bg-ethereal-orange/30 selection:text-white font-sans overflow-hidden">
      
      {/* --- Layer 1: Aurora Background (Deepest) --- */}
      {ENABLE_AURORA && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Purple Nebula - Dominant top/left (Futuro Vibe) - Reduced Size */}
          <div className="absolute top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-ethereal-purple rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-blob" />
          
          {/* Cyan Nebula - Accent bottom/right (Futuro Vibe) - Reduced Size */}
          <div className="absolute bottom-[-5%] right-[-5%] w-[25vw] h-[25vw] bg-ethereal-cyan rounded-full mix-blend-screen filter blur-[60px] opacity-25 animate-blob" style={{ animationDelay: '2s' }} />
          
          {/* Deep Blue Base - Center/Flowing - Reduced Size */}
          <div className="absolute top-[30%] left-[20%] w-[20vw] h-[20vw] bg-ethereal-blue rounded-full mix-blend-screen filter blur-[60px] opacity-30 animate-blob" style={{ animationDelay: '4s' }} />
          
          {/* Green Tech Hint - Subtle bottom/left - Reduced Size */}
          <div className="absolute bottom-[10%] left-[5%] w-[20vw] h-[20vw] bg-ethereal-green rounded-full mix-blend-screen filter blur-[60px] opacity-10 animate-blob" style={{ animationDelay: '6s' }} />
        </div>
      )}

      {/* --- Layer 2: Tech Grid (Texture) --- */}
      {/* Base subtle grid (always visible) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-tech-grid bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] opacity-20" />

      {/* Interactive Mouse Grid Spotlight (Activated by mouse) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-[size:40px_40px] transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)`,
          maskImage: `radial-gradient(175px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(175px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />

      {/* --- Layer 3: Laser Layer (Subtle) --- */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {/* Laser 1: Horizontal Purple - Top */}
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ethereal-purple to-transparent opacity-0 animate-laser-x" />
        
        {/* Laser 2: Vertical Cyan - Right */}
        <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-ethereal-cyan to-transparent opacity-0 animate-laser-y" style={{ animationDelay: '5s' }} />
        
        {/* Laser 3: Horizontal Blue - Bottom */}
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ethereal-blue to-transparent opacity-0 animate-laser-x" style={{ animationDelay: '12s' }} />
      </div>

      {/* --- Layer 4: Content --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Hero />
          <Expertise />
          <Experience />
          <Projects />
          <AIChat />
        </main>

        {/* Footer */}
        <footer id="contact" className="relative border-t border-ethereal-border bg-black/40 backdrop-blur-xl">
           <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="text-center md:text-left space-y-3">
                 <div className="text-2xl font-serif font-bold text-white">{PERSON.displayName}</div>
                 <p className="text-slate-400 text-sm max-w-md font-light">
                    {t('footer.desc')}
                 </p>
              </div>
              
              <SocialLinks />
           </div>
           <div className="max-w-7xl mx-auto px-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              <p>© {new Date().getFullYear()} {t('footer.system')}</p>
              <p className="text-center md:text-right">{t('footer.mark')}</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;