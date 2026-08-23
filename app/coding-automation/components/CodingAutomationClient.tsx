"use client";

import { useState } from "react";
import {
  addTaskCardComment,
  generateMockTaskCard,
} from "@/lib/services/coding-automation";
import type { Repository, TaskCard } from "@/lib/types/coding-automation";
import RepositorySidebar from "./RepositorySidebar";
import NewRequestForm from "./NewRequestForm";
import GeneratedCardPreview from "./GeneratedCardPreview";
import TaskCardBoard from "./TaskCardBoard";
import TaskCardTimelinePanel from "./TaskCardTimelinePanel";

interface CodingAutomationClientProps {
  repositories: Repository[];
  initialCards: TaskCard[];
}

export default function CodingAutomationClient({
  repositories,
  initialCards,
}: CodingAutomationClientProps) {
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<string | null>(
    repositories[0]?.id ?? null,
  );
  const [cards, setCards] = useState<TaskCard[]>(initialCards);
  const [previewCard, setPreviewCard] = useState<TaskCard | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    initialCards.find((card) => card.status === "in-progress")?.id ?? null,
  );

  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? null;
  const selectedRepository = repositories.find(
    (repo) => repo.id === selectedRepositoryId,
  );

  async function handleConvert(requestText: string) {
    if (!selectedRepositoryId || !requestText) return;
    const card = await generateMockTaskCard(selectedRepositoryId, requestText);
    setPreviewCard(card);
  }

  function handleRun() {
    if (!previewCard) return;
    setCards((prev) => [{ ...previewCard, status: "pending" }, ...prev]);
    setPreviewCard(null);
  }

  function handleRetry() {
    setPreviewCard(null);
  }

  async function handleAddComment(content: string) {
    if (!selectedCard) return;
    const comment = await addTaskCardComment(selectedCard.id, content);
    setCards((prev) =>
      prev.map((card) =>
        card.id === selectedCard.id
          ? { ...card, comments: [...card.comments, comment] }
          : card,
      ),
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-[14px] font-bold text-brand">코딩 자동화</h1>
      <p className="mt-1 text-[14px] text-foreground">
        레포지토리를 선택하고 요청하면 AI가 작업 카드를 만들고, 승인 후
        분석·설계·코딩을 거쳐 PR까지 생성합니다. 
      </p>

      <div className="mt-6 flex gap-6">
        <div className="flex w-[150px] shrink-0 flex-col gap-6">
          <RepositorySidebar
            repositories={repositories}
            selectedRepositoryId={selectedRepositoryId}
            onSelect={setSelectedRepositoryId}
          />
          <TaskCardBoard
            cards={cards}
            repositories={repositories}
            selectedCardId={selectedCardId}
            onSelectCard={setSelectedCardId}
          />
        </div>
        <div className="min-w-0 flex-1 border-l border-border pl-6">
          <NewRequestForm
            disabled={!selectedRepositoryId || previewCard !== null}
            onConvert={handleConvert}
          />
          {previewCard && selectedRepository && (
            <GeneratedCardPreview
              card={previewCard}
              repositoryName={selectedRepository.name}
              onRun={handleRun}
              onRetry={handleRetry}
            />
          )}
          {selectedCard && selectedCard.timeline.length > 0 && (
            <TaskCardTimelinePanel
              card={selectedCard}
              repository={repositories.find((repo) => repo.id === selectedCard.repositoryId)}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
