import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Loader2, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Course } from '../types';

export const AIChatAssistant = ({ contextCourse, isOpen, onClose }: { contextCourse: Course | null, isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { role: 'model', text: '¡Hola! Soy tu Tutor IA de Automatización. 🤖 ¿Necesitas ayuda con Zapier, Make o Python?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (contextCourse && messages.length === 1) {
        setMessages([{ role: 'model', text: `¡Hola! Estás en el curso de **${contextCourse.title}**. ⚡ ¿Quieres que te ayude a crear un escenario en Make o depurar un script?` }]);
      }
    }
  }, [isOpen, contextCourse]);

  useEffect(() => scrollToBottom(), [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const contextText = contextCourse 
        ? `El estudiante está viendo el curso: "${contextCourse.title}". Módulos: ${contextCourse.modules.map(m => m.title).join(', ')}.` 
        : "El estudiante está en el panel principal.";
      const systemPrompt = `Eres un experto en Automatización (Zapier, Make, Python) y tutor de IA para EduCloud. Responde de manera técnica pero accesible. Contexto actual: ${contextText}. Si piden código, usa Python. Si piden flujos, describe los nodos de Make/Zapier.`;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `System: ${systemPrompt}\nUser: ${inputText}`,
      });
      
      const aiResponseText = response.text || "Lo siento, tuve un problema al procesar tu respuesta.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, hubo un error de conexión (Verifica la API Key)." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden font-sans">
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2"><Sparkles size={18} className="text-yellow-300" /><span className="font-bold">Tutor IA Auto</span></div>
        <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded transition-colors"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
              {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2 text-sm text-gray-500"><Loader2 className="animate-spin" size={14} /><span>Analizando flujo...</span></div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Pregunta sobre tu automatización..." className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none" />
        <button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()} className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Send size={18} /></button>
      </div>
    </div>
  );
};