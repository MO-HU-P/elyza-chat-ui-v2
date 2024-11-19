import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types';
import { getFileUrl } from '../api';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%]`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`rounded-2xl px-4 py-2 max-w-prose break-words ${
              isUser
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          
          {message.attachments?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((filename) => (
                <img
                  key={filename}
                  src={getFileUrl(filename)}
                  alt="attachment"
                  className="rounded-lg max-w-[200px] max-h-[200px] object-cover"
                />
              ))}
            </div>
          )}
          
          <span className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}