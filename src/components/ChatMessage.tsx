
import React from 'react';
import { cn } from '@/lib/utils';

const renderBold = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp, severity }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        isBot 
          ? cn("border-l-4", getSeverityColor(severity))
          : "bg-blue-600 text-white"
      )}>
        <div className="flex items-start gap-2">
          {isBot && (
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">🩺</span>
            </div>
          )}
          <div className="flex-1">
            <p className={cn(
              "text-sm leading-relaxed whitespace-pre-line",
              isBot ? "text-gray-800" : "text-white"
            )}>
              {isBot ? renderBold(message) : message}
            </p>
            <p className={cn(
              "text-xs mt-2 opacity-70",
              isBot ? "text-gray-500" : "text-blue-100"
            )}>
              {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
