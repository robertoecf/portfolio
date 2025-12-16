import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Expertise } from './components/sections/Expertise';
import { Experience } from './components/sections/Experience';
import { AIChat } from './components/sections/AIChat';
import { Mail, Linkedin, FileText } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

// CONFIGURATION: Set to true to enable the colorful background blobs
const ENABLE_AURORA = false;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
        <main className="flex-grow">
          <Hero />
          <Expertise />
          <Experience />
          <AIChat />
        </main>

        {/* Footer */}
        <footer id="contact" className="relative border-t border-ethereal-border bg-black/40 backdrop-blur-xl">
           <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="text-center md:text-left space-y-3">
                 <div className="text-2xl font-serif font-bold text-white">Roberto E. C. Freitas, CFP®</div>
                 <p className="text-slate-400 text-sm max-w-md font-light">
                    {t('footer.desc')}
                 </p>
              </div>
              
              <div className="flex gap-6">
                 <a href="https://wa.me/5511934598609" target="_blank" rel="noreferrer" className="group p-4 rounded-full bg-white/5 border border-ethereal-border hover:bg-emerald-500/20 hover:border-emerald-500 hover:scale-110 transition-all duration-500">
                    <WhatsAppIcon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                 </a>
                 <a href="mailto:robertoecf@gmail.com" className="group p-4 rounded-full bg-white/5 border border-ethereal-border hover:bg-ethereal-orange/20 hover:border-ethereal-orange hover:scale-110 transition-all duration-500">
                    <Mail className="w-5 h-5 text-slate-400 group-hover:text-ethereal-orange" />
                 </a>
                 <a href="https://www.linkedin.com/in/robertoecf/" target="_blank" rel="noreferrer" className="group p-4 rounded-full bg-white/5 border border-ethereal-border hover:bg-ethereal-blue/50 hover:border-[#0077b5] hover:scale-110 transition-all duration-500">
                    <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                 </a>
                 {/*
                 <a href="/resume.pdf" className="group p-4 rounded-full bg-white/5 border border-ethereal-border hover:bg-white/20 hover:border-white hover:scale-110 transition-all duration-500">
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-white" />
                 </a>
                 */}
              </div>
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