---
description: Pesquisa multi-fonte com validação cruzada e geração de atomic tasks (>=95% accuracy)
---

# /research: $ARGUMENTS

Este comando roda em **Plan Mode** (pesquisa + planejamento). Ele **não** implementa sem aprovação explícita.

Sempre use a Skill planning (.agent\skills\planning\SKILL.md)

## Fluxo de Orquestração Nativo Antigravity

```mermaid
flowchart TD
    A[Início /research] --> B[Phase 1: Discovery (Parallel)]
    B --> C1[Explore: EXP-STRUCT]
    B --> C2[Explore: EXP-TRACE]
    B --> C3[Librarian: LIB-DOCS]
    B --> C4[Librarian: LIB-EXAMPLES]
    B --> C5[Plan Draft: PLAN-1]
    C1 & C2 & C3 & C4 & C5 --> D[Barrier: Synthesis]
    D --> E[Phase 2: Targeted Follow-up]
    E --> F[Oracle: Architecture Review (L4+)]
    F --> G[Gerar implementation_plan.md]
    G --> H[Gerar task.md]
    H --> I[notify_user: Requisição de Aprovação]
```

## Task

Follow this systematic approach to create a new feature: $ARGUMENTS

1. **Feature Planning**
   - Use `task_boundary` to indicate the start of the planning phase.
   - Define feature requirements and acceptance criteria.
   - Break down feature into `task.md` using the `[ ]`, `[/]`, `[x]` convention.
   - Identify affected components and potential impact areas.
   - Matriz de Requisitos
| Categoria | Requisito | Prioridade | Método de Validação |
|-----------|-----------|------------|---------------------|
| Funcional | [REQ_1] | Must | [COMO_TESTAR] |
| Non-Funcional | [PERF_REQ] | Must | [BENCHMARK] |
   - Avaliação de Estado Atual
```yaml
existing_architecture: "[DESCREVA_ESTADO_ATUAL]"
integration_points: ["[SISTEMA_1]", "[SISTEMA_2]"]
technical_debt: "[DÉBITO_RELEVANTE]"
```

2. **Research and Analysis (Background Tasks)**
   - **Explore Agent**: Contextual grep for codebase patterns and implementations.
   - **Librarian Agent**: Reference grep for official documentation via `context7`.
   - **Sequential Thinking**: Structured problem-solving for architectural decisions.
   - Avaliação de Tecnologias
| Opção | Prós | Contras | Fit Score |
|-------|------|---------|-----------|
| [OPÇÃO_1] | [VANTAGENS] | [DESVANTAGENS] | [1-5] |
   - Padrões a Considerar
```yaml
recommended_patterns:
  - pattern: "[NOME_PADRÃO]"
    rationale: "[PORQUE_SE_ENCAIXA]"
    tradeoffs: "[O_QUE_ABRIMOS_MÃO]"
```

3. **Architecture Design**
   - Design feature architecture and data flow.
   - Plan database schema changes if needed (Convex).
   - Define API endpoints and contracts.
   - Arquitetura da Solução
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Componente  │────▶│ Componente  │────▶│ Componente  │
│      A      │     │      B      │     │      C      │
└─────────────┘     └─────────────┘     └─────────────┘
```
   - Registros de Decisão (ADRs)
```yaml
decision_1:
  context: "[SITUAÇÃO_REQUERENDO_DECISÃO]"
  options_considered: ["[OPT_1]", "[OPT_2]"]
  decision: "[ABORDAGEM_ESCOLHIDA]"
  rationale: "[PORQUE_ESSA_ESCOLHA]"
  consequences: "[IMPLICAÇÕES]"
```

4. **Implementation Strategy**
   - Generate `implementation_plan.md` in `<appDataDir>/brain/<conversation-id>/`.
   - Follow the official schema: Goal Description, User Review Required, Proposed Changes, Verification Plan.
   - Plan validation with atomic tasks and subtasks (Phase 5).
   - Roadmap de Implementação
```yaml
phase_1_foundation:
  duration: "[ESTIMATIVA]"
  deliverables:
    - "[ENTREGÁVEL_1]"
    - "[ENTREGÁVEL_2]"

phase_2_core:
  duration: "[ESTIMATIVA]"
  deliverables:
    - "[ENTREGÁVEL_3]"
  dependencies: ["phase_1_foundation"]
```
    - Estrutura de Arquivos
```
src/
├── [module_1]/
│   ├── [component].ts       # [PROPÓSITO]
│   ├── [service].ts         # [PROPÓSITO]
│   └── [types].ts           # [PROPÓSITO]
└── shared/
    └── ...
```

## 📄 ANTAGRAVITY-NATIVE PROMPT TEMPLATE

```yaml
role: "[SPECIFIC EXPERTISE] Developer"
objective:
  task: "[DESCRIBE WHAT NEEDS TO BE DONE]"
  context: "[PROJECT TYPE, STACK, CONSTRAINTS]"
chain_of_thought_process:
  analyze:
    checklist:
      - "Core requirement: _________"
      - "Technical constraints: _________"
      - "Expected output: _________"
      - "Edge cases to consider: _________"
  research:
    checklist:
      - "Framework/library documentation needed: _________"
      - "Patterns to apply: _________"
      - "Security and compliance (LGPD): _________"
  think:
    step_by_step:
      - "First: _________  # initial setup/analysis"
      - "Then: _________   # core design/specification"
      - "Next: _________   # validation strategy"
      - "Finally: _________ # cleanup/polish"
```

## Background Task Orchestration

```yaml
orchestration:
  limits:
    max_concurrent: 5
    timeout: 180000

  phases:
    - id: "P1"
      name: "Discovery"
      parallel: true
      tasks:
        - id: "EXP-STRUCT"
          agent: "explore"
          prompt: "Map file structure + entrypoints + patterns (routes, hooks, Convex)"
        - id: "EXP-TRACE"
          agent: "explore"
          prompt: "Trace references (api.*, route usage, component composition)"
        - id: "LIB-DOCS"
          agent: "librarian"
          prompt: "Official docs via Context7 (Convex, Clerk, TanStack, shadcn)"
        - id: "LIB-EXAMPLES"
          agent: "librarian"
          prompt: "GitHub/OSS examples for complex patterns"
        - id: "PLAN-1"
          agent: "apex-researcher"
          prompt: "Initial implementation_plan.md draft"
      barrier: { require_done: ["EXP-STRUCT", "EXP-TRACE", "LIB-DOCS", "LIB-EXAMPLES", "PLAN-1"] }

    - id: "P2"
      name: "Targeted Refinement"
      parallel: true
      tasks:
        - id: "REV-1"
          agent: "architect-reviewer"
          prompt: "Validate P1 findings against architecture rules"
          gate: "informational"
        - id: "PLAN-REFINE"
          agent: "apex-researcher"
          prompt: "Finalize implementation_plan.md and task.md based on Wave 1 evidence"
          dependencies: ["P1"]

  collection:
    - action: "Write implementation_plan.md to <appDataDir>/brain/<conversation-id>/"
    - action: "Write task.md to <appDataDir>/brain/<conversation-id>/"

  approval_gate:
    - action: "notify_user(BlockedOnUser=true) with Implementation Plan and Task List"

  cleanup:
    - action: "background_cancel(all=true)"
```

## Instruções para @apex-researcher

1. **Detecte complexidade (L1-L10)** com justificativa.
2. **Priorize repo-first** usando `find_by_name` e `grep_search`.
3. **Use context7** para documentação oficial de frameworks (Convex, Clerk, etc.).
4. **Coordenação**: Use `task_boundary` para refletir o status da pesquisa para o usuário.
5. **Output**: Gere o `implementation_plan.md` seguindo rigorosamente o formato oficial.
6. **Task List**: Crie o `task.md` com as tarefas atômicas (Phase 1-5).
7. **NOTIFY**: Chame `notify_user` para travar a execução até a aprovação do plano.

## Referências
- Princípios: `code-principles.md`
- Implementação: `implement.md`