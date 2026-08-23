<!--
Sync Impact Report
==================
Version change: [TEMPLATE] → 1.0.0 (initial ratification)
Bump rationale: MAJOR — first concrete constitution replacing the unfilled
  template placeholders; establishes the full governing principle set.

Modified principles: N/A (initial adoption)

Added sections:
  - 프로젝트 목적 (Project Purpose)
  - Core Principles I–XI
    I.    사용자 중심 (User-Centered)
    II.   명세 기반 개발 (Specification-Driven Development)
    III.  Figma를 UI Source of Truth로 사용
    IV.   컴포넌트 기반 설계 (Component-Based Design)
    V.    Frontend와 AI 기능의 분리
    VI.   단계적 개발 (Incremental Development)
    VII.  확장성 (Extensibility)
    VIII. 보안 및 데이터 보호 (Security) — V2 이후 적용
    IX.   AI 답변의 신뢰성 — V2 이후 적용
    X.    단순성 (Simplicity)
    XI.   코드 품질 (Code Quality)
  - Governance (원칙 간 우선순위, 개정 절차, 준수 검토)

Removed sections: template placeholder scaffolding ([SECTION_2_NAME],
  [SECTION_3_NAME] slots were not needed — all user-supplied content mapped
  directly onto Core Principles + Governance).

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check gate is derived
     dynamically from this file at plan time; no edits needed.
  ✅ .specify/templates/spec-template.md — no principle-specific mandatory
     sections introduced (e.g., no new required "Security" or "Citations"
     spec section, since Principles VIII/IX are explicitly deferred to V2);
     no edits needed.
  ✅ .specify/templates/tasks-template.md — task categorization is generic
     (Setup/Foundational/User Story/Polish) and not principle-specific;
     no edits needed.
  ✅ .specify/extensions.yml — no before_constitution/after_constitution
     hooks registered; nothing to invoke.
  ⚠ No README.md or docs/quickstart.md exists yet in this repository to
     cross-check; CLAUDE.md only points to "the current plan" and needs no
     principle references.

Follow-up TODOs: none. RATIFICATION_DATE was not supplied by the user; it is
  set to the date this constitution was ratified through this session.
-->

# Woori AI Hub Constitution

## 프로젝트 목적

Woori AI Hub는 사내 임직원이 업무에 필요한 정보와 AI 서비스를 하나의
플랫폼에서 쉽고 빠르게 사용할 수 있도록 제공하는 사내 AI 업무지원
플랫폼이다.

## Core Principles

### I. 사용자 중심 (User-Centered)

사내 임직원이 업무에 필요한 정보를 쉽고 빠르게 찾을 수 있는 사용자
경험을 최우선으로 한다. AI 기술 자체보다 실제 업무에서의 사용성과
이해하기 쉬운 UX를 우선한다. 불필요하게 복잡한 화면이나 기능을
지양한다.

### II. 명세 기반 개발 (Specification-Driven Development)

구현보다 요구사항과 명세 정의를 우선한다. Constitution → Specify →
Clarify → Plan → Tasks → Implement의 개발 흐름을 따른다. 요구사항,
설계, 구현 간 불일치를 최소화한다. 명세에 정의되지 않은 기능을 임의로
추가하지 않는다.

### III. Figma를 UI Source of Truth로 사용

Woori AI Hub의 UI/UX 디자인은 Figma를 Source of Truth로 사용한다.
실제 UI 구현 시 Figma MCP를 통해 디자인을 참조한다. Figma에 정의된
레이아웃, 컴포넌트, Typography, 색상, 간격 등의 디자인을 임의로
재해석하거나 변경하지 않는다.

Figma와 Specification의 역할을 명확히 구분한다:

- **Figma**: 화면의 시각적 디자인과 UI 구조
- **Specification**: 기능, 사용자 행동, 요구사항, 상태 및 비즈니스 규칙
- **Code**: Figma와 Specification을 기반으로 한 실제 구현

Figma와 Specification이 충돌하거나 구현 기준이 불명확한 경우 임의로
판단하지 않고 명세를 먼저 명확하게 한다.

### IV. 컴포넌트 기반 설계 (Component-Based Design)

UI는 재사용 가능한 컴포넌트 중심으로 구현한다. Header, Sidebar,
Button, Card, Input, Modal 등 공통 UI 요소는 가능한 한 공통
컴포넌트로 관리한다. 동일한 UI 패턴을 여러 화면에서 반복 구현하지
않는다. 컴포넌트의 책임을 명확하게 분리하고 불필요하게 큰 컴포넌트를
만들지 않는다.

### V. Frontend와 AI 기능의 분리

웹 UI와 AI 처리 로직을 명확하게 분리한다. Frontend는 AI 구현
세부사항에 강하게 결합되지 않도록 설계한다. 향후 별도의 AI Server와
API 방식으로 연동할 수 있는 구조를 유지한다. AI Server에는 향후
RAG, LLM, Agent, MCP, RDB 등의 기능을 추가할 수 있어야 한다. 특정
AI 모델이나 기술에 대한 의존성을 UI 계층으로 확산시키지 않는다.

### VI. 단계적 개발 (Incremental Development)

한 번에 모든 기능을 구현하지 않는다. V1은 Woori AI Hub의 웹 UI와
사용자 경험 구현에 집중한다. V1에서는 실제 LLM, RAG, Agent, MCP 및
사내 DB 연동을 구현하지 않는다. 필요한 경우 Mock Data를 사용하여
UI와 사용자 흐름을 먼저 검증한다. 이후 검증된 UI에 AI 기능을
단계적으로 연결한다.

### VII. 확장성 (Extensibility)

새로운 AI 서비스나 업무도우미를 추가하더라도 기존 플랫폼 구조를 크게
변경하지 않는 것을 목표로 한다. 업무 시스템별 업무도우미를 독립적인
기능 단위로 확장할 수 있도록 한다. 향후 RAG, Reranker, LLM, Agent,
MCP, RDB 등의 기술을 추가할 수 있는 구조를 고려한다. 현재 필요하지
않은 복잡한 아키텍처를 미리 구현하지 않는다.

### VIII. 보안 및 데이터 보호 (Security)

> **적용 시점: V2 이후.** V1은 Mock Data만 사용하므로 실제 데이터
> 접근 통제는 해당하지 않음. 아래 원칙은 실제 사내 데이터 연동
> 시점부터 적용한다.

Woori AI Hub는 사내 업무 데이터를 다루는 서비스를 전제로 한다.
개인정보 및 업무상 민감정보를 중요하게 취급한다. 실제 사내 데이터는
V1에서 사용하지 않고 Mock Data를 사용한다. 향후 AI 기능 구현 시
데이터 접근 권한, 개인정보 보호, 문서 접근 권한 및 감사 로그를
고려한다. 사용자가 접근할 권한이 없는 데이터가 AI 검색 및 답변
과정에 노출되지 않도록 하는 것을 기본 원칙으로 한다.

### IX. AI 답변의 신뢰성

> **적용 시점: V2 이후.** V1은 실제 LLM/RAG를 구현하지 않으므로
> 해당하지 않음. 실제 AI 기능 구현 시점부터 아래 원칙을 적용한다.

검색된 근거를 기반으로 답변한다. 근거가 없는 내용을 추측하여
답변하지 않는다. 가능한 경우 답변의 출처와 근거를 제공한다. 질문에
대한 충분한 근거가 없거나 답변해서는 안 되는 경우 명시적인 Refusal
처리를 적용한다. 필요한 경우 Citation, Grounding, Refusal을 통해 AI
답변의 신뢰성을 높인다.

### X. 단순성 (Simplicity)

현재 요구사항을 해결하는 가장 단순한 구조를 우선한다. 미래의
가능성만을 이유로 불필요한 기능이나 추상화를 추가하지 않는다.
복잡한 설계보다 이해하기 쉽고 유지보수하기 쉬운 구조를 우선한다.
기술을 사용하기 위한 기술을 만들지 않는다.

### XI. 코드 품질 (Code Quality)

읽기 쉽고 유지보수하기 쉬운 코드를 작성한다. 중복을 최소화한다.
명확한 책임과 역할을 가진 모듈 및 컴포넌트를 구성한다. 프로젝트의
기존 구조와 명명 규칙을 일관되게 유지한다. 구현 과정에서 발견된
기술적 부채를 필요 이상으로 확대하지 않는다.

## Governance

이 Constitution은 프로젝트의 다른 모든 관행에 우선한다. 모든 기능
개발은 본 Constitution의 원칙을 준수해야 한다.

**원칙 간 충돌 시 우선순위**: Figma(디자인 정합성, 원칙 III) >
단순성(원칙 X) > 확장성(원칙 VII). 즉 디자인은 임의 변경하지
않되, 구현 방식이 여러 개면 가장 단순한 쪽을 택하고, 미래를 위한
과설계는 지양한다.

새로운 요구사항이나 기술 선택이 기존 원칙과 충돌할 경우 구현을
진행하기 전에 충돌 내용을 확인하고, 필요한 경우 Constitution 또는
Specification을 명확하게 수정한다. Constitution은 프로젝트의
장기적인 개발 원칙을 정의하며, 개별 기능의 상세 구현 방법은
Specification과 Plan에서 결정한다.

**개정 절차**: Constitution 개정은 변경 내용과 근거를 명시한 제안으로
시작하며, 반영 시 아래 Semantic Versioning 규칙에 따라 버전을 갱신하고
Sync Impact Report를 남긴다. 개정 후에는 `.specify/templates/` 하위의
plan/spec/tasks 템플릿 및 관련 커맨드 문서와의 정합성을 확인한다.

**버전 관리 정책 (Semantic Versioning)**:

- **MAJOR**: 기존 원칙의 하위 호환 불가능한 삭제 또는 재정의
- **MINOR**: 새로운 원칙/섹션 추가 또는 기존 가이드의 실질적 확장
- **PATCH**: 표현 명확화, 오탈자 수정 등 비의미론적 수정

**준수 검토**: 모든 기능 개발과 리뷰는 본 Constitution 준수 여부를
확인해야 한다. 복잡성이 추가되는 경우 그 필요성을 명시적으로
근거와 함께 제시해야 한다.

**Version**: 1.0.0 | **Ratified**: 2026-08-22 | **Last Amended**: 2026-08-22
