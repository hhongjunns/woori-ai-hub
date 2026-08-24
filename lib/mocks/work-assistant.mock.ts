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
    updatedAt: "2026-08-20",
  },
  {
    id: "info-security-portal",
    name: "정보보호포탈",
    description:
      "임직원 대상 정보보호 정책, 보안 교육, 접근권한 신청을 처리하는 사내 포털",
    updatedAt: "2026-08-18",
  },
  {
    id: "group-joint-sales",
    name: "그룹공동영업",
    description: "그룹사 간 공동 영업 기회를 발굴하고 실적을 관리하는 시스템",
    updatedAt: "2026-08-15",
  },
  {
    id: "consent-inspection",
    name: "동의및점검",
    description:
      "고객 개인정보 수집·이용 동의 현황과 정기 점검 이력을 관리하는 시스템",
    updatedAt: "2026-08-12",
  },
];

export const WORK_INFO_ITEMS_MOCK: WorkInfoItem[] = [
  // DM관리시스템
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

  // 정보보호포탈
  {
    id: "secp-contact",
    workSystemId: "info-security-portal",
    type: "contact",
    title: "담당자",
    summary: "박보안 선임 (정보보호팀)",
    detail: {
      이름: "박보안",
      소속: "정보보호팀",
      역할: "포털 운영 담당자",
      연락처: "内선 2345",
    },
  },
  {
    id: "secp-solution",
    workSystemId: "info-security-portal",
    type: "solution",
    title: "솔루션 정보",
    summary: "자체 개발 정보보호 포털 v1.8",
    detail: {
      솔루션명: "Security Portal",
      버전: "v1.8",
      벤더: "자체 개발",
    },
  },
  {
    id: "secp-server-db",
    workSystemId: "info-security-portal",
    type: "server-db",
    title: "서버/DB 정보",
    summary: "운영 서버 2대, PostgreSQL 14",
    detail: {
      서버: "secp-app-01, secp-app-02",
      DB: "PostgreSQL 14 (secp-db-01)",
      환경: "사내 IDC",
    },
  },
  {
    id: "secp-batch",
    workSystemId: "info-security-portal",
    type: "batch",
    title: "주요 배치",
    summary: "일 1회 접근권한 만료 알림 배치",
    detail: {
      배치명: "SECP_ACCESS_EXPIRE_NOTI",
      주기: "매일 07:00",
      담당: "정보보호팀",
    },
  },
  {
    id: "secp-interface",
    workSystemId: "info-security-portal",
    type: "interface",
    title: "인터페이스",
    summary: "인사정보계 연계 API (조직/직급 동기화)",
    detail: {
      연계시스템: "인사정보계",
      방식: "REST API",
      주기: "일 1회",
    },
  },
  {
    id: "secp-operation",
    workSystemId: "info-security-portal",
    type: "operation",
    title: "운영 정보",
    summary: "운영 시간 09:00~18:00",
    detail: {
      운영시간: "평일 09:00~18:00",
      점검창: "매주 수요일 00:00~01:00",
    },
  },
  {
    id: "secp-document",
    workSystemId: "info-security-portal",
    type: "document",
    title: "관련 문서",
    summary: "운영 매뉴얼, 보안정책 위반 대응 가이드",
    detail: {
      운영매뉴얼: "정보보호포탈 운영 매뉴얼",
      대응가이드: "보안정책 위반 대응 가이드",
    },
  },

  // 그룹공동영업
  {
    id: "gjs-contact",
    workSystemId: "group-joint-sales",
    type: "contact",
    title: "담당자",
    summary: "이영업 선임 (그룹시너지팀)",
    detail: {
      이름: "이영업",
      소속: "그룹시너지팀",
      역할: "시스템 담당자",
      연락처: "内선 3456",
    },
  },
  {
    id: "gjs-solution",
    workSystemId: "group-joint-sales",
    type: "solution",
    title: "솔루션 정보",
    summary: "그룹공동영업 CRM v2.1",
    detail: {
      솔루션명: "Group Joint Sales CRM",
      버전: "v2.1",
      벤더: "자체 개발",
    },
  },
  {
    id: "gjs-server-db",
    workSystemId: "group-joint-sales",
    type: "server-db",
    title: "서버/DB 정보",
    summary: "운영 서버 3대, Tibero",
    detail: {
      서버: "gjs-app-01 ~ 03",
      DB: "Tibero 6 (gjs-db-01)",
      환경: "사내 IDC",
    },
  },
  {
    id: "gjs-batch",
    workSystemId: "group-joint-sales",
    type: "batch",
    title: "주요 배치",
    summary: "일 1회 그룹사 실적 집계 배치",
    detail: {
      배치명: "GJS_PERFORMANCE_AGGREGATE",
      주기: "매일 23:00",
      담당: "그룹시너지팀",
    },
  },
  {
    id: "gjs-interface",
    workSystemId: "group-joint-sales",
    type: "interface",
    title: "인터페이스",
    summary: "그룹사 계열사 실적 연계 API",
    detail: {
      연계시스템: "그룹사 계열사",
      방식: "REST API",
      주기: "일 1회",
    },
  },
  {
    id: "gjs-operation",
    workSystemId: "group-joint-sales",
    type: "operation",
    title: "운영 정보",
    summary: "운영 시간 09:00~18:00",
    detail: {
      운영시간: "평일 09:00~18:00",
      점검창: "매월 마지막 주 일요일",
    },
  },
  {
    id: "gjs-document",
    workSystemId: "group-joint-sales",
    type: "document",
    title: "관련 문서",
    summary: "운영 매뉴얼, 실적집계 오류 대응 가이드",
    detail: {
      운영매뉴얼: "그룹공동영업 운영 매뉴얼",
      대응가이드: "실적집계 오류 대응 가이드",
    },
  },

  // 동의및점검
  {
    id: "ci-contact",
    workSystemId: "consent-inspection",
    type: "contact",
    title: "담당자",
    summary: "최동의 선임 (컴플라이언스팀)",
    detail: {
      이름: "최동의",
      소속: "컴플라이언스팀",
      역할: "시스템 담당자",
      연락처: "内선 4567",
    },
  },
  {
    id: "ci-solution",
    workSystemId: "consent-inspection",
    type: "solution",
    title: "솔루션 정보",
    summary: "동의관리 솔루션 v1.3",
    detail: {
      솔루션명: "Consent Management",
      버전: "v1.3",
      벤더: "자체 개발",
    },
  },
  {
    id: "ci-server-db",
    workSystemId: "consent-inspection",
    type: "server-db",
    title: "서버/DB 정보",
    summary: "운영 서버 2대, Oracle 19c",
    detail: {
      서버: "ci-app-01, ci-app-02",
      DB: "Oracle 19c (ci-db-01)",
      환경: "사내 IDC",
    },
  },
  {
    id: "ci-batch",
    workSystemId: "consent-inspection",
    type: "batch",
    title: "주요 배치",
    summary: "일 1회 동의 만료 대상자 집계 배치",
    detail: {
      배치명: "CI_CONSENT_EXPIRE_AGGREGATE",
      주기: "매일 05:00",
      담당: "컴플라이언스팀",
    },
  },
  {
    id: "ci-interface",
    workSystemId: "consent-inspection",
    type: "interface",
    title: "인터페이스",
    summary: "본인인증 연계 API",
    detail: {
      연계시스템: "본인인증계",
      방식: "REST API",
      주기: "실시간",
    },
  },
  {
    id: "ci-operation",
    workSystemId: "consent-inspection",
    type: "operation",
    title: "운영 정보",
    summary: "운영 시간 09:00~18:00",
    detail: {
      운영시간: "평일 09:00~18:00",
      점검창: "매월 첫째 주 일요일",
    },
  },
  {
    id: "ci-document",
    workSystemId: "consent-inspection",
    type: "document",
    title: "관련 문서",
    summary: "운영 매뉴얼, 개인정보 점검 체크리스트",
    detail: {
      운영매뉴얼: "동의및점검 운영 매뉴얼",
      체크리스트: "개인정보 점검 체크리스트",
    },
  },
];

export const WORK_SYSTEM_GRAPH_MOCK: Record<
  string,
  { nodes: GraphNode[]; edges: GraphEdge[] }
> = Object.fromEntries(
  WORK_SYSTEMS_MOCK.map((system) => {
    const items = WORK_INFO_ITEMS_MOCK.filter(
      (item) => item.workSystemId === system.id,
    );

    return [
      system.id,
      {
        nodes: [
          {
            id: `node-${system.id}`,
            type: "work-system",
            label: system.name,
            refId: system.id,
          },
          ...items.map((item) => ({
            id: `node-${item.id}`,
            type: item.type,
            label: item.title,
            refId: item.id,
          })),
        ],
        edges: items.map((item) => ({
          id: `edge-${item.id}`,
          source: `node-${system.id}`,
          target: `node-${item.id}`,
        })),
      },
    ];
  }),
);
