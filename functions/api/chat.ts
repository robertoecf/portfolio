interface Env {
  XAI_API_KEY: string;
}

interface ChatRequestBody {
  history: Array<{ role: string; text: string }>;
  message: string;
  language: 'en' | 'pt';
}

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

function buildSystemInstruction(language: 'en' | 'pt'): string {
  const activeContext = language === 'pt' ? RESUME_CONTEXT_PT : RESUME_CONTEXT_EN;

  const langInstruction = language === 'pt'
    ? `
      ATENÇÃO: O usuário está navegando na versão em PORTUGUÊS do site.
      SEU PAPEL: Você é um assistente virtual focado em vender a imagem do Roberto como CONSULTOR FINANCEIRO (Wealth Advisor) de confiança.
      OBJETIVO: Demonstrar expertise em investimentos, planejamento sucessório, proteção patrimonial e atendimento exclusivo.
      TOM: Profissional, empático, seguro e sofisticado (Fiduciário).
      IDIOMA DE RESPOSTA: Português (PT-BR).
    `
    : `
      ATTENTION: The user is browsing the ENGLISH version of the site.
      YOUR ROLE: You are an AI assistant representing Roberto as a STRATEGY & OPERATIONS expert in Fintech/AI.
      OBJECTIVE: Highlight problem-solving skills, operational rigor, and product strategy experience.
      TONE: Tech-forward, strategic, concise.
      RESPONSE LANGUAGE: English.
    `;

  return `
    You are the AI digital assistant for Roberto E. C. Freitas.

    ${langInstruction}

    Use the specific resume context below to answer questions. Do not mix the personas.
    If in Portuguese, focus on Wealth Management/Warren.
    If in English, focus on Strategy/Mercor/Tech.

    Resume Context:
    ${activeContext}
  `;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.XAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { history, message, language } = body;

  const systemInstruction = buildSystemInstruction(language);

  const conversationHistory = (history || []).map((h: { role: string; text: string }) =>
    `${h.role}: ${h.text}`
  ).join('\n');

  const userContent = `
    Previous conversation:
    ${conversationHistory}

    User: ${message}

    Respond as Roberto's AI assistant based on the provided instructions.
  `;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('xAI API error:', errorText);
      return new Response(JSON.stringify({ error: 'xAI API request failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content;

    const fallback = language === 'pt'
      ? 'Desculpe, não consigo recuperar essa informação no momento.'
      : "I apologize, but I'm unable to retrieve that information right now.";

    return new Response(JSON.stringify({ text: text || fallback }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling xAI API:', error);

    const errorMessage = language === 'pt'
      ? 'Estou analisando um grande volume de requisições. Por favor, tente novamente em um momento.'
      : 'I am currently analyzing a large volume of requests. Please try again in a moment.';

    return new Response(JSON.stringify({ text: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
