import type { MonitoringItem, MonitoringStatus } from "@/lib/types/monitoring";

const STATUS_LABEL: Record<MonitoringStatus, string> = {
  normal: "정상",
  degraded: "지연",
  down: "오류",
};

const STATUS_CLASSES: Record<MonitoringStatus, string> = {
  normal: "bg-[#e6f7ec] text-[#1a8a4a]",
  degraded: "bg-[#fff3e0] text-[#c47a10]",
  down: "bg-[#fdecea] text-[#c62828]",
};

const STATUS_DOT_CLASSES: Record<MonitoringStatus, string> = {
  normal: "bg-[#1a8a4a]",
  degraded: "bg-[#c47a10]",
  down: "bg-[#c62828]",
};

interface MonitoringStatusCardProps {
  item: MonitoringItem;
}

export default function MonitoringStatusCard({
  item,
}: MonitoringStatusCardProps) {
  const isAbnormal = item.status !== "normal";

  return (
    <div
      className={`rounded-[10px] border p-5 ${
        isAbnormal ? "border-[#c62828]/40" : "border-border"
      } bg-white`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-foreground">{item.name}</p>
        <span
          className={`flex items-center gap-1.5 rounded-[999px] px-2.5 py-1 text-[11px] font-bold ${STATUS_CLASSES[item.status]}`}
        >
          <span
            className={`size-[6px] rounded-full ${STATUS_DOT_CLASSES[item.status]}`}
          />
          {STATUS_LABEL[item.status]}
        </span>
      </div>
      <p className="mt-3 text-[12px] text-muted-foreground">
        마지막 확인: {new Date(item.lastCheckedAt).toLocaleString("ko-KR")}
      </p>
    </div>
  );
}
