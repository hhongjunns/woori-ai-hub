const SEARCH_SCOPES = ["여신", "수신", "외환"];

interface ContactFinderSidebarProps {
  frequentlyFoundOrgs: string[];
  recentSearches: string[];
}

export default function ContactFinderSidebar({
  frequentlyFoundOrgs,
  recentSearches,
}: ContactFinderSidebarProps) {
  return (
    <aside className="flex w-[150px] shrink-0 flex-col gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[-0.5px] text-muted-foreground">
          자주 찾는 조직
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {frequentlyFoundOrgs.map((org, index) => (
            <li
              key={org}
              className={`text-[14px] tracking-[-0.7px] ${
                index === 0 ? "font-bold text-brand" : "text-foreground"
              }`}
            >
              {org}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[-0.5px] text-muted-foreground">
          최근 검색
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {recentSearches.map((search) => (
            <li
              key={search}
              className="text-[10px] tracking-[-0.5px] text-muted-foreground"
            >
              {search}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[-0.5px] text-muted-foreground">
          검색 범위
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SEARCH_SCOPES.map((scope) => (
            <span
              key={scope}
              className="rounded-[4px] bg-border px-2 py-1 text-[10px] text-muted-foreground"
            >
              {scope}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
