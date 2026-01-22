# Portal Grupo US - Project Constitution

> **Version**: 1.0.0  
> **Ratification Date**: 2024-12-16  
> **Last Amended**: 2024-12-16

This constitution defines the non-negotiable principles and validation rules for the Portal Grupo US project. All code, configurations, and implementations MUST comply with these rules.

---

## Principle 1: Bun-First Runtime

**Rule**: ALWAYS use `bun` as the package manager and runtime. NEVER use `npm`, `yarn`, or `pnpm`.

**Validation**:
- ✅ `bun install`, `bun run`, `bunx`
- ❌ `npm install`, `npm run`, `npx`
- ❌ `yarn add`, `yarn run`
- ❌ `pnpm install`, `pnpm run`

**Rationale**: Bun provides faster installation, execution, and native TypeScript support. Consistency prevents lock file conflicts.

---

## Principle 2: TypeScript Strict Mode

**Rule**: ALL code MUST use TypeScript with strict mode enabled. The `any` type is FORBIDDEN.

**Validation**:
- ✅ Explicit type annotations for function parameters and returns
- ✅ Proper generic types where needed
- ✅ `unknown` with type guards instead of `any`
- ❌ `any` type usage (enforced by Biome)
- ❌ `@ts-ignore` or `@ts-nocheck` comments

**Rationale**: Type safety prevents runtime errors and improves developer experience with better IDE support.

---

## Principle 3: LGPD Data Protection Compliance

**Rule**: ALL student, lead, and user data MUST comply with Brazilian LGPD (Lei Geral de Proteção de Dados).

**Validation**:
- ✅ CPF, email, phone fields encrypted at rest
- ✅ Audit logging for all data access
- ✅ Consent tracking for data collection
- ✅ Data deletion capability (right to be forgotten)
- ✅ Data export capability (portability)
- ❌ PII in logs or error messages
- ❌ Sensitive data in URLs or query strings

**Affected Tables**: `users`, `leads`, `students`, `enrollments`

**Rationale**: Legal compliance with Brazilian data protection law. Fines up to 2% of revenue for violations.

---

## Principle 4: Biome Code Quality Standards

**Rule**: ALL code MUST pass Biome linting and formatting checks with zero errors.

**Validation**:
- ✅ `bun run lint:check` passes with 0 errors
- ✅ `bun run format:check` passes
- ✅ Tabs for indentation (not spaces)
- ✅ Single quotes for strings
- ✅ Semicolons required
- ❌ Console statements in production code
- ❌ Unused imports or variables

**Commands**:
```bash
bun run lint        # Auto-fix issues
bun run lint:check  # Check only
bun run format      # Format code
```

**Rationale**: Consistent code style improves readability and reduces merge conflicts.

---

## Principle 5: Convex Backend Patterns

**Rule**: ALL Convex functions MUST follow established patterns for security and performance.

**Validation**:
- ✅ Authentication check in mutations accessing user data
- ✅ Indexes defined for all query filters
- ✅ `.withIndex()` used instead of `.filter()` for indexed fields
- ✅ Proper validators (`v.string()`, `v.id()`, etc.)
- ❌ Mutations without auth check for sensitive operations
- ❌ Queries using `.filter()` on large tables without indexes

**Example**:
```typescript
// ✅ Good: Auth check + index usage
export const updateLead = mutation({
  args: { id: v.id("leads"), data: v.object({...}) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.db.patch(args.id, args.data);
  },
});

// ❌ Bad: No auth check
export const updateLead = mutation({
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.data);
  },
});
```

**Rationale**: Security and performance are non-negotiable for production systems.

---

## Principle 6: Test Coverage Requirements

**Rule**: Critical paths MUST have ≥80% test coverage. Security-related code MUST have ≥95% coverage.

**Validation**:
- ✅ Unit tests for all utility functions
- ✅ Integration tests for Convex functions
- ✅ E2E tests for critical user flows
- ✅ Coverage report generated with `bun run test:coverage`
- ❌ Merging code that reduces coverage below thresholds

**Coverage Thresholds**:
| Category | Minimum |
|----------|---------|
| Global | 80% |
| Auth/Security | 95% |
| LGPD Compliance | 95% |
| Payments | 95% |
| UI Components | 75% |

**Rationale**: Tests prevent regressions and ensure code reliability.

---

## Principle 7: Accessibility (WCAG 2.1 AA)

**Rule**: ALL user-facing interfaces MUST comply with WCAG 2.1 Level AA standards.

**Validation**:
- ✅ Color contrast ≥4.5:1 (normal text), ≥3:1 (large text)
- ✅ Touch targets ≥44px
- ✅ Complete keyboard navigation
- ✅ ARIA labels for interactive elements
- ✅ Screen reader compatible
- ✅ Respect `prefers-reduced-motion`
- ❌ Images without alt text
- ❌ Forms without labels
- ❌ Focus traps

**Rationale**: Inclusive design is a legal requirement in Brazil (NBR 17225) and ethical obligation.

---

## Principle 8: Portuguese User Interface

**Rule**: ALL user-facing text MUST be in Brazilian Portuguese.

**Validation**:
- ✅ Labels, buttons, placeholders in Portuguese
- ✅ Error messages in Portuguese
- ✅ Tooltips and descriptions in Portuguese
- ✅ Date/time formats: DD/MM/YYYY, HH:mm
- ✅ Currency format: R$ 1.234,56
- ❌ English text in UI (except technical terms like "Dashboard")

**Rationale**: Target audience is Brazilian professionals in health aesthetics.

---

## Principle 9: Performance Targets

**Rule**: ALL pages and API calls MUST meet performance targets.

**Validation**:
- ✅ Initial page load: <3 seconds
- ✅ Route transitions: <500ms
- ✅ API responses: <200ms (p95)
- ✅ Bundle size: <500KB (initial)
- ✅ Lighthouse score: ≥90

**Rationale**: Performance directly impacts user experience and conversion rates.

---

## Principle 10: Functional Components Only

**Rule**: ALL React components MUST be functional components with hooks. Class components are FORBIDDEN.

**Validation**:
- ✅ `function Component()` or `const Component = () =>`
- ✅ `useState`, `useEffect`, `useMemo`, `useCallback`
- ✅ Custom hooks for shared logic
- ❌ `class Component extends React.Component`
- ❌ Lifecycle methods (`componentDidMount`, etc.)

**Rationale**: Functional components are more readable, testable, and align with modern React practices.

---

## Governance

### Amendment Procedure

1. Propose change via pull request modifying this file
2. Require approval from at least 1 senior developer
3. Update version number according to semantic versioning:
   - **MAJOR**: Principle removal or incompatible change
   - **MINOR**: New principle added
   - **PATCH**: Clarification or typo fix
4. Update `Last Amended` date

### Compliance Review

- All pull requests MUST be validated against this constitution
- CI/CD pipeline enforces automated checks (lint, types, tests)
- Code review validates non-automatable principles
- Violations block merge until resolved

### Validation Commands

```bash
# Type checking
bun run build

# Linting
bun run lint:check

# Tests with coverage
bun run test:coverage

# All validations
bun run lint:check && bun run build && bun run test
```

---

## Quick Reference

| Principle | Check Command | Threshold |
|-----------|---------------|-----------|
| TypeScript | `bun run build` | 0 errors |
| Biome | `bun run lint:check` | 0 errors |
| Tests | `bun run test:coverage` | ≥80% |
| Performance | Lighthouse | ≥90 score |

---

*This constitution is the source of truth for code quality standards in Portal Grupo US.*
