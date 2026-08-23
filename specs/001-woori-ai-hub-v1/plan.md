# Implementation Plan: Woori AI Hub V1 웹 서비스

**Branch**: `001-woori-ai-hub-v1` | **Date**: 2026-08-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-woori-ai-hub-v1/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Woori AI Hub V1은 사내 임직원이 Dashboard, 코딩자동화, 담당자 찾기,
업무도우미, 모니터링 5개 화면을 하나의 웹 플랫폼에서 사용하는
UI/UX를 구현한다. 실제 LLM/RAG/Agent/MCP/사내 DB 연동은 하지 않고,
`lib/services/`를 통해서만 접근되는 Mock Data로 모든 화면을 구동한다.
서비스 함수는 실제 API 응답과 동일한 형태(shape)로 설계하여 V2에서
내부 구현만 교체하면 되도록 한다. 업무도우미의 지식그래프는 `@xyflow/react`
(react-flow) 기반의 인터랙티브 노드/엣지 그래프로 구현하며, 노드 클릭 시
상세 정보 패널을 표시한다.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 14+ (App Router)

**Primary Dependencies**: Next.js, React 18, Tailwind CSS, `@xyflow/react`
(지식그래프 노드/엣지 시각화; "react-flow"는 현재 `@xyflow/react` 패키지로
배포된다), 상태 관리 전역 라이브러리는 기본 미도입(zustand는 필요 시점에
조건부 도입, 아래 research.md 참고)

**Storage**: N/A — V1은 실제 저장소/DB를 사용하지 않으며 `lib/mocks/`의
정적 Mock 데이터만 사용한다.

**Testing**: V1은 자동화된 테스트 스위트를 필수로 도입하지 않는다.
`quickstart.md`의 수동 검증 시나리오로 spec의 Acceptance Scenarios를
검증한다 (근거: research.md 참고).

**Target Platform**: 데스크톱 웹 브라우저(사내 PC 환경, 최신 evergreen
브라우저 기준) — 사내 업무용 내부 툴로서 모바일 대응은 V1 범위 밖.

**Project Type**: Web application — 단일 Next.js 프로젝트(Frontend only).
`lib/services/` 레이어가 향후 별도 AI Server와의 API 연동 지점을
대신한다(Constitution 원칙 V).

**Performance Goals**: 사내 인트라넷 환경에서 화면 전환 및 초기 로드가
사용자가 지연을 느끼지 않는 수준(수 초 이내)이면 충분하며, 별도의
고성능 목표는 설정하지 않는다(내부 업무 툴, 대규모 트래픽 대상 아님).

**Constraints**: 모든 데이터 접근은 `lib/services/`를 통해서만 이루어져야
하며 컴포넌트가 Mock 데이터를 직접 import할 수 없다(FR-002, Constitution
원칙 V). 화면별 시각 디자인은 제공된 Figma 레퍼런스를 그대로 따라야
한다(FR-003, Constitution 원칙 III).

**Scale/Scope**: 5개 주요 화면(Dashboard, 코딩자동화, 담당자 찾기,
업무도우미, 모니터링), 업무도우미 예시 업무 시스템 1건(DM관리시스템,
7개 정보 카테고리). 사내 임직원 대상 내부 툴로 별도의 동시 사용자 규모
목표는 정의하지 않는다.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | 원칙 | 평가 | 근거 |
|---|------|------|------|
| I | 사용자 중심 | PASS | Dashboard를 진입 허브로 삼아 최소 클릭으로 주요 기능에 접근하도록 설계(SC-001, SC-002). |
| II | 명세 기반 개발 | PASS (변경 이력 있음) | 본 계획 수립 중 업무도우미 지식그래프 범위(FR-042)에 대해 spec과 plan 입력이 충돌함을 발견, 사용자 확인을 거쳐 spec.md를 먼저 갱신한 뒤 계획에 반영함. 임의 판단 없이 명세를 명확히 하는 절차를 따름. |
| III | Figma를 UI Source of Truth로 사용 | PASS | 화면별 레이아웃/컴포넌트/스타일은 구현 단계에서 Figma MCP로 5개 화면 각각의 Figma 레퍼런스를 참조하며, 본 계획은 아키텍처/구조만 정의하고 시각 디자인을 임의 재해석하지 않는다. |
| IV | 컴포넌트 기반 설계 | PASS | 공통 UI(Header, Sidebar, Button, Card, Input, Modal)는 `components/common/`에, 화면 전용 컴포넌트는 각 라우트 하위 `components/`에 분리한다. |
| V | Frontend와 AI 기능의 분리 | PASS | 모든 데이터 접근이 `lib/services/`를 경유하고, 서비스 함수는 실제 API와 동일한 반환 형태(Promise 기반)로 설계되어 V2에서 내부 구현만 교체 가능. |
| VI | 단계적 개발 | PASS | 실제 LLM/RAG/Agent/MCP/사내 DB 연동을 포함하지 않으며 전 화면이 Mock Data 기반. |
| VII | 확장성 | PASS | 지식그래프의 노드/엣지 데이터 모델은 향후 실제 관계형 데이터로 교체되어도 구조가 유지되도록 설계(data-model.md). 다른 업무 시스템 추가 시 동일한 서비스/컴포넌트 패턴 재사용 가능. |
| VIII | 보안 및 데이터 보호 | N/A (V1) | Constitution에 따라 V2 이후 적용 대상이며 V1은 Mock Data만 사용. |
| IX | AI 답변의 신뢰성 | N/A (V1) | Constitution에 따라 V2 이후 적용 대상이며 V1은 실제 LLM/RAG를 구현하지 않음. |
| X | 단순성 | PASS | 전역 상태 관리 라이브러리는 기본 도입하지 않고 필요 시점에 조건부 도입한다. 자동화 테스트 인프라도 V1에서는 최소화(수동 검증)한다. |
| XI | 코드 품질 | PASS | 서비스/Mock/컴포넌트 계층을 명확히 분리하고 화면별 디렉토리 규칙을 일관되게 적용한다. |

원칙 간 우선순위(Governance: Figma > 단순성 > 확장성)에 따라, 지식그래프
구현 방식(react-flow interactive)이 상대적으로 복잡도를 높이는 결정이지만
이는 spec.md에 명시된 요구사항(FR-042)에 따른 것이며 Figma 디자인/단순성
우선순위와 상충하지 않는다(Complexity Tracking 섹션 참고).

## Project Structure

### Documentation (this feature)

```text
specs/001-woori-ai-hub-v1/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md         # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── services.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                       # 루트 레이아웃 (공통 Header/Sidebar 셸)
├── page.tsx                         # "/" → "/dashboard" 리다이렉트
├── dashboard/
│   ├── page.tsx
│   └── components/
├── coding-automation/
│   ├── page.tsx
│   └── components/
├── contact-finder/
│   ├── page.tsx
│   └── components/
├── work-assistant/
│   ├── page.tsx                     # 업무 시스템 목록
│   ├── components/
│   └── [systemId]/
│       ├── page.tsx                 # 업무 시스템 상세(지식그래프 + 정보 탐색)
│       └── components/
└── monitoring/
    ├── page.tsx
    └── components/

components/
└── common/                          # Header, Sidebar, Button, Card, Input, Modal 등

lib/
├── services/                        # 유일한 데이터 접근 경로 (원칙 V)
│   ├── ai-services.ts
│   ├── coding-automation.ts
│   ├── contact-finder.ts
│   ├── work-assistant.ts
│   └── monitoring.ts
├── mocks/                           # 화면별 Mock 데이터
│   ├── ai-services.mock.ts
│   ├── coding-automation.mock.ts
│   ├── contact-finder.mock.ts
│   ├── work-assistant.mock.ts
│   └── monitoring.mock.ts
└── types/                           # 화면 간 공유 도메인 타입
    ├── ai-service.ts
    ├── coding-automation.ts
    ├── contact-finder.ts
    ├── work-assistant.ts
    └── monitoring.ts
```

**Structure Decision**: Next.js App Router 단일 프로젝트 구조를 사용한다.
라우팅은 사용자가 지정한 5개 경로(`/dashboard`, `/coding-automation`,
`/contact-finder`, `/work-assistant`, `/monitoring`)를 그대로 따르며,
업무도우미는 목록(`/work-assistant`)과 시스템 상세(`/work-assistant/[systemId]`)
로 나눈다. 컴포넌트는 공통(`components/common/`)과 화면 전용
(`app/{route}/components/`)으로 분리하고(원칙 IV), 모든 데이터는
`lib/services/`를 거쳐서만 화면에 전달되며 Mock 데이터(`lib/mocks/`)와
공유 타입(`lib/types/`)은 서비스 계층 뒤에 위치한다(원칙 V). 별도의
backend/AI Server 디렉토리는 V1에서 생성하지 않는다(원칙 VI).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| 업무도우미에 `@xyflow/react` 인터랙티브 그래프 라이브러리 도입 (원칙 X 단순성 대비 추가 복잡도) | FR-042(spec.md, 사용자 확인 하에 확정)가 확대/축소·노드 클릭 상세 패널을 포함한 인터랙티브 지식그래프를 명시적으로 요구하며, 업무도우미의 핵심 차별점(지식그래프)을 구현하는 데 필수적임 | CSS/flex 기반 정적 카드·트리 레이아웃은 구현은 단순하지만 FR-042가 요구하는 확대/축소, 자유 배치, 노드 간 관계의 시각적 탐색을 만족하지 못함. 직접 SVG/Canvas로 그래프 상호작용을 구현하는 것은 검증된 라이브러리 도입보다 오히려 더 복잡하고 유지보수 부담이 큼 |
