---
trigger: always_on
---

# Code Principles & Optimization

## Core Philosophy (LEVER)
**L**everage patterns | **E**xtend first | **V**erify reactivity | **E**liminate duplication | **R**educe complexity.
> "The best code is no code. The second best structure is the one that already exists."

## 🧠 Extended Thinking (Decision Logic)
Before coding, follow this decision tree:
1. **Can existing code handle it?** (Yes: Extend)
2. **Can we modify existing patterns?** (Yes: Adapt)
3. **Is new code reusable?** (Yes: Abstract) -> Else Reconsider.

**Scoring (Extend vs Create)**:
- Reuse Data Structure/Indexes/Queries: +3 points each. | Reuse >70% code: +5 points.
- Circular Dependencies: -5 points. | Distinct Domain: -3 points.
- **Score > 5**: Extend Existing Code.

## 🛠️ Implementation Process (The Three-Pass)
1. **Discovery**: Find related code, document patterns. **No coding**.
2. **Design**: Write interfaces, updates types, plan data flow. **Minimal code**.
3. **Implementation**: Execute with max reuse. Add only essential new logic.

## 🏗️ Architecture Principles

### 1. Database & Schema
**Goal**: 0 New Tables. Extend existing unless domain is completely new.
```typescript
// ❌ DON'T: Create separate tracking table
// campaignTracking: defineTable({ ... })

// ✅ DO: Add optional fields to existing table
users: defineTable({
  // ... existing fields ...
  campaignSource: v.optional(v.string()), // minimal addition
})
```

### 2. Queries & Logic
**Goal**: No duplicate logic. Single source of truth.
```typescript
// ❌ DON'T: Create parallel queries (getTrialUsers vs getUsers)

// ✅ DO: Extend existing query with computed props
export const getUserStatus = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    return {
      ...user,
      // Compute derived state on server
      isTrial: Boolean(user?.campaign),
      daysRemaining: calculateDays(user)
    }
  }
})
```

### 3. Security & Structure
- **Internal/Public Split**: Use `query`/`mutation` for functionality exposed to clients. Use `internalQuery`/`internalMutation` for backend-only logic or sensitive operations (privileged access).

### 4. State & Performance
- **Reactivity**: Use `useQuery` (Convex auto-updates) over `useState/useEffect` manual sync.
- **Batches**: Always use `Promise.all` for DB writes, never sequential loops.
- **Indexes**: Reuse existing indexes with `.filter()` rather than creating specific composite indexes for every UI variation.
- **Query Efficiency**: Single query returning aggregated data is better than 3 separate requests.

## 🚫 Anti-Patterns
1. **UI-Driven DB**: Don't design DB to match UI components. Store data logically; let queries/components transform it.
2. **"Just One More Table"**: Adds join complexity and sync issues. Avoid.
3. **"Similar but different"**: Do not create parallel "Trial" versions of APIs. Add arguments/flags to the main one.

## 📝 Documentation & Metrics
- **Comment WHY**: Document *why* you are extending (e.g., "Added field X to avoid new table Y").
- **Targets**:
    - Code Reduction: >50% vs fresh build.
    - New Tables: 0.
    - New Files: < 3 per feature.

## 🔧 TypeScript & Linting

### 1. "Type instantiation is excessively deep"
This error occurs when TS inference hits recursion limits on deeply nested `api` objects.
**Solution**: Break the inference chain with explicit `any` casting.

```typescript
// ❌ Anti-Pattern: Persistent Compilation Errors
const mutate = useMutation(api.leads.updateStatus);

// ❌ Weak Pattern: Late Cast (Still recurses)
const mutate = useMutation(api.leads.updateStatus as any);

// ✅ Pattern: Early Cast (Breaks recursion immediately)
const mutate = useMutation((api as any).leads.updateStatus);
// OR for internal:
await ctx.runMutation((internal as any).module.func);
```

### 2. Biome Rules
- **Respect Biome**: Do not disable rules globally. Use specific line ignores (`// biome-ignore ...`).
- **Unused Variables**: Prefix with `_` (e.g., `_err`) instead of disabling the rule.

## ✅ Review Checklist
- [ ] Extended existing tables/queries instead of creating new?
- [ ] Followed Three-Pass approach?
- [ ] No manual state sync (useEffect)?
- [ ] Added fields are optional?
- [ ] New code < 50% of what a fresh implementation would be?

Fullstack development checklist:
- Database schema aligned with API contracts
- Type-safe API implementation with shared types
- Frontend components matching backend capabilities
- Authentication flow spanning all layers
- Consistent error handling throughout stack
- End-to-end testing covering user journeys
- Performance optimization at each layer
- Deployment pipeline for entire feature

Data flow architecture:
- Database design with proper relationships
- API endpoints following RESTful/GraphQL patterns
- Frontend state management synchronized with backend
- Optimistic updates with proper rollback
- Caching strategy across all layers
- Real-time synchronization when needed
- Consistent validation rules throughout
- Type safety from database to UI

Cross-stack authentication:
- Session management with secure cookies
- JWT implementation with refresh tokens
- SSO integration across applications
- Role-based access control (RBAC)
- Frontend route protection
- API endpoint security
- Database row-level security
- Authentication state synchronization

Real-time implementation:
- WebSocket server configuration
- Frontend WebSocket client setup
- Event-driven architecture design
- Message queue integration
- Presence system implementation
- Conflict resolution strategies
- Reconnection handling
- Scalable pub/sub patterns

Testing strategy:
- Unit tests for business logic (backend & frontend)
- Integration tests for API endpoints
- Component tests for UI elements
- End-to-end tests for complete features
- Performance tests across stack
- Load testing for scalability
- Security testing throughout
- Cross-browser compatibility

Architecture decisions:
- Monorepo vs polyrepo evaluation
- Shared code organization
- API gateway implementation
- BFF pattern when beneficial
- Microservices vs monolith
- State management selection
- Caching layer placement
- Build tool optimization

Performance optimization:
- Database query optimization
- API response time improvement
- Frontend bundle size reduction
- Image and asset optimization
- Lazy loading implementation
- Server-side rendering decisions
- CDN strategy planning
- Cache invalidation patterns

Deployment pipeline:
- Infrastructure as code setup
- CI/CD pipeline configuration
- Environment management strategy
- Database migration automation
- Feature flag implementation
- Blue-green deployment setup
- Rollback procedures
- Monitoring integration

Always prioritize end-to-end thinking, maintain consistency across the stack, and deliver complete, production-ready features.

# Ultracite Code Standards
This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.
## Quick Reference
- **Format code**: `bun run format`
- **Check for issues**: `bun run check`
- **Diagnose setup**: `bun run doctor`
biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

## Core Principles
Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.
### Type Safety & Explicitness
- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names
### Modern JavaScript/TypeScript
- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`
### Async & Promises
- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors
### React & JSX
- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles
### Error Handling & Debugging
- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases
### Code Organization
- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns
### Security
- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input
### Performance
- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags
### Framework-Specific Guidance
**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components
**React 19+:**
- Use ref as a prop instead of `React.forwardRef`
**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

## Testing
- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting
## When biome Can't Help
biome's linter will catch most issues automatically. Focus your attention on:
1. **Business logic correctness** - biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code
---
Most formatting and common issues are automatically fixed by biome. Run `npm ultracite fix` before committing to ensure compliance.