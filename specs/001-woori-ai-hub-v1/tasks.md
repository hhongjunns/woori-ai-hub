---

description: "Task list template for feature implementation"
---

# Tasks: Woori AI Hub V1 웹 서비스

**Input**: Design documents from `/specs/001-woori-ai-hub-v1/`

**Prerequisites**: plan.md (필수), spec.md (필수, User Story), research.md, data-model.md, contracts/services.md, quickstart.md

**Tests**: spec.md에 테스트가 명시적으로 요청되지 않았고 research.md §3에서
V1은 자동화 테스트 프레임워크를 도입하지 않기로 결정했으므로, 이 목록에는
테스트 태스크가 포함되지 않는다. 검증은 quickstart.md의 수동 시나리오로
수행한다(Polish 단계 T050 참고).

**Organization**: 태스크는 spec.md의 User Story(우선순위)별로 그룹화되어
각 스토리를 독립적으로 구현/검증할 수 있다.

**변경 이력**: `/speckit-implement` 단계에서 Figma 실제 디자인을 확인한 결과
코딩자동화(US3) 화면이 spec의 단순 목록보다 훨씬 풍부한 작업 카드
워크플로임을 확인, 사용자 확인 하에 US3 태스크를 재작성했다(2026-08-22).
이에 따라 T028 이후 태스크 번호가 최초 생성본과 달라졌다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능(다른 파일, 완료되지 않은 태스크에 의존하지 않음)
- **[Story]**: 해당 태스크가 속한 User Story(예: US1, US2, US3, US4, US5)
- 모든 태스크에 정확한 파일 경로 포함

## Path Conventions

plan.md의 Project Structure를 따른다 (Next.js App Router 단일 프로젝트):

- 라우트/화면: `app/{route}/page.tsx`, `app/{route}/components/`
- 공통 컴포넌트: `components/common/`
- 데이터 접근 계층: `lib/services/`, `lib/mocks/`, `lib/types/`
- 정적 자산(Figma 아이콘/로고 등): `public/icons/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Next.js 프로젝트 초기화 및 기본 도구 구성

- [X] T001 Next.js 14+ (App Router) + TypeScript 5.x 프로젝트를 저장소 루트에 초기화한다 (`package.json`, `tsconfig.json`, `next.config.ts`) — plan.md Technical Context 기준 (실제로는 Next.js 16.3.2 / React 19 / TypeScript 5로 스캐폴딩됨, "14+" 요건 충족)
- [X] T002 Tailwind CSS를 설치하고 구성한다 (`tailwind.config.ts`, `postcss.config.js`, `app/globals.css`) — Tailwind v4는 CSS-first 구성을 사용하므로 `tailwind.config.ts` 대신 `postcss.config.mjs`(`@tailwindcss/postcss`)와 `app/globals.css`(`@import "tailwindcss"`)로 구성됨
- [X] T003 [P] ESLint + Prettier 린트/포맷 설정을 구성한다 (`eslint.config.mjs`, `.prettierrc`, `.prettierignore`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 User Story가 공통으로 사용하는 레이아웃/내비게이션/공통
컴포넌트 (Constitution 원칙 IV: 컴포넌트 기반 설계). Figma Dashboard
레퍼런스(`get_design_context` 결과)에서 추출한 Header/Sidebar 실제
디자인 토큰을 따른다: 헤더 높이 49px 흰 배경 하단 1px 구분선, 로고
`public/icons/logo.png` + "Woori AI Hub"(Pretendard Bold 16px `#0083ca`),
사이드바 너비 150px 우측 1px 구분선, 5개 메뉴(홈/코딩 자동화/담당자
찾기/업무 도우미/모니터링, 각 아이콘은 `public/icons/nav-*.svg`),
현재 라우트 메뉴는 `#0083ca`, 그 외는 `#1f2428`.

**⚠️ CRITICAL**: 이 단계가 끝나기 전에는 어떤 User Story 작업도 시작할 수 없다

- [X] T004 [P] Header 공통 컴포넌트를 `components/common/Header.tsx`에 구현한다 (Figma 토큰: 높이 49px, `public/icons/logo.png` 30x30, "Woori AI Hub" Pretendard Bold 16px `#0083ca`, 하단 1px `#e5e5e5` 구분선)
- [X] T005 [P] Sidebar 공통 컴포넌트를 `components/common/Sidebar.tsx`에 구현한다 (Figma 토큰: 너비 150px, 5개 메뉴 홈(`/dashboard`)·코딩 자동화(`/coding-automation`)·담당자 찾기(`/contact-finder`)·업무 도우미(`/work-assistant`)·모니터링(`/monitoring`), 각 `public/icons/nav-*.svg` 아이콘 + Pretendard Bold 14px 라벨, `usePathname()`으로 현재 라우트는 `#0083ca` 그 외는 `#1f2428`, FR-001)
- [X] T006 [P] Button 공통 컴포넌트를 `components/common/Button.tsx`에 구현한다 (Primary `#0083ca` / Secondary `#e5e5e5` 배경 variant, Figma 코딩자동화 버튼 스타일 참고)
- [X] T007 [P] Card 공통 컴포넌트를 `components/common/Card.tsx`에 구현한다 (흰 배경, `#e5e5e5` 1px 테두리, `rounded-[10px]`, Figma Dashboard 카드 참고)
- [X] T008 [P] Input 공통 컴포넌트를 `components/common/Input.tsx`에 구현한다
- [X] T009 [P] Modal 공통 컴포넌트를 `components/common/Modal.tsx`에 구현한다
- [X] T010 루트 레이아웃을 `app/layout.tsx`에 구현하여 Header/Sidebar 공통 셸을 구성한다 (T004, T005에 의존)
- [X] T011 루트 라우트를 `app/page.tsx`에 구현하여 `/dashboard`로 리다이렉트한다 (research.md §7, T010에 의존)

**Checkpoint**: 공통 셸이 준비되어 이후 모든 User Story를 병렬로 시작할 수 있다

---

## Phase 3: User Story 1 - Dashboard에서 주요 서비스 한눈에 확인 (Priority: P1) 🎯 MVP

**Goal**: 사용자가 Woori AI Hub 접속 시 주요 AI 서비스 목록과 자주 사용하는
업무도우미/개발자동화 도구 바로가기를 한눈에 확인하고 빠르게 접근한다
(spec.md US1). Figma Dashboard 레퍼런스: "AI Agent Hub" 타이틀 + 설명,
4개 카드(코딩 자동화/담당자 찾기/업무 도우미/모니터링) 가로 배열,
177px 높이·10px 라운드·흰 배경(첫 카드만 `#0083ca` 강조 배경), 각 카드
아이콘(`public/icons/card-*.svg`) + 제목(Bold 14px) + 설명(Regular 14px).

**Independent Test**: `/dashboard` 접속 시 AI 서비스 목록과 자주 사용하는
항목 바로가기가 노출되고, 각 항목 클릭 시 해당 화면으로 이동하는지 확인
(SC-001, SC-002)

### Implementation for User Story 1

- [X] T012 [P] [US1] `AIService` 타입을 `lib/types/ai-service.ts`에 정의한다 (data-model.md)
- [X] T013 [P] [US1] AI 서비스 Mock 데이터를 `lib/mocks/ai-services.mock.ts`에 작성한다 (코딩 자동화/담당자 찾기/업무 도우미/모니터링 4건, Figma 카드 설명 문구 반영, 코딩 자동화만 `isFrequentlyUsed: true` — Figma에서 유일하게 강조된 카드)
- [X] T014 [US1] `lib/services/ai-services.ts`에 `getAIServices()`를 구현한다 (`isFrequentlyUsed` 필드로 FR-011 표현, contracts/services.md, T012·T013에 의존)
- [X] T015 [P] [US1] Dashboard AI 서비스 카드 그리드 컴포넌트를 `app/dashboard/components/ServiceGrid.tsx`에 구현한다 (Figma 4카드 레이아웃, `public/icons/card-*.svg`, 자주 사용하는 서비스는 강조 배경으로 표시, 클릭 시 `href`로 이동 FR-012). **설계 변경**: Figma Dashboard에는 4카드 그리드 하나만 존재하고 별도의 "자주 사용하는" 섹션이 없음을 확인 — FR-011의 "자주 사용하는 항목 바로가기"는 별도 섹션(T016) 대신 `ServiceGrid`의 강조 스타일로 흡수하여 Figma에 없는 섹션을 임의로 추가하지 않았다(Constitution 원칙 III 우선).
- [X] ~~T016~~ 별도 컴포넌트로 분리하지 않음 — T015에 흡수 (위 설계 변경 참고)
- [X] T017 [US1] `app/dashboard/page.tsx`를 구현하여 `getAIServices`/`getFrequentlyUsedServices`를 호출하고 "AI Agent Hub" 타이틀/설명과 함께 `ServiceGrid`에 연결한다 (T014, T015에 의존)

**Checkpoint**: Dashboard가 독립적으로 완전히 동작하며 테스트 가능하다

---

## Phase 4: User Story 2 - 업무도우미로 업무 시스템 정보 탐색 (Priority: P1)

**Goal**: 사용자가 업무도우미에서 DM관리시스템을 선택하고 담당자/솔루션
정보/서버·DB 정보/주요 배치/인터페이스/운영 정보/관련 문서를 조회하며,
정보 항목 간 관계를 인터랙티브 지식그래프로 탐색한다 (spec.md US2).
**디자인 메모**: 해당 Figma 프레임에는 헤더/사이드바 셸만 있고 메인
콘텐츠 디자인이 없음을 확인(사용자 확인 완료, 2026-08-22) — 아래
태스크는 spec.md/plan.md/data-model.md를 기준으로 직접 설계하며, 공통
Header/Sidebar 스타일 토큰(Pretendard, `#0083ca` 포인트 컬러, `#e5e5e5`
보더)만 재사용한다.

**Independent Test**: `/work-assistant`에서 DM관리시스템을 선택해 7개
정보 카테고리를 조회하고, 지식그래프 노드를 클릭해 상세 패널이 표시되는지
확인 (SC-005)

### Implementation for User Story 2

- [X] T018 [US2] `@xyflow/react` 의존성을 설치하고 기본 스타일시트를 구성한다 (research.md §5)
- [X] T019 [P] [US2] `WorkSystem`, `WorkInfoItem`, `GraphNode`, `GraphEdge` 타입을 `lib/types/work-assistant.ts`에 정의한다 (data-model.md)
- [X] T020 [P] [US2] 업무도우미 Mock 데이터를 `lib/mocks/work-assistant.mock.ts`에 작성한다 (DM관리시스템 1건, 7개 `WorkInfoItem`, 대응하는 `GraphNode`/`GraphEdge`)
- [X] T021 [US2] `lib/services/work-assistant.ts`에 `getWorkAssistantSystems()`, `getWorkSystemInfoItems(systemId)`, `getWorkSystemGraph(systemId)`를 구현한다 (contracts/services.md, T019·T020에 의존)
- [X] T022 [P] [US2] 업무 시스템 목록 컴포넌트를 `app/work-assistant/components/WorkSystemList.tsx`에 구현한다 (공통 `Card`/브랜드 컬러 토큰 재사용)
- [X] T023 [US2] `app/work-assistant/page.tsx`를 구현하여 `getWorkAssistantSystems`를 호출하고 `WorkSystemList`에서 시스템 선택 시 `/work-assistant/[systemId]`로 이동시킨다 (T021, T022에 의존)
- [X] T024 [P] [US2] 업무 정보 탐색 패널 컴포넌트를 `app/work-assistant/[systemId]/components/WorkInfoPanel.tsx`에 구현한다 (담당자/솔루션/서버·DB/배치/인터페이스/운영 정보/관련 문서 7종 표시, FR-041)
- [X] T025 [P] [US2] 지식그래프 컴포넌트를 `app/work-assistant/[systemId]/components/KnowledgeGraph.tsx`에 `@xyflow/react`로 구현한다 (노드/엣지 렌더링, 확대/축소, 노드 클릭 이벤트 노출, FR-042, T018에 의존)
- [X] T026 [US2] 노드 상세 정보 패널 컴포넌트를 `app/work-assistant/[systemId]/components/NodeDetailPanel.tsx`에 구현한다 (`KnowledgeGraph`의 노드 클릭 이벤트로 선택된 `WorkInfoItem`/`WorkSystem` 상세 표시, T025에 의존)
- [X] T027 [US2] `app/work-assistant/[systemId]/page.tsx`를 구현하여 `getWorkSystemInfoItems`/`getWorkSystemGraph`를 호출하고 `WorkInfoPanel`/`KnowledgeGraph`/`NodeDetailPanel`을 연결한다 (T021, T024, T025, T026에 의존; AI Chat 확장을 고려한 레이아웃 여백 확보 FR-043; 상태 관리는 `WorkSystemDetailClient.tsx` 클라이언트 컴포넌트로 분리)

**Checkpoint**: 업무도우미가 독립적으로 완전히 동작하며 테스트 가능하다

---

## Phase 5: User Story 3 - 코딩자동화 작업 카드 워크플로 (Priority: P2)

**Goal**: 사용자가 레포지토리를 선택해 새 작업을 요청하면 Mock AI가 작업
카드를 생성하고, 진행중/대기/완료 컬럼에서 카드를 관리하며, 진행중 카드의
분석→설계→코딩/테스트→PR 생성 실행 타임라인과 로그를 확인하고 댓글을
남길 수 있다 (spec.md US3, FR-020~FR-026). **범위 변경**: Figma 실제
디자인이 spec 초안(단순 목록)보다 훨씬 풍부한 칸반형 워크플로임을 확인,
사용자 확인 하에 V1 범위를 이 워크플로로 확장했다(2026-08-22).

**Independent Test**: `/coding-automation`에서 레포지토리를 선택하고 새
작업 요청을 "카드로 변환" → "이 카드로 실행"으로 진행중 컬럼에 추가한
뒤, 해당 카드를 선택해 4단계 타임라인·로그가 표시되고 댓글을 추가할 수
있는지 확인 (SC-003)

### Implementation for User Story 3

- [X] T028 [P] [US3] `Repository`, `TaskCard`, `TaskCardTimelineStep`, `TaskCardComment` 타입을 `lib/types/coding-automation.ts`에 정의한다 (data-model.md)
- [X] T029 [P] [US3] 코딩자동화 Mock 데이터를 `lib/mocks/coding-automation.mock.ts`에 작성한다 (레포지토리 3건: `payment-api`/`user-service`/`admin-web`; 진행중 카드 `CARD-241`「결제 재시도 로직 추가」— 분석/설계 완료, 코딩·테스트 진행중, PR 생성 대기 4단계 타임라인 포함; 대기 카드 2건; 완료 카드 1건; Figma 문구 재사용)
- [X] T030 [US3] `lib/services/coding-automation.ts`에 `getRepositories()`, `getTaskCards()`, `generateMockTaskCard(repositoryId, requestText)`, `addTaskCardComment(cardId, content)`를 구현한다 (contracts/services.md, T028·T029에 의존)
- [X] T031 [P] [US3] 레포지토리 사이드바 컴포넌트를 `app/coding-automation/components/RepositorySidebar.tsx`에 구현한다 (레포 목록 표시/선택, "+ 레포 추가" 버튼은 비활성 표시만, FR-020)
- [X] T032 [P] [US3] 새 작업 요청 폼 컴포넌트를 `app/coding-automation/components/NewRequestForm.tsx`에 구현한다 (자연어 입력 textarea + "카드로 변환" 버튼, FR-021·FR-022)
- [X] T033 [US3] 생성 카드 미리보기 컴포넌트를 `app/coding-automation/components/GeneratedCardPreview.tsx`에 구현한다 (제목/설명/완료 조건/우선순위 표시, "이 카드로 실행"·"다시 요청하기" 버튼, FR-023, T032에 의존)
- [X] T034 [P] [US3] 작업 카드 보드 컴포넌트를 `app/coding-automation/components/TaskCardBoard.tsx`에 구현한다 (진행중/대기/완료 3컬럼, 카드에 레포·제목·우선순위 배지 표시, 카드 클릭 이벤트 노출, FR-024)
- [X] T035 [US3] 실행 타임라인 패널 컴포넌트를 `app/coding-automation/components/TaskCardTimelinePanel.tsx`에 구현한다 (분석/설계/코딩·테스트/PR 생성 4단계, 완료✓·진행중●·대기○ 상태 표시, 단계별 로그+상대 시각, 어두운 배경 톤은 Figma 스크린샷 참고, FR-025, T034의 카드 선택 이벤트에 의존)
- [X] T036 [P] [US3] 댓글 입력 컴포넌트를 `app/coding-automation/components/TaskCardCommentInput.tsx`에 구현한다 (빈 값 제출 방지, FR-026)
- [X] T037 [US3] `app/coding-automation/page.tsx`를 구현하여 `getRepositories`/`getTaskCards`를 호출하고 `CodingAutomationClient.tsx`(화면 로컬 상태 보유)에 전달, `RepositorySidebar`/`NewRequestForm`/`GeneratedCardPreview`/`TaskCardBoard`/`TaskCardTimelinePanel`/`TaskCardCommentInput`을 연결한다 (T030, T031, T033, T034, T035, T036에 의존)

**Checkpoint**: 코딩자동화가 독립적으로 완전히 동작하며 테스트 가능하다

---

## Phase 6: User Story 4 - 담당자 찾기 질의 (Priority: P2)

**Goal**: 사용자가 채팅형 화면에서 자연어 질문을 입력하면 Mock 답변을
확인하고, 대화 이력이 화면에 누적된다 (spec.md US4). **디자인 메모**:
Figma 메인 콘텐츠가 통짜 스크린샷 이미지 1장으로 되어 있어 정확한
색상/간격 값을 추출할 수 없음(사용자 확인 완료, 2026-08-22) — 아래
태스크는 스크린샷을 시각적으로 근사 재현한다: 다크 테마(짙은 남색/검정
배경, 흰 텍스트), 좌측 "자주 찾는 조직"/"최근 검색"/"관련 링크" 서브
사이드바, 우측 상단 검색 카드 + 추천 태그 칩, 검색 결과 담당자 카드
(이름/직함/부서/사번/연락처/"연락하기" 버튼), 하단 채팅 입력창.

**Independent Test**: `/contact-finder`에서 질문을 연속으로 2회 제출했을
때 이전 대화가 유지된 채 새 응답이 추가되는지, 빈 질문 제출 시 안내가
표시되는지 확인 (SC-004)

### Implementation for User Story 4

- [X] T038 [P] [US4] `ChatMessage`/`ChatResponse` 타입을 `lib/types/contact-finder.ts`에 정의한다 (data-model.md; `ContactResult` 포함)
- [X] T039 [P] [US4] 질문 키워드별 Mock 응답 데이터를 `lib/mocks/contact-finder.mock.ts`에 작성한다 (키워드 매칭 응답 몇 건 + 기본 응답, Figma 스크린샷의 "PG 연동" 예시 반영)
- [X] T040 [US4] `lib/services/contact-finder.ts`에 `getContactFinderMockResponse(query)`를 구현한다 (contracts/services.md, T038·T039에 의존)
- [X] T041 [P] [US4] 채팅 메시지 목록 컴포넌트를 `app/contact-finder/components/ChatMessageList.tsx`에 구현한다 (대화 이력 누적 표시, 담당자 카드 스타일은 Figma 스크린샷 근사 재현). 추가로 `ContactFinderSidebar.tsx`(자주 찾는 조직/최근 검색) 구현.
- [X] T042 [P] [US4] 채팅 입력 컴포넌트를 `app/contact-finder/components/ChatInput.tsx`에 구현한다 (빈 질문 제출 방지 및 안내 메시지, FR-030)
- [X] T043 [US4] `app/contact-finder/page.tsx`를 구현하여 `ChatMessage[]` 화면 로컬 상태를 유지하고, `ChatInput` 제출 시 `getContactFinderMockResponse`를 호출해 응답을 `ChatMessageList`에 이어서 표시한다 (T040, T041, T042에 의존)

**Checkpoint**: 담당자 찾기가 독립적으로 완전히 동작하며 테스트 가능하다

---

## Phase 7: User Story 5 - 모니터링 현황 확인 (Priority: P3)

**Goal**: 사용자가 모니터링 화면에서 AI 서비스/업무도우미의 가동 현황을
확인하고 비정상 항목을 시각적으로 구분한다 (spec.md US5). **디자인
메모**: 해당 Figma 프레임에는 헤더/사이드바 셸만 있고 메인 콘텐츠
디자인이 없음을 확인(사용자 확인 완료, 2026-08-22) — 아래 태스크는
spec.md/plan.md/data-model.md를 기준으로 직접 설계하며, 공통 스타일
토큰만 재사용한다.

**Independent Test**: `/monitoring` 진입 시 각 항목의 상태가 표시되고,
비정상 상태 항목이 시각적으로 구분되는지 확인 (SC-007)

### Implementation for User Story 5

- [X] T044 [P] [US5] `MonitoringItem` 타입을 `lib/types/monitoring.ts`에 정의한다 (data-model.md)
- [X] T045 [P] [US5] 모니터링 Mock 데이터를 `lib/mocks/monitoring.mock.ts`에 작성한다 (정상/지연/오류 상태를 혼합 포함)
- [X] T046 [US5] `lib/services/monitoring.ts`에 `getMonitoringItems()`를 구현한다 (contracts/services.md, T044·T045에 의존)
- [X] T047 [P] [US5] 모니터링 상태 카드 컴포넌트를 `app/monitoring/components/MonitoringStatusCard.tsx`에 구현한다 (상태별 색상/뱃지로 비정상 항목 구분, FR-051)
- [X] T048 [US5] `app/monitoring/page.tsx`를 구현하여 `getMonitoringItems`를 호출하고 `MonitoringStatusCard` 목록에 연결한다 (T046, T047에 의존)

**Checkpoint**: 모니터링이 독립적으로 완전히 동작하며 테스트 가능하다

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 전체 화면에 걸친 검증 및 정리

- [X] T049 [P] 5개 화면(Dashboard/코딩자동화/담당자 찾기/업무도우미/모니터링) 각각을 spec.md에 명시된 Figma 레퍼런스(또는 사용자 확인을 거쳐 재설계한 화면은 그 결정 사항)와 대조하여 일치하는지 확인한다 (Constitution 원칙 III) — Playwright로 각 화면 스크린샷을 캡처해 Figma `get_design_context`/스크린샷과 비교 확인함
- [X] T050 [P] `quickstart.md`의 모든 검증 시나리오를 수동으로 실행하고 결과를 확인한다 — 루트 리다이렉트, Dashboard 카드 클릭, 업무도우미 노드 클릭→상세 패널, 코딩자동화 카드 변환→실행→타임라인→댓글, 담당자 찾기 연속 질의, 모니터링 비정상 상태 표시까지 Playwright로 확인함
- [X] T051 모든 화면 컴포넌트가 `lib/mocks/`를 직접 import하지 않고 `lib/services/`만 경유하는지 점검한다 (Constitution 원칙 V, `grep -r "lib/mocks" app/` 등으로 확인) — `ContactFinderSidebar`의 직접 import 위반을 발견해 `getContactFinderSidebarInfo()` 서비스 함수로 수정함
- [X] T052 `app/`, `components/`, `lib/` 전반의 네이밍/구조 일관성을 점검하고 정리한다 (Constitution 원칙 XI) — `npm run lint`, `npx tsc --noEmit`, `npm run build` 모두 통과 확인

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 의존성 없음 — 즉시 시작 가능
- **Foundational (Phase 2)**: Setup 완료에 의존 — 모든 User Story를 BLOCK
- **User Stories (Phase 3-7)**: 모두 Foundational 완료에 의존
  - US1(Dashboard)·US2(업무도우미)는 P1로 우선 진행 권장
  - 이후 US3(코딩자동화)·US4(담당자 찾기)는 P2, US5(모니터링)는 P3
  - 5개 스토리는 서로 다른 파일(라우트/타입/Mock/서비스)을 사용하므로 인력이 있다면 병렬 진행 가능
- **Polish (Phase 8)**: 구현하고자 하는 모든 User Story 완료에 의존

### User Story Dependencies

- **US1 (P1)**: Foundational 이후 시작 가능 — 다른 스토리에 의존하지 않음
- **US2 (P1)**: Foundational 이후 시작 가능 — 다른 스토리에 의존하지 않음
- **US3 (P2)**: Foundational 이후 시작 가능 — 다른 스토리에 의존하지 않음
- **US4 (P2)**: Foundational 이후 시작 가능 — 다른 스토리에 의존하지 않음
- **US5 (P3)**: Foundational 이후 시작 가능 — 다른 스토리에 의존하지 않음 (단, Mock 데이터상 `AIService`와 이름을 맞추면 일관성이 좋아지므로 US1 이후 진행을 권장)

### Within Each User Story

- 타입 정의 → Mock 데이터 → 서비스 함수 → UI 컴포넌트 → 페이지 조립 순서
- 페이지 조립 태스크는 해당 스토리의 서비스·컴포넌트 태스크 완료 후 진행

### Parallel Opportunities

- Setup의 T003은 T001·T002와 병렬 가능
- Foundational의 T004-T009(공통 컴포넌트 6종)는 모두 병렬 가능
- Foundational 완료 후 US1·US2·US3·US4·US5는 서로 다른 담당자가 병렬 진행 가능
- 각 스토리 내 타입/Mock 정의 태스크(`[P]` 표시)는 병렬 가능
- 각 스토리 내 독립적인 UI 컴포넌트 태스크(`[P]` 표시)는 병렬 가능

---

## Parallel Example: User Story 1

```bash
# T012, T013을 함께 진행
Task: "AIService 타입을 lib/types/ai-service.ts에 정의"
Task: "AI 서비스 Mock 데이터를 lib/mocks/ai-services.mock.ts에 작성"

# T014 완료 후 T015, T016을 함께 진행
Task: "Dashboard AI 서비스 카드 그리드 컴포넌트를 app/dashboard/components/ServiceGrid.tsx에 구현"
Task: "자주 사용하는 항목 바로가기 컴포넌트를 app/dashboard/components/FrequentlyUsedShortcuts.tsx에 구현"
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (필수 — 모든 스토리를 BLOCK)
3. Phase 3: User Story 1 (Dashboard) 완료
4. Phase 4: User Story 2 (업무도우미) 완료
5. **STOP and VALIDATE**: US1·US2를 quickstart.md 시나리오로 독립 검증
6. 두 화면 모두 Woori AI Hub의 핵심 가치(진입 허브 + 지식그래프 기반 업무 지식 탐색)를 보여주는 MVP로 데모 가능

### Incremental Delivery

1. Setup + Foundational → 공통 셸 준비 완료
2. US1(Dashboard) 추가 → 독립 검증 → 데모 (MVP 시작점)
3. US2(업무도우미) 추가 → 독립 검증 → 데모 (MVP 완성)
4. US3(코딩자동화) 추가 → 독립 검증 → 데모
5. US4(담당자 찾기) 추가 → 독립 검증 → 데모
6. US5(모니터링) 추가 → 독립 검증 → 데모
7. Phase 8: Polish로 Figma 일치·경계 준수·코드 정리 마무리

### Parallel Team Strategy

여러 인력이 있는 경우:

1. 팀 전체가 Setup + Foundational을 함께 완료
2. Foundational 완료 후:
   - 담당자 A: User Story 1 (Dashboard)
   - 담당자 B: User Story 2 (업무도우미, 지식그래프 포함이라 상대적으로 작업량이 큼)
   - 담당자 C: User Story 3 (코딩자동화, 작업 카드 워크플로 포함이라 작업량이 큼)
   - 담당자 D: User Story 4 + User Story 5
3. 각 스토리는 서로 다른 라우트/파일을 사용하므로 독립적으로 완료·통합 가능

---

## Notes

- `[P]` 태스크 = 서로 다른 파일, 의존성 없음
- `[Story]` 라벨은 해당 태스크가 어떤 User Story에 속하는지 추적하기 위함
- 각 User Story는 독립적으로 완료·테스트 가능해야 한다
- 커밋은 태스크 단위 또는 논리적 그룹 단위로 수행
- 각 체크포인트에서 멈추고 해당 스토리를 독립적으로 검증할 수 있다
- 지양할 것: 모호한 태스크, 동일 파일에 대한 태스크 충돌, 스토리 간 독립성을 해치는 교차 의존
