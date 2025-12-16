import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, Terminal } from 'lucide-react';
import { generateChatResponse } from '../../services/gemini';
import { ChatMessage, UserRole } from '../../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: UserRole.MODEL,
      text: "System initialized. I am Roberto's Digital Associate. Accessing professional archives... Ready for queries regarding Strategy, Operations, or Finance.",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only auto-scroll if we have more than the initial message to avoid layout shifts on load
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

    const responseText = await generateChatResponse(messages, userMessage.text);

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
    <section id="chat" className="py-24 px-6 relative z-20">
       <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Gemini 2.5 Active</span>
             </div>
             <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Interactive Dossier</h2>
             <p className="text-slate-400 font-light">Ask specific questions about work history, methodology, or technical skills.</p>
          </div>

          {/* Chat Interface Container */}
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[600px] border border-white/10 relative">
             
             {/* Top Bar */}
             <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 justify-between">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Secure_Connection_Established</div>
             </div>

             {/* Messages Area */}
             <div 
                ref={chatContainerRef}
                className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 max-h-[500px]"
             >
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex gap-4 ${msg.role === UserRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                          msg.role === UserRole.USER 
                          ? 'bg-slate-800 border-slate-700' 
                          : 'bg-emerald-500/10 border-emerald-500/30'
                      }`}>
                         {msg.role === UserRole.USER ? <User className="w-5 h-5 text-slate-400" /> : <Terminal className="w-5 h-5 text-emerald-400" />}
                      </div>
                      
                      {/* Bubble */}
                      <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed relative ${
                         msg.role === UserRole.USER 
                         ? 'bg-white/10 text-white rounded-tr-sm backdrop-blur-sm' 
                         : 'bg-black/20 text-slate-300 border border-white/5 rounded-tl-sm'
                      }`}>
                         {/* Decorative corner accent for bot */}
                         {msg.role === UserRole.MODEL && <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-emerald-500/50" />}
                         
                         {msg.text}
                      </div>
                   </div>
                ))}
                
                {isLoading && (
                   <div className="flex gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                         <Terminal className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex items-center gap-2 p-4">
                         <span className="text-xs font-mono text-emerald-500">PROCESSING_REQUEST...</span>
                      </div>
                   </div>
                )}
             </div>

             {/* Input Area */}
             <div className="p-4 bg-black/20 border-t border-white/5">
                <form onSubmit={handleSendMessage} className="relative group">
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                   <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter command or question..."
                      className="relative w-full bg-black/50 text-white placeholder-slate-600 border border-white/10 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:border-emerald-500/40 focus:bg-black/70 transition-all font-mono text-sm"
                   />
                   <button 
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                      <Send className="w-5 h-5" />
                   </button>
                </form>
                <div className="text-center mt-3">
                   <span className="text-[10px] text-slate-600 font-mono">AI can make errors. Verify important info.</span>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};