export type AIServiceCategory =
  | "work-assistant"
  | "coding-automation"
  | "contact-finder"
  | "monitoring";

export type AIServiceStatus = "active" | "maintenance" | "unavailable";

export interface AIService {
  id: string;
  name: string;
  description: string;
  category: AIServiceCategory;
  status: AIServiceStatus;
  href: string;
  isFrequentlyUsed: boolean;
}
