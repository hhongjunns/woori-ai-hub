import Image from "next/image";
import Button from "@/components/common/Button";
import type { TaskCard } from "@/lib/types/coding-automation";

const PRIORITY_LABEL: Record<TaskCard["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface GeneratedCardPreviewProps {
  card: TaskCard;
  repositoryName: string;
  onRun: () => void;
  onRetry: () => void;
}

function EditableField({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 flex items-center justify-between gap-2 rounded-[4px] border border-border px-2 py-1.5">
      <div className="min-w-0">{children}</div>
      <Image
        src="/icons/edit-pencil.svg"
        alt=""
        width={10}
        height={10}
        className="shrink-0"
      />
    </div>
  );
}

export default function GeneratedCardPreview({
  card,
  repositoryName,
  onRun,
  onRetry,
}: GeneratedCardPreviewProps) {
  return (
    <div className="mt-4 rounded-[4px] border border-brand p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        ✦ AI가 카드를 만들었어요 — 확인하고 실행하세요.
      </p>

      <label className="mt-3 block text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        제목
      </label>
      <EditableField>
        <p className="truncate text-[14px] text-foreground">{card.title}</p>
      </EditableField>

      <label className="mt-3 block text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        대상 레포
      </label>
      <EditableField>
        <span className="inline-flex rounded-[4px] bg-[#e6f4fb] px-2 py-0.5 text-[12px] font-bold text-brand">
          {repositoryName}
        </span>
      </EditableField>

      <label className="mt-3 block text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        설명
      </label>
      <EditableField>
        <p className="text-[13px] text-foreground">{card.description}</p>
      </EditableField>

      <label className="mt-3 block text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        완료 조건
      </label>
      <ul className="mt-1 list-disc rounded-[4px] border border-border px-6 py-2 text-[13px] text-foreground">
        {card.acceptanceCriteria.map((criterion) => (
          <li key={criterion}>{criterion}</li>
        ))}
      </ul>

      <label className="mt-3 block text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        우선순위
      </label>
      <span className="mt-1 inline-flex rounded-full border border-border bg-white px-3 py-1 text-[11px] font-bold text-brand">
        {PRIORITY_LABEL[card.priority]}
      </span>

      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onRetry}>
          다시 요청하기
        </Button>
        <Button type="button" onClick={onRun}>
          이 카드로 실행
        </Button>
      </div>
    </div>
  );
}
