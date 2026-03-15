"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { BrainCircuit, X, Lock, Send, Unlock } from "lucide-react";

export default function CrosAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toUpperCase() === "DELOITTE2026") {
      setIsUnlocked(true);
    } else {
      setPasswordInput("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
          isOpen ? "bg-gray-800 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
        title="Toggle CROS AI"
      >
        {isOpen ? <X size={24} /> : <BrainCircuit size={24} />}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[400px] h-[600px] max-h-[80vh] backdrop-blur-2xl bg-[#0a0a0f]/95 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-blue-400" />
              <span className="font-bold text-white">CROS AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              {isUnlocked ? (
                <Unlock size={14} className="text-emerald-400" />
              ) : (
                <Lock size={14} className="text-red-500" />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col relative w-full h-full text-white">
            {!isUnlocked ? (
               <div className="flex-1 flex flex-col items-center justify-center w-full">
                 <Lock size={48} className="text-red-500 mb-4 opacity-80" />
                 <h3 className="text-red-500 font-mono text-[10px] md:text-xs font-bold tracking-widest mb-6 text-center leading-relaxed px-4">
                   CROS AI TERMINAL LOCKED.<br/>ENTER CLEARANCE CODE.
                 </h3>
                 <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3 w-full max-w-[220px]">
                   <input 
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="PASSWORD..."
                      className="w-full bg-black/50 border border-red-900/50 rounded px-3 py-2 text-xs font-mono text-red-500 text-center outline-none focus:border-red-500 transition-colors placeholder:text-red-900/50"
                      autoFocus
                   />
                   <button type="submit" className="w-full bg-red-900/30 hover:bg-red-900/60 text-red-500 text-xs font-mono font-bold py-2 rounded transition-colors border border-red-900/50">
                     AUTHENTICATE
                   </button>
                 </form>
               </div>
            ) : (
               <div className="flex flex-col gap-4">
                  {messages.length === 0 && (
                    <div className="text-center text-[11px] text-white/40 my-6 font-mono border border-white/10 bg-white/5 p-3 rounded mx-4">
                      {">"} RAG SYSTEMS ONLINE.<br/> {">"} KNOWLEDGE BASE LOADED.
                    </div>
                  )}
                  {messages.map((m: any) => (
                    <div 
                      key={m.id} 
                      className={m.role === 'user' ? 'ml-auto w-fit max-w-[85%]' : 'mr-auto w-fit max-w-[85%]'}
                    >
                      <div 
                        className={`text-sm px-4 py-3 break-words whitespace-pre-wrap shadow-md ${
                          m.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                            : 'bg-white/10 text-gray-200 rounded-2xl rounded-tl-sm border border-white/5'
                        }`}
                        style={{ lineHeight: 1.6 }}
                      >
                         {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start w-full">
                      <div className="bg-white/5 text-gray-400 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 text-[0.8rem] font-mono animate-pulse">
                         [CROS AI analyzing variables...]
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
               </div>
            )}
          </div>

          {/* Input Footer */}
          {isUnlocked && (
             <div className="p-4 bg-[#050505] border-t border-white/10 flex items-center gap-2">
               <form onSubmit={handleSubmit} className="relative flex items-center w-full gap-2">
                 <input
                   className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                   value={input}
                   onChange={handleInputChange}
                   placeholder="Ask CROS AI..."
                 />
                 <button
                   type="submit"
                   disabled={isLoading || !input?.trim()}
                   className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:hover:bg-blue-600 transition-all"
                 >
                   <Send size={18} className="ml-[-1px]" />
                 </button>
               </form>
             </div>
          )}
        </div>
      )}
    </>
  );
}
