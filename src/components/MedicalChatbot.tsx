
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { analyzeMedicalQuery, getWelcomeMessage, EMERGENCY_NUMBER, Severity } from '@/utils/medicalLogic';
import { Send, Heart } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
  severity?: Severity;
}

const MedicalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: getWelcomeMessage(),
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const query = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const medicalResponse = analyzeMedicalQuery(query);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `${medicalResponse.message}\n\n${medicalResponse.recommendation}`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        severity: medicalResponse.severity,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Medical Chatbot</h1>
            <p className="text-blue-100 text-sm">Symptom and medicine information</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
        <div className="space-y-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
              severity={message.severity}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      <div className="border-t bg-gray-50 p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about symptoms (e.g., 'I have a headache') or medicines (e.g., 'Tell me about Paracetamol')"
            className="flex-1 focus:ring-blue-500 focus:border-blue-500"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          For general information only, not a diagnosis. In an emergency, call {EMERGENCY_NUMBER} or go to the nearest hospital.
        </p>
      </div>
    </div>
  );
};

export default MedicalChatbot;
