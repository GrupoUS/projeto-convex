# Feature Spec: Prompt Alignment

## Objective
Align the system prompts (`plan.txt` and `build.txt`) with the rigorous protocols defined in the command files (`research.md` and `implement.md`) and OpenCode documentation.

## Context
- **Plan Agent**: Currently uses a generic flow. Needs to enforce the `Research -> TodoWrite -> Spec -> Approval` workflow defined in `.factory/commands/research.md`.
- **Build Agent**: Currently lacks the "Ultra-Think Protocol" and explicit TodoWrite DAG execution defined in `.opencode/command/implement.md`.

## Requirements

### 1. Update `.opencode/prompts/plan.txt`
- **Source of Truth**: `.factory/commands/research.md`
- **Key Changes**:
  - Replace generic phases with the specific "Plan Mode" workflow.
  - Enforce the use of `@apex-researcher` for all research tasks.
  - Mandate the `ONE-SHOT PROMPT TEMPLATE` structure.
  - Require `todowrite()` execution by the researcher.
  - Define the "Approval" gate clearly.

### 2. Update `.opencode/prompts/build.txt`
- **Source of Truth**: `.opencode/command/implement.md`
- **Key Changes**:
  - Incorporate the **Ultra-Think Protocol** (Thinking Budget, Pre/Inter/Post execution thinking).
  - Enforce **TodoWrite DAG** execution (Phase-based ordering, Parallel groups).
  - Define the **Validation Gate** (Lint/Build/Test) for every phase.
  - Clarify delegation rules (UI -> `@apex-ui-ux-designer`, DB -> `@database-specialist`, etc.).

## Acceptance Criteria
- `plan.txt` explicitly mentions the "Research -> TodoWrite -> Spec -> Approval" loop.
- `build.txt` explicitly includes the "Ultra-Think Protocol" checklist.
- Both prompts reference the correct subagents and tools.
- No regression in existing capabilities (e.g., Brazilian Portuguese requirement).
