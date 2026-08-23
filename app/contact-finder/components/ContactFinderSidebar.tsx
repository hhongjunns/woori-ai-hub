interface ContactFinderSidebarProps {
  frequentlyFoundOrgs: string[];
  recentSearches: string[];
}

export default function ContactFinderSidebar({
  frequentlyFoundOrgs,
  recentSearches,
}: ContactFinderSidebarProps) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col gap-6 border-r border-white/10 p-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/40">
          자주 찾는 조직
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {frequentlyFoundOrgs.map((org) => (
            <li
              key={org}
              className="rounded-[4px] px-2 py-1.5 text-[13px] text-white/70 hover:bg-white/5"
            >
              {org}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/40">
          최근 검색
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {recentSearches.map((search) => (
            <li
              key={search}
              className="rounded-[4px] px-2 py-1.5 text-[12px] text-white/50 hover:bg-white/5"
            >
              {search}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
