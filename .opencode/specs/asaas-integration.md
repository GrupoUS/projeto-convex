# Asaas Integration Guide

## 📋 Overview

This document describes the complete Asaas payment gateway integration implementation in the Portal Grupo US CRM system.

**Tech Stack:**
- Backend: Convex (Serverless database + API)
- Frontend: React 19 + TanStack Router + shadcn/ui
- Auth: Clerk
- Payment Gateway: Asaas (Brazilian payment processor)

**Key Features:**
- ✅ Real-time webhook processing with HMAC SHA256 signature verification
- ✅ Idempotency protection using SHA-256 hashes
- ✅ LGPD compliance (AES-256-GCM encryption for PII)
- ✅ 90-day webhook retention policy (ANPD requirement)
- ✅ Rate limiting (100 requests/minute per IP)
- ✅ Automatic cleanup of expired deduplication entries
- ✅ Support for PIX, Boleto, Credit Card, Debit Card
- ✅ Subscription lifecycle management
- ✅ Payment status tracking through complete lifecycle

---

## 🏗️ Architecture

### Database Schema

```typescript
// convex/schema.ts

// Primary Tables
asaasPayments: defineTable({
  // Links to student
  studentId: v.id("students"),
  enrollmentId: v.optional(v.id("enrollments")),
  asaasCustomerId: v.string(),
  asaasPaymentId: v.string(),
  organizationId: v.optional(v.string()),

  // Payment Details
  value: v.number(),
  netValue: v.optional(v.number()),
  status: v.string(), // See PaymentStatus enum below
  dueDate: v.number(),
  confirmedDate: v.optional(v.number()),

  // Billing Information
  billingType: v.string(), // Boleto, Pix, Credit Card, etc.
  description: v.optional(v.string()),
  totalInstallments: v.optional(v.number()),
  installmentNumber: v.optional(v.number()),

  // Payment URLs
  boletoUrl: v.optional(v.string()),
  pixQrCode: v.optional(v.string()),

  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_asaas_payment_id", ["asaasPaymentId"])
  .index("by_student", ["studentId"])
  .index("by_status", ["status"]),

asaasSubscriptions: defineTable({
  studentId: v.id("students"),
  asaasCustomerId: v.string(),
  asaasSubscriptionId: v.string(),
  organizationId: v.optional(v.string()),

  // Subscription Details
  value: v.number(),
  cycle: v.string(), // MONTHLY, WEEKLY, etc.
  status: v.string(), // ACTIVE, INACTIVE, CANCELLED, EXPIRED
  nextDueDate: v.number(),
  description: v.optional(v.string()),

  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_asaas_subscription_id", ["asaasSubscriptionId"])
  .index("by_student", ["studentId"])
  .index("by_status", ["status"]),

asaasWebhooks: defineTable({
  event: v.string(),
  paymentId: v.optional(v.string()),
  payload: v.any(), // Encrypted before storage (LGPD)
  processed: v.boolean(),
  retentionUntil: v.number(), // 90 days after createdAt
  error: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_retention_until", ["retentionUntil"]),

asaasWebhookDeduplication: defineTable({
  idempotencyKey: v.string(), // SHA-256 hash
  processedAt: v.number(),
  expiresAt: v.number(), // 24 hours TTL
})
  .index("by_idempotency_key", ["idempotencyKey"])
  .index("by_expires_at", ["expiresAt"]),

// Students Table (existing, extended with Asaas sync fields)
students: defineTable({
  // ... existing fields ...
  asaasCustomerId: v.optional(v.string()), // Asaas customer ID
  asaasCustomerSyncedAt: v.optional(v.number()),
  asaasCustomerSyncError: v.optional(v.string()),
  asaasCustomerSyncAttempts: v.number(),

  // LGPD Fields
  cpf: v.optional(v.string()),
  cpfHash: v.optional(v.string()), // Blind index for search
  encryptedCPF: v.optional(v.string()), // AES-256-GCM encrypted
  // ...
})
```

### File Structure

```
convex/
├── asaas/
│   ├── client.ts              # Asaas API client with circuit breaker
│   ├── types.ts              # TypeScript types and interfaces
│   ├── webhooks.ts           # Webhook processing with idempotency
│   ├── idempotency.ts       # Idempotency utilities
│   ├── mutations.ts           # Payment/subscription mutations
│   ├── actions.ts             # External API operations (import/export)
│   ├── export.ts             # Batch export workers
│   ├── export_workers.ts       # Worker processes for exports
│   ├── import_workers.ts       # Worker processes for imports
│   ├── conflict_resolution.ts  # Conflict resolution for imports
│   └── helpers.ts            # Helper functions
├── lib/
│   ├── auth.ts               # Clerk authentication helpers
│   ├── encryption.ts          # AES-256-GCM encryption (LGPD)
│   └── validation.ts          # Input validation
├── schema.ts                 # Database schema definition
├── http.ts                   # HTTP router (webhook endpoint)
└── crons.ts                 # Scheduled tasks
```

---

## 🔐 Security Features

### HMAC SHA256 Signature Verification

**File:** `convex/http.ts`

Webhooks are secured using HMAC SHA256 signatures from Asaas:

```typescript
async function verifyAsaasSignature(
  payload: string,
  signature: string | null,
  secret: string | undefined,
): Promise<boolean> {
  if (!signature || !secret) return false;

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);

    // Import secret key for HMAC
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    // Generate HMAC signature
    const payloadBuffer = encoder.encode(payload);
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      payloadBuffer,
    );

    // Convert to hex
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Timing-safe comparison to prevent timing attacks
    return timingSafeEqual(signature, expectedSignature);
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
```

### Rate Limiting

**Implementation:** `WebhookRateLimiter` class in `convex/http.ts`

- **Limit:** 100 requests per minute per IP
- **Cleanup:** Every 5 minutes
- **Response:** HTTP 429 with `Retry-After: 60` header

### Idempotency

**Implementation:** `convex/asaas/idempotency.ts`

Using SHA-256 hashes with 24-hour TTL:

```typescript
async function generateIdempotencyKey(
  event: string,
  paymentId: string | undefined,
): Promise<string> {
  const data = `${event}:${paymentId || "no-payment"}:${Math.floor(Date.now() / 600000)}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
```

### LGPD Encryption

**File:** `convex/lib/encryption.ts`

All webhook payloads and PII are encrypted using AES-256-GCM:

- **CPF:** Hashed (blind index) + encrypted separately
- **Email:** Encrypted in webhook logs
- **Phone:** Encrypted when stored
- **Retention:** 90 days (ANPD requirement)

---

## 📡 Webhook Processing Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Asaas Payment Gateway                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ POST /asaas/webhook
                      │ Headers: asaas_signature, asaas-access-token
                      │ Body: { event, payment, subscription }
                      ▼
            ┌───────────────────────────┐
            │  Convex HTTP Handler    │
            └───────────┬───────────────┘
                        │
            ┌───────────┴────────────┐
            │ 1. Rate Limiter Check  │
            └───────────┬────────────┘
                        │
            ┌───────────┴────────────┐
            │ 2. Signature Verify     │
            │ (HMAC SHA256 or Token) │
            └───────────┬────────────┘
                        │
            ┌───────────┴────────────┐
            │ 3. Parse & Validate   │
            └───────────┬────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 4. Idempotency Check  │
            │ (SHA-256 Hash Lookup)  │
            └───────────┬───────────────┘
                        │
                ┌─────────┴──────────┐
                │ 5. Store Event      │
                │ (status: pending)   │
                └─────────┬──────────┘
                          │
                          │ HTTP 200 (immediate response)
                          ▼
              ┌─────────────────────────┐
              │ 6. Async Processing  │
              │ (ctx.scheduler.runAfter) │
              └───────────┬─────────────┘
                          │
          ┌─────────────────┴──────────┐
          │ 7. Update Status →   │
          │    processing          │
          └───────────┬─────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 8. Process Event     │
            │ (Payment/Subscription) │
            └───────────┬─────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 9. Update Records    │
            │ (asaasPayments, etc.) │
            └───────────┬─────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 10. Update Status → │
            │     done or failed     │
            └───────────┬─────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 11. Encrypt Payload    │
            │ (LGPD Compliance)    │
            └───────────┬─────────────┘
                        │
            ┌───────────┴─────────────┐
            │ 12. Mark Complete     │
            │ (status: processed)    │
            └─────────────────────────┘
```

---

## 💳 Payment Types Supported

### Billing Types
- **BOLETO** - Brazilian bank slip (boleto)
- **PIX** - Instant payment via QR code
- **CREDIT_CARD** - Credit card (30-day confirmation)
- **DEBIT_CARD** - Debit card
- **UNDEFINED** - Fallback for unknown types

### Payment Status Lifecycle

```
PENDING
  ├─→ CONFIRMED (Boleto/Credit Card: payment approved)
  ├─→ RECEIVED (Pix: funds available)
  ├─→ OVERDUE (past due date)
  └─→ REFUNDED
```

### Payment Flows

**PIX:**
```
PAYMENT_CREATED → PAYMENT_RECEIVED
```

**Boleto:**
```
PAYMENT_CREATED → PAYMENT_CONFIRMED → PAYMENT_RECEIVED
```

**Credit Card:**
```
PAYMENT_CREATED → PAYMENT_CONFIRMED (30 days) → PAYMENT_RECEIVED
```

### Subscription Status
- **ACTIVE** - Subscription is active and billing
- **INACTIVE** - Subscription temporarily paused
- **CANCELLED** - Subscription cancelled
- **EXPIRED** - Subscription ended (non-renewal)

### Subscription Cycles
- **MONTHLY** - Monthly billing
- **WEEKLY** - Weekly billing
- **BIWEEKLY** - Every 2 weeks
- **QUARTERLY** - Every 3 months
- **SEMIANNUALLY** - Every 6 months
- **YEARLY** - Yearly billing

---

## 🔧 Configuration

### Environment Variables

```bash
# Convex Environment Variables (set in Convex Dashboard)
ASAAS_API_KEY=your_asaas_api_key
ASAAS_WEBHOOK_SECRET=your_webhook_secret_for_signature
ASAAS_WEBHOOK_TOKEN=your_webhook_token_for_fallback
ASAAS_ENVIRONMENT=sandbox # or production

# Optional: Custom Asaas API Base URL
ASAAS_BASE_URL=https://sandbox.asaas.com/api
```

### Webhook Configuration in Asaas Dashboard

1. Navigate to: **User Menu > Integrations > Webhooks**
2. Create new webhook with:
   - **URL:** `https://<deployment>.convex.site/asaas/webhook`
   - **Authentication:** Set token matching `ASAAS_WEBHOOK_TOKEN`
   - **Events:** Select all payment and subscription events
   - **Send Type:** SEQUENTIALLY (recommended for order)

---

## 📊 Monitoring & Maintenance

### Automatic Cleanup Jobs

```typescript
// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Clean expired idempotency entries (every 6 hours)
crons.interval("cleanup_expired_idempotency", { hours: 6 }, internal.asaas.idempotency.cleanupExpiredIdempotency, {});

// Clean expired webhooks (90-day retention, daily)
crons.interval("cleanup_expired_webhooks", { days: 1 }, internal.asaas.webhooks.cleanupExpiredWebhooks, {});

export default crons;
```

### Monitoring Queries

```typescript
// Get webhook processing statistics
const webhookStats = await ctx.runQuery(
  internal.asaas.queries.health.getWebhookStats,
  {}
);

// Returns:
{
  totalEvents: number,
  processedEvents: number,
  failedEvents: number,
  successRate: number,
  pendingEvents: number,
  averageProcessingTime: number,
}
```

---

## 🚨 Error Handling

### Payment Validation Rules

```typescript
const PAYMENT_VALIDATION = {
  MIN_AMOUNT: 0.01,    // R$ 0,01 (1 cent)
  MAX_AMOUNT: 1000000, // R$ 1.000.000 (1 million)
  MAX_INSTALLMENTS: 120,  // Maximum 10 years
};
```

### Common Error Scenarios

| Error | Cause | Handling |
|-------|--------|----------|
| Invalid signature | Wrong secret or tampered payload | Return HTTP 401 |
| Missing fields | Malformed webhook | Return HTTP 400 |
| Payment not found | Asaas ID exists but not in our DB | Log warning, skip |
| Duplicate event | Already processed (idempotency) | Skip processing, return HTTP 200 |
| Rate limit exceeded | >100 req/min/IP | Return HTTP 429 |
| Encryption failure | Crypto error | Log error, continue processing |

---

## 🎯 Usage Examples

### Creating a Payment (Frontend)

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function CreatePaymentForm() {
  const createPayment = useMutation(
    api.asaas.mutations.createPaymentFromEnrollment
  );

  const handleSubmit = async (data) => {
    try {
      await createPayment({
        studentId: "student_123",
        asaasCustomerId: "cus_456",
        asaasPaymentId: "pay_789",
        amount: 199.90,
        dueDate: "2025-01-15",
        billingType: "BOLETO",
        description: "Mensalidade Trintae3",
      });
      console.log("Payment created successfully");
    } catch (error) {
      console.error("Payment creation failed:", error);
    }
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

### Processing Webhook Events (Backend)

```typescript
// Event is automatically processed by:
// convex/asaas/webhooks.ts → processWebhookIdempotent

// The handler:
// 1. Verifies signature
// 2. Checks idempotency
// 3. Processes event asynchronously
// 4. Updates payment/subscription records
// 5. Sends notifications
```

### Querying Payment History

```typescript
import { useQuery } from "convex/react";

function PaymentHistory() {
  const payments = useQuery(
    api.asaas.queries.getPaymentsByStudent,
    { studentId: "student_123" }
  );

  return (
    <div>
      <h2>Payment History</h2>
      {payments?.map(payment => (
        <PaymentCard
          status={payment.status}
          amount={payment.value}
          dueDate={payment.dueDate}
          billingType={payment.billingType}
        />
      ))}
    </div>
  );
}
```

---

## 🔍 Troubleshooting

### Webhook Not Receiving Events

1. **Check Convex Dashboard:**
   - Verify deployment URL is correct
   - Check environment variables are set

2. **Check Asaas Dashboard:**
   - Verify webhook is active
   - Check URL matches deployment
   - Verify authentication token matches

3. **Test Webhook Endpoint:**
   ```bash
   curl -X POST https://<deployment>.convex.site/asaas/webhook \
     -H "asaas-signature: <signature>" \
     -H "Content-Type: application/json" \
     -d '{"event":"PAYMENT_CREATED","payment":{"id":"test"}}'
   ```

### Payment Status Not Updating

1. **Check Webhook Logs:**
   ```typescript
   const webhook = await ctx.runQuery(
     internal.asaas.queries.getWebhookByEventId,
     { eventId: "evt_test" }
   );
   // Check processed status and error messages
   ```

2. **Verify Payment Record:**
   ```typescript
   const payment = await ctx.runQuery(
     internal.asaas.queries.getPaymentByAsaasId,
     { asaasPaymentId: "pay_123" }
   );
   // Check status field
   ```

3. **Manually Trigger Retry:**
   ```typescript
   await ctx.runMutation(
     internal.asaas.retry.processFailedEvent,
     { eventId: "evt_test" }
   );
   ```

### Idempotency Issues

**Problem:** Duplicate events being processed

**Solution:** The idempotency key includes a 10-minute time window, allowing retry within that window.

```typescript
// Current implementation:
// 10-minute window for Asaas retries
const data = `${event}:${paymentId || "no-payment"}:${Math.floor(Date.now() / 600000)}`;

// If you need stricter idempotency (e.g., payment-level):
// Use stable key without time:
const stableKey = `payment:${paymentId}`;
```

---

## 📚 Additional Resources

### Asaas Documentation
- [Asaas API Documentation](https://sandbox.asaas.com/api/v3/docs)
- [Webhook Guide](https://docs.asaas.com/pt/webhooks)

### Internal Documentation
- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Integration](https://clerk.com/docs)

### Related Files
- `convex/asaas/client.ts` - Asaas API client with circuit breaker
- `convex/lib/auth.ts` - Authentication helpers
- `convex/lib/encryption.ts` - LGPD encryption utilities

---

## ✅ Implementation Checklist

- [x] Database schema with all required tables
- [x] Webhook endpoint with HMAC signature verification
- [x] Idempotency protection using SHA-256 hashes
- [x] LGPD encryption for webhook payloads and PII
- [x] Rate limiting per IP
- [x] 90-day webhook retention policy
- [x] Automatic cleanup of expired entries
- [x] Payment status mutations
- [x] Subscription management
- [x] Student sync with Asaas customer ID
- [x] Payment validation (amount, installments)
- [x] Circuit breaker for Asaas API calls
- [x] Environment variable configuration

---

## 🎓 Changelog

### v1.0.0 (2025-01-05)
- Initial implementation with complete webhook processing
- HMAC SHA256 signature verification
- LGPD compliance with AES-256-GCM encryption
- Support for PIX, Boleto, Credit Card, Debit Card
- Subscription lifecycle management
- 90-day webhook retention policy
- Rate limiting (100 req/min)
- Automatic cleanup jobs
