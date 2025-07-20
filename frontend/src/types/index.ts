export interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  toolName?: string | null;
  toolDescription?: string | null;
  isError?: boolean;
}

export interface ChatResponse {
  response: string;
  toolName?: string;
  toolDescription?: string;
  success: boolean;
  error?: string;
}
