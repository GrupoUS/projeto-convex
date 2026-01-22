# Spec: Fix QA Errors (Batch 001)

**Feature ID**: `fix-qa-errors-001`
**Complexity**: L2 (Low)
**Objective**: Clean up code quality issues identified in QA: type safety, console logs, and TODOs.

## 1. Type Safety Fixes

### 1.1 `src/components/students/create-payment-dialog.tsx`
- **Issue**: `as any` is used to bypass type checking for `createPayment` mutation args.
- **Fix**: 
  - Remove `as any`.
  - Verify `api.asaas.actions.createPayment` arguments.
  - Ensure the object passed matches the schema (likely `studentId` vs `id` or missing optional fields).
  - If necessary, import the defined type from `convex/_generated/dataModel` or `convex/asaas/actions`.

### 1.2 `src/hooks/useUserSync.ts`
- **Issue**: Arguments passed to `useQuery` do not match the expected signature.
- **Fix**:
  - The `useQuery` hook usually takes `(queryReference, args)`.
  - If `skip` logic is intended, `convex/react` uses `"skip"` as the second argument (or within the args object depending on version/helper).
  - Check if it's `useQuery(api.users.syncUser, { ... })` or if logic requires `skip`.
  - Ensure `clerkUser` and other dependencies are correctly handled to prevent calling the query when data is missing.

## 2. Console Log Cleanup

### 2.1 `src/routes/_authenticated/financial.tsx`
- **Action**: Remove all `console.log` statements.
- **Note**: Keep `console.error` if used for genuine error handling.

### 2.2 `src/routes/_authenticated/chat.tsx`
- **Action**: Remove `console.log`.
- **Constraint**: Keep the existing TODO comment regarding future chat features.

### 2.3 `src/lib/xlsx-helper.ts`
- **Action**: Remove `console.log` used for debugging export logic.

### 2.4 `src/routes/_authenticated/marketing/$campaignId.tsx`
- **Action**: Remove `console.log`.
- **Constraint**: A TODO exists for "Edit route". Do not implement the feature. Just ensure the `toast` message or UI related to it is clean (no debug info).

## 3. Verification Strategy

- **VT-001**: `bun run lint:check` must pass with 0 errors.
- **VT-002**: `bun run build` must pass (confirming type fixes).
- **VT-003**: Manual check of "Financial" and "Students" pages to ensure no regression.
