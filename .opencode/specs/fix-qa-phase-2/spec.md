# Fix QA Phase 2 Errors Spec

## Context
- **Stack**: Bun + Convex + React 19 + shadcn/ui
- **Issue**: Phase 2 QA failed with blocking issues.

## Issues & Solutions

### 1. Convex TS Error: `convex/lib/securityMiddleware.ts`
- **Error**: `TS2322: Type 'number' is not assignable to type 'string'`.
- **Location**: `convex/lib/securityMiddleware.ts`.
- **Analysis**: Likely a mismatch in return types or variable assignments, possibly in `checkRateLimit` (returning number for `remaining`) or `securityHealthCheck`.
- **Fix**: Identify the specific line using `bun run typecheck` (if available) or visual inspection. Ensure type safety by explicit casting or correcting the logic.

### 2. Broken Test: `src/components/__tests__/theme-provider.test.tsx`
- **Error**: Invalid JSX (closing `<ThemeProvider>` with `</Typography>`) and undeclared variables.
- **Analysis**: The file content might have been corrupted or has a bad copy-paste error involving `Typography`.
- **Fix**: Rewrite the test file to use correct JSX structure matching `ThemeProvider` usage. Ensure all variables are declared.

### 3. React Anti-Pattern: `src/components/kokonutui/gemini.tsx`
- **Error**: Static ID `lobe-icons-gemini-fill` causing hydration/duplicate ID issues.
- **Analysis**: Current file read shows `useId` usage, but verification is needed to ensure no static IDs remain or if the user referred to a different version.
- **Fix**: Verify `useId` is correctly implemented for all ID-dependent attributes (`id`, `fill`, `filter`, etc.). Remove any static ID strings.

### 4. Formatting
- **Error**: Biome errors in multiple files.
- **Fix**: Run `bun run format` (or `bunx biome format --write .`).

## Verification Plan
1. **Type Check**: `bun run build` (includes type checking).
2. **Test Run**: `bun test src/components/__tests__/theme-provider.test.tsx`.
3. **Lint/Format**: `bun run lint:check` and `bun run format`.
