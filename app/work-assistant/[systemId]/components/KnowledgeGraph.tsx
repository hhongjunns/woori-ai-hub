"use client";

import { useMemo } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphEdge, GraphNode } from "@/lib/types/work-assistant";
import { GRAPH_LEGEND, TYPE_VISUALS } from "../lib/graph-visuals";

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedRefId: string | null;
  onNodeSelect: (refId: string) => void;
}

const RADIUS = 220;
const CENTER_SIZE = 96;
const LEAF_SIZE = 68;

function toFlowNodes(
  nodes: GraphNode[],
  selectedRefId: string | null,
): Node[] {
  const otherNodes = nodes.filter((node) => node.type !== "work-system");

  return nodes.map((node) => {
    const isCenter = node.type === "work-system";
    const angleIndex = otherNodes.findIndex((n) => n.id === node.id);
    const angle = (angleIndex / Math.max(otherNodes.length, 1)) * 2 * Math.PI;
    const position = isCenter
      ? { x: 0, y: 0 }
      : {
          x: Math.cos(angle) * RADIUS,
          y: Math.sin(angle) * RADIUS,
        };
    const isSelected = node.refId === selectedRefId;
    const color = TYPE_VISUALS[node.type].color;
    const size = isCenter ? CENTER_SIZE : LEAF_SIZE;

    return {
      id: node.id,
      position,
      data: { label: node.label },
      style: {
        borderRadius: 9999,
        border: "3px solid #ffffff",
        boxShadow: isSelected
          ? "0 0 0 3px #0083ca, 0 4px 10px rgba(0,131,202,0.3)"
          : "0 1px 4px rgba(0,0,0,0.15)",
        background: color,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        fontSize: isCenter ? 13 : 11,
        fontWeight: 700,
        width: size,
        height: size,
        textAlign: "center" as const,
        wordBreak: "keep-all" as const,
      },
    };
  });
}

function toFlowEdges(edges: GraphEdge[]): Edge[] {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    style: { stroke: "#e5e5e5" },
  }));
}

export default function KnowledgeGraph({
  nodes,
  edges,
  selectedRefId,
  onNodeSelect,
}: KnowledgeGraphProps) {
  const flowNodes = useMemo(
    () => toFlowNodes(nodes, selectedRefId),
    [nodes, selectedRefId],
  );
  const flowEdges = useMemo(() => toFlowEdges(edges), [edges]);

  return (
    <div className="flex h-[560px] flex-col rounded-[10px] border border-border bg-white">
      <div className="flex shrink-0 justify-end gap-4 border-b border-border px-4 py-2">
        {GRAPH_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="size-[6px] rounded-full"
              style={{ background: item.color }}
            />
            <span className="text-[12px] text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodeClick={(_, node) => {
            const graphNode = nodes.find((item) => item.id === node.id);
            if (graphNode) onNodeSelect(graphNode.refId);
          }}
          fitView
          nodesDraggable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
