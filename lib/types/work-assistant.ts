export interface WorkSystem {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
}

export type WorkInfoItemType =
  | "contact"
  | "solution"
  | "server-db"
  | "batch"
  | "interface"
  | "operation"
  | "document";

export interface WorkInfoItem {
  id: string;
  workSystemId: string;
  type: WorkInfoItemType;
  title: string;
  summary: string;
  detail: Record<string, string>;
}

export interface GraphNode {
  id: string;
  type: "work-system" | WorkInfoItemType;
  label: string;
  refId: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}
