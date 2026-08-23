import type { WorkInfoItem } from "@/lib/types/work-assistant";

interface WorkInfoPanelProps {
  items: WorkInfoItem[];
  selectedItemId: string | null;
  onSelect: (item: WorkInfoItem) => void;
}

export default function WorkInfoPanel({
  items,
  selectedItemId,
  onSelect,
}: WorkInfoPanelProps) {
  return (
    <ul className="flex w-[260px] shrink-0 flex-col gap-2">
      {items.map((item) => {
        const isSelected = item.id === selectedItemId;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full rounded-[4px] border p-3 text-left transition-colors ${
                isSelected
                  ? "border-brand bg-[#e6f4fb]"
                  : "border-border bg-white hover:border-brand"
              }`}
            >
              <p className="text-[14px] font-bold text-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {item.summary}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
