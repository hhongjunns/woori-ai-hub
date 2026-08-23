import { MONITORING_ITEMS_MOCK } from "@/lib/mocks/monitoring.mock";
import type { MonitoringItem } from "@/lib/types/monitoring";

export async function getMonitoringItems(): Promise<MonitoringItem[]> {
  return MONITORING_ITEMS_MOCK;
}
