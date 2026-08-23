# Phase 1 Data Model: Woori AI Hub V1 웹 서비스

모든 타입은 `lib/types/`에 위치하며, `lib/services/`가 반환하는 값의
형태(shape)이자 V2에서 실제 API 응답이 따라야 할 계약이다(원칙 V).
Mock 데이터(`lib/mocks/`)는 이 타입을 만족하는 정적 값을 제공한다.

## AIService

Dashboard와 코딩자동화 화면에서 사용하는 서비스 단위 (spec Key Entities:
AI 서비스).

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `name` | `string` | 서비스 이름 |
| `description` | `string` | 서비스 설명 |
| `category` | `'work-assistant' \| 'coding-automation' \| 'contact-finder' \| 'monitoring'` | Dashboard에서의 분류 |
| `status` | `'active' \| 'maintenance' \| 'unavailable'` | 서비스 상태 (FR-020) |
| `href` | `string` | 클릭 시 이동할 화면 경로 (FR-012) |
| `isFrequentlyUsed` | `boolean` | Dashboard "자주 사용하는" 항목 여부 (V1은 Mock 고정값, spec Assumptions 참고) |

**검증 규칙**: `name`, `description`은 빈 문자열 불가. `href`는
5개 라우트 중 하나(또는 하위 경로)를 가리켜야 한다.

## Repository

코딩자동화에서 새 작업 요청의 대상이 되는 코드 저장소 (FR-020).

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `name` | `string` | 레포지토리 이름 (예: `payment-api`) |

## TaskCard

코딩자동화의 작업 단위 (FR-021~FR-026). 진행중/대기/완료 3개 컬럼에
표시되며, 진행중 카드는 실행 타임라인을 가진다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 (예: `CARD-241`) |
| `title` | `string` | 카드 제목 |
| `repositoryId` | `string` | 소속 `Repository.id` |
| `description` | `string` | 작업 설명 |
| `acceptanceCriteria` | `string[]` | 완료 조건 목록 |
| `priority` | `'low' \| 'medium' \| 'high'` | 우선순위 |
| `status` | `'in-progress' \| 'pending' \| 'done'` | 컬럼 상태 |
| `startedRelativeLabel` | `string?` | "5분 전 실행 시작"과 같은 상대 시각 표시 (진행중 카드만) |
| `timeline` | `TaskCardTimelineStep[]` | 실행 타임라인 (진행중/완료 카드) |
| `comments` | `TaskCardComment[]` | 댓글(추가 지시) 목록 |

**TaskCardTimelineStep**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 단계 식별자 |
| `label` | `'분석' \| '설계' \| '코딩/테스트' \| 'PR 생성'` | 단계 이름 (고정 4단계) |
| `order` | `1 \| 2 \| 3 \| 4` | 단계 순서 |
| `status` | `'done' \| 'in-progress' \| 'pending'` | 단계 상태 |
| `logMessage` | `string?` | 완료/진행 로그 메시지 (예: "분석 완료: PaymentService.retry() 로직 미존재 확인.") |
| `relativeTimeLabel` | `string?` | "5분 전", "방금"과 같은 상대 시각 |

**TaskCardComment**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 댓글 식별자 |
| `content` | `string` | 댓글 내용(추가 지시) |
| `createdAt` | `string` (ISO 8601) | 작성 시각 |

**검증 규칙**: `repositoryId`는 존재하는 `Repository.id`를 참조해야
한다. `timeline`은 항상 정확히 4단계(분석/설계/코딩·테스트/PR 생성)를
`order` 1~4로 가진다. 빈 댓글은 제출할 수 없다(담당자 찾기의 빈 질문
검증과 동일한 패턴).

## ChatMessage / ChatResponse

담당자 찾기의 채팅형 대화 이력 (FR-030~FR-033).

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 메시지 고유 식별자 |
| `role` | `'user' \| 'assistant'` | 발화 주체 |
| `content` | `string` | 메시지 본문 (사용자 질문 또는 Mock 답변 요약) |
| `createdAt` | `string` (ISO 8601) | 생성 시각 |
| `contacts` | `ContactResult[]?` | assistant 메시지에 포함되는 담당자 검색 결과 카드 목록 (Figma 스크린샷 근사 재현, `/speckit-implement` 단계에서 추가) |

**ContactResult**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 식별자 |
| `name` | `string` | 담당자 이름 |
| `title` | `string` | 직함/역할 |
| `department` | `string` | 소속 부서 |
| `extension` | `string` | 내선/사번 등 연락 정보 |
| `tags` | `string[]` | 관련 태그(예: 도입 2026.07, 결제 인증 위키) |

`ChatResponse`는 `getContactFinderMockResponse`가 반환하는 단일
assistant 메시지 형태이며 `ChatMessage`와 동일한 shape을 가진다. 화면은
`ChatMessage[]`를 화면 로컬 상태로 누적하여 대화 이력을 구성한다(연구
문서 §2 참고 — 화면 간 공유 상태 아님).

**검증 규칙**: 사용자가 빈 문자열 또는 공백만 입력한 질문은 제출할 수
없다(엣지 케이스, spec.md Edge Cases).

## WorkSystem

업무도우미가 탐색 대상으로 삼는 업무 시스템 (FR-040).

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 (예: `dm-management`) |
| `name` | `string` | 시스템명 (V1 예시: "DM관리시스템") |
| `description` | `string` | 시스템 한 줄 설명 |

## WorkInfoItem

업무 시스템에 속한 세부 정보 카테고리 (FR-041). 담당자, 솔루션 정보,
서버/DB 정보, 주요 배치, 인터페이스, 운영 정보, 관련 문서 7종을 하나의
타입으로 표현하고 `type`으로 구분한다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `workSystemId` | `string` | 소속 `WorkSystem.id` |
| `type` | `'contact' \| 'solution' \| 'server-db' \| 'batch' \| 'interface' \| 'operation' \| 'document'` | 정보 카테고리 |
| `title` | `string` | 항목 제목 |
| `summary` | `string` | 목록/노드에 표시할 요약 |
| `detail` | `Record<string, string>` | 상세 패널에 표시할 key-value 상세 정보 (카테고리별로 필드가 달라질 수 있어 유연한 구조 사용) |

**검증 규칙**: `workSystemId`는 존재하는 `WorkSystem.id`를 참조해야
한다.

## GraphNode / GraphEdge

업무도우미 지식그래프(FR-042)를 구성하는 노드/엣지. `@xyflow/react`의
`Node`/`Edge` 타입과 호환되는 최소 shape으로 정의하고, 실제 라이브러리
타입은 이 shape을 확장하여 사용한다.

**GraphNode**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 노드 ID (대응하는 `WorkSystem.id` 또는 `WorkInfoItem.id`) |
| `type` | `'work-system' \| WorkInfoItem['type']` | 노드 종류 |
| `label` | `string` | 그래프에 표시할 라벨 |
| `refId` | `string` | 클릭 시 상세 패널에 표시할 `WorkSystem` 또는 `WorkInfoItem`의 `id` |

**GraphEdge**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 엣지 ID |
| `source` | `string` | 시작 `GraphNode.id` |
| `target` | `string` | 끝 `GraphNode.id` |
| `label` | `string?` | 관계 설명(선택) |

**관계 예시 (DM관리시스템, Mock 데이터 기준)**: `work-system:dm-management`
노드를 중심으로 `contact`, `solution`, `server-db`, `batch`,
`interface`, `operation`, `document` 노드가 각각 엣지로 연결되고,
필요 시 정보 항목 간 직접 관계(예: 담당자 ↔ 서버/DB)도 엣지로 표현할
수 있다.

## MonitoringItem

모니터링 화면에 표시되는 대상 (FR-050~FR-052). V1 범위는 AI
서비스/업무도우미 자체의 가동 현황이며, `AIService`와 1:1로 대응한다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `serviceId` | `string` | 대응하는 `AIService.id` |
| `name` | `string` | 표시 이름 |
| `status` | `'normal' \| 'degraded' \| 'down'` | 가동 상태 (FR-051 비정상 시각 구분 기준) |
| `lastCheckedAt` | `string` (ISO 8601) | 마지막 상태 확인 시각 (Mock 고정값) |

## 엔티티 관계 요약

```text
AIService 1───1 MonitoringItem (serviceId)
WorkSystem 1───* WorkInfoItem (workSystemId)
WorkSystem 1───1 GraphNode (type: 'work-system')
WorkInfoItem 1───1 GraphNode (refId)
GraphNode *───* GraphNode (GraphEdge를 통해)
```

상태 전이(State Transition)가 필요한 엔티티는 없다 — 모든 상태 값은
Mock 데이터에서 고정 제공되며 V1에서 사용자 조작으로 상태가 바뀌지
않는다(예: 서비스 상태를 사용자가 변경하는 기능 없음).
