import type { Repository, TaskCard } from "@/lib/types/coding-automation";
import TaskCardCommentInput from "./TaskCardCommentInput";

const PRIORITY_LABEL: Record<TaskCard["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface TaskCardTimelinePanelProps {
  card: TaskCard;
  repository: Repository | undefined;
  onAddComment: (content: string) => void;
}

export default function TaskCardTimelinePanel({
  card,
  repository,
  onAddComment,
}: TaskCardTimelinePanelProps) {
  return (
    <div className="mt-6 rounded-[4px] border border-border bg-white p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        진행중인 카드 — {card.id}
      </p>

      <div className="mt-2 flex items-start justify-between">
        <h2 className="text-[16px] font-bold text-foreground">{card.title}</h2>
        <span className="rounded-[4px] bg-[#f2a33c]/20 px-2 py-0.5 text-[11px] font-bold text-[#f2a33c]">
          {PRIORITY_LABEL[card.priority]}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {repository?.name ?? card.repositoryId} · #{card.id}
        {card.startedRelativeLabel ? ` · ${card.startedRelativeLabel}` : ""}
      </p>
      <p className="mt-3 text-[13px] text-foreground">{card.description}</p>

      <div className="mt-6 flex items-center">
        {card.timeline.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex size-[23px] items-center justify-center rounded-full text-[11px] font-bold ${
                  step.status === "done" || step.status === "in-progress"
                    ? "bg-brand text-white"
                    : "bg-border text-muted-foreground"
                }`}
              >
                {step.status === "done" ? "✓" : step.order}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
                {step.label}
              </span>
            </div>
            {index < card.timeline.length - 1 && (
              <div className="mx-2 h-px flex-1 bg-border" />
            )}
          </div>
        ))}
      </div>

      <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
        {card.timeline
          .filter((step) => step.logMessage)
          .map((step) => (
            <li key={step.id} className="flex items-start gap-2 text-[12px]">
              <span className="mt-1.5 size-[5px] shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-foreground">{step.logMessage}</span>
              {step.relativeTimeLabel && (
                <span className="ml-auto shrink-0 text-muted-foreground">
                  {step.relativeTimeLabel}
                </span>
              )}
            </li>
          ))}
        {card.comments.map((comment) => (
          <li key={comment.id} className="flex items-start gap-2 text-[12px]">
            <span className="mt-1.5 size-[5px] shrink-0 rounded-full bg-brand" />
            <span className="text-foreground">{comment.content}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <TaskCardCommentInput onSubmit={onAddComment} />
      </div>
    </div>
  );
}
