import type {
  Repository,
  TaskCard,
  TaskCardStatus,
} from "@/lib/types/coding-automation";

const COLUMNS: { status: TaskCardStatus; label: string; dotClass: string }[] = [
  { status: "in-progress", label: "진행중", dotClass: "bg-brand" },
  { status: "pending", label: "대기", dotClass: "bg-border" },
  { status: "done", label: "완료", dotClass: "bg-border" },
];

interface TaskCardBoardProps {
  cards: TaskCard[];
  repositories: Repository[];
  selectedCardId: string | null;
  onSelectCard: (cardId: string) => void;
}

export default function TaskCardBoard({
  cards,
  repositories,
  selectedCardId,
  onSelectCard,
}: TaskCardBoardProps) {
  const repoNameById = new Map(repositories.map((repo) => [repo.id, repo.name]));

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        작업 카드
      </p>
      <div className="mt-2 flex flex-col gap-4">
        {COLUMNS.map((column) => {
          const columnCards = cards.filter((card) => card.status === column.status);
          return (
            <div key={column.status}>
              <div className="flex items-center gap-1.5">
                <span className={`size-[6px] rounded-full ${column.dotClass}`} />
                <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
                  {column.label}
                </p>
                <span className="flex size-[13px] items-center justify-center rounded-full bg-border text-[8px] font-bold text-muted-foreground">
                  {columnCards.length}
                </span>
              </div>
              <ul className="mt-1.5 flex flex-col gap-1.5">
                {columnCards.map((card) => {
                  const isSelected = card.id === selectedCardId;
                  const canSelect = card.timeline.length > 0;
                  return (
                    <li key={card.id}>
                      <button
                        type="button"
                        disabled={!canSelect}
                        onClick={() => onSelectCard(card.id)}
                        className={`w-full rounded-[4px] p-2 text-left transition-colors ${
                          isSelected
                            ? "bg-brand"
                            : `border border-border bg-white ${canSelect ? "hover:border-brand" : "cursor-default opacity-80"}`
                        }`}
                      >
                        <p
                          className={`truncate text-[11px] font-bold ${
                            isSelected ? "text-white" : "text-foreground"
                          }`}
                        >
                          {card.title}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-[2px] px-1.5 py-0.5 text-[9px] ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#e5e5e5] text-muted-foreground"
                          }`}
                        >
                          {repoNameById.get(card.repositoryId) ?? card.repositoryId}
                        </span>
                      </button>
                    </li>
                  );
                })}
                {columnCards.length === 0 && (
                  <li className="rounded-[4px] border border-dashed border-border p-2 text-center text-[10px] text-muted-foreground">
                    카드 없음
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
