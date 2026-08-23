# Phase 0 Research: Woori AI Hub V1 웹 서비스

## 1. Framework / 언어 버전

- **Decision**: Next.js 14+ (App Router), TypeScript 5.x, React 18, Tailwind CSS.
- **Rationale**: 사용자가 기술 스택으로 직접 지정. App Router는 라우트별
  디렉토리 구조(`app/{route}/`)가 사용자가 요구한 화면별 라우팅 및
  컴포넌트 분리(원칙 IV)와 자연스럽게 맞는다.
- **Alternatives considered**: Pages Router — App Router 대비 레이아웃
  중첩·서버 컴포넌트 활용이 불리하여 채택하지 않음.

## 2. 상태 관리

- **Decision**: 화면별 로컬 상태(`useState`, 필요 시 상위 컴포넌트로 state
  lift-up)를 기본으로 하고, 화면 간 공유 상태가 실제로 필요해지는
  시점에만 zustand 같은 경량 라이브러리를 조건부로 도입한다. V1
  범위(5개 화면 모두 독립적으로 동작, 화면 간 공유 상태 요구사항 없음)에서는
  전역 상태 라이브러리를 사전 도입하지 않는다.
- **Rationale**: Constitution 원칙 X(단순성) — 미래 가능성만으로 추상화를
  추가하지 않는다. spec.md의 어떤 요구사항도 화면 간 상태 공유를
  요구하지 않는다(담당자 찾기의 대화 이력도 해당 화면 내부 상태로 충분).
- **Alternatives considered**: zustand 선도입 — 현재 요구사항에는
  불필요한 선제적 추상화이므로 기각(단, 도입 조건은 plan.md Technical
  Context에 명시).

## 3. 테스트 전략

- **Decision**: V1에서는 자동화 테스트 프레임워크(Vitest, Playwright 등)를
  필수로 도입하지 않는다. 대신 `quickstart.md`에 정의한 수동 검증
  시나리오로 spec.md의 Acceptance Scenarios를 검증한다.
- **Rationale**: spec.md/Constitution 어디에도 테스트 우선 개발(TDD)이
  명시적으로 요구되지 않았고, tasks-template.md도 "Tests are OPTIONAL —
  only include if explicitly requested"라고 명시한다. V1은 UI/UX 검증이
  목적이므로 Figma 대비 시각적 일치 여부가 핵심이며, 이는 자동화
  테스트보다 수동/시각적 확인이 더 적합하다(원칙 X 단순성).
- **Alternatives considered**: Playwright e2e 스모크 테스트 도입 — 5개
  화면의 기본 렌더링을 검증하는 데 유용하지만 V1 범위에서 필수로
  요구되지 않아 이후 필요 시점(V2, 실제 데이터 연동 시)에 재검토한다.

## 4. 서비스 레이어 패턴 (Frontend/AI 분리, 원칙 V)

- **Decision**: 모든 화면은 `lib/services/*.ts`의 비동기 함수를 통해서만
  데이터를 조회한다. 각 함수는 V2의 실제 API 응답과 동일한 형태(shape)의
  Promise를 반환하며, 현재는 내부에서 `lib/mocks/*.ts`의 정적 데이터를
  지연 없이 resolve한다. 예:
  - `getContactFinderMockResponse(query: string): Promise<ChatResponse>`
  - `getWorkAssistantSystems(): Promise<WorkSystem[]>`
- **Rationale**: 사용자가 명시적으로 지정한 패턴이며 Constitution 원칙 V와
  일치한다. V2에서 AI Server 연동 시 이 함수들의 내부 구현만 실제 fetch
  호출로 교체하면 되고, 컴포넌트 코드는 변경할 필요가 없다.
- **Alternatives considered**: 컴포넌트에서 `lib/mocks/`를 직접 import —
  원칙 V(Frontend와 AI 기능의 분리)를 정면으로 위반하므로 기각.

## 5. 업무도우미 지식그래프 시각화 라이브러리

- **Decision**: `@xyflow/react`(구 `react-flow`/`reactflow`, 현재
  활발히 유지보수되는 배포명)를 사용해 노드-엣지 기반 인터랙티브
  그래프를 구현한다. 노드 클릭 시 상세 정보 패널을 별도 UI 영역에
  표시한다.
- **Rationale**: 사용자가 명시적으로 react-flow를 지정했고, spec.md
  FR-042(사용자 확인 하에 V1 범위로 확정)가 확대/축소, 노드 클릭 기반
  상세 정보 조회를 요구한다. `@xyflow/react`는 React 생태계에서 노드/엣지
  기반 인터랙티브 그래프 구현에 가장 널리 쓰이며, 노드/엣지 데이터
  모델이 향후 실제 관계형 데이터로 교체되어도 그대로 유지 가능해
  확장성(원칙 VII)에도 부합한다.
- **Alternatives considered**: `react-force-graph`, `vis-network`, D3.js
  커스텀 구현 — React 컴포넌트 트리와의 통합, 노드 클릭 상세 패널 연동,
  유지보수성 측면에서 `@xyflow/react` 대비 이점이 없어 기각.

## 6. 모니터링 화면 표시 대상

- **Decision**: 모니터링 화면은 Woori AI Hub가 제공하는 AI 서비스/업무도우미
  각각의 가동 현황(정상/지연/오류 등 상태)을 Mock 데이터 기반 정적
  대시보드로 표시한다. 업무 시스템의 서버/DB 등 인프라 상태는 V1
  범위에 포함하지 않는다.
- **Rationale**: `/speckit-specify` 단계에서 사용자와 확정한 FR-052 결정을
  그대로 따른다.
- **Alternatives considered**: 업무 시스템 인프라 상태 포함 — 이미
  clarify 단계에서 범위 밖으로 확정되어 기각.

## 7. 라우팅 진입점

- **Decision**: `app/page.tsx`("/")는 `/dashboard`로 리다이렉트한다.
- **Rationale**: 사용자가 지정한 5개 라우트 목록에 "/"가 없고
  Dashboard가 진입 허브 역할을 하므로(US1), 루트 접근 시 Dashboard로
  안내하는 것이 자연스럽다.
- **Alternatives considered**: "/"에 별도 랜딩 페이지 구성 — spec에
  근거가 없어 기각(불필요한 화면 추가, 원칙 X).
