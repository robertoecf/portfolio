// Single source of truth for profile data: identity, links, projects and career.
// Consumed by the React sections, the chat function (functions/api/chat.ts) and the
// build-time generators (content/seo.ts) that emit llms.txt, sitemap and knowledge pages.
// UI chrome strings (nav labels, section headings, button text) live in contexts/LanguageContext.tsx.

export type Lang = 'en' | 'pt';
export type Localized<T = string> = Record<Lang, T>;

export const SITE_URL: Localized = {
  en: 'https://robertoecf.com',
  pt: 'https://robertoecf.com.br',
};

export const LOCALE: Localized = { en: 'en', pt: 'pt-BR' };

export const PERSON = {
  name: 'Roberto E. C. Freitas',
  shortName: 'Roberto Freitas',
  displayName: 'Roberto E. C. Freitas, CFP®',
  photo: '/profile.jpg',
  portrait: '/photos/roberto-portrait.jpg',
  portraitSmile: '/photos/roberto-smile.jpg',
  location: { city: 'São Paulo', region: 'SP', country: 'BR', label: 'São Paulo · SP · Brasil' },
  headline: {
    en: 'CFP® financial planner who builds software for wealth management',
    pt: 'Planejador financeiro CFP® que constrói software para gestão patrimonial',
  } as Localized,
  summary: {
    en: 'CFP® financial planner (Planejar / FPSB) and CEA (ANBIMA) with 8+ years in fintech and wealth management. Manages a book of high-net-worth clients exceeding USD 20M in assets at Warren Investimentos and works as a Subject-Matter Expert in Financial Services (via Mercor), improving LLM reliability for financial reasoning. Builds software for his own profession: Wealthuman OS, an operating system for wealth advisors that connects probabilistic planning, a family-centric CRM and AI agents; Futuro em Foco, a retirement simulator built on 1,001-path Monte Carlo projections; and OpenFinData, open-source infrastructure for Brazilian public financial data. Also builds open-source tools for AI coding agents.',
    pt: 'Planejador financeiro CFP® (Planejar / FPSB) e CEA (ANBIMA), com mais de 8 anos em fintech e gestão de patrimônio (wealth management). Gerencia carteira de clientes de alta renda com ativos superiores a USD 20 milhões (R$ 120M+) na Warren Investimentos e atua como especialista em avaliação de IA para o setor financeiro (via Mercor). Constrói software para a própria profissão: o Wealthuman OS, sistema operacional do consultor patrimonial que une planejamento probabilístico, CRM centrado em família e agentes de IA; o Futuro em Foco, simulador de aposentadoria com projeções Monte Carlo de 1.001 trajetórias; e o OpenFinData, infraestrutura open source de dados financeiros públicos do Brasil. Também desenvolve ferramentas open source para agentes de IA.',
  } as Localized,
};

export const SEO = {
  title: {
    en: 'Roberto E. C. Freitas, CFP® | Financial planner who builds software',
    pt: 'Roberto E. C. Freitas, CFP® | Planejador financeiro que constrói software',
  } as Localized,
  description: {
    en: 'CFP® financial planner with 8+ years in wealth management, building software for the profession: Wealthuman OS, Futuro em Foco and OpenFinData.',
    pt: 'Planejador financeiro CFP® com mais de 8 anos em gestão de patrimônio, construindo software para a profissão: Wealthuman OS, Futuro em Foco e OpenFinData.',
  } as Localized,
};

export const CONTACT = {
  email: 'robertoecf@gmail.com',
  whatsapp: { display: '+55 11 93459-8609', url: 'https://wa.me/5511934598609' },
};

export type SocialId = 'whatsapp' | 'email' | 'linkedin' | 'github';

export interface SocialLink {
  id: SocialId;
  label: string;
  url: string;
  handle: string;
  /** Public profile (goes into JSON-LD sameAs). Contact channels like email are not. */
  profile: boolean;
}

// Order here is the order in the footer. Add a new network by appending an entry
// (and an icon in components/SocialLinks.tsx).
export const SOCIALS: SocialLink[] = [
  { id: 'whatsapp', label: 'WhatsApp', url: CONTACT.whatsapp.url, handle: CONTACT.whatsapp.display, profile: false },
  { id: 'email', label: 'Email', url: `mailto:${CONTACT.email}`, handle: CONTACT.email, profile: false },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/robertoecf/', handle: 'in/robertoecf', profile: true },
  { id: 'github', label: 'GitHub', url: 'https://github.com/robertoecf', handle: '@robertoecf', profile: true },
];

export const GITHUB_URL = SOCIALS.find((s) => s.id === 'github')!.url;

export interface Project {
  id: string;
  name: string;
  featured?: boolean;
  category: Localized;
  description: Localized;
  /** One-line proof shown in italics under the description. */
  highlight?: Localized;
  tags: string[];
  status?: string;
  links: { label: string; url: string }[];
}

// Featured projects come first, in display order.
export const PROJECTS: Project[] = [
  {
    id: 'wealthuman',
    name: 'Wealthuman OS',
    featured: true,
    category: { en: 'Product · Wealth tech', pt: 'Produto · Wealth tech' },
    description: {
      en: 'Operating system for Brazilian wealth advisors. Connects probabilistic financial planning, a family-centric CRM and AI agents, automating the operational work so advisors have more time for clients.',
      pt: 'Sistema operacional do consultor patrimonial brasileiro. Conecta planejamento financeiro probabilístico, CRM centrado em família e agentes de IA, e automatiza o operacional para sobrar tempo para o cliente.',
    },
    highlight: {
      en: 'AI doesn’t replace the advisor. It removes the work that keeps the advisor from advising.',
      pt: 'IA não substitui o assessor. Ela remove o trabalho que impede o assessor de ser assessor.',
    },
    tags: ['TypeScript', 'PostgreSQL', 'AI agents'],
    links: [{ label: 'wealthuman.com.br', url: 'https://wealthuman.com.br' }],
  },
  {
    id: 'futuro-em-foco',
    name: 'Futuro em Foco',
    featured: true,
    category: { en: 'Product · Financial planning', pt: 'Produto · Planejamento financeiro' },
    description: {
      en: 'Retirement and wealth planning web app for Brazilian investors: projects retirement, maps the investor profile and emails a personalized plan.',
      pt: 'Aplicação de planejamento financeiro e de aposentadoria para o investidor brasileiro: projeta a aposentadoria, identifica o perfil de investidor e envia um plano personalizado por e-mail.',
    },
    highlight: {
      en: '1,001 Monte Carlo paths drawn on canvas, with pessimistic, median and optimistic scenarios.',
      pt: '1.001 trajetórias Monte Carlo desenhadas em canvas, com cenários pessimista, mediano e otimista.',
    },
    tags: ['React', 'Monte Carlo', 'Supabase'],
    links: [{ label: 'futuroemfoco.app.br', url: 'https://futuroemfoco.app.br' }],
  },
  {
    id: 'openfindata',
    name: 'OpenFinData',
    featured: true,
    category: { en: 'Financial data · Open source', pt: 'Dados financeiros · Open source' },
    description: {
      en: 'Open-source infrastructure for Brazilian public financial data. One auditable layer over BCB, CVM, B3, Tesouro, IBGE, IPEA, ANBIMA, SUSEP and more, exposed as an async Python library, REST API, CLI and MCP server for AI agents.',
      pt: 'Infraestrutura open source para dados financeiros públicos do Brasil. Uma camada única e auditável sobre BCB, CVM, B3, Tesouro, IBGE, IPEA, ANBIMA, SUSEP e outras fontes, disponível como biblioteca Python assíncrona, API REST, CLI e servidor MCP para agentes de IA.',
    },
    tags: ['Python', 'FastAPI', 'MCP', 'Open Data'],
    status: 'v0.3 alpha',
    links: [{ label: 'GitHub', url: 'https://github.com/robertoecf/OpenFinData' }],
  },
  {
    id: 'adversarial-review',
    name: 'adversarial-review',
    category: { en: 'AI agent tooling', pt: 'Ferramentas para agentes de IA' },
    description: {
      en: 'Cross-model adversarial review for coding agents (Claude Code, Codex, Pi, Grok). Routes plans and diffs to a different model family, so the reviewer never shares the author’s blind spots.',
      pt: 'Revisão adversarial entre modelos para agentes de código (Claude Code, Codex, Pi, Grok). Envia planos e diffs para outra família de modelos, para que o revisor nunca compartilhe os pontos cegos do autor.',
    },
    tags: ['Claude Code', 'Multi-LLM', 'Shell'],
    status: 'v0.9.9',
    links: [{ label: 'GitHub', url: 'https://github.com/robertoecf/adversarial-review' }],
  },
  {
    id: 'claude-code-statusbar',
    name: 'claude-code-statusbar',
    category: { en: 'AI agent tooling', pt: 'Ferramentas para agentes de IA' },
    description: {
      en: 'Minimal, information-dense status line for Claude Code: directory, git branch, model, context left and rate-limit windows with live time-until-reset. One npx command to install.',
      pt: 'Status line minimalista e densa para o Claude Code: diretório, branch, modelo, contexto restante e janelas de rate limit com contagem até o reset. Instala com um comando npx.',
    },
    tags: ['Claude Code', 'Shell', 'npm'],
    links: [
      { label: 'GitHub', url: 'https://github.com/robertoecf/claude-code-statusbar' },
      { label: 'npm', url: 'https://www.npmjs.com/package/@robertoecf/claude-code-statusbar' },
    ],
  },
  {
    id: 'agentic-coding-notify',
    name: 'agentic-coding-notify',
    category: { en: 'AI agent tooling', pt: 'Ferramentas para agentes de IA' },
    description: {
      en: 'macOS notification layer for coding agents (Claude Code, Codex, OpenCode, Pi): desktop alerts, sounds and spoken session labels, configured through a local web UI.',
      pt: 'Camada de notificações macOS para agentes de código (Claude Code, Codex, OpenCode, Pi): alertas, sons e identificação falada da sessão, configurados por uma interface web local.',
    },
    tags: ['macOS', 'Shell', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/robertoecf/agentic-coding-notify' }],
  },
  {
    id: 'obsidian-table-doctor',
    name: 'Table Doctor',
    category: { en: 'Productivity', pt: 'Produtividade' },
    description: {
      en: 'Obsidian plugin that repairs markdown tables broken by LLM output (blank lines between rows) on save, paste or open, with a dry-run diff preview.',
      pt: 'Plugin para Obsidian que corrige tabelas markdown quebradas por saídas de LLMs (linhas em branco entre as linhas) ao salvar, colar ou abrir, com prévia em modo dry run.',
    },
    tags: ['Obsidian', 'TypeScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/robertoecf/obsidian-table-doctor' }],
  },
  {
    id: 'writing-style',
    name: 'writing-style',
    category: { en: 'AI agent tooling', pt: 'Ferramentas para agentes de IA' },
    description: {
      en: 'Claude Code skill that writes in specific author styles (Jack Butcher, Anthropic, Morgan Housel) plus a personal blend.',
      pt: 'Skill para Claude Code que escreve em estilos de autores específicos (Jack Butcher, Anthropic, Morgan Housel) e em uma mistura pessoal.',
    },
    tags: ['Claude Code', 'Skill'],
    links: [{ label: 'GitHub', url: 'https://github.com/robertoecf/writing-style' }],
  },
];

export interface Job {
  id: string;
  company: string;
  start: string;
  /** Omit while the role is current. */
  end?: string;
  location: Localized;
  title: Localized;
  bullets: Localized<string[]>;
}

export const EXPERIENCE: Job[] = [
  {
    id: 'mercor',
    company: 'Mercor',
    start: '2025',
    location: { en: 'Remote (Contract)', pt: 'Remoto (Contrato)' },
    title: {
      en: 'Subject-Matter Expert (Financial Services)',
      pt: 'Especialista em Consultoria Financeira (IA)',
    },
    bullets: {
      en: [
        'Built evaluation frameworks, rubrics, and benchmark tasks to assess LLM performance in financial advising, planning, and wealth management use cases.',
        'Reviewed and scored complex AI-generated outputs, identifying reasoning gaps, hallucinations, and compliance risks in high-stakes financial scenarios.',
        'Collaborated with AI research and product teams by delivering structured feedback and synthetic test cases that informed model and product improvements.',
        'Used spreadsheets and basic SQL-style thinking to organize evaluation data, compare model variants, and support data-driven decisions on model changes.',
      ],
      pt: [
        'Atuo como Especialista (SME) em Serviços Financeiros, focado em aprimorar a precisão de LLMs para grandes laboratórios de pesquisa em IA (via Mercor).',
        'Desenvolvo frameworks de avaliação para garantir que a IA forneça orientações financeiras precisas, éticas e alinhadas às melhores práticas de Wealth Management.',
        'Contribuo para a evolução de ferramentas de IA que auxiliarão o futuro do planejamento financeiro global.',
      ],
    },
  },
  {
    id: 'warren',
    company: 'Warren Investimentos',
    start: '2018',
    location: { en: 'São Paulo, Brazil', pt: 'São Paulo, SP' },
    title: {
      en: 'Senior Financial Advisor & Strategic Contributor',
      pt: 'Consultor Financeiro Sênior & Sócio',
    },
    bullets: {
      en: [
        'Manage a portfolio of high-net-worth (HNW) clients exceeding USD 20M in assets, combining financial planning and investment strategy with product feedback loops.',
        'Provide end-to-end financial planning (tax, succession, retirement, risk/insurance) and translate client needs into structured recommendations and scalable frameworks.',
        'Partner with product, operations, and leadership to refine onboarding, advisory workflows, and platform features, reducing friction for clients and internal teams.',
        'Identify market opportunities and client pain points, proposing strategic improvements that support the evolution of Warren from a fintech startup to a full-service platform.',
      ],
      pt: [
        'Gestão de carteira de clientes de alta renda (High Net Worth) com ativos superiores a USD 20 milhões (R$ 120M+).',
        'Ofereço planejamento financeiro completo (fiscal, sucessório, aposentadoria), criando estratégias personalizadas alinhadas aos objetivos de vida do cliente.',
        'Atuo no desenvolvimento de negócios, identificando necessidades de mercado e construindo relacionamentos de confiança de longo prazo.',
        'Colaboro com equipes internas para refinar a plataforma da Warren, garantindo uma experiência de investimento premium e sem atritos.',
      ],
    },
  },
  {
    id: 'ea',
    company: 'EA-UFRGS',
    start: '2017',
    end: '2018',
    location: { en: 'Porto Alegre, Brazil', pt: 'Porto Alegre, RS' },
    title: { en: 'Research Assistant', pt: 'Assistente de Pesquisa' },
    bullets: {
      en: [
        'Supported academic research projects by reviewing literature, helping structure theses and dissertations, and assisting with data analysis and writing.',
      ],
      pt: [
        'Apoio em projetos de pesquisa acadêmica, estruturação de teses e análise de dados no Centro de Pesquisa em Negócios da UFRGS.',
      ],
    },
  },
];

export const formatPeriod = (job: Job, lang: Lang) =>
  `${job.start} ${lang === 'pt' ? 'a' : 'to'} ${job.end ?? (lang === 'pt' ? 'hoje' : 'present')}`;

export interface ExpertiseArea {
  id: 'strategy' | 'product' | 'data' | 'finance';
  title: Localized;
  items: Localized<string[]>;
}

// The two languages intentionally frame different audiences:
// EN targets strategy/ops roles in tech, PT targets wealth-management clients.
export const EXPERTISE: ExpertiseArea[] = [
  {
    id: 'strategy',
    title: { en: 'Strategy & Ops', pt: 'Planejamento Financeiro' },
    items: {
      en: ['Problem Structuring', 'Systems Thinking', 'Roadmap Support', 'KPI Definition', 'Process Improvement'],
      pt: ['Planejamento Sucessório', 'Eficiência Tributária', 'Planejamento de Aposentadoria', 'Gestão de Riscos e Seguros', 'Fluxo de Caixa'],
    },
  },
  {
    id: 'product',
    title: { en: 'Product & Customer', pt: 'Gestão de Investimentos' },
    items: {
      en: ['Customer Insights', 'Requirement Gathering', 'Feature Refinement', 'Cross-functional Collab', 'User Feedback Loops'],
      pt: ['Alocação de Ativos', 'Estratégia Local e Global', 'Rebalanceamento de Carteira', 'Análise de Produtos', 'Renda Fixa & Variável'],
    },
  },
  {
    id: 'data',
    title: { en: 'Data & AI', pt: 'Dados & Tecnologia' },
    items: {
      en: ['LLM Evaluation', 'Synthetic Test Cases', 'Excel & Spreadsheets', 'Dashboarding', 'Basic SQL & Python'],
      pt: ['Consolidação de Carteira', 'Análise via IA', 'Relatórios Personalizados', 'Expertise em Fintech', 'Avaliação de LLMs'],
    },
  },
  {
    id: 'finance',
    title: { en: 'Financial Expertise', pt: 'Relacionamento' },
    items: {
      en: ['Wealth Management', 'Risk Assessment', 'Tax & Retirement', 'HNW Advisory', 'CFP® Certified'],
      pt: ['Atendimento High-Touch', 'Fiduciário (Cliente em 1º)', 'Transparência Total', 'Acompanhamento Contínuo', 'Consultoria Proativa'],
    },
  },
];

export const EDUCATION = [
  {
    id: 'ufrgs',
    degree: { en: 'Bachelor in Public Relations', pt: 'Bacharel em Relações Públicas' } as Localized,
    school: { en: 'Federal University of Rio Grande do Sul (UFRGS)', pt: 'Universidade Federal do Rio Grande do Sul (UFRGS)' } as Localized,
    period: { en: '2017 to 2023', pt: '2017 a 2023' } as Localized,
  },
  {
    id: 'senac',
    degree: { en: 'Technical Degree in Logistics', pt: 'Técnico em Logística' } as Localized,
    school: { en: 'SENAC-RS', pt: 'SENAC-RS' } as Localized,
    period: { en: '2015 to 2016', pt: '2015 a 2016' } as Localized,
  },
];

export const CREDENTIALS = [
  {
    id: 'cfp',
    short: 'CFP®',
    name: { en: 'CFP® Certified', pt: 'Certificação CFP®' } as Localized,
    detail: { en: 'Certified Financial Planner', pt: 'Planejador Financeiro Certificado' } as Localized,
    issuer: 'Planejar / Financial Planning Standards Board',
  },
  {
    id: 'cea',
    short: 'CEA',
    name: { en: 'CEA', pt: 'CEA' } as Localized,
    detail: { en: 'ANBIMA Investment Specialist', pt: 'Especialista em Investimentos ANBIMA' } as Localized,
    issuer: 'ANBIMA',
  },
];

export const LANGUAGES = [
  { name: { en: 'Portuguese', pt: 'Português' } as Localized, level: { en: 'Native', pt: 'Nativo' } as Localized },
  { name: { en: 'English', pt: 'Inglês' } as Localized, level: { en: 'Fluent', pt: 'Proficiente' } as Localized },
  { name: { en: 'Spanish', pt: 'Espanhol' } as Localized, level: { en: 'Intermediate', pt: 'Intermediário' } as Localized },
];

export const languageForHost = (hostname: string): Lang => (hostname.endsWith('.com.br') ? 'pt' : 'en');
