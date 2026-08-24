"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  GraphEdge,
  GraphNode,
  WorkInfoItem,
  WorkInfoItemType,
  WorkSystem,
} from "@/lib/types/work-assistant";
import KnowledgeGraph from "./KnowledgeGraph";
import NodeDetailPanel from "./NodeDetailPanel";
import { TYPE_VISUALS } from "../lib/graph-visuals";

interface WorkSystemDetailClientProps {
  system: WorkSystem;
  systems: WorkSystem[];
  items: WorkInfoItem[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const SUMMARY_FIELD_TYPES: { type: WorkInfoItemType; label: string }[] = [
  { type: "contact", label: "담당자" },
  { type: "solution", label: "솔루션" },
  { type: "server-db", label: "DB" },
  { type: "interface", label: "주요 연계" },
];

const TASK_TYPES: WorkInfoItemType[] = ["batch", "interface", "operation"];

function findItem(items: WorkInfoItem[], type: WorkInfoItemType) {
  return items.find((item) => item.type === type);
}

export default function WorkSystemDetailClient({
  system,
  systems,
  items,
  nodes,
  edges,
}: WorkSystemDetailClientProps) {
  const router = useRouter();
  const [selectedRefId, setSelectedRefId] = useState<string>(system.id);

  const selectedItem = items.find((item) => item.id === selectedRefId);
  const isSystemSelected = selectedRefId === system.id;

  const summaryFields = SUMMARY_FIELD_TYPES.map(({ type, label }) => {
    const item = findItem(items, type);
    return item ? { label, value: item.summary } : null;
  }).filter((field): field is { label: string; value: string } => !!field);

  const tasks = items
    .filter((item) => TASK_TYPES.includes(item.type))
    .map((item) => ({ label: item.summary, tag: TYPE_VISUALS[item.type].label }));

  const documents = items
    .filter((item) => item.type === "document")
    .map((item) => ({ label: item.summary, tag: TYPE_VISUALS.document.label }));

  return (
    <div className="p-8">
      <select
        value={system.id}
        onChange={(event) =>
          router.push(`/work-assistant/${event.target.value}`)
        }
        className="h-[40px] w-[340px] rounded-[4px] border border-border px-3 text-[14px] text-foreground"
      >
        {systems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="mt-6 flex gap-6">
        <div className="flex-1">
          <KnowledgeGraph
            nodes={nodes}
            edges={edges}
            selectedRefId={selectedRefId}
            onNodeSelect={setSelectedRefId}
          />
        </div>
        {isSystemSelected ? (
          <NodeDetailPanel
            badgeLabel={TYPE_VISUALS["work-system"].label}
            badgeColor={TYPE_VISUALS["work-system"].color}
            title={system.name}
            subtitle={`업무 지식 · 최종 수정 ${system.updatedAt}`}
            description={system.description}
            summaryFields={summaryFields}
            tasks={tasks}
            documents={documents}
            chatIntro={system.description}
          />
        ) : (
          selectedItem && (
            <NodeDetailPanel
              badgeLabel={TYPE_VISUALS[selectedItem.type].label}
              badgeColor={TYPE_VISUALS[selectedItem.type].color}
              title={selectedItem.title}
              subtitle={selectedItem.summary}
              fields={selectedItem.detail}
              chatIntro={system.description}
            />
          )
        )}
      </div>
    </div>
  );
}
