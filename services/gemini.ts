import { ChatMessage } from "../types";

// Resume for the International/Tech Market (Strategy & Ops)
const RESUME_CONTEXT_EN = `
ROBERT E. C. FREITAS
Strategy & Operations | Product Strategy | Business Operations
Location: São Paulo, Brazil | robertoecf@gmail.com

PROFESSIONAL SUMMARY
Strategic generalist with 8+ years of experience integrating finance, product, operations, and AI evaluation frameworks. Specialized in structuring ambiguous problems, building systems, and driving cross-functional execution in fast-paced environments. Worked with AI research labs (via Mercor) improving Large Language Model (LLM) reliability for financial reasoning, and with Warren, a Brazilian fintech, supporting product evolution, strategic initiatives, and operational efficiency. Seeking roles in Strategy, Business Operations (BizOps), or Product Strategy in global tech companies.

CORE SKILLS
Strategy & Operations: strategic problem structuring, systems thinking, roadmap support, KPI definition, process improvement.
Product & Customer: customer insight analysis, requirement gathering, feature refinement, cross-functional collaboration.
Data & Tools: Excel, Google Sheets, dashboarding, basic SQL, basic Python, AI Model Evaluation.
Financial Expertise: wealth management, financial planning, risk assessment, HNW advisory.

WORK EXPERIENCE
Mercor — Subject-Matter Expert (Financial Services)
Remote (Contract) | 2025–Present
• Built evaluation frameworks and benchmarks to assess LLM performance in financial use cases.
• Collaborated with AI research teams to deliver synthetic test cases and structured feedback for model improvement.

Warren Investimentos — Senior Financial Advisor & Strategic Contributor
São Paulo, Brazil | 2018–Present
• Partnered with product and ops leadership to refine platform features and advisory workflows.
• Identified market opportunities and proposed strategic improvements for the platform ecosystem.
• Managed a $20M+ portfolio, using client data to inform product decisions.
`;

// Resume for the Brazilian Market (Wealth Management / Financial Advisor)
const RESUME_CONTEXT_PT = `
ROBERTO E. C. FREITAS, CFP®
Consultor Financeiro | Planejador Financeiro | Especialista em IA
Localização: São Paulo, SP | +55 51 99656-3684 | robertoecf@gmail.com

RESUMO
Profissional de Relações Públicas com mais de 8 anos de experiência em fintech e gestão de patrimônio (wealth management). Possui certificação CFP® e gerencia uma carteira de clientes com mais de US$ 20 milhões (R$ 120M+) em ativos. Especialista em desenvolver relacionamentos de confiança, fornecer planejamento financeiro completo (fiscal, sucessório, aposentadoria) e estratégias de investimento personalizadas. Atua também na vanguarda da tecnologia como especialista em avaliação de IA para finanças.

COMPETÊNCIAS
Planejamento Financeiro: Planejamento tributário, sucessório, aposentadoria, gestão de riscos e seguros.
Investimentos: Alocação de ativos, rebalanceamento, produtos locais e internacionais.
Ferramentas: Google Sheets, Excel, Notion, Dashboards.
Certificações: Certified Financial Planner (CFP® - Planejar).
Soft Skills: Flexibilidade, resiliência, comunicação clara, foco no cliente (fiduciário).

EXPERIÊNCIA PROFISSIONAL

Mercor / Especialista em Consultoria Financeira (IA)
Out 2025 - Presente | Remoto
• Atua como Subject-Matter Expert (SME) em Serviços Financeiros, focado em aprimorar a confiabilidade de Grandes Modelos de Linguagem (LLMs) para uso em finanças.
• Desenvolve critérios de avaliação para garantir que a IA forneça orientações financeiras precisas e seguras.

Warren Investimentos / Consultor Financeiro Sênior (Sócio)
Ago 2018 - Presente | São Paulo, SP
• Gestão de Patrimônio: Gerencia portfólio de clientes de alta renda (High Net Worth) excedendo US$ 20 milhões (R$ 120M+).
• Planejamento Holístico: Oferece planejamento financeiro de ponta a ponta (fiscal, sucessório, aposentadoria), entregando estratégias sob medida.
• Desenvolvimento de Negócios: Identifica necessidades de mercado e constrói relacionamentos de confiança de longo prazo.
• Experiência do Cliente: Foco total no cliente (customer-centric), entendendo desafios únicos e apresentando soluções claras.

EA-UFRGS / Assistente de Pesquisa
Ago 2017 - Jul 2018 | Porto Alegre, RS
• Apoio à estruturação de teses e dissertações na área de negócios.

EDUCAÇÃO
UFRGS - Bacharelado em Relações Públicas (2017-2023)
SENAC-RS - Técnico em Logística (2015-2016)

IDIOMAS
Português (Nativo), Inglês (Proficiente), Espanhol (Intermediário).
`;

export const generateChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  language: 'en' | 'pt' = 'pt'
): Promise<string> => {
  try {
    const activeContext = language === 'pt' ? RESUME_CONTEXT_PT : RESUME_CONTEXT_EN;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, newMessage, language, activeContext })
    });

    if (!res.ok) {
      throw new Error(`chat api ${res.status}`);
    }

    const data = await res.json();
    return data?.text || (language === 'pt'
      ? 'Desculpe, não consigo recuperar essa informação no momento.'
      : "I apologize, but I'm unable to retrieve that information right now.");
  } catch (error) {
    console.error('Error communicating with /api/chat:', error);
    return language === 'pt'
      ? 'Chat temporariamente indisponível. Você pode me chamar em robertoecf@gmail.com ou no LinkedIn.'
      : 'Chat is temporarily unavailable. You can reach me at robertoecf@gmail.com or LinkedIn.';
  }
};