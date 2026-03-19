import { ChatMessage } from "../types";

export const generateChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  language: 'en' | 'pt' = 'pt'
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: history.map(h => ({ role: h.role, text: h.text })),
        message: newMessage,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json() as { text: string };
    return data.text;
  } catch (error) {
    console.error("Error communicating with chat API:", error);
    return language === 'pt'
      ? "Estou analisando um grande volume de requisições. Por favor, tente novamente em um momento."
      : "I am currently analyzing a large volume of requests. Please try again in a moment.";
  }
};
