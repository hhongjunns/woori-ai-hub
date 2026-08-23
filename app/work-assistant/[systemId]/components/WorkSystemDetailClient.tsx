"use client";

import { useState } from "react";
import type {
  GraphEdge,
  GraphNode,
  WorkInfoItem,
  WorkSystem,
} from "@/lib/types/work-assistant";
import WorkInfoPanel from "./WorkInfoPanel";
import KnowledgeGraph from "./KnowledgeGraph";
import NodeDetailPanel from "./NodeDetailPanel";

interface WorkSystemDetailClientProps {
  system: WorkSystem;
  items: WorkInfoItem[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function WorkSystemDetailClient({
  system,
  items,
  nodes,
  edges,
}: WorkSystemDetailClientProps) {
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null);

  const selectedItem = items.find((item) => item.id === selectedRefId);
  const isSystemSelected = selectedRefId === system.id;

  const detailTitle = isSystemSelected
    ? system.name
    : (selectedItem?.title ?? null);
  const detailFields = isSystemSelected
    ? { 설명: system.description }
    : (selectedItem?.detail ?? null);

  return (
    <div className="p-8">
      <h1 className="text-[14px] font-bold text-brand">{system.name}</h1>
      <p className="mt-1 text-[14px] text-foreground">{system.description}</p>

      <div className="mt-8 flex gap-6">
        <WorkInfoPanel
          items={items}
          selectedItemId={selectedItem?.id ?? null}
          onSelect={(item) => setSelectedRefId(item.id)}
        />
        <div className="flex-1">
          <KnowledgeGraph
            nodes={nodes}
            edges={edges}
            selectedRefId={selectedRefId}
            onNodeSelect={setSelectedRefId}
          />
        </div>
        <NodeDetailPanel title={detailTitle} fields={detailFields} />
      </div>
    </div>
  );
}
