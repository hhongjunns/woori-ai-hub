import {
  WORK_INFO_ITEMS_MOCK,
  WORK_SYSTEMS_MOCK,
  WORK_SYSTEM_GRAPH_MOCK,
} from "@/lib/mocks/work-assistant.mock";
import type {
  GraphEdge,
  GraphNode,
  WorkInfoItem,
  WorkSystem,
} from "@/lib/types/work-assistant";

export async function getWorkAssistantSystems(): Promise<WorkSystem[]> {
  return WORK_SYSTEMS_MOCK;
}

export async function getWorkSystemInfoItems(
  systemId: string,
): Promise<WorkInfoItem[]> {
  return WORK_INFO_ITEMS_MOCK.filter((item) => item.workSystemId === systemId);
}

export async function getWorkSystemGraph(
  systemId: string,
): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  return WORK_SYSTEM_GRAPH_MOCK[systemId] ?? { nodes: [], edges: [] };
}
