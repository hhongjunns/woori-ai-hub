import type { AIService } from "@/lib/types/ai-service";

export const AI_SERVICES_MOCK: AIService[] = [
  {
    id: "coding-automation",
    name: "코딩 자동화",
    description:
      "레포지토리를 선택하고 요청하면 AI가 작업 카드를 만들고, 승인 후 분석·설계·코딩을 거쳐 PR까지 생성합니다.",
    category: "coding-automation",
    status: "active",
    href: "/coding-automation",
    isFrequentlyUsed: false,
  },
  {
    id: "contact-finder",
    name: "담당자 찾기",
    description: "사내 문서를 RAG로 조회해 시스템/업무별 담당자를 찾아줍니다.",
    category: "contact-finder",
    status: "active",
    href: "/contact-finder",
    isFrequentlyUsed: false,
  },
  {
    id: "work-assistant",
    name: "업무 도우미",
    description: "사내 문서를 RAG로 조회해 시스템/업무별 담당자를 찾아줍니다.",
    category: "work-assistant",
    status: "active",
    href: "/work-assistant",
    isFrequentlyUsed: false,
  },
  {
    id: "monitoring",
    name: "모니터링",
    description: "각 에이전트의 실행 로그와 상태를 한눈에 확인합니다.",
    category: "monitoring",
    status: "active",
    href: "/monitoring",
    isFrequentlyUsed: false,
  },
];
