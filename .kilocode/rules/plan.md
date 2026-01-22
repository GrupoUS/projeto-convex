---
trigger: model_decision
description: Always use when planning and creating the implementation plan and tasks
---

# 🎯 MASTER PLAN GENERATOR — PRP Edition

> **CORE**: Context Density > Brevity | Research-First > Implementation | Planning > Coding
```yaml
METHODOLOGY: "PRP (Product Requirement Prompt) + ACE (Agentic Context Engineering)"
PHILOSOPHY: "One-pass implementation success through comprehensive context"
```

## 🧠 FOUNDATIONAL PRINCIPLES

**PRP = PRD + Curated Codebase Intelligence + Agent Runbook** — minimum viable packet for production-ready code on first pass.
```yaml
PRP_LAYERS:
  layer_1: "What + Why (goal)"
  layer_2: "Curated codebase intelligence (files, patterns)"
  layer_3: "Agent execution playbook (steps, validations, rollback)"

ACE_MECHANISM:
  generator: "Executes reasoning, tool calls"
  reflector: "Extracts insights from execution"
  curator: "Applies incremental updates to context"
  grow_and_refine: "Add insights → Track helpfulness → Prune redundancy"
```

## 📊 COMPLEXITY SELECTION

| Level | Indicators | Thinking Budget | Research |
|-------|------------|-----------------|----------|
| L1-L2 | Bug fix, single function | 1K-4K tokens | Repo-only |
| L3-L5 | Feature, multi-file | 8K-16K tokens | Docs + repo |
| L6-L8 | Architecture, integration | 16K-32K tokens | Deep |
| L9-L10 | Migrations, multi-service | 32K+ tokens | Comprehensive |

## 🔬 R.P.I.V WORKFLOW

### Phase 0: RESEARCH (Mandatory First)
```yaml
priority_order:
  1: "Search codebase for patterns, conventions"
  2: "Query Context7/official docs"
  3: "Web search for best practices, security"
  4: "Delegate to specialists if domain-specific"

outputs:
  - "| Finding | Confidence | Source | Impact |"
  - "Knowledge gaps identified"
  - "Assumptions to validate"

anti_hallucination: |
  NEVER speculate about unopened code.
  MUST read files before claims.
  Search and verify BEFORE responding.
```

### Phase 1: PLAN (Before Implementation)
```yaml
decomposition:
  method: "Atomic Task Decomposition"
  principle: "Each task completable in isolation with clear validation"

task_structure:
  id: "AT-XXX"
  title: "Action verb + specific target"
  phase: "1-5 (foundation → validation)"
  priority: "critical | high | medium | low"
  dependencies: "[AT-XXX]"
  validation: "Specific command"
  rollback: "How to undo"

parallel_safe_when:
  - "No shared file modifications"
  - "No dependency chain"
  - "Independent validation"
```

### Phase 2: IMPLEMENT (Proactive Execution)
```yaml
behavior: "PROACTIVE"
instruction: |
  Implement changes instead of suggesting.
  Infer intent and proceed using tools.
  Trust existing references, execute directly.

pattern: "Implement → Validate → Commit (or Rollback)"
validation_after_each: true

quality_gates:
  - "bun run lint"
  - "bun run typecheck"
  - "bun run test"
  - "bun run build"

anti_hardcoding: |
  Write general-purpose solutions for ALL valid inputs.
  Never hard-code for specific test cases.
  Report incorrect tests instead of workarounds.
```

### Phase 3: VALIDATE
```yaml
tasks:
  - "Build: zero errors"
  - "Lint: zero warnings"
  - "Tests: all passing"
  - "@code-reviewer if security involved"
  - "@database-specialist if schema changes"

reflection: |
  After each result, reflect on quality and
  determine optimal next steps before proceeding.

success: "All gates pass, no regressions, docs updated, backward compatible"
```

## 🎯 ONE-SHOT TEMPLATE
```yaml
metadata:
  complexity: "L[1-10] — [JUSTIFICATION]"
  estimated_time: "[DURATION]"
  parallel_safe: [true/false]

role: "[EXPERTISE] Developer"
expertise_areas: ["[DOMAIN_1]", "[DOMAIN_2]"]

objective:
  task: "[ACTION VERB] + [TARGET] + [OUTCOME]"
  context: "[PROJECT], [STACK], [CONSTRAINTS]"
  why_this_matters: "[MOTIVATION]"

environment:
  runtime: "[e.g., Bun 1.x]"
  framework: "[e.g., React 19]"
  database: "[e.g., Convex]"
  auth: "[e.g., Clerk]"
  ui: "[e.g., shadcn/ui]"
  testing: "[e.g., Vitest]"

relevant_files:
  must_read:
    - path: "[PATH]"
      relevance: "[WHY]"
  may_reference:
    - path: "[PATH]"
      relevance: "[WHY]"

existing_patterns:
  naming: "[DESCRIBE]"
  file_structure: "[DESCRIBE]"
  error_handling: "[DESCRIBE]"
  state_management: "[DESCRIBE]"

constraints:
  non_negotiable: ["[CONSTRAINT_1]", "[CONSTRAINT_2]"]
  preferences: ["[PREFERENCE_1]"]

chain_of_thought:
  research:
    - "Codebase patterns: _____"
    - "Docs consulted: _____"
    - "Security: _____"
    - "Edge cases: _____"
  analyze:
    - "Core requirement: _____"
    - "Technical constraints: _____"
    - "Integration points: _____"
  think:
    step_by_step: ["First: _____", "Then: _____", "Finally: _____"]
    tree_of_thoughts:
      approach_a: {description, pros, cons, score}
      approach_b: {description, pros, cons, score}
      selected: "[CHOSEN]"
      rationale: "[WHY]"

atomic_tasks:
  - id: "AT-001"
    title: "[ACTION] [TARGET]"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    files_to_create: ["[PATH]"]
    files_to_modify: ["[PATH]"]
    validation: "[COMMAND]"
    rollback: "[UNDO]"
    acceptance_criteria: ["[CRITERION]"]

validation:
  automated:
    - {id: "VT-001", command: "bun run build", expected: "Exit 0"}
    - {id: "VT-002", command: "bun run lint", expected: "No errors"}
    - {id: "VT-003", command: "bun run test", expected: "All pass"}
  manual_review:
    - {reviewer: "@code-reviewer", focus: "[ASPECT]", required_if: "[CONDITION]"}

output:
  format: "[DELIVERABLE]"
  files_created: [{path, purpose}]
  files_modified: [{path, changes}]
  success_definition: "[CRITERIA]"
  failure_handling: "If [CONDITION], then [ACTION]. Rollback: [STEPS]"
```

## 🔧 BEHAVIOR CONFIG
```yaml
# PROACTIVE (default for implementation)
proactive: |
  Implement instead of suggesting.
  Infer intent, use tools to discover details.
  Execute changes directly.

# CONSERVATIVE (for exploration)
conservative: |
  Don't jump to changes unless instructed.
  Default to information/recommendations.

# PARALLEL EXECUTION
parallel: |
  Make independent calls in parallel.
  Sequential only when results needed for parameters.
  Never use placeholders or guess parameters.

# REFLECTION
reflection: |
  After tool results, reflect on quality.
  Assess completeness, identify gaps.
  Plan best next action based on new info.
```

## ⚠️ ANTI-PATTERNS

| Bad | Good |
|-----|------|
| "Implement auth" | Research → Search codebase → Query docs → Then implement |
| "Build entire CRM" | Decompose: AT-001 schema, AT-002 API, AT-003 UI... |
| "Create dashboard" | Create dashboard with: real-time, responsive, dark/light, loading states, a11y. Go beyond basics. |
| "NEVER use inline styles" | Use Tailwind. Why: consistency, design tokens, maintainability |
| "Use snake_case" | Use snake_case. Why: Convex conventions, frontend transformers expect it |

## ✅ CHECKLIST
```yaml
research:
  - [ ] Codebase searched?
  - [ ] Docs consulted?
  - [ ] Security/compliance identified?
  - [ ] Edge cases considered?

context:
  - [ ] Relevant files listed?
  - [ ] Constraints specified?
  - [ ] WHY included for instructions?
  - [ ] Examples aligned?

tasks:
  - [ ] Truly atomic?
  - [ ] Validation command each?
  - [ ] Dependencies mapped?
  - [ ] Rollback defined?
  - [ ] Parallel-safe marked?

behavior:
  - [ ] Action vs Suggestion specified?
  - [ ] Output format explicit?
  - [ ] Creativity level stated?
  - [ ] WHAT TO DO (not avoid)?

validation:
  - [ ] Criteria measurable?
  - [ ] Gates defined?
  - [ ] Success explicit?
  - [ ] Failure handling?
```

## 🚀 QUICK REFERENCE
```
R.P.I.V: RESEARCH → PLAN → IMPLEMENT → VALIDATE

GOLDEN RULES:
✓ RESEARCH FIRST — never implement blind
✓ Be EXPLICIT — Claude follows literally
✓ Explain WHY — enables generalization
✓ CONTEXT DENSITY > BREVITY
✓ ATOMIC TASKS — small, validated, rollback-ready
✓ ALIGNED EXAMPLES — must match desired behavior
✓ ACTION vs SUGGESTION — specify explicitly
✓ PARALLEL TOOLS — unless dependencies
✓ REFLECT AFTER TOOLS — think before next action
✓ "Above and beyond" — REQUEST EXPLICITLY

COMPLEXITY → BUDGET:
L1-L2: 1K-4K   | Bug fix, refactor
L3-L5: 8K-16K  | Feature, API
L6-L8: 16K-32K | Architecture
L9-L10: 32K+   | New systems
```

## 🎯 DELIVERY

**Output complete prompt in English, single Markdown block (Markdown + YAML), ready to copy.**

Follow R.P.I.V:
1. RESEARCH — directives and sources
2. PLAN — atomic tasks with dependencies
3. IMPLEMENT — proactive, parallel
4. VALIDATE — quality gates, success criteria

**Remember**: EXPLICIT + MOTIVATION + ALIGNED EXAMPLES + ACTION vs SUGGESTION + comprehensive context.