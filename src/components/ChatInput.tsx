import React, { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { uploadFile, deleteFile } from '../api';

interface ChatInputProps {
  onSendMessage: (content: string, attachments: string[]) => void;
  isLoading?: boolean;
}

interface AttachmentFile {
  file: File;
  filename: string;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments.map(a => a.filename));
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      for (const file of files) {
        try {
          const filename = await uploadFile(file);
          setAttachments(prev => [...prev, { file, filename }]);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
  };

  const removeAttachment = async (index: number) => {
    const attachment = attachments[index];
    try {
      await deleteFile(attachment.filename);
      setAttachments(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span className="text-sm truncate max-w-[150px]">{attachment.file.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none rounded-2xl border-2 border-gray-200 px-4 py-2 pr-12 focus:border-blue-500 focus:ring-0 text-sm min-h-[44px] max-h-32"
            rows={1}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-3 bottom-2 text-gray-400 hover:text-gray-600"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || (!message.trim() && attachments.length === 0)}
          className={`rounded-full p-2 ${
            isLoading || (!message.trim() && attachments.length === 0)
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}