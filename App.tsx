import React from 'react';
import { Masthead } from './components/Masthead';
import { Hero } from './components/sections/Hero';
import { Work } from './components/sections/Work';
import { Career } from './components/sections/Career';
import { AIChat } from './components/sections/AIChat';
import { Footer } from './components/Footer';

const App: React.FC = () => (
  <div className="min-h-screen bg-paper text-ink">
    <Masthead />
    <main>
      <Hero />
      <Work />
      <Career />
      <AIChat />
    </main>
    <Footer />
  </div>
);

export default App;
