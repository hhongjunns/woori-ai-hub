export type MonitoringStatus = "normal" | "degraded" | "down";

export interface MonitoringItem {
  id: string;
  serviceId: string;
  name: string;
  status: MonitoringStatus;
  lastCheckedAt: string;
}
