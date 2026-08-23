import {
  REPOSITORIES_MOCK,
  TASK_CARDS_MOCK,
  buildMockTaskCard,
} from "@/lib/mocks/coding-automation.mock";
import type {
  Repository,
  TaskCard,
  TaskCardComment,
} from "@/lib/types/coding-automation";

export async function getRepositories(): Promise<Repository[]> {
  return REPOSITORIES_MOCK;
}

export async function getTaskCards(): Promise<TaskCard[]> {
  return TASK_CARDS_MOCK;
}

export async function generateMockTaskCard(
  repositoryId: string,
  requestText: string,
): Promise<TaskCard> {
  return buildMockTaskCard(repositoryId, requestText);
}

export async function addTaskCardComment(
  cardId: string,
  content: string,
): Promise<TaskCardComment> {
  return {
    id: `${cardId}-comment-${Date.now()}`,
    content,
    createdAt: new Date().toISOString(),
  };
}
