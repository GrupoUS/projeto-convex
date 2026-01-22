# Spec: Asaas Import Fixes & Financial Data Enhancement

## Overview
This feature aims to fix issues in the current Asaas student and financial data import process, ensuring efficient deduplication, preserving data integrity (installments), and improving the overall financial data visibility.

## Problem Statement
1. **Inefficient Deduplication**: CPF lookup uses `filter()`, which is slow and doesn't work with encrypted data.
2. **Data Loss**: Installment details (number/total) are ignored during import.
3. **Disconnected Data**: Imported Asaas records are not automatically linked to system `enrollments`.
4. **Ephemeral Financial Data**: Financial summaries are logged but not stored for dashboard use.

## Proposed Solution
1. **Blind Index for CPF**: Add a `cpfHash` field to the `students` table for fast, secure lookup.
2. **Preserve Installment Data**: Update import logic to map all available installment fields.
3. **Smart Linking**: Implement heuristics to link imported payments to existing enrollments.
4. **Persistent Financial Metrics**: Store aggregated financial data in a dedicated table or update `dailyMetrics`.

## Technical Details

### Schema Changes
- `students` table:
    - Add `cpfHash: v.optional(v.string())`
    - Add index `by_cpf_hash` on `['cpfHash']`
- `asaasPayments` table:
    - Ensure `installmentNumber` and `totalInstallments` are correctly populated during import.

### Deduplication Logic
- Normalize CPF (digits only).
- Generate SHA-256 hash of normalized CPF.
- Use `by_cpf_hash` index for lookup.

### Enrollment Linking
- Try to match `externalReference` to `enrollmentId`.
- If not found, try to match by `studentId` and `product` (parsed from description).

## Acceptance Criteria
- [ ] Students are correctly deduplicated using CPF even when data is encrypted.
- [ ] Imported payments include installment information.
- [ ] Imported payments are linked to enrollments when possible.
- [ ] Financial summary data is persistent and accessible for the dashboard.
- [ ] UI provides clear feedback on import progress and errors.
