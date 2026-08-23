import {
  FREQUENTLY_FOUND_ORGS,
  RECENT_SEARCHES,
  findMockChatResponse,
} from "@/lib/mocks/contact-finder.mock";
import type { ChatResponse } from "@/lib/types/contact-finder";

export async function getContactFinderMockResponse(
  query: string,
): Promise<ChatResponse> {
  return findMockChatResponse(query);
}

export async function getContactFinderSidebarInfo(): Promise<{
  frequentlyFoundOrgs: string[];
  recentSearches: string[];
}> {
  return {
    frequentlyFoundOrgs: FREQUENTLY_FOUND_ORGS,
    recentSearches: RECENT_SEARCHES,
  };
}
