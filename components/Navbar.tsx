import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
      <div className={`
        relative flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500
        ${scrolled 
          ? 'w-[90%] md:w-[700px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20' 
          : 'w-[95%] md:w-[1200px] bg-transparent border border-transparent'}
      `}>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ethereal-blue to-ethereal-green flex items-center justify-center border border-white/10">
            <span className="font-mono text-xs font-bold text-white">RF</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-white tracking-tight">Wealth Management</div>
            <div className="text-[10px] font-mono text-ethereal-orange tracking-widest uppercase">Fintech</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {['Expertise', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                if (item === 'Contact') {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-5 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {item}
            </a>
          ))}
          <button 
             onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
             className="ml-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-mono hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
          >
             <Terminal className="w-3 h-3" />
             AI_ASSISTANT
          </button>
        </div>

        <div className="md:hidden">
           <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
           <div className="absolute top-full left-0 right-0 mt-4 mx-auto w-full bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 overflow-hidden animate-fade-in-up">
              <a href="#expertise" onClick={() => setMobileOpen(false)} className="text-slate-300 text-sm hover:text-white">Expertise</a>
              <a href="#experience" onClick={() => setMobileOpen(false)} className="text-slate-300 text-sm hover:text-white">Experience</a>
              <button onClick={() => { document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }} className="text-left text-ethereal-orange text-sm font-mono">AI_ASSISTANT</button>
           </div>
        )}
      </div>
    </nav>
  );
};