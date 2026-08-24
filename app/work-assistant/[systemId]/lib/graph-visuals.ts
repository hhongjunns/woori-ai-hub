import type { WorkInfoItemType } from "@/lib/types/work-assistant";

export interface TypeVisual {
  label: string;
  color: string;
}

export const TYPE_VISUALS: Record<
  "work-system" | WorkInfoItemType,
  TypeVisual
> = {
  "work-system": { label: "업무", color: "#F2A93B" },
  contact: { label: "사람", color: "#5B8CFF" },
  solution: { label: "시스템", color: "#8B7CF6" },
  "server-db": { label: "시스템", color: "#8B7CF6" },
  batch: { label: "기능", color: "#8A93A8" },
  interface: { label: "기능", color: "#8A93A8" },
  operation: { label: "기능", color: "#8A93A8" },
  document: { label: "문서", color: "#3FBF8F" },
};

export const GRAPH_LEGEND: TypeVisual[] = [
  { label: "업무", color: "#F2A93B" },
  { label: "사람", color: "#5B8CFF" },
  { label: "문서", color: "#3FBF8F" },
  { label: "시스템", color: "#8B7CF6" },
  { label: "기능", color: "#8A93A8" },
];
