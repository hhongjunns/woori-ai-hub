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

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedRefId: string | null;
  onNodeSelect: (refId: string) => void;
}

const RADIUS = 220;

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

    return {
      id: node.id,
      position,
      data: { label: node.label },
      style: {
        borderRadius: isCenter ? 10 : 999,
        border: `2px solid ${isSelected ? "#0083ca" : isCenter ? "#0083ca" : "#e5e5e5"}`,
        background: isCenter ? "#0083ca" : isSelected ? "#e6f4fb" : "#ffffff",
        color: isCenter ? "#ffffff" : "#1f2428",
        padding: isCenter ? "12px 16px" : "8px 14px",
        fontSize: 12,
        fontWeight: 700,
        width: isCenter ? 140 : 110,
        textAlign: "center" as const,
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
    <div className="h-[560px] rounded-[10px] border border-border bg-white">
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
  );
}
