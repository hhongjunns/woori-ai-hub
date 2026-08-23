import type { Repository } from "@/lib/types/coding-automation";

interface RepositorySidebarProps {
  repositories: Repository[];
  selectedRepositoryId: string | null;
  onSelect: (repositoryId: string) => void;
}

export default function RepositorySidebar({
  repositories,
  selectedRepositoryId,
  onSelect,
}: RepositorySidebarProps) {
  return (
    <div className="border-b border-border pb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        Repository
      </p>
      <ul className="mt-2 flex flex-col gap-1">
        {repositories.map((repo) => {
          const isSelected = repo.id === selectedRepositoryId;
          return (
            <li key={repo.id}>
              <button
                type="button"
                onClick={() => onSelect(repo.id)}
                className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-left text-[14px] ${
                  isSelected
                    ? "font-bold text-brand"
                    : "text-foreground hover:bg-[#f5f5f5]"
                }`}
              >
                <span
                  className={`size-[6px] shrink-0 rounded-full ${
                    isSelected ? "bg-brand" : "bg-border"
                  }`}
                />
                <span className="truncate">{repo.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        disabled
        className="mt-2 w-full cursor-not-allowed rounded-[4px] px-2 py-1 text-left text-[12px] font-medium text-muted-foreground"
      >
        + 레포 추가
      </button>
    </div>
  );
}
