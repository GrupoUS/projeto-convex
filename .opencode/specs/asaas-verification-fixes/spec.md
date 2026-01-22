# Spec: Asaas Integration Verification Fixes

## Context
Implementation of verification comments for Asaas integration to improve sync reliability and auditability.

## Requirements

### 1. Fix Sync Logic (Mutations)
- **File:** `convex/asaas/mutations.ts`
- **Function:** `syncStudentAsCustomerInternal`
- **Change:** When an existing customer is found (`existing.exists` is true):
    - Remove the call to `reportSyncFailure`.
    - Treat it as a success case.
    - Proceed to call `updateStudentAsaasId`.

### 2. Clear Sync Errors (Mutations)
- **File:** `convex/asaas/mutations.ts`
- **Function:** `updateStudentAsaasId` (or call site)
- **Change:** When updating the student with `asaasCustomerId`:
    - Set `asaasCustomerSyncError` to `undefined` (or null/cleared).
    - Set `asaasCustomerSyncAttempts` to `0`.
    - Ensure `asaasCustomerSyncedAt` is updated (already present).

### 3. Audit Logging (Actions)
- **File:** `convex/asaas/actions.ts`
- **Functions:** `createAsaasPayment`, `createAsaasSubscription`
- **Change:** Wrap execution with timing and call `internal.asaas.audit.logApiUsage`.
- **Pattern:**
    ```typescript
    const startTime = Date.now();
    try {
        // ... operation ...
        await ctx.runMutation(internal.asaas.audit.logApiUsage, {
            endpoint: '/payments', // or /subscriptions
            method: 'POST',
            statusCode: 200,
            responseTime: Date.now() - startTime,
            userId: (await ctx.auth.getUserIdentity())?.subject,
        });
        return result;
    } catch (error: any) {
        await ctx.runMutation(internal.asaas.audit.logApiUsage, {
            endpoint: '/payments', // or /subscriptions
            method: 'POST',
            statusCode: error.response?.status || 500,
            responseTime: Date.now() - startTime,
            userId: (await ctx.auth.getUserIdentity())?.subject,
            errorMessage: error.message,
        });
        throw error;
    }
    ```

## Acceptance Criteria
- Syncing an existing customer does not generate a failure notification.
- Successful sync clears any previous error flags on the student record.
- `createAsaasPayment` and `createAsaasSubscription` calls are logged in `asaasApiAudit` table.
