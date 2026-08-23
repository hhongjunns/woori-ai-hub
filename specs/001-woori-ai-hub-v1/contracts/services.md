# Service Layer Contracts: `lib/services/`

V1은 외부에 노출하는 HTTP API가 없다(Frontend-only, 원칙 VI). 대신
`lib/services/`가 UI와 데이터를 잇는 유일한 내부 계약(seam)이며,
Constitution 원칙 V에 따라 이 계약의 시그니처와 반환 shape은 V2에서
실제 AI Server API로 교체될 때도 그대로 유지되어야 한다. 컴포넌트는
아래 함수만 호출하고, `lib/mocks/`를 직접 import하지 않는다.

모든 함수는 `Promise`를 반환한다(V1에서는 즉시 resolve하는 Mock 구현,
V2에서는 실제 네트워크 호출로 교체 가능하도록).

## `lib/services/ai-services.ts`

```ts
getAIServices(): Promise<AIService[]>
// Dashboard에 표시할 전체 AI 서비스 목록 (FR-010)
// 각 항목의 isFrequentlyUsed 필드로 "자주 사용하는" 항목을 함께 표현한다 (FR-011)
// Figma Dashboard에 별도의 "자주 사용하는" 섹션이 없어 단일 목록 + 강조 스타일로 구현
```

## `lib/services/coding-automation.ts`

```ts
getRepositories(): Promise<Repository[]>
// 코딩자동화 사이드바의 레포지토리 목록 (FR-020)

getTaskCards(): Promise<TaskCard[]>
// 진행중/대기/완료 3개 컬럼에 표시할 작업 카드 목록 (FR-024)

generateMockTaskCard(repositoryId: string, requestText: string): Promise<TaskCard>
// "카드로 변환" 클릭 시 실제 AI 처리 없이 미리 정의된 Mock 카드를 반환 (FR-022)
// requestText는 V1에서 실제로 파싱되지 않으며 항상 동일한 Mock 카드를 반환한다

addTaskCardComment(cardId: string, content: string): Promise<TaskCardComment>
// 실행 상세 패널에서 댓글(추가 지시) 제출 (FR-026)
// content가 빈 문자열/공백만인 경우 호출하지 않는다 (UI 단에서 방지)
```

## `lib/services/contact-finder.ts`

```ts
getContactFinderMockResponse(query: string): Promise<ChatResponse>
// 사용자 질문(query)에 대응하는 Mock 답변 1건을 반환한다 (FR-031)
// query가 빈 문자열/공백만인 경우 호출하지 않는다 (UI 단에서 방지, FR-030)

getContactFinderSidebarInfo(): Promise<{ frequentlyFoundOrgs: string[]; recentSearches: string[] }>
// 좌측 서브 사이드바("자주 찾는 조직"/"최근 검색")에 표시할 Mock 데이터
// (Figma 스크린샷 근사 재현, /speckit-implement 단계에서 추가 — 원칙 V 준수를 위해
// 컴포넌트가 lib/mocks를 직접 import하지 않고 이 함수를 경유하도록 함)
```

## `lib/services/work-assistant.ts`

```ts
getWorkAssistantSystems(): Promise<WorkSystem[]>
// 업무도우미 목록 화면에 표시할 업무 시스템 목록 (FR-040)

getWorkSystemInfoItems(systemId: string): Promise<WorkInfoItem[]>
// 선택한 업무 시스템의 7개 정보 카테고리 목록 (FR-041)

getWorkSystemGraph(systemId: string): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }>
// 선택한 업무 시스템의 지식그래프 노드/엣지 (FR-042)
```

## `lib/services/monitoring.ts`

```ts
getMonitoringItems(): Promise<MonitoringItem[]>
// 모니터링 화면에 표시할 AI 서비스/업무도우미 가동 현황 (FR-050~FR-052)
```

## 계약 준수 규칙

- 모든 서비스 함수는 실패를 던지지 않는다(V1은 Mock 데이터만 다루므로
  네트워크/DB 오류 케이스가 존재하지 않음). V2에서 실제 API로 교체될 때
  에러 처리 방식은 별도 계획에서 정의한다.
- 서비스 함수의 반환 타입은 `data-model.md`에 정의된 타입을 그대로
  사용하며, 컴포넌트 전용으로 타입을 변형해야 하는 경우 컴포넌트
  레이어에서 매핑하고 서비스 계약 자체는 변경하지 않는다.
