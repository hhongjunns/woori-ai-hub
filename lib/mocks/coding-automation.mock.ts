import type {
  Repository,
  TaskCard,
} from "@/lib/types/coding-automation";

export const REPOSITORIES_MOCK: Repository[] = [
  { id: "payment-api", name: "payment-api" },
  { id: "user-service", name: "user-service" },
  { id: "admin-web", name: "admin-web" },
];

export const TASK_CARDS_MOCK: TaskCard[] = [
  {
    id: "CARD-241",
    title: "결제 재시도 로직 추가",
    repositoryId: "payment-api",
    description:
      "결제 요청이 실패했을 때, 지수 백오프 방식으로 최대 3회까지 자동 재시도하도록 PaymentService에 로직을 추가합니다.",
    acceptanceCriteria: [
      "재시도는 1회당 간격이 2배씩 늘어난다 (지수 백오프)",
      "3회 모두 실패하면 실패 상태로 기록하고 알림을 남긴다",
      "관련 단위 테스트가 추가되고 전부 통과한다",
    ],
    priority: "medium",
    status: "in-progress",
    startedRelativeLabel: "5분 전 실행 시작",
    timeline: [
      {
        id: "CARD-241-step-1",
        label: "분석",
        order: 1,
        status: "done",
        logMessage: "분석 완료: PaymentService.retry() 로직 미존재 확인.",
        relativeTimeLabel: "5분 전",
      },
      {
        id: "CARD-241-step-2",
        label: "설계",
        order: 2,
        status: "done",
        logMessage: "설계 완료: 지수 백오프 방식 3회 재시도안 수립.",
        relativeTimeLabel: "4분 전",
      },
      {
        id: "CARD-241-step-3",
        label: "코딩/테스트",
        order: 3,
        status: "in-progress",
        logMessage: "코드 작성 및 테스트 실행 중입니다... (8/12 통과)",
        relativeTimeLabel: "방금",
      },
      {
        id: "CARD-241-step-4",
        label: "PR 생성",
        order: 4,
        status: "pending",
      },
    ],
    comments: [],
  },
  {
    id: "CARD-238",
    title: "로그인 세션 만료 시간 연장",
    repositoryId: "user-service",
    description: "세션 만료 시간을 30분에서 60분으로 연장합니다.",
    acceptanceCriteria: ["세션 설정값이 60분으로 변경된다"],
    priority: "medium",
    status: "pending",
    timeline: [],
    comments: [],
  },
  {
    id: "CARD-233",
    title: "빌드 스크립트 캐시 수정",
    repositoryId: "admin-web",
    description: "CI 빌드 캐시가 무효화되지 않는 문제를 수정합니다.",
    acceptanceCriteria: ["캐시 키에 lockfile 해시가 포함된다"],
    priority: "low",
    status: "pending",
    timeline: [],
    comments: [],
  },
  {
    id: "CARD-219",
    title: "결제 관련 이슈 담당자 안내 문구 추가",
    repositoryId: "payment-api",
    description: "결제 실패 화면에 담당자 안내 문구를 추가합니다.",
    acceptanceCriteria: ["실패 화면에 안내 문구가 노출된다"],
    priority: "low",
    status: "done",
    timeline: [
      {
        id: "CARD-219-step-1",
        label: "분석",
        order: 1,
        status: "done",
        logMessage: "분석 완료.",
        relativeTimeLabel: "3일 전",
      },
      {
        id: "CARD-219-step-2",
        label: "설계",
        order: 2,
        status: "done",
        logMessage: "설계 완료.",
        relativeTimeLabel: "3일 전",
      },
      {
        id: "CARD-219-step-3",
        label: "코딩/테스트",
        order: 3,
        status: "done",
        logMessage: "테스트 12/12 통과.",
        relativeTimeLabel: "2일 전",
      },
      {
        id: "CARD-219-step-4",
        label: "PR 생성",
        order: 4,
        status: "done",
        logMessage: "PR #482 생성 및 머지 완료.",
        relativeTimeLabel: "2일 전",
      },
    ],
    comments: [],
  },
];

export function buildMockTaskCard(
  repositoryId: string,
  requestText: string,
): TaskCard {
  return {
    id: `CARD-${Math.floor(Math.random() * 900 + 100)}`,
    title: "결제 재시도 로직 추가",
    repositoryId,
    description: requestText,
    acceptanceCriteria: [
      "재시도는 1회당 간격이 2배씩 늘어난다 (지수 백오프)",
      "3회 모두 실패하면 실패 상태로 기록하고 알림을 남긴다",
      "관련 단위 테스트가 추가되고 전부 통과한다",
    ],
    priority: "medium",
    status: "pending",
    timeline: [],
    comments: [],
  };
}
