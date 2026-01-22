---
description: Detecta e remove codigo morto com Knip e Biome
agent: code-reviewer
subtask: true
---

# Command: /cleanup | /limpar

## Universal Description

**INTELLIGENT CODEBASE CLEANUP ORCHESTRATION** - Multi-droid parallel execution with MCP stack integration (serena, context7, tavily) for safe dead code detection, unused export removal, and dependency optimization. Zero-regression guarantee through Knip analysis and multi-phase verification gates for React 19 + Vite + TanStack Router + Convex + Clerk stack.

## Purpose

Execute comprehensive and safe codebase cleanup through intelligent MCP-powered analysis, atomic task decomposition, and Knip-based dead code detection with rollback capabilities. Identifies unused files, dead exports, orphan components, obsolete dependencies, and Convex backend inconsistencies while ensuring zero system breakage for Brazilian LGPD compliance.

---

## Tech Stack Integration

```yaml
tech_stack:
  runtime: bun
  framework: React 19
  bundler: Vite 7
  router: TanStack Router
  backend: Convex
  auth: Clerk
  styling: Tailwind CSS v4
  ui: shadcn/ui
  linting: Biome
  testing: Vitest

cleanup_tools:
  primary: Knip (dead code detection)
  secondary: Biome (unused imports)
  verification: TypeScript tsc + Vitest
  
package_manager: ALWAYS use bun (never npm/yarn/pnpm)
```

---

## MCP-Powered Cleanup Orchestration

### Docker MCP Gateway Integration

```yaml
mcp_stack:
  serena: "Codebase intelligence - symbol resolution, reference analysis, pattern detection"
  context7: "Official documentation for safe removal patterns"
  tavily: "Community best practices for cleanup strategies"
  sequential-thinking: "Multi-step analysis and decision trees"

mcp_routing:
  dead_code_analysis: serena find_symbol + find_referencing_symbols
  pattern_validation: serena search_for_pattern
  dependency_check: context7 get-library-docs (Knip)
  best_practices: tavily-search (cleanup strategies)
```

### MCP Tool Chains for Cleanup

```yaml
analysis_chain:
  phase_1: "serena find_symbol → get_symbols_overview → identify candidates"
  phase_2: "serena find_referencing_symbols → validate usage"
  phase_3: "serena search_for_pattern → dynamic import detection"
  
validation_chain:
  step_1: "bun run lint:check → Biome validation"
  step_2: "bun run build → TypeScript + Vite validation"
  step_3: "bun run test → Vitest test suite"
```

---

## Droid Coordination Protocol

### Primary Droids for Cleanup Operations

```yaml
droid_assignment:
  apex-dev:
    role: "Implementation coordinator - code removal execution"
    tools: ["serena", "context7", "sequential-thinking"]
    responsibilities:
      - Execute atomic removal tasks
      - Validate build after each batch
      - Handle rollback operations
    
  code-reviewer:
    role: "Security and compliance validation"
    tools: ["context7", "tavily"]
    responsibilities:
      - Validate no security patterns removed
      - Check LGPD compliance preserved
      - Verify shadcn/ui core components protected
    
  database-specialist:
    role: "Convex backend cleanup validation"
    tools: ["serena"]
    responsibilities:
      - Validate Convex schema consistency
      - Check for orphan mutations/queries
      - Verify API usage patterns

parallel_execution:
  phase_1_discovery:
    - apex-dev: [serena analysis]
    - database-specialist: [convex schema review]
  
  phase_2_validation:
    - code-reviewer: [security + compliance check]
    - apex-dev: [build verification]
```

---

## Knip Integration for Dead Code Detection

### Knip Configuration Template

```typescript
// knip.config.ts (recommended)
import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Entry points for analysis
  entry: [
    'src/main.tsx',
    'src/routeTree.gen.ts',
    'convex/**/*.ts',
  ],
  
  // Project files to analyze
  project: [
    'src/**/*.{ts,tsx}',
    'convex/**/*.ts',
  ],
  
  // Framework-specific configurations
  vite: {
    config: 'vite.config.ts',
  },
  
  // Ignore patterns for safe cleanup
  ignore: [
    'src/components/ui/**', // shadcn/ui components
    'convex/_generated/**', // Convex generated files
    'src/routeTree.gen.ts', // TanStack Router generated
  ],
  
  // Ignore specific dependencies
  ignoreDependencies: [
    '@tanstack/router-devtools', // Dev-only
    'tailwindcss-animate', // CSS utility
  ],
  
  // Rules configuration
  rules: {
    files: 'warn',
    dependencies: 'warn', 
    devDependencies: 'warn',
    unlisted: 'off',
    binaries: 'off',
    unresolved: 'off',
    exports: 'warn',
    types: 'warn',
    enumMembers: 'warn',
    duplicates: 'warn',
  },
};

export default config;
```

### Knip CLI Commands

```bash
# Install Knip (if not present)
bun add -D knip

# Discovery mode - report only
bunx knip --reporter compact

# Detailed analysis with debug
bunx knip --reporter codeowners --debug

# Trace specific exports
bunx knip --trace-export ComponentName

# Check specific file
bunx knip --trace-file src/components/component.tsx

# Production mode (strict)
bunx knip --no-exit-code --max-issues 0

# Auto-fix unused exports (with caution!)
bunx knip --fix --no-exit-code
```

---

## Cleanup Categories (Tech Stack Specific)

```yaml
cleanup_types:
  dead_exports:
    description: "Exported symbols never imported elsewhere"
    detection_tool: "Knip + serena find_referencing_symbols"
    risk_level: "LOW-MEDIUM"
    verification: "bun run build"
    
  orphan_components:
    description: "React components never rendered"
    detection_tool: "Knip + serena search_for_pattern (JSX usage)"
    protection: "NEVER remove shadcn/ui base components"
    risk_level: "MEDIUM"
    
  orphan_routes:
    description: "TanStack Router routes not navigable"
    detection_tool: "serena find_referencing_symbols on route exports"
    verification: "Check routeTree.gen.ts references"
    risk_level: "MEDIUM"
    
  unused_hooks:
    description: "Custom hooks in src/hooks never used"
    detection_tool: "Knip exports analysis"
    risk_level: "LOW-MEDIUM"
    
  convex_dead_functions:
    description: "Convex mutations/queries never called from frontend"
    detection_tool: "serena search_for_pattern api.{module}.{function}"
    protection: "Verify no server-side calls"
    risk_level: "HIGH"
    
  unused_imports:
    description: "Imported modules never used in file"
    detection_tool: "Biome lint (noUnusedImports)"
    auto_fix: "bun run lint (Biome auto-fix)"
    risk_level: "LOW"
    
  unused_dependencies:
    description: "package.json deps never imported"
    detection_tool: "Knip dependencies analysis"
    risk_level: "MEDIUM-HIGH"
    
  orphan_types:
    description: "TypeScript types/interfaces never referenced"
    detection_tool: "Knip types analysis"
    risk_level: "LOW"
```

---

## Safety Verification Gates

```yaml
verification_gates:
  pre_removal:
    mandatory:
      - "Knip analysis completed with report"
      - "serena find_referencing_symbols confirms no usage"
      - "No shadcn/ui base components affected"
      - "No Convex _generated files touched"
      - "No routeTree.gen.ts modifications"
      - "Git backup branch created"
    
  during_removal:
    incremental:
      batch_size: "1-5 files max per batch"
      after_each_batch:
        - "bun run lint:check → 0 errors"
        - "bun run build → success"
        - "bun run test → all passing"
    on_failure: "git checkout . && git clean -fd"
    
  post_removal:
    final_validation:
      - "bun run lint:check → 0 errors"
      - "bun run build → success"
      - "bun run test → all passing"
      - "bunx convex dev --once → schema valid"
      - "Manual browser verification (optional)"
    
  rollback_triggers:
    - "Any TypeScript error (tsc)"
    - "Any Biome lint error"
    - "Any Vitest test failure"
    - "Convex schema validation failure"
    - "Build failure"
```

---

## Atomic Task Generation Templates

### Phase 1: Discovery & Inventory

```yaml
phase_1_discovery:
  parallel_execution: true
  estimated_time: "5-15 minutes"
  droids: ["apex-dev", "database-specialist"]
  
  tasks:
    task_1.1_knip_analysis:
      title: "Run Knip dead code detection"
      commands:
        - "bun add -D knip (if missing)"
        - "bunx knip --reporter compact > .factory/logs/knip-report.txt"
      outputs:
        - "knip-report.txt"
        - "candidates.json"
        
    task_1.2_serena_analysis:
      title: "MCP serena symbol analysis"
      mcp_calls:
        - "find_symbol (orphan candidates)"
        - "find_referencing_symbols (usage validation)"
        - "search_for_pattern (dynamic imports)"
      outputs:
        - "symbol_analysis.json"
        
    task_1.3_convex_validation:
      title: "Convex backend consistency check"
      droid: "database-specialist"
      actions:
        - "List all mutations/queries in convex/"
        - "Search for api.{module}.{function} usage in src/"
        - "Identify orphan Convex functions"
      outputs:
        - "convex_usage_report.md"
```

### Phase 2: Deep Analysis

```yaml
phase_2_analysis:
  parallel_execution: "partial"
  estimated_time: "10-20 minutes"
  droids: ["apex-dev", "code-reviewer"]
  
  tasks:
    task_2.1_verify_candidates:
      title: "Cross-validate removal candidates"
      mcp_chain:
        - "serena get_symbols_overview → file structure"
        - "serena find_referencing_symbols → all refs"
        - "context7 → framework patterns validation"
      outputs:
        - "verified_removals.json"
        - "false_positives.json"
        
    task_2.2_security_validation:
      title: "Security and compliance check"
      droid: "code-reviewer"
      checklist:
        - "No LGPD data handling code removed"
        - "No Clerk auth patterns affected"
        - "No security-critical utilities removed"
      outputs:
        - "security_clearance.md"
        
    task_2.3_dependency_analysis:
      title: "Analyze package.json unused deps"
      tool: "Knip dependencies"
      protection:
        - "Never remove peer dependencies"
        - "Verify Tailwind/shadcn utilities"
        - "Check Convex/Clerk integration deps"
```

### Phase 3: Planning & Approval

```yaml
phase_3_planning:
  sequential: true
  estimated_time: "5-10 minutes"
  
  tasks:
    task_3.1_prioritize_removals:
      title: "Create safe removal order"
      priority_order:
        1: "Unused imports (lowest risk) → Biome auto-fix"
        2: "Orphan TypeScript types"
        3: "Orphan utility functions"
        4: "Orphan hooks"
        5: "Orphan components (non-shadcn)"
        6: "Orphan routes"
        7: "Unused dependencies"
        8: "Convex dead functions (highest risk)"
      outputs:
        - "removal_plan.md"
        
    task_3.2_generate_backup:
      title: "Create safety backup"
      commands:
        - "git checkout -b backup/cleanup-$(date +%Y%m%d-%H%M%S)"
        - "git push origin backup/cleanup-*"
```

### Phase 4: Execution

```yaml
phase_4_execution:
  mode: "SEQUENTIAL_WITH_VERIFICATION"
  parallel: false
  
  tasks:
    task_4.1_biome_auto_fix:
      title: "Auto-fix unused imports with Biome"
      command: "bun run lint"
      verification: "bun run build"
      rollback: "git checkout ."
      
    task_4.2_incremental_removal:
      title: "Remove verified dead code"
      batch_size: "1-5 files"
      per_batch:
        - "Remove file(s)"
        - "bun run lint:check"
        - "bun run build"
        - "bun run test"
        - "Git commit if passing"
      on_failure: "git checkout . && report failure"
      
    task_4.3_dependency_cleanup:
      title: "Remove unused dependencies"
      command: "bun remove [package]"
      verification:
        - "bun run build"
        - "bun run test"
```

### Phase 5: Documentation

```yaml
phase_5_documentation:
  tasks:
    task_5.1_generate_report:
      title: "Generate cleanup report"
      location: ".factory/docs/cleanup-report-{YYYY-MM-DD}.md"
      content:
        - "Executive summary"
        - "Files removed with justifications"
        - "Dependencies removed"
        - "Verification results"
        - "Recommendations for prevention"
        
    task_5.2_update_changelog:
      title: "Update project changelog"
      commit_format: |
        chore(cleanup): remove dead code and unused exports
        
        - Removed {count} unused files
        - Cleaned {count} orphan exports
        - Verified: lint ✓, build ✓, tests ✓
```

---

## Complexity Assessment

```yaml
complexity_levels:
  L1-L3_simple:
    indicators:
      - "Only unused imports detected"
      - "< 10 candidates for removal"
      - "No Convex changes needed"
    estimated_time: "15-30 minutes"
    droids: ["apex-dev solo"]
    risk: "LOW"
    
  L4-L6_moderate:
    indicators:
      - "10-50 removal candidates"
      - "Some orphan components/hooks"
      - "Minor dependency cleanup"
    estimated_time: "1-2 hours"
    droids: ["apex-dev", "code-reviewer"]
    risk: "MEDIUM"
    
  L7-L8_complex:
    indicators:
      - "50+ removal candidates"
      - "Convex dead functions detected"
      - "Significant dependency changes"
    estimated_time: "2-4 hours"
    droids: ["apex-dev", "code-reviewer", "database-specialist"]
    risk: "HIGH"
    
  L9-L10_critical:
    indicators:
      - "Major tech stack migration remnants"
      - "Shared utilities affected"
      - "Core component refactoring needed"
    estimated_time: "4-8 hours"
    droids: ["all + apex-researcher"]
    recommendation: "Phased cleanup over multiple sessions"
```

---

## Command Usage Examples

### Basic Cleanup Analysis
```bash
/cleanup

→ Runs Knip analysis
→ Cross-validates with serena MCP
→ Generates removal plan
→ Awaits approval before execution
```

### Quick Unused Imports Fix
```bash
/cleanup --category=unused-imports

→ Runs Biome lint
→ Auto-fixes unused imports
→ Verifies build passes
→ LOW RISK - automatic execution
```

### Full Dead Code Analysis (Report Only)
```bash
/cleanup --mode=analyze

→ Runs all detection tools
→ Generates comprehensive report
→ No file modifications
→ Saves to .factory/docs/cleanup-analysis.md
```

### Convex Backend Cleanup
```bash
/cleanup --scope=convex

→ Focuses on convex/ directory
→ Detects orphan mutations/queries
→ Validates all api.* usage in src/
→ HIGH RISK - requires approval
```

### Full Autonomous Cleanup
```bash
/cleanup --mode=auto --depth=deep

→ Full Knip + MCP analysis
→ Automatic execution with safety gates
→ Automatic rollback on any failure
→ Generates comprehensive report
```

### Component-Focused Cleanup
```bash
/cleanup --scope=src/components --protect=ui

→ Focuses on src/components/
→ Protects src/components/ui/ (shadcn)
→ Identifies orphan custom components
```

---

## Safety Rules (MANDATORY)

```yaml
NEVER:
  - Remove shadcn/ui base components (src/components/ui/)
  - Remove Convex _generated files
  - Remove routeTree.gen.ts
  - Skip verification gates
  - Remove multiple high-risk items simultaneously
  - Trust static analysis alone without reference check
  - Modify package.json without build verification
  - Force push over backup branches
  - Remove without git backup branch
  
ALWAYS:
  - Create git backup branch before any modification
  - Run bun run lint:check after EACH removal batch
  - Run bun run build after EACH removal batch
  - Run bun run test after EACH removal batch
  - Verify bunx convex dev --once for Convex changes
  - Document justification for each removal
  - Preserve git history with atomic commits
  - Check for dynamic imports and lazy loading
  - Verify config file references (vite.config.ts, etc.)
  - Ask for confirmation on high-risk removals
  - Generate comprehensive cleanup report

PROTECTED_PATTERNS:
  - src/components/ui/** (shadcn/ui)
  - convex/_generated/** (Convex generated)
  - src/routeTree.gen.ts (TanStack Router)
  - src/main.tsx (entry point)
  - convex/schema.ts (database schema)
  - convex/auth.config.ts (Clerk integration)
  - *.config.* files (framework configs)
```

---

## Output Standards

```yaml
report_structure:
  location: ".factory/docs/cleanup-report-{YYYY-MM-DD}.md"
  
  sections:
    executive_summary:
      - Cleanup scope and duration
      - Total items removed
      - Build/test verification status
      - Risk level handled
      
    detailed_removals:
      - Category breakdown
      - File-by-file list with justifications
      - Dependency changes
      - MCP validation evidence
      
    metrics:
      - Files before/after
      - Lines of code removed
      - Dependencies removed
      - Knip issues resolved
      
    verification_results:
      - Biome lint: [pass|fail]
      - TypeScript: [pass|fail]
      - Vitest tests: [pass|fail]
      - Convex validation: [pass|fail]
      
    recommendations:
      - Prevention strategies (CI integration)
      - Remaining technical debt
      - Suggested follow-up actions

git_artifacts:
  backup_branch: "backup/cleanup-{YYYYMMDD-HHMMSS}"
  commit_format: |
    chore(cleanup): remove {category}
    
    - Removed {count} {type}
    - Verified: lint ✓, build ✓, tests ✓
    - Justification: {brief_reason}
    - MCP validation: serena refs=0
```

---

## CI/CD Integration

```yaml
ci_integration:
  pre_commit:
    - "bun run lint (auto-fix unused imports)"
    
  pull_request:
    - "bunx knip --no-exit-code (dead code report)"
    - "Comment cleanup opportunities on PR"
    
  scheduled_weekly:
    - "bunx knip --reporter json > metrics/knip-$(date +%Y-%m-%d).json"
    - "Track dead code trends"

recommended_scripts:
  add_to_package_json:
    "cleanup:analyze": "bunx knip --reporter compact"
    "cleanup:check": "bunx knip --no-exit-code --max-issues 0"
    "cleanup:fix": "bunx knip --fix"
```

---

## Activation Protocol

```yaml
trigger_detection:
  command_keywords:
    - "/cleanup"
    - "/limpar"
    - "/clean"
    - "/limpeza"
    - "clean up the codebase"
    - "remove dead code"
    - "find unused files"
    - "codebase cleanup"
    
automatic_routing:
  primary_droid: "apex-dev"
  support_droids: ["code-reviewer", "database-specialist"]
  mcp_stack: ["serena", "context7"]
  quality_gate: "100% verification pass"
  brazilian_compliance: "LGPD patterns protected"

default_behavior:
  mode: "plan"  # Always plan first
  backup: "required"
  verification: "all_gates"
  rollback: "automatic_on_failure"
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│                    /cleanup COMMAND REFERENCE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  USAGE:                                                          │
│    /cleanup [options]                                            │
│                                                                  │
│  OPTIONS:                                                        │
│    --mode=<analyze|plan|execute|auto>  Execution mode            │
│    --scope=<path>                      Directory to focus        │
│    --category=<type>                   Specific cleanup type     │
│    --depth=<surface|standard|deep>     Analysis depth            │
│    --protect=<pattern>                 Additional protection     │
│    --dry-run                           Show plan, no execute     │
│                                                                  │
│  CATEGORIES:                                                     │
│    unused-imports      Biome auto-fix (lowest risk)              │
│    unused-exports      Knip exports analysis                     │
│    orphan-files        Files not referenced                      │
│    orphan-hooks        Custom hooks unused                       │
│    orphan-routes       TanStack routes not navigable             │
│    orphan-components   Components not rendered                   │
│    orphan-types        Types/interfaces unused                   │
│    unused-deps         Package.json dead deps                    │
│    convex-dead         Orphan Convex functions (high risk)       │
│    all                 Full cleanup (default)                    │
│                                                                  │
│  TOOLS USED:                                                     │
│    Knip               Dead code detection (primary)              │
│    Biome              Unused imports auto-fix                    │
│    serena MCP         Symbol reference validation                │
│    context7 MCP       Framework pattern docs                     │
│                                                                  │
│  VERIFICATION:                                                   │
│    bun run lint:check    Biome validation                        │
│    bun run build         TypeScript + Vite                       │
│    bun run test          Vitest test suite                       │
│    bunx convex dev       Convex schema check                     │
│                                                                  │
│  SAFETY:                                                         │
│    ✓ Git backup branch created automatically                    │
│    ✓ Verification after each removal batch                      │
│    ✓ Automatic rollback on failure                              │
│    ✓ Protected: shadcn/ui, Convex _generated, configs           │
│    ✓ Approval required before execution                         │
│                                                                  │
│  EXAMPLES:                                                       │
│    /cleanup                          Full analysis + plan        │
│    /cleanup --mode=analyze           Report only                 │
│    /cleanup --category=unused-imports Quick import cleanup       │
│    /cleanup --scope=src/components   Focus on components         │
│    /cleanup --scope=convex           Convex backend cleanup      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

**Remember**: Safe cleanup prioritizes system stability over aggressive removal. When in doubt, keep the code and flag for manual review. Always verify with `bun run build && bun run test` after any modification.