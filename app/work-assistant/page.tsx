import { getWorkAssistantSystems } from "@/lib/services/work-assistant";
import WorkSystemList from "./components/WorkSystemList";

export default async function WorkAssistantPage() {
  const systems = await getWorkAssistantSystems();

  return (
    <div className="p-8">
      <h1 className="text-[14px] font-bold text-brand">업무 도우미</h1>
      <p className="mt-1 text-[14px] text-foreground">
        업무 시스템을 선택하면 담당자, 솔루션, 서버/DB, 배치, 인터페이스,
        운영 정보, 관련 문서를 지식그래프로 탐색할 수 있습니다.
      </p>
      <div className="mt-8">
        <WorkSystemList systems={systems} />
      </div>
    </div>
  );
}
