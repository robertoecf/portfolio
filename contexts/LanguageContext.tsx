import React, { createContext, useContext, useState, ReactNode } from 'react';
import { languageForHost, type Lang } from '../content/profile';

type Language = Lang;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  en: {
    nav: { work: 'Work', career: 'Career', ask: 'Ask', contact: 'Contact' },
    hero: {
      kicker: 'CFP® financial planner · Software builder',
      title: 'I’ve spent eight years planning family wealth.',
      titleAccent: 'Now I build the software my profession still doesn’t have.',
      notes: ['CFP® (Planejar) and CEA (ANBIMA)', 'Client book above USD 20M at Warren', 'LLM evaluation for finance via Mercor'],
      caption: 'Fig. 1: Roberto Freitas, São Paulo',
      sticker: 'CFP® who ships',
      cta: 'See the work',
      ask: 'Ask about Roberto',
    },
    work: {
      label: 'Index of work',
      more: 'Also built',
      pinned: 'Pinned · open source',
      all: 'All repositories on GitHub',
    },
    career: {
      label: 'Career',
      education: 'Education',
      credentials: 'Credentials',
      languages: 'Languages',
    },
    chat: {
      label: 'Ask',
      title: 'Ask about Roberto',
      subtitle: 'An AI assistant that answers from his résumé: career, projects, how he works.',
      you: 'You',
      assistant: 'Assistant',
      placeholder: 'e.g. What is Wealthuman OS?',
      send: 'Send',
      disclaimer: 'AI can make mistakes. For anything important, talk to Roberto.',
      initialMessage: 'Hi. I can answer questions about Roberto’s career, his projects and how he works. What would you like to know?',
      processing: 'Thinking…',
    },
    footer: {
      title: 'Let’s talk.',
      desc: 'Wealth planning, the software behind it, or both.',
      mark: 'CFP® is a mark owned by FPSB',
    },
  },
  pt: {
    nav: { work: 'Trabalho', career: 'Trajetória', ask: 'Pergunte', contact: 'Contato' },
    hero: {
      kicker: 'Planejador financeiro CFP® · Construtor de software',
      title: 'Planejo o patrimônio de famílias há oito anos.',
      titleAccent: 'Agora construo o software que essa profissão ainda não tem.',
      notes: ['CFP® (Planejar) e CEA (ANBIMA)', 'Carteira de clientes acima de US$ 20 mi na Warren', 'Avaliação de LLMs para finanças via Mercor'],
      caption: 'Fig. 1: Roberto Freitas, São Paulo',
      sticker: 'CFP® que programa',
      cta: 'Ver o trabalho',
      ask: 'Pergunte sobre o Roberto',
    },
    work: {
      label: 'Índice do trabalho',
      more: 'Também construí',
      pinned: 'Fixado · open source',
      all: 'Todos os repositórios no GitHub',
    },
    career: {
      label: 'Trajetória',
      education: 'Formação',
      credentials: 'Certificações',
      languages: 'Idiomas',
    },
    chat: {
      label: 'Pergunte',
      title: 'Pergunte sobre o Roberto',
      subtitle: 'Um assistente de IA que responde a partir do currículo dele: carreira, projetos e forma de trabalhar.',
      you: 'Você',
      assistant: 'Assistente',
      placeholder: 'Ex.: O que é o Wealthuman OS?',
      send: 'Enviar',
      disclaimer: 'A IA pode errar. Para decisões financeiras, converse com o Roberto.',
      initialMessage: 'Olá. Posso responder perguntas sobre a carreira do Roberto, os projetos dele e a forma como ele trabalha. O que você quer saber?',
      processing: 'Pensando…',
    },
    footer: {
      title: 'Vamos conversar.',
      desc: 'Planejamento patrimonial, o software por trás dele, ou os dois.',
      mark: 'A marca CFP® pertence à FPSB',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getDefaultLanguage = (): Language =>
  typeof window !== 'undefined' ? languageForHost(window.location.hostname) : 'en';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage);

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => obj && obj[key], translations[language]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
