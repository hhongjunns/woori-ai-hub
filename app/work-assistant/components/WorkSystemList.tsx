import Link from "next/link";
import type { WorkSystem } from "@/lib/types/work-assistant";

interface WorkSystemListProps {
  systems: WorkSystem[];
}

export default function WorkSystemList({ systems }: WorkSystemListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {systems.map((system) => (
        <Link
          key={system.id}
          href={`/work-assistant/${system.id}`}
          className="rounded-[10px] border border-border bg-white p-5 transition-colors hover:border-brand"
        >
          <p className="text-[14px] font-bold text-foreground">
            {system.name}
          </p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {system.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
