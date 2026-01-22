# ═══════════════════════════════════════════════════════════════════════════════
# PRP: Migração Completa para Bun Package Manager
# ═══════════════════════════════════════════════════════════════════════════════

```yaml
# ─────────────────────────────────────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────────────────────────────────────
metadata:
  complexity: "L3 — Multi-file standardization with low technical risk"
  estimated_time: "30-45 minutos"
  parallel_safe: true
  risk_level: "LOW — Changes are documentation and config only, no code logic changes"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 1: ROLE & OBJECTIVE
# ─────────────────────────────────────────────────────────────────────────────
role: "DevOps Engineer & Documentation Specialist"
expertise_areas:
  - "Package Manager Migration"
  - "CI/CD Pipeline Configuration"
  - "Developer Tooling Standardization"

objective:
  task: "Standardize ALL package manager references to Bun, removing npm/pnpm/yarn remnants"
  context: "GPUS project currently uses Bun as primary package manager but has legacy npm/pnpm references"
  why_this_matters: |
    Inconsistent package manager references cause:
    - Developer confusion about which commands to use
    - Potential lockfile conflicts (bun.lock vs package-lock.json)
    - CI/CD instability if wrong lockfile is referenced
    - IDE hooks using npm/npx instead of bun/bunx

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 2: ANALYSIS SUMMARY (Pre-Research Completed)
# ─────────────────────────────────────────────────────────────────────────────
current_state_analysis:
  primary_package_manager: "Bun ✅"
  
  bun_usage_correct:
    - "package.json scripts: all use `bun run`, `bunx`"
    - ".github/workflows/ci.yml: uses bun correctly"
    - "Dockerfile: uses oven/bun:1-alpine, bun install --frozen-lockfile"
    - "bun.lock: present and up-to-date (2026-01-19)"

  legacy_npm_issues:
    - file: "package-lock.json"
      issue: "Stale lockfile from npm era (2026-01-16), causes confusion"
      action: "DELETE"
    
    - file: ".claude/settings.json"
      issue: "Hook uses `npx ultracite fix`"
      action: "CHANGE to `bunx ultracite fix`"
    
    - file: ".cursor/hooks.json"
      issue: "Hook uses `npx ultracite fix`"
      action: "CHANGE to `bunx ultracite fix`"

  pnpm_issues:
    - file: ".github/workflows/deploy.yml"
      line: 179
      issue: "Error message says `pnpm run type-check` instead of `bun run type-check`"
      action: "UPDATE message text"

  documentation_issues:
    - file: "AGENTS.md"
      lines: "12-15"
      issue: "Contains incorrect yarn/npm references in text"
      action: "VERIFY and clean documentation formatting"
    
    - file: "GEMINI.md"
      lines: "12-15"
      issue: "Contains incorrect yarn/npm references in text"
      action: "VERIFY and clean documentation formatting"
    
    - file: "convex/README.md"
      lines: "89-90"
      issue: "Uses npx in examples"
      action: "UPDATE to bunx"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 3: TECHNICAL CONTEXT
# ─────────────────────────────────────────────────────────────────────────────
environment:
  runtime: "Bun 1.x"
  framework: "React 19 + Vite 7 + TanStack Router"
  ci_cd: "GitHub Actions"
  deployment: "Vercel + Railway (Docker)"

relevant_files:
  must_modify:
    - path: ".github/workflows/deploy.yml"
      relevance: "Contains pnpm reference in error message"
    - path: ".claude/settings.json"
      relevance: "Hook uses npx"
    - path: ".cursor/hooks.json"
      relevance: "Hook uses npx"
    - path: "convex/README.md"
      relevance: "Documentation uses npx"
  
  must_delete:
    - path: "package-lock.json"
      relevance: "Stale npm lockfile causing confusion"
  
  may_need_review:
    - path: "AGENTS.md"
      relevance: "Documentation formatting check"
    - path: "GEMINI.md"
      relevance: "Documentation formatting check"
    - path: "plan/CRM_ENHANCEMENT_MASTER_PROMPT.md"
      relevance: "May have npx references in examples"

constraints:
  non_negotiable:
    - "DO NOT modify package.json scripts (already correct)"
    - "DO NOT modify ci.yml (already correct)"
    - "DO NOT modify Dockerfile (already correct)"
    - "DO NOT run bun install (already done)"
  preferences:
    - "Use `bunx` for all npx replacements"
    - "Keep documentation clear and consistent"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 4: ATOMIC TASKS
# ─────────────────────────────────────────────────────────────────────────────
atomic_tasks:
  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 1: CRITICAL FIXES (Executar primeiro)
  # ═══════════════════════════════════════════════════════════════════════════
  
  - id: "AT-001"
    title: "Delete stale package-lock.json"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "DELETE FILE"
      target: "D:\\gpus\\package-lock.json"
      command: "Remove-Item -Path 'D:\\gpus\\package-lock.json' -Force"
      validation: "Verify file no longer exists"
      rollback: "git checkout package-lock.json (if needed)"
    acceptance_criteria:
      - "package-lock.json does not exist in project root"
      - "Only bun.lock remains as lockfile"
    why: |
      Having both lockfiles causes confusion and potential CI issues.
      bun.lock is the source of truth for dependencies.

  - id: "AT-002"
    title: "Update .claude/settings.json hook to use bunx"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "EDIT FILE"
      target: "D:\\gpus\\.claude\\settings.json"
      old_content: '"command": "npx ultracite fix"'
      new_content: '"command": "bunx ultracite fix"'
      validation: "grep -q 'bunx ultracite' .claude/settings.json"
      rollback: "git checkout .claude/settings.json"
    acceptance_criteria:
      - "Hook command uses bunx instead of npx"
      - "JSON structure remains valid"

  - id: "AT-003"
    title: "Update .cursor/hooks.json to use bunx"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "EDIT FILE"
      target: "D:\\gpus\\.cursor\\hooks.json"
      old_content: '"command": "npx ultracite fix"'
      new_content: '"command": "bunx ultracite fix"'
      validation: "grep -q 'bunx ultracite' .cursor/hooks.json"
      rollback: "git checkout .cursor/hooks.json"
    acceptance_criteria:
      - "Hook command uses bunx instead of npx"
      - "JSON structure remains valid"

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 2: CI/CD FIXES
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-004"
    title: "Fix deploy.yml error message pnpm reference"
    phase: 2
    priority: "high"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "EDIT FILE"
      target: "D:\\gpus\\.github\\workflows\\deploy.yml"
      line: 179
      old_content: "echo \"Run 'pnpm run type-check' locally to see full error details\""
      new_content: "echo \"Run 'bun run type-check' locally to see full error details\""
      validation: "grep -q 'bun run type-check' .github/workflows/deploy.yml"
      rollback: "git checkout .github/workflows/deploy.yml"
    acceptance_criteria:
      - "Error message references bun, not pnpm"
      - "YAML syntax remains valid"

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 3: DOCUMENTATION FIXES
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-005"
    title: "Update convex/README.md to use bunx"
    phase: 3
    priority: "medium"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "EDIT FILE"
      target: "D:\\gpus\\convex\\README.md"
      changes:
        - old: "npx convex"
          new: "bunx convex"
      validation: "grep -c 'npx' convex/README.md should return 0"
      rollback: "git checkout convex/README.md"
    acceptance_criteria:
      - "All npx references replaced with bunx"
      - "Markdown formatting preserved"

  - id: "AT-006"
    title: "Verify and clean AGENTS.md package manager section"
    phase: 3
    priority: "medium"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "VERIFY/EDIT FILE"
      target: "D:\\gpus\\AGENTS.md"
      expected_content: |
        ## Package Manager

        **⚠️ IMPORTANTE**: Este projeto **sempre usa `bun`** como package manager. Nunca use `npm`, `yarn` ou `pnpm`.

        - ✅ **Sempre use**: `bun install`, `bun run`, `bunx`
        - ❌ **Nunca use**: `npm install`, `npm run`, `npx`, `yarn`, `pnpm`
      validation: "Read lines 10-16 and verify formatting"
      rollback: "git checkout AGENTS.md"
    acceptance_criteria:
      - "Package manager section is clear and correct"
      - "No stray npm/yarn references in formatting"

  - id: "AT-007"
    title: "Verify and clean GEMINI.md package manager section"
    phase: 3
    priority: "medium"
    dependencies: []
    parallel_safe: true
    implementation:
      action: "VERIFY/EDIT FILE"
      target: "D:\\gpus\\GEMINI.md"
      expected_content: |
        ## Package Manager

        **⚠️ IMPORTANTE**: Este projeto **sempre usa `bun`** como package manager. Nunca use `npm`, `yarn` ou `pnpm`.

        - ✅ **Sempre use**: `bun install`, `bun run`, `bunx`
        - ❌ **Nunca use**: `npm install`, `npm run`, `npx`, `yarn`, `pnpm`
      validation: "Read lines 10-16 and verify formatting"
      rollback: "git checkout GEMINI.md"
    acceptance_criteria:
      - "Package manager section is clear and correct"
      - "No stray npm/yarn references in formatting"

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 4: GITIGNORE UPDATE
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-008"
    title: "Add package-lock.json and pnpm-lock.yaml to .gitignore"
    phase: 4
    priority: "low"
    dependencies: ["AT-001"]
    parallel_safe: true
    implementation:
      action: "APPEND TO FILE"
      target: "D:\\gpus\\.gitignore"
      content_to_add: |
        
        # Prevent other package manager lockfiles
        package-lock.json
        pnpm-lock.yaml
        yarn.lock
      validation: "grep -q 'package-lock.json' .gitignore"
      rollback: "git checkout .gitignore"
    acceptance_criteria:
      - "All non-bun lockfiles are gitignored"
      - "Prevents accidental npm/pnpm/yarn usage"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 5: VALIDATION GATES
# ─────────────────────────────────────────────────────────────────────────────
validation:
  automated:
    - id: "VT-001"
      name: "No npm lockfile exists"
      command: "Test-Path -Path 'D:\\gpus\\package-lock.json' -PathType Leaf"
      expected: "False"
    
    - id: "VT-002"
      name: "Bun lockfile exists"
      command: "Test-Path -Path 'D:\\gpus\\bun.lock' -PathType Leaf"
      expected: "True"
    
    - id: "VT-003"
      name: "Build still works"
      command: "bun run build"
      expected: "Exit code 0"
    
    - id: "VT-004"
      name: "Lint passes"
      command: "bun run lint:check"
      expected: "Exit code 0"
    
    - id: "VT-005"
      name: "No npx in hooks"
      command: "Select-String -Path '.claude/settings.json','.cursor/hooks.json' -Pattern 'npx'"
      expected: "No matches found"

  manual_review:
    - id: "VT-006"
      description: "Verify Claude hook works with bunx"
      test: "Make a file edit and check if ultracite runs"
    
    - id: "VT-007"
      description: "Verify Cursor hook works with bunx"
      test: "Make a file edit in Cursor and check if ultracite runs"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 6: OUTPUT CONTRACT
# ─────────────────────────────────────────────────────────────────────────────
output:
  files_deleted:
    - path: "package-lock.json"
      reason: "Stale npm lockfile"
  
  files_modified:
    - path: ".claude/settings.json"
      changes: "npx → bunx in PostToolUse hook"
    
    - path: ".cursor/hooks.json"
      changes: "npx → bunx in afterFileEdit hook"
    
    - path: ".github/workflows/deploy.yml"
      changes: "pnpm → bun in error message"
    
    - path: "convex/README.md"
      changes: "npx → bunx in examples"
    
    - path: "AGENTS.md"
      changes: "Clean formatting in package manager section"
    
    - path: "GEMINI.md"
      changes: "Clean formatting in package manager section"
    
    - path: ".gitignore"
      changes: "Add non-bun lockfiles to ignore list"

  success_definition: |
    ✅ CRITERIA FOR SUCCESS:
    1. Only bun.lock exists as lockfile
    2. All hooks use bunx instead of npx
    3. All CI/CD references use bun
    4. All documentation uses bun/bunx
    5. Build and lint pass
    6. .gitignore prevents future lockfile pollution

  failure_handling: |
    If any step fails:
    1. Check git diff for unintended changes
    2. Run: git checkout <affected-file>
    3. Retry with more careful edit
    
    If build fails after changes:
    1. Verify bun.lock wasn't corrupted
    2. Run: bun install --frozen-lockfile
    3. If still failing, restore from git

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 7: EXECUTION ORDER
# ─────────────────────────────────────────────────────────────────────────────
execution_order:
  phase_1_critical:
    description: "Remove conflicts and fix tool hooks"
    tasks: ["AT-001", "AT-002", "AT-003"]
    parallel: true
    validate_after: ["VT-001", "VT-002", "VT-005"]
  
  phase_2_cicd:
    description: "Fix CI/CD references"
    tasks: ["AT-004"]
    parallel: true
    validate_after: []
  
  phase_3_docs:
    description: "Update documentation"
    tasks: ["AT-005", "AT-006", "AT-007"]
    parallel: true
    validate_after: []
  
  phase_4_prevention:
    description: "Prevent future issues"
    tasks: ["AT-008"]
    parallel: true
    validate_after: []
  
  final_validation:
    description: "Ensure everything works"
    tasks: []
    validate: ["VT-003", "VT-004", "VT-006", "VT-007"]
```

---

# QUICK EXECUTION COMMANDS

## Para executar manualmente (PowerShell):

```powershell
# PHASE 1: Critical Fixes
# AT-001: Delete stale lockfile
Remove-Item -Path "D:\gpus\package-lock.json" -Force

# AT-002: Fix Claude hook
$content = Get-Content "D:\gpus\.claude\settings.json" -Raw
$content = $content -replace 'npx ultracite', 'bunx ultracite'
Set-Content "D:\gpus\.claude\settings.json" -Value $content -NoNewline

# AT-003: Fix Cursor hook
$content = Get-Content "D:\gpus\.cursor\hooks.json" -Raw
$content = $content -replace 'npx ultracite', 'bunx ultracite'
Set-Content "D:\gpus\.cursor\hooks.json" -Value $content -NoNewline

# PHASE 2: CI/CD
# AT-004: Fix deploy.yml
$content = Get-Content "D:\gpus\.github\workflows\deploy.yml" -Raw
$content = $content -replace "pnpm run type-check", "bun run type-check"
Set-Content "D:\gpus\.github\workflows\deploy.yml" -Value $content -NoNewline

# PHASE 3: Documentation - Manual review needed for AGENTS.md, GEMINI.md, convex/README.md

# PHASE 4: Prevention
Add-Content -Path "D:\gpus\.gitignore" -Value "`n# Prevent other package manager lockfiles`npackage-lock.json`npnpm-lock.yaml`nyarn.lock"

# VALIDATION
cd D:\gpus
bun run build
bun run lint:check
```

---

# SUMMARY REPORT

## 📊 Estado Atual do Projeto GPUS

| Componente | Package Manager | Status |
|------------|-----------------|--------|
| package.json scripts | Bun ✅ | Correto |
| CI (ci.yml) | Bun ✅ | Correto |
| Dockerfile | Bun ✅ | Correto |
| bun.lock | Presente ✅ | Correto |
| package-lock.json | npm ❌ | **REMOVER** |
| .claude/settings.json | npx ❌ | **TROCAR por bunx** |
| .cursor/hooks.json | npx ❌ | **TROCAR por bunx** |
| deploy.yml | pnpm ❌ | **TROCAR por bun** |
| convex/README.md | npx ❌ | **TROCAR por bunx** |

## 🎯 Impacto das Mudanças

- **Zero impacto no código**: Nenhuma mudança em lógica de aplicação
- **Baixo risco**: Apenas configurações e documentação
- **Alta consistência**: Elimina confusão sobre qual package manager usar
- **Previne problemas futuros**: .gitignore bloqueia outros lockfiles
