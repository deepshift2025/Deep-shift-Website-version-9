
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Loader2, Sparkles, Bot, ShieldCheck, MessageCircle } from 'lucide-react';
import { getDeepShiftAssistantResponse } from '../services/geminiService';

const LOGO_URL = "https://i.postimg.cc/Mpsm3pDq/21.png";

const AssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; isTyping?: boolean }[]>([
    { role: 'bot', text: "Hello! I'm the Deep Shift AI Assistant. How can I help you explore our enterprise solutions today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowLabel(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const sanitizeResponse = (text: string) => {
    // Strips double asterisks often used by AI for markdown bolding
    return text.replace(/\*\*/g, '');
  };

  const typeMessage = (fullText: string) => {
    const cleanedText = sanitizeResponse(fullText);
    let currentText = "";
    const index = messages.length;
    
    setMessages(prev => [...prev, { role: 'bot', text: "", isTyping: true }]);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < cleanedText.length) {
        currentText += cleanedText[charIndex];
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[index]) {
            newMessages[index] = { ...newMessages[index], text: currentText };
          }
          return newMessages;
        });
        charIndex++;
      } else {
        clearInterval(interval);
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[index]) {
            newMessages[index] = { ...newMessages[index], isTyping: false };
          }
          return newMessages;
        });
      }
    }, 20);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await getDeepShiftAssistantResponse(userMsg);
      setIsLoading(false);
      typeMessage(responseText);
    } catch (err) {
      setIsLoading(false);
      typeMessage("I encountered a technical error connecting to our servers. Please check your connection or contact support.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {!isOpen && (
        <div className="relative flex items-center group animate-float">
          {/* Action Label */}
          <div 
            className={`mr-5 transition-all duration-500 transform ${
              showLabel ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-innovation-orange/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-innovation-orange flex items-center justify-center ring-2 ring-white">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-innovation-orange uppercase tracking-tighter leading-none mb-0.5">Deep Shift AI</span>
                  <span className="text-xs font-bold text-navy whitespace-nowrap">Ask our Assistant</span>
                </div>
              </div>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/90 backdrop-blur-md border-r border-t border-white/50 rotate-45"></div>
            </div>
          </div>

          {/* Main Floating Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setShowLabel(false);
            }}
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => !isOpen && setShowLabel(false)}
            className="relative w-20 h-20 flex items-center justify-center rounded-full shadow-[0_15px_50px_rgba(26,35,50,0.3)] transition-all duration-500 transform hover:scale-110 active:scale-95 group overflow-visible"
          >
            <div className="absolute -inset-2 rounded-full border border-innovation-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
            <div className="absolute -inset-4 rounded-full border border-innovation-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100 animate-reverse-spin"></div>
            <div className="absolute inset-0 bg-navy rounded-full overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy to-innovation-blue/60 opacity-60"></div>
               <div className="absolute top-0 right-0 w-full h-full bg-innovation-orange/20 blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:translate-x-1/3 group-hover:-translate-y-1/3 transition-transform duration-700"></div>
            </div>
            <div className="absolute -inset-1 rounded-full bg-innovation-blue/30 blur-md opacity-50 group-hover:opacity-100 transition-opacity group-hover:animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center">
              <img 
                src={LOGO_URL} 
                alt="AI" 
                className="w-10 h-10 object-contain transition-all duration-500 filter brightness-0 invert group-hover:opacity-0 group-hover:scale-0 group-hover:absolute" 
              />
              <MessageCircle className="w-10 h-10 text-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 absolute" />
            </div>
            <div className="absolute bottom-2 right-2 z-20">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full border-[3px] border-navy shadow-lg"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-40"></div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window - Width reduced to 400px and Height further reduced to 500px */}
      {isOpen && (
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 w-[90vw] max-w-[400px] flex flex-col h-[500px] animate-in slide-in-from-bottom-6 zoom-in-95 duration-500 overflow-hidden mb-4 mr-0 sm:mr-4">
          {/* Header */}
          <div className="bg-navy p-5 flex justify-between items-center text-white relative shrink-0">
            <div className="absolute top-0 right-0 w-40 h-full bg-innovation-orange/10 rounded-bl-[120px] pointer-events-none"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center p-2 border border-white/20 shadow-xl backdrop-blur-sm">
                  <img src={LOGO_URL} alt="Deep Shift AI" className="w-full h-full object-contain" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-[2px] border-navy shadow-md"></div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-poppins font-bold text-sm leading-tight tracking-tight">Deep Shift AI</h3>
                  <div className="bg-innovation-blue/20 text-innovation-blue text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded-md border border-innovation-blue/30 shadow-sm">v4.5</div>
                </div>
                <div className="flex items-center mt-0.5">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                    Agentic Lab Assistant
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-1.5 rounded-xl transition-all active:scale-90 group relative z-10 border border-transparent hover:border-white/10"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fcfcfd] custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[88%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-innovation-orange ring-4 ring-innovation-orange/10' : 'bg-white border border-gray-100 p-1 ring-4 ring-gray-50'}`}>
                    {msg.role === 'user' ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <img src={LOGO_URL} alt="AI" className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-navy text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.isTyping && <span className="inline-block w-1 h-2.5 bg-innovation-blue ml-1 animate-pulse align-middle rounded-full"></span>}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-innovation-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-innovation-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-innovation-blue rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our AI solutions..."
                className="w-full bg-gray-50 border-none focus:ring-4 focus:ring-innovation-blue/5 rounded-[16px] pl-4 pr-12 py-3.5 text-xs transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 bg-navy text-white p-2 rounded-xl hover:bg-innovation-blue transition-all disabled:opacity-30 shadow-xl shadow-navy/20 active:scale-90"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2.5 flex items-center justify-center space-x-3 opacity-20">
               <div className="flex items-center space-x-1">
                  <Bot size={8} className="text-navy" />
                  <span className="text-[7px] font-black uppercase tracking-tighter">Enterprise Grade</span>
               </div>
               <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
               <div className="flex items-center space-x-1">
                  <ShieldCheck size={8} className="text-navy" />
                  <span className="text-[7px] font-black uppercase tracking-tighter">Secure & Private</span>
               </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AssistantWidget;
