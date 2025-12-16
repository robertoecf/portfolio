import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    const model = 'gemini-2.5-flash';
    
    // Select the appropriate resume context based on language
    const activeContext = language === 'pt' ? RESUME_CONTEXT_PT : RESUME_CONTEXT_EN;
    
    // Customize instructions based on language and persona
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

    const systemInstruction = `
    You are the AI digital assistant for Roberto E. C. Freitas.
    
    ${langInstruction}

    Use the specific resume context below to answer questions. Do not mix the personas. 
    If in Portuguese, focus on Wealth Management/Warren. 
    If in English, focus on Strategy/Mercor/Tech.

    Resume Context:
    ${activeContext}
    `;
    
    const prompt = `
    Previous conversation:
    ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
    
    User: ${newMessage}
    
    Respond as Roberto's AI assistant based on the provided instructions.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: systemInstruction
        }
    });

    return response.text || (language === 'pt' ? "Desculpe, não consigo recuperar essa informação no momento." : "I apologize, but I'm unable to retrieve that information right now.");

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return language === 'pt' 
      ? "Estou analisando um grande volume de requisições. Por favor, tente novamente em um momento."
      : "I am currently analyzing a large volume of requests. Please try again in a moment.";
  }
};