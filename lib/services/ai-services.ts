import { AI_SERVICES_MOCK } from "@/lib/mocks/ai-services.mock";
import type { AIService } from "@/lib/types/ai-service";

export async function getAIServices(): Promise<AIService[]> {
  return AI_SERVICES_MOCK;
}
