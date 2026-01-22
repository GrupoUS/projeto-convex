# Spec: Agent and MCP Orchestration

## 1. Overview
This specification defines the mandatory orchestration rules for AI agents and MCP tools within the Portal Grupo US project. It ensures a consistent, efficient, and secure development lifecycle.

## 2. Agent Roles & Delegation
- **apex-researcher**: Plan Mode only. Responsible for multi-source research, cross-validation, and atomic task generation.
- **apex-dev**: Act Mode only. Responsible for implementation following the Ultra-Think Protocol (UTP).
- **code-reviewer**: Security, compliance (LGPD), and architecture validation.
- **database-specialist**: Convex schema, queries, and mutations.
- **apex-ui-ux-designer**: Accessibility (WCAG 2.1 AA) and mobile-first design.

## 3. MCP Tool Selection Logic
- **LSP-based (serena)**: Use for exact symbol discovery, reference tracking, and codebase structure analysis.
- **Semantic (mgrep)**: Use for conceptual searches, pattern matching, and finding "how-to" examples.
- **Documentation (context7)**: Mandatory for official library/API documentation.

## 4. Workflow Lifecycle
1. **Plan Mode (`/research`)**: Research -> YAML Contract -> TodoWrite -> Approval.
2. **Act Mode (`/implement`)**: Phase-based execution (1-5) -> Validation Gates.
3. **Verify Mode (`/qa`)**: Local checks -> Arch Check -> Deploy Validation -> Auto-Fix.

## 5. Compliance Gates
- **LGPD**: Mandatory review by `code-reviewer` for any student/user data handling.
- **WCAG 2.1 AA**: Mandatory review by `apex-ui-ux-designer` for frontend changes.

## 6. Acceptance Criteria
- [ ] `.opencode/AGENTS.md` exists and is succinct.
- [ ] Rules for agent delegation are clearly defined.
- [ ] MCP tool selection logic is explicit.
- [ ] Workflow phases are documented.
