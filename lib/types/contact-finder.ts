export interface ContactResult {
  id: string;
  name: string;
  title: string;
  department: string;
  extension: string;
  tags: string[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  contacts?: ContactResult[];
}

export type ChatResponse = ChatMessage;
