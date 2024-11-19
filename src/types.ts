export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachments?: string[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}