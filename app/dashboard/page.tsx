import { getAIServices } from "@/lib/services/ai-services";
import ServiceGrid from "./components/ServiceGrid";

export default async function DashboardPage() {
  const services = await getAIServices();

  return (
    <div className="p-8">
      <h1 className="text-[14px] font-bold text-brand">AI Agent Hub</h1>
      <p className="mt-1 text-[14px] text-foreground">
        필요한 에이전트를 선택하면 우측에 대화형 작업 화면이 열립니다.
      </p>
      <div className="mt-8">
        <ServiceGrid services={services} />
      </div>
    </div>
  );
}
