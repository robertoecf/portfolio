import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, UserRole } from "../types";

// Initialize Gemini client
// The API key is obtained from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESUME_CONTEXT = `
ROBERT E. C. FREITAS
Strategy & Operations | Product Strategy | Business Operations
Location: São Paulo, Brazil | +55 51 99656-3684 | robertoecf@gmail.com

PROFESSIONAL SUMMARY
Strategic generalist with 6+ years of experience integrating finance, product, operations, and AI evaluation frameworks. Specialized in structuring ambiguous problems, building systems, and driving cross-functional execution in fast-paced environments. Worked with AI research labs (via Mercor) improving Large Language Model (LLM) reliability for financial reasoning, and with Warren, a Brazilian fintech, supporting product evolution, strategic initiatives, and operational efficiency. Seeking roles in Strategy, Business Operations (BizOps), or Product Strategy in global tech companies.

CORE SKILLS
Strategy & Operations: strategic problem structuring, systems thinking, roadmap support, KPI definition, process improvement.
Product & Customer: customer insight analysis, requirement gathering, feature refinement, cross-functional collaboration with product, design, and operations.
Data & Tools: Excel, Google Sheets, dashboarding, basic SQL, basic Python, evaluation of Large Language Models (LLMs).
Financial Expertise: wealth management, financial planning, risk assessment, tax and retirement planning, HNW client advisory.
Communication: stakeholder management, high-context communication, clear written and verbal explanations in Portuguese and English.

WORK EXPERIENCE
Mercor — Subject-Matter Expert (Financial Services)
Remote (Contract) | 2025–Present
• Built evaluation frameworks, rubrics, and benchmark tasks to assess LLM performance in financial advising, planning, and wealth management use cases.
• Reviewed and scored complex AI-generated outputs, identifying reasoning gaps, hallucinations, and compliance risks in high-stakes financial scenarios.
• Collaborated with AI research and product teams by delivering structured feedback and synthetic test cases that informed model and product improvements.
• Used spreadsheets and basic SQL-style thinking to organize evaluation data, compare model variants, and support data-driven decisions on model changes.

Warren Investimentos — Senior Financial Advisor & Strategic Contributor
São Paulo, Brazil | 2018–Present
• Manage a portfolio of high-net-worth (HNW) clients exceeding USD 20M in assets, combining financial planning and investment strategy with product feedback loops.
• Provide end-to-end financial planning (tax, succession, retirement, risk/insurance) and translate client needs into structured recommendations and scalable frameworks.
• Partner with product, operations, and leadership to refine onboarding, advisory workflows, and platform features, reducing friction for clients and internal teams.
• Identify market opportunities and client pain points, proposing strategic improvements that support the evolution of Warren from a fintech startup to a full-service platform.
• Use data from client portfolios, behavior, and feedback to support decisions on pricing, communication, and product positioning.

Academic Research Center in Business (EA-UFRGS) — Research Assistant
Porto Alegre, Brazil | 2017–2018
• Supported academic research projects by reviewing literature, helping structure theses and dissertations, and assisting with data analysis and writing.

Regional Electoral Court of Rio Grande do Sul (TRE-RS) — Intern
Cachoeirinha, Brazil | 2016
• Provided citizen service, supported election-related processes, and assisted with administrative and operational tasks.

EDUCATION
Federal University of Rio Grande do Sul (UFRGS) — Bachelor in Public Relations
Porto Alegre, Brazil | 2017–2023

SENAC-RS — Technical Degree in Logistics
Gravataí, Brazil | 2015–2016

CERTIFICATIONS
Certified Financial Planner (CFP®) — Planejar / Financial Planning Standards Board (FPSB) member

LANGUAGES
Portuguese — Native
English — Advanced (professional proficiency)
Spanish — Basic
French — Basic
`;

const SYSTEM_INSTRUCTION = `
You are the AI digital assistant for Roberto E. C. Freitas.
Your goal is to represent Roberto's professional background to recruiters, potential clients, and colleagues.
You have access to his full resume below.

Tone: Professional, strategic, concise, and tech-forward.
Style: Use bullet points for clarity when explaining experience.
Constraint: Keep responses under 3-4 sentences unless asked for a detailed deep dive.

Resume Context:
${RESUME_CONTEXT}
`;

export const generateChatResponse = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
    Previous conversation:
    ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
    
    User: ${newMessage}
    
    Respond as Roberto's AI assistant based on the provided resume context:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION
        }
    });

    return response.text || "I apologize, but I'm unable to retrieve that information right now.";

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I am currently analyzing a large volume of requests. Please try again in a moment.";
  }
};
