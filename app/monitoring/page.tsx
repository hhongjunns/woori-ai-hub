import { getMonitoringItems } from "@/lib/services/monitoring";
import MonitoringStatusCard from "./components/MonitoringStatusCard";

export default async function MonitoringPage() {
  const items = await getMonitoringItems();

  return (
    <div className="p-8">
      <h1 className="text-[14px] font-bold text-brand">모니터링</h1>
      <p className="mt-1 text-[14px] text-foreground">
        Woori AI Hub가 제공하는 AI 서비스/업무도우미의 가동 현황을
        확인합니다.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <MonitoringStatusCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
