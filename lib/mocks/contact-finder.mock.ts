import type { ChatMessage, ContactResult } from "@/lib/types/contact-finder";

export const FREQUENTLY_FOUND_ORGS = [
  "포탈팀",
  "그룹지원팀",
  "인프라팀",
  "인사팀",
];

export const RECENT_SEARCHES = [
  "가상행번 담당",
  "신청업무 담당",
  "동의 및 점검 하는 법",
];

const PG_CONTACTS: ContactResult[] = [
  {
    id: "contact-kim",
    name: "김OO 선임",
    title: "결제플랫폼팀 · PG사 연동 · 정산 프로세스 담당",
    department: "결제플랫폼팀",
    extension: "内선 1234 · @kim.oo",
    tags: ["도입 2026.07", "결제 인증 위키"],
  },
  {
    id: "contact-lee",
    name: "이OO 매니저",
    title: "결제플랫폼팀 · 신규 PG사 온보딩 리드",
    department: "결제플랫폼팀",
    extension: "内선 1298 · @lee.oo",
    tags: ["위키 · PG 연동 가이드"],
  },
];

const DEFAULT_CONTACTS: ContactResult[] = [
  {
    id: "contact-default",
    name: "담당팀 안내",
    title: "요청하신 업무와 가장 관련 있는 팀을 찾지 못했어요",
    department: "-",
    extension: "-",
    tags: ["다시 질문해 주세요"],
  },
];

export const PAYMENT_CLARIFY_QUICK_REPLIES = [
  "API 오류",
  "정산 · 정합성",
  "PG 연동",
  "잘 모르겠음",
];

export const CONTACT_FINDER_RESPONSES_MOCK: {
  keywords: string[];
  content: string;
  contacts?: ContactResult[];
  quickReplies?: string[];
}[] = [
  {
    keywords: ["pg", "정산", "정합성"],
    content: "PG 연동 관련 담당자 2명을 찾았어요.",
    contacts: PG_CONTACTS,
  },
  {
    keywords: ["결제"],
    content:
      "\"결제\"는 범위가 넓어서, 어떤 이슈에 가까운지 알려주시면 더 정확히 찾아드릴게요.",
    quickReplies: PAYMENT_CLARIFY_QUICK_REPLIES,
  },
];

export function findMockChatResponse(query: string): ChatMessage {
  const normalized = query.toLowerCase();
  const matched = CONTACT_FINDER_RESPONSES_MOCK.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );

  return {
    id: `msg-${Date.now()}`,
    role: "assistant",
    content: matched?.content ?? "관련 담당자를 찾지 못했어요. 다른 키워드로 다시 질문해 주세요.",
    createdAt: new Date().toISOString(),
    contacts: matched?.contacts ?? (matched ? undefined : DEFAULT_CONTACTS),
    quickReplies: matched?.quickReplies,
  };
}
