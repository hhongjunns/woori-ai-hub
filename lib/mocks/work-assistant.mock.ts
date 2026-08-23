import type {
  GraphEdge,
  GraphNode,
  WorkInfoItem,
  WorkSystem,
} from "@/lib/types/work-assistant";

export const WORK_SYSTEMS_MOCK: WorkSystem[] = [
  {
    id: "dm-management",
    name: "DM관리시스템",
    description: "고객 DM(Direct Mail) 발송 및 이력을 관리하는 사내 시스템",
  },
];

export const WORK_INFO_ITEMS_MOCK: WorkInfoItem[] = [
  {
    id: "dm-contact",
    workSystemId: "dm-management",
    type: "contact",
    title: "담당자",
    summary: "김우리 선임 (마케팅IT팀)",
    detail: {
      이름: "김우리",
      소속: "마케팅IT팀",
      역할: "시스템 담당자",
      연락처: "内선 1234",
    },
  },
  {
    id: "dm-solution",
    workSystemId: "dm-management",
    type: "solution",
    title: "솔루션 정보",
    summary: "자체 개발 DM 발송 엔진 v3.2",
    detail: {
      솔루션명: "DM Sender Engine",
      버전: "v3.2",
      벤더: "자체 개발",
    },
  },
  {
    id: "dm-server-db",
    workSystemId: "dm-management",
    type: "server-db",
    title: "서버/DB 정보",
    summary: "운영 서버 2대, Oracle DB",
    detail: {
      서버: "dm-app-01, dm-app-02",
      DB: "Oracle 19c (dm-db-01)",
      환경: "사내 IDC",
    },
  },
  {
    id: "dm-batch",
    workSystemId: "dm-management",
    type: "batch",
    title: "주요 배치",
    summary: "일 1회 발송 대상자 집계 배치",
    detail: {
      배치명: "DM_TARGET_AGGREGATE",
      주기: "매일 06:00",
      담당: "마케팅IT팀",
    },
  },
  {
    id: "dm-interface",
    workSystemId: "dm-management",
    type: "interface",
    title: "인터페이스",
    summary: "고객정보계 연계 API",
    detail: {
      연계시스템: "고객정보계",
      방식: "REST API",
      주기: "실시간",
    },
  },
  {
    id: "dm-operation",
    workSystemId: "dm-management",
    type: "operation",
    title: "운영 정보",
    summary: "운영 시간 09:00~18:00",
    detail: {
      운영시간: "평일 09:00~18:00",
      점검창: "매월 둘째 주 일요일",
    },
  },
  {
    id: "dm-document",
    workSystemId: "dm-management",
    type: "document",
    title: "관련 문서",
    summary: "운영 매뉴얼, 장애 대응 가이드",
    detail: {
      운영매뉴얼: "DM관리시스템 운영 매뉴얼 v2",
      장애대응: "DM 발송 장애 대응 가이드",
    },
  },
];

export const WORK_SYSTEM_GRAPH_MOCK: Record<
  string,
  { nodes: GraphNode[]; edges: GraphEdge[] }
> = {
  "dm-management": {
    nodes: [
      {
        id: "node-dm-management",
        type: "work-system",
        label: "DM관리시스템",
        refId: "dm-management",
      },
      ...WORK_INFO_ITEMS_MOCK.map((item) => ({
        id: `node-${item.id}`,
        type: item.type,
        label: item.title,
        refId: item.id,
      })),
    ],
    edges: WORK_INFO_ITEMS_MOCK.map((item) => ({
      id: `edge-${item.id}`,
      source: "node-dm-management",
      target: `node-${item.id}`,
    })),
  },
};
