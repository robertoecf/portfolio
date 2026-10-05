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
    nav: {
      expertise: 'Expertise',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      role: 'Strategy & Operations',
      industry: 'Fintech'
    },
    hero: {
      systemReady: 'System_Ready_For_Work',
      roles: {
        strategy: 'Strategy',
        ops: 'Operations',
        product: 'Product'
      },
      description: '8+ years integrating financial rigor with product velocity. Specialized in structuring ambiguous problems and driving cross-functional execution in AI and Fintech environments.',
      viewExp: 'View Experience',
      initChat: 'INIT_CHAT_PROTOCOL',
      hud: {
        status: 'CURRENT_STATUS',
        optimal: 'OPTIMAL_PERFORMANCE',
        location: 'LOCATION',
        certs: 'CERTIFICATIONS',
        aumValue: '$20M+',
        aum: 'AUM_MANAGED'
      }
    },
    expertise: {
      core: 'Core_Competencies',
      title: {
        prefix: 'Bridging the gap between',
        finance: 'finance',
        mid: '&',
        tech: 'technology',
        suffix: '.'
      },
      desc: 'A multidisciplinary skillset honed through years of high-stakes advisory and AI operations.'
    },
    experience: {
      title: 'Career History',
      logs: 'DATA_LOGS: 2017 — PRESENT',
      education: 'Education_Background',
      credentials: 'Credentials & Locale'
    },
    projects: {
      label: 'Open_Source',
      title: 'Things I build',
      desc: 'Tools at the intersection of finance, data and AI agents. All open source.',
      featured: 'Featured',
      all: 'All repositories on GitHub'
    },
    chat: {
      status: 'AI Assistant Online',
      title: 'Interactive Dossier',
      subtitle: 'Ask specific questions about work history, methodology, or technical skills.',
      connection: 'Secure_Connection_Established',
      placeholder: 'Enter command or question...',
      disclaimer: 'AI can make errors. Verify important info.',
      initialMessage: "System initialized. I am Roberto's Digital Associate. Accessing professional archives... Ready for queries regarding Strategy, Operations, or Finance.",
      processing: 'PROCESSING_REQUEST...'
    },
    footer: {
      desc: 'Bridging sophisticated financial planning with operational excellence.',
      system: 'SYSTEM_ONLINE',
      mark: 'CFP® MARK OWNED BY FPSB'
    }
  },
  pt: {
    nav: {
      expertise: 'Especialidades',
      experience: 'Trajetória',
      projects: 'Projetos',
      contact: 'Contato',
      role: 'Consultor Financeiro',
      industry: 'Wealth Mgmt'
    },
    hero: {
      systemReady: 'Consultoria_Patrimonial_Ativa',
      roles: {
        strategy: 'Consultor & Planejador Financeiro',
        ops: 'Especialista em Investimentos',
        product: 'Gestor Patrimonial'
      },
      description: 'Consultor Financeiro (CFP®) com mais de 8 anos de experiência em fintechs e wealth management. Especialista em construção de patrimônio, planejamento sucessório e estratégias de investimento para clientes de alta renda.',
      viewExp: 'Ver Trajetória',
      initChat: 'FALAR_COM_IA',
      hud: {
        status: 'DISPONIBILIDADE',
        optimal: 'Online',
        location: 'Local',
        certs: 'CERTIFICAÇÕES',
        aumValue: '+R$ 120M',
        aum: 'ATIVOS_SOB_GESTÃO'
      }
    },
    expertise: {
      core: 'Soluções_Financeiras',
      title: {
        prefix: 'Protegendo e expandindo seu',
        finance: 'patrimônio',
        mid: 'com',
        tech: 'inteligência',
        suffix: '.'
      },
      desc: 'Uma abordagem holística que une planejamento financeiro rigoroso, gestão de investimentos global e tecnologia de ponta.'
    },
    experience: {
      title: 'Histórico Profissional',
      logs: 'REGISTRO: 2017 — PRESENTE',
      education: 'Formação',
      credentials: 'Certificações & Idiomas'
    },
    projects: {
      label: 'Código_Aberto',
      title: 'Projetos',
      desc: 'Ferramentas na interseção entre finanças, dados e agentes de IA. Todas open source.',
      featured: 'Destaque',
      all: 'Todos os repositórios no GitHub'
    },
    chat: {
      status: 'Assistente Virtual',
      title: 'Consultoria Interativa',
      subtitle: 'Tire dúvidas sobre minha metodologia de trabalho, experiência com investimentos ou agende uma conversa.',
      connection: 'Conexão_Segura',
      placeholder: 'Ex: Como você trabalha com planejamento sucessório?',
      disclaimer: 'A IA pode cometer erros. Para decisões financeiras, agende uma reunião.',
      initialMessage: "Olá. Sou o assistente virtual do Roberto. Posso detalhar como ele ajuda famílias a proteger e multiplicar patrimônio. Sobre o que gostaria de saber?",
      processing: 'ANALISANDO...'
    },
    footer: {
      desc: 'Consultoria financeira fiduciária, transparente e alinhada aos seus interesses.',
      system: 'SISTEMA_ONLINE',
      mark: 'MARCA CFP® PERTENCE À FPSB'
    }
  }
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
