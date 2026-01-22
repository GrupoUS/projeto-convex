---
description: Debugging command with integrated QA pipeline. Activates DEBUG mode using debugger agent and webapp-testing skill for systematic problem investigation, testing, and auto-fix.
---

# /debug - Systematic Problem Investigation & QA Pipeline

$ARGUMENTS

---

## 🔴 CRITICAL: Activate Resources

**MANDATORY**: Before proceeding, read and follow:
1. `.agent/agents/debugger.md` — Debugger agent with 4-phase methodology
2. `.agent/skills/webapp-testing/SKILL.md` — E2E testing, Playwright, audit strategies

---

## Purpose

This command activates DEBUG mode for systematic investigation of issues, integrated with QA pipeline for auto-research and auto-fix capabilities.

---

## Integrated Flow

```mermaid
flowchart TD
    A[/debug] --> B[Phase 1: Information Gathering]
    B --> C[Phase 2: Hypothesis Formation]
    C --> D[Phase 3: Investigation]
    D --> E{Issue Found?}
    
    E -->|Yes| F[Phase 4: Fix & Validate]
    F --> G[Phase 5: QA Pipeline]
    
    E -->|No| H[Expand Search]
    H --> C
    
    G --> I{All Tests Pass?}
    I -->|Yes| J[✅ DEBUG COMPLETE]
    I -->|No| K[Auto-Research & Fix]
    K --> G
    
    subgraph "Debugger Agent"
    B
    C
    D
    F
    end
    
    subgraph "QA Pipeline"
    G
    K
    end
```

---

## Phase 1: Information Gathering

```yaml
gather:
  - Error message and stack trace
  - Reproduction steps
  - Expected vs actual behavior
  - Recent code changes
  - Environment context (dev/prod)
  - Browser/runtime logs

tools:
  - Sequential Thinking: Root cause analysis
  - Grep/Search: Find related code
  - Logs: Railway/Convex logs
```

**Commands to run:**
```bash
# Check logs
railway logs --latest -n 100
bunx convex logs --prod --success --failure
```

---

## Phase 2: Hypothesis Formation

```yaml
process:
  1: List possible causes
  2: Order by likelihood
  3: Consider AI-generated code anti-patterns
  4: Map to specific files/functions

anti_patterns_to_check:
  - Direct database access from frontend
  - API keys in browser code
  - Client-side business logic
  - Missing rate limiting
  - Sensitive data in logs
```

---

## Phase 3: Systematic Investigation

```yaml
method: "Sequential hypothesis testing"

for_each_hypothesis:
  - Test with evidence
  - Check logs, data flow
  - Use elimination method
  - Document findings

tools:
  - webapp-testing: Reproduce bugs with Playwright
  - debugger-agent: 4-phase debugging methodology
  - Sequential Thinking: Structure analysis
```

**Webapp Testing Script:**
```bash
python .agent/skills/webapp-testing/scripts/playwright_runner.py <url> --screenshot --a11y
```

---

## Phase 4: Fix & Prevention

```yaml
fix_process:
  1: Identify root cause
  2: Apply minimal fix
  3: Explain why it works
  4: Add prevention measures
  5: Update tests

prevention:
  - Add unit test for bug
  - Add E2E test for flow
  - Document the issue
```

---

## Phase 5: QA Validation Pipeline

> **🔴 CRITICAL GATE**: Ensure fix doesn't break other things

### 5.1 Local Quality Checks
```bash
# Code quality & linting
bun run lint:check

# Type safety & build verification  
bun run build

# Test coverage
bun run test
```

### 5.2 Deployment Validation
```bash
# Railway deployment status
railway status

# Convex backend deployment
bunx convex deploy --prod

# Verify logs for new errors
railway logs --latest -n 50
bunx convex logs --prod --failure
```

### 5.3 E2E Validation (if UI affected)
```bash
# Run E2E tests
bun run test:e2e

# Or use Playwright directly
python .agent/skills/webapp-testing/scripts/playwright_runner.py <url> --screenshot
```

---

## Auto-Research & Fix (If QA Fails)

If errors are detected after fix:

1. **Aggregate Errors**
   - Stack trace completo
   - Versões de bibliotecas
   - Código fonte afetado
   - Logs de erro

2. **Invoke Research**
   > `/research "Debug Fix: [resumo]. Context: [logs]. GOAL: Research docs and plan atomic fixes."`

3. **Generate Atomic Tasks**
   ```yaml
   tasks:
     - [ ] Research API/pattern (if unknown)
     - [ ] Apply fix to [file]
     - [ ] Verify fix (unit/build/lint)
   ```

4. **Re-run QA Pipeline** after implementation

---

## Output Format

```markdown
## 🔍 Debug: [Issue]

### 1. Symptom
[What's happening]

### 2. Information Gathered
- **Error**: `[error message]`
- **File**: `[filepath]`
- **Line**: [line number]
- **Logs**: [relevant log snippets]

### 3. Hypotheses
1. ❓ [Most likely cause] — Testing: [method]
2. ❓ [Second possibility] — Testing: [method]
3. ❓ [Less likely cause] — Testing: [method]

### 4. Investigation Results

**Hypothesis 1:**
[What I checked] → [Result] → ✅/❌

**Hypothesis 2:**
[What I checked] → [Result] → ✅/❌

### 5. Root Cause
🎯 **[Explanation of why this happened]**

Evidence:
- [Evidence 1]
- [Evidence 2]

### 6. Fix Applied
```[language]
// Before
[broken code]

// After  
[fixed code]
```

### 7. QA Validation
| Check | Status | Notes |
|-------|--------|-------|
| Lint | ✅/❌ | |
| Build | ✅/❌ | |
| Tests | ✅/❌ | |
| E2E | ✅/❌ | (if applicable) |

### 8. Prevention
🛡️ [How to prevent this in the future]
- [ ] Test added
- [ ] Documentation updated
- [ ] Validation improved
```

---

## Skill Integration

### For UI/Frontend Bugs
> **USE SKILL**: `webapp-testing`
> - Create Playwright scripts for reproduction
> - Capture screenshots of errors
> - Run accessibility checks
> - E2E test for the fixed flow

### For Backend/Database Bugs
> **USE SKILL**: `ai-data-analyst`
> - Analyze data consistency
> - Validate schema expectations
> - Create verification scripts

### For Security Issues
> **USE AGENT**: `debugger.md` (Security section)
> - Follow AI-generated code vulnerability checklist
> - Check for client-side trust issues
> - Verify authorization at each endpoint

---

## Success Metrics

| Gate | Command | Expected |
|------|---------|----------|
| Lint | `bun run lint:check` | 0 errors |
| Build | `bun run build` | Clean build |
| Tests | `bun run test` | All pass |
| E2E | `bun run test:e2e` | All pass |
| Deploy | `railway status` | Healthy |
| Backend | `bunx convex deploy --prod` | Success |
| Logs | `railway logs --latest -n 50` | No new errors |

---

## Examples

```
/debug login not working
/debug API returns 500
/debug form doesn't submit
/debug data not saving
/debug payment failing in prod
/debug component not rendering
```

---

## Key Principles

- **Ask before assuming** — get full error context
- **Test hypotheses** — don't guess randomly  
- **Evidence-based** — document what you found
- **Explain why** — not just what to fix
- **Prevent recurrence** — add tests, validation
- **QA validation** — ensure fix doesn't break other things
- **Auto-research** — use Context7/Tavily for unknown issues

---

## Quick Reference

| Task | Command |
|------|---------|
| Debug issue | `/debug [description]` |
| Run E2E | `python .agent/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| Check logs | `railway logs --latest -n 100` |
| Convex logs | `bunx convex logs --prod --failure` |
| Full QA | `/qa` |

---

**Pipeline completo: `/debug` → investigar → fix → QA validate → (se falhar) → auto-research → re-fix → QA validate**
