import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse, MAX_MESSAGE_CHARS } from '../../services/chat';
import { ChatMessage, UserRole } from '../../types';
import { translator } from '../../content/ui';
import type { Lang } from '../../content/profile';

// Renders the small Markdown subset the model tends to use (headings, lists,
// bold, italics) as React nodes, never as raw HTML.
const inline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) =>
    part.length > 4 && part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    ) : part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    )
  );

const LIST_ITEM = /^(?:[-*•]|\d+[.)])\s+/;

const RichText: React.FC<{ text: string }> = ({ text }) => {
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const { ordered, items } = list;
    const List = ordered ? 'ol' : 'ul';
    blocks.push(
      <List key={blocks.length} className={`${ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-1.5`}>
        {items.map((item, i) => <li key={i}>{inline(item)}</li>)}
      </List>
    );
    list = null;
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (LIST_ITEM.test(line)) {
      const ordered = /^\d/.test(line);
      if (list && list.ordered !== ordered) flush();
      list ??= { ordered, items: [] };
      list.items.push(line.replace(LIST_ITEM, ''));
      continue;
    }
    flush();
    if (!line) continue;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    blocks.push(
      <p key={blocks.length} className={heading ? 'font-semibold text-ink' : undefined}>
        {inline(heading ? heading[1] : line)}
      </p>
    );
  }
  flush();

  return <div className="space-y-3">{blocks}</div>;
};

export const AIChat: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = translator(lang);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: '1',
      role: UserRole.MODEL,
      text: t('chat.initialMessage'),
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // A new question scrolls to the bottom; a new answer scrolls to its first
  // line, so long answers are read from the top.
  useEffect(() => {
    const box = chatContainerRef.current;
    const last = lastMessageRef.current;
    if (!box || !last || messages.length < 2) return;
    const isAnswer = messages[messages.length - 1].role === UserRole.MODEL;
    box.scrollTo({ top: isAnswer ? last.offsetTop - 24 : box.scrollHeight, behavior: 'smooth' });
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
    const responseText = await generateChatResponse(messages, userMessage.text, lang);

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
          <div ref={chatContainerRef} className="relative p-6 space-y-6 h-[420px] overflow-y-auto" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={msg.id} ref={i === messages.length - 1 ? lastMessageRef : undefined} className={msg.role === UserRole.USER ? 'pl-10 sm:pl-24' : 'pr-10 sm:pr-24'}>
                <p className={`font-mono text-[11px] uppercase tracking-wide ${msg.role === UserRole.USER ? 'text-muted text-right' : 'text-teal'}`}>
                  {msg.role === UserRole.USER ? t('chat.you') : t('chat.assistant')}
                </p>
                {msg.role === UserRole.USER ? (
                  <p className="mt-1 leading-relaxed text-right font-serif italic text-[18px]">{msg.text}</p>
                ) : (
                  <div className="mt-1 text-[15px] leading-relaxed text-body">
                    <RichText text={msg.text} />
                  </div>
                )}
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
