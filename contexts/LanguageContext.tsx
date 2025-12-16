import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

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
        evalAcc: 'LLM_EVAL_ACCURACY',
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
      desc: 'A multidisciplinary skillset honed through years of high-stakes advisory and AI operations.',
      cards: {
        strategy: {
          title: 'Strategy & Ops',
          items: ["Problem Structuring", "Systems Thinking", "Roadmap Support", "KPI Definition", "Process Improvement"]
        },
        product: {
          title: 'Product & Customer',
          items: ["Customer Insights", "Requirement Gathering", "Feature Refinement", "Cross-functional Collab", "User Feedback Loops"]
        },
        data: {
          title: 'Data & AI',
          items: ["LLM Evaluation", "Synthetic Test Cases", "Excel & Spreadsheets", "Dashboarding", "Basic SQL & Python"]
        },
        finance: {
          title: 'Financial Expertise',
          items: ["Wealth Management", "Risk Assessment", "Tax & Retirement", "HNW Advisory", "CFP® Certified"]
        }
      }
    },
    experience: {
      title: 'Career History',
      logs: 'DATA_LOGS: 2017 — PRESENT',
      jobs: {
        mercor: {
          title: 'Subject-Matter Expert (Financial Services)',
          desc: [
            "Built evaluation frameworks, rubrics, and benchmark tasks to assess LLM performance in financial advising, planning, and wealth management use cases.",
            "Reviewed and scored complex AI-generated outputs, identifying reasoning gaps, hallucinations, and compliance risks in high-stakes financial scenarios.",
            "Collaborated with AI research and product teams by delivering structured feedback and synthetic test cases that informed model and product improvements.",
            "Used spreadsheets and basic SQL-style thinking to organize evaluation data, compare model variants, and support data-driven decisions on model changes."
          ]
        },
        warren: {
          title: 'Senior Financial Advisor & Strategic Contributor',
          desc: [
            "Manage a portfolio of high-net-worth (HNW) clients exceeding USD 20M in assets, combining financial planning and investment strategy with product feedback loops.",
            "Provide end-to-end financial planning (tax, succession, retirement, risk/insurance) and translate client needs into structured recommendations and scalable frameworks.",
            "Partner with product, operations, and leadership to refine onboarding, advisory workflows, and platform features, reducing friction for clients and internal teams.",
            "Identify market opportunities and client pain points, proposing strategic improvements that support the evolution of Warren from a fintech startup to a full-service platform."
          ]
        },
        ea: {
          title: 'Research Assistant',
          desc: [
            "Supported academic research projects by reviewing literature, helping structure theses and dissertations, and assisting with data analysis and writing."
          ]
        }
      },
      education: {
        title: 'Education_Background',
        ufrgs: 'Bachelor in Public Relations',
        senac: 'Technical Degree in Logistics'
      },
      credentials: {
        title: 'Credentials & Locale',
        cfp: 'CFP® Certified',
        planner: 'Certified Financial Planner',
        langs: {
          pt: 'Portuguese',
          ptLevel: 'Native',
          en: 'English',
          enLevel: 'Fluent'
        }
      }
    },
    chat: {
      status: 'Gemini 2.5 Active',
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
      contact: 'Contato',
      role: 'Consultor Financeiro',
      industry: 'Wealth Mgmt'
    },
    hero: {
      systemReady: 'Consultoria_Patrimonial_Ativa',
      roles: {
        strategy: 'Consultor Financeiro',
        ops: 'Planejador CFP®',
        product: 'Expert em IA'
      },
      description: 'Consultor Financeiro (CFP®) com mais de 8 anos de experiência em fintechs e wealth management. Especialista em construção de patrimônio, planejamento sucessório e estratégias de investimento para clientes de alta renda.',
      viewExp: 'Ver Trajetória',
      initChat: 'FALAR_COM_IA',
      hud: {
        status: 'DISPONIBILIDADE',
        optimal: 'ACEITANDO_CLIENTES',
        location: 'SÃO PAULO, SP',
        evalAcc: 'CERTIFICAÇÃO',
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
      desc: 'Uma abordagem holística que une planejamento financeiro rigoroso, gestão de investimentos global e tecnologia de ponta.',
      cards: {
        strategy: {
          title: 'Planejamento Financeiro',
          items: ["Planejamento Sucessório", "Eficiência Tributária", "Planejamento de Aposentadoria", "Gestão de Riscos e Seguros", "Fluxo de Caixa"]
        },
        product: {
          title: 'Gestão de Investimentos',
          items: ["Alocação de Ativos", "Estratégia Local e Global", "Rebalanceamento de Carteira", "Análise de Produtos", "Renda Fixa & Variável"]
        },
        data: {
          title: 'Dados & Tecnologia',
          items: ["Consolidação de Carteira", "Análise via IA", "Relatórios Personalizados", "Expertise em Fintech", "Avaliação de LLMs"]
        },
        finance: {
          title: 'Relacionamento',
          items: ["Atendimento High-Touch", "Fiduciário (Cliente em 1º)", "Transparência Total", "Acompanhamento Contínuo", "Consultoria Proativa"]
        }
      }
    },
    experience: {
      title: 'Histórico Profissional',
      logs: 'REGISTRO: 2017 — PRESENTE',
      jobs: {
        mercor: {
          title: 'Especialista em Consultoria Financeira (IA)',
          desc: [
            "Atuo como Especialista (SME) em Serviços Financeiros, focado em aprimorar a precisão de LLMs para grandes laboratórios de pesquisa em IA (via Mercor).",
            "Desenvolvo frameworks de avaliação para garantir que a IA forneça orientações financeiras precisas, éticas e alinhadas às melhores práticas de Wealth Management.",
            "Contribuo para a evolução de ferramentas de IA que auxiliarão o futuro do planejamento financeiro global."
          ]
        },
        warren: {
          title: 'Consultor Financeiro Sênior & Sócio',
          desc: [
            "Gestão de carteira de clientes de alta renda (High Net Worth) com ativos superiores a USD 20 milhões (R$ 120M+).",
            "Ofereço planejamento financeiro completo (fiscal, sucessório, aposentadoria), criando estratégias personalizadas alinhadas aos objetivos de vida do cliente.",
            "Atuo no desenvolvimento de negócios, identificando necessidades de mercado e construindo relacionamentos de confiança de longo prazo.",
            "Colaboro com equipes internas para refinar a plataforma da Warren, garantindo uma experiência de investimento premium e sem atritos."
          ]
        },
        ea: {
          title: 'Assistente de Pesquisa',
          desc: [
            "Apoio em projetos de pesquisa acadêmica, estruturação de teses e análise de dados no Centro de Pesquisa em Negócios da UFRGS."
          ]
        }
      },
      education: {
        title: 'Formação',
        ufrgs: 'Bacharel em Relações Públicas',
        senac: 'Técnico em Logística'
      },
      credentials: {
        title: 'Certificações',
        cfp: 'Certificação CFP®',
        planner: 'Planejador Financeiro Certificado',
        langs: {
          pt: 'Português',
          ptLevel: 'Nativo',
          en: 'Inglês',
          enLevel: 'Proficiente'
        }
      }
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

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

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
