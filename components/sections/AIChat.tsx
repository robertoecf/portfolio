import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse, MAX_MESSAGE_CHARS } from '../../services/chat';
import { ChatMessage, UserRole } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

export const AIChat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize or reset chat when language changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: UserRole.MODEL,
        text: t('chat.initialMessage'),
        timestamp: Date.now()
      }
    ]);
  }, [language, t]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: UserRole.USER,
      text: inputValue.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Pass the current language to the API service
    const responseText = await generateChatResponse(messages, userMessage.text, language);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: UserRole.MODEL,
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <section id="chat" className="bg-paper-deep border-y border-ink scroll-mt-14">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[13px] uppercase tracking-[0.18em] text-teal">{t('chat.label')}</h2>
        <p className="mt-4 font-serif text-[40px] sm:text-[52px] leading-[1.02]">{t('chat.title')}</p>
        <p className="mt-4 text-body">{t('chat.subtitle')}</p>

        <div className="mt-10 bg-paper border-2 border-ink shadow-[6px_6px_0_var(--color-ink)]">
          <div ref={chatContainerRef} className="p-6 space-y-6 h-[420px] overflow-y-auto" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={msg.role === UserRole.USER ? 'pl-10 sm:pl-24' : 'pr-10 sm:pr-24'}>
                <p className={`font-mono text-[11px] uppercase tracking-wide ${msg.role === UserRole.USER ? 'text-muted text-right' : 'text-teal'}`}>
                  {msg.role === UserRole.USER ? t('chat.you') : t('chat.assistant')}
                </p>
                <p className={`mt-1 text-[15px] leading-relaxed whitespace-pre-line ${msg.role === UserRole.USER ? 'text-right font-serif italic text-[18px]' : 'text-body'}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {isLoading && <p className="font-mono text-[12px] text-teal animate-pulse">{t('chat.processing')}</p>}
          </div>

          <form onSubmit={handleSendMessage} className="flex border-t-2 border-ink">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chat.placeholder')}
              maxLength={MAX_MESSAGE_CHARS}
              aria-label={t('chat.placeholder')}
              className="flex-1 min-w-0 bg-transparent px-5 py-4 text-[15px] placeholder:text-muted focus:outline-none focus:bg-paper-deep"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 bg-ink text-paper text-sm border-l-2 border-ink hover:bg-teal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('chat.send')}
            </button>
          </form>
        </div>
        <p className="mt-4 text-[12px] text-muted">{t('chat.disclaimer')}</p>
      </div>
    </section>
  );
};
