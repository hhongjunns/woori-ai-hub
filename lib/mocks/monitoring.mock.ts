import type { MonitoringItem } from "@/lib/types/monitoring";

export const MONITORING_ITEMS_MOCK: MonitoringItem[] = [
  {
    id: "mon-coding-automation",
    serviceId: "coding-automation",
    name: "코딩 자동화",
    status: "normal",
    lastCheckedAt: "2026-08-22T08:55:00+09:00",
  },
  {
    id: "mon-contact-finder",
    serviceId: "contact-finder",
    name: "담당자 찾기",
    status: "degraded",
    lastCheckedAt: "2026-08-22T08:50:00+09:00",
  },
  {
    id: "mon-work-assistant",
    serviceId: "work-assistant",
    name: "업무 도우미",
    status: "normal",
    lastCheckedAt: "2026-08-22T08:55:00+09:00",
  },
  {
    id: "mon-monitoring",
    serviceId: "monitoring",
    name: "모니터링",
    status: "down",
    lastCheckedAt: "2026-08-22T08:40:00+09:00",
  },
];
