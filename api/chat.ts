import { GoogleGenAI } from '@google/genai';

interface ReqBody {
  history: Array<{ role: string; text: string }>;
  newMessage: string;
  language: 'en' | 'pt';
  activeContext: string;
}

const langInstruction = (language: 'en' | 'pt') =>
  language === 'pt'
    ? `ATENÇÃO: Responda em Português (PT-BR) como assistente profissional de Roberto com foco em consultoria financeira e planejamento patrimonial.`
    : `ATTENTION: Respond in English as Roberto's professional assistant, emphasizing strategy, operations, and fintech/AI execution.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'missing_server_api_key' });
  }

  try {
    const body = (req.body || {}) as ReqBody;

    // Input validation — prevent abuse and excessive API costs
    if (!body.newMessage || typeof body.newMessage !== 'string') {
      return res.status(400).json({ error: 'invalid_message' });
    }
    if (body.newMessage.length > 500) {
      return res.status(400).json({ error: 'message_too_long' });
    }
    if (!Array.isArray(body.history) || body.history.length > 20) {
      return res.status(400).json({ error: 'history_too_long' });
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Previous conversation:\n${(body.history || [])
      .map((h) => `${h.role}: ${h.text}`)
      .join('\n')}\n\nUser: ${body.newMessage}\n\nRespond as Roberto's AI assistant.`;

    const systemInstruction = `You are the AI digital assistant for Roberto E. C. Freitas.\n${langInstruction(
      body.language || 'pt',
    )}\n\nResume context:\n${body.activeContext || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction },
    });

    return res.status(200).json({ text: response.text || '' });
  } catch {
    return res.status(500).json({ error: 'chat_failed' });
  }
}
