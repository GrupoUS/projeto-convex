---
description: Execute approved plan from /research via @apex-dev with parallel background task orchestration
---

# /implement | /implementar

## Ultra-Think Protocol

```yaml
ultra_think_protocol:
  thinking_budget: "extended"
  pre_execution_thinking:
    - "Analyze implementation_plan.md and task.md"
    - "Identify parallelization opportunities for independent tasks"
    - "Validate all preconditions and specialist requirements"
  inter_atomic_thinking:
    - "Verify task.md updates and task_boundary status"
    - "Adjust strategy based on incremental validation results"
  post_execution_thinking:
    - "Critically validate against implementation_plan.md goals"
    - "Generate walkthrough.md as proof of work"
```

Execute approved implementation plan from `implementation_plan.md` and `task.md`.

## Trigger

- User approves research plan: "aprovar plano", "approve", "proceed"
- Direct command: `/implement`

---

## Input Contract

Required inputs for a correct `/implement` run:

```yaml
input_contract:
  source: "implementation_plan.md and task.md from brain directory"
  expected_task_format:
    status_markers: "[ ] (pending), [/] (in progress), [x] (completed)"
    phases: "1-5 based on Antigravity documentation"
  compatibility_note: |
    These artifacts are created by @apex-researcher via research.md workflow.
```

---

## Execution Strategy

### Task Flow

```yaml
task_execution:
  1_read_context:
    action: "Read implementation_plan.md and task.md"

  2_sync_ui:
    action: "task_boundary → Set Mode: EXECUTION, TaskName: from plan"

  3_execute_phases:
    action: "Execute tasks sequentially or in parallel based on phases 1-5"
    updates:
      - "Update task.md status: [/] while working, [x] when done"
      - "Update task_boundary status for each major step"

  4_validation:
    action: "VT tasks from phase 5"

  5_completion:
    action: "Generate walkthrough.md and notify_user"
```

---

## Step 1: Initialize Execution

1. Load `implementation_plan.md` and `task.md`.
2. Map stakeholders and specialists:
   | Specialist | Scope |
   |------------|-------|
   | @database-specialist | Convex schemas, queries, mutations |
   | @apex-ui-ux-designer | React components, shadcn/ui, CSS |
   | @code-reviewer | Security, LGPD compliance |

---

## Step 2: Phase-Based Execution (1-5)

### Phase 1: Setup & Scaffolding
- Checkpoint: `bun install`
- Activities: Directories, config, initial schemas.

### Phase 2: Core Logic & Backend
- Checkpoint: `bunx convex dev` (verified types)
- Activities: Mutations, actions, database indexes.

### Phase 3: Frontend Components
- Checkpoint: `bun run build` (no lint errors)
- Activities: UI development, hooks integration.

### Phase 4: Integration & Routes
- Checkpoint: `tanstack router generate`
- Activities: Page assembling, auth guards.

### Phase 5: Verification & Polish
- Checkpoint: `bun test`
- Activities: VT tasks, screenshots, walkthrough.

---

## Step 3: Failure Handling & Rollback

- **On Error**: Use `sequential-thinking` to analyze root cause.
- **Rollback**: If a task fails verification, revert filesystem changes and update `task.md` with the error reason.
- **Audit**: Log failures to `walkthrough.md`.

---

## Referências
- Princípios: `code-principles.md`
- Pesquisa: `research.md`