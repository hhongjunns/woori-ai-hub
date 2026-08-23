import { notFound } from "next/navigation";
import {
  getWorkAssistantSystems,
  getWorkSystemGraph,
  getWorkSystemInfoItems,
} from "@/lib/services/work-assistant";
import WorkSystemDetailClient from "./components/WorkSystemDetailClient";

export default async function WorkSystemDetailPage(
  props: PageProps<"/work-assistant/[systemId]">,
) {
  const { systemId } = await props.params;

  const [systems, items, graph] = await Promise.all([
    getWorkAssistantSystems(),
    getWorkSystemInfoItems(systemId),
    getWorkSystemGraph(systemId),
  ]);

  const system = systems.find((item) => item.id === systemId);
  if (!system) notFound();

  return (
    <WorkSystemDetailClient
      system={system}
      items={items}
      nodes={graph.nodes}
      edges={graph.edges}
    />
  );
}
