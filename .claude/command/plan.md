---
description: Create project plan using master-planner skill. No code writing - only plan file generation.
---

# /plan - Master Planning Command

$ARGUMENTS

---

## 🔴 CRITICAL RULES

1. **ACTIVATE SKILL**: Read and follow `.agent/skills/planning/SKILL.md` (master-planner)
2. **NO CODE WRITING** - This command creates plan file only
3. **R.P.I.V WORKFLOW** - Research → Plan → (skip Implement) → Validate
4. **SOCRATIC GATE** - Ask clarifying questions before planning if unclear
5. **DYNAMIC NAMING** - Plan file named based on task

---

## Skill to Activate

**MANDATORY**: Before proceeding, read `.agent/skills/planning/SKILL.md` and follow its instructions.

---

## Task

Execute the master-planner skill with this context:

```yaml
CONTEXT:
  user_request: $ARGUMENTS
  mode: CONSERVATIVE (plan only, no code)
  output_location: docs/PLAN-{task-slug}.md

WORKFLOW:
  1. RESEARCH:
     - Context7: official docs for relevant technologies
     - Tavily: best practices, security, edge cases
     - Codebase: existing patterns, conventions
  
  2. PLAN:
     - Create Findings Table
     - List Knowledge Gaps
     - List Assumptions to Validate
     - Decompose into Atomic Tasks (AT-XXX)
     - Define validation commands + rollback steps
  
  3. OUTPUT:
     - Create docs/PLAN-{slug}.md using skill template
     - Include all research artifacts
     - Mark parallel-safe tasks

NAMING_RULES:
  - Extract 2-3 key words from request
  - Lowercase, hyphen-separated
  - Max 30 characters
  - Example: "e-commerce cart" → PLAN-ecommerce-cart.md

CONSTRAINTS:
  - DO NOT write any code files
  - DO NOT skip research phase
  - DO NOT guess file paths or APIs
  - REPORT the exact file name created
```

---

## Expected Output

| Deliverable | Location |
|-------------|----------|
| Research Digest | Inside plan file |
| Findings Table | Inside plan file |
| Knowledge Gaps | Inside plan file |
| Atomic Tasks | Inside plan file |
| Validation Gates | Inside plan file |
| Project Plan | `docs/PLAN-{task-slug}.md` |

---

## After Planning

Tell user:
```
✅ Plan created: docs/PLAN-{slug}.md

Next steps:
- Review the plan
- Run `/implement` to start implementation
- Or modify plan manually
```

---

## Naming Examples

| Request | Plan File |
|---------|-----------|
| `/plan e-commerce site with cart` | `docs/PLAN-ecommerce-cart.md` |
| `/plan mobile app for fitness` | `docs/PLAN-fitness-app.md` |
| `/plan add dark mode feature` | `docs/PLAN-dark-mode.md` |
| `/plan fix authentication bug` | `docs/PLAN-auth-fix.md` |
| `/plan SaaS dashboard` | `docs/PLAN-saas-dashboard.md` |

---

## Usage

```
/plan e-commerce site with cart
/plan mobile app for fitness tracking
/plan SaaS dashboard with analytics
/plan add SSO with Okta
```