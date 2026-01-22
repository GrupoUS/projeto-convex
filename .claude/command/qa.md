---
description: Pipeline QA integrado com auto-research e auto-fix
---

# /qa - Quality Assurance Pipeline

Pipeline integrado: **Verificação → Auto-Research → Auto-Fix**

## Fluxo Integrado

```mermaid
flowchart TD
    A[/qa] --> B[Phase 1: Local Checks]
    B --> C{Erros?}
    C -->|Não| D[Phase 2: Deploy]
    D --> E{Erros?}
    E -->|Não| F[✅ QA PASS]

    C -->|Sim| G[Aggregation Protocol]
    E -->|Sim| G

    G --> H["/research (Docs & Best Practices)"]
    H --> I[Atomic Implementation Plan]
    I --> J[Approval Gate]
    J --> K[/implement]
    K --> L[Re-run /qa]

    subgraph "Research & Planning"
    H
    I
    end

    subgraph "Implementation"
    K
    end
```
## Behavior

### Generate Tests

When asked to test a file or feature:

1. **Analyze the code**
   - Identify functions and methods
   - Find edge cases
   - Detect dependencies to mock

2. **Generate test cases**
   - Happy path tests
   - Error cases
   - Edge cases
   - Integration tests (if needed)

3. **Write tests**
   - Use project's test framework (Jest, Vitest, etc.)
   - Follow existing test patterns
   - Mock external dependencies

---

## Output Format

### For Test Generation

```markdown
## 🧪 Tests: [Target]

### Test Plan
| Test Case | Type | Coverage |
|-----------|------|----------|
| Should create user | Unit | Happy path |
| Should reject invalid email | Unit | Validation |
| Should handle db error | Unit | Error case |

### Generated Tests

`tests/[file].test.ts`

[Code block with tests]

---

Run with: `npm test`
```

### For Test Execution

```
🧪 Running tests...

✅ auth.test.ts (5 passed)
✅ user.test.ts (8 passed)
❌ order.test.ts (2 passed, 1 failed)

Failed:
  ✗ should calculate total with discount
    Expected: 90
    Received: 100

Total: 15 tests (14 passed, 1 failed)
```

---

## Examples

```
/test src/services/auth.service.ts
/test user registration flow
/test coverage
/test fix failed tests
```

---

## Test Patterns

### Unit Test Structure

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('should return token for valid credentials', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'pass123' };

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result.token).toBeDefined();
    });

    it('should throw for invalid password', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'wrong' };

      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials');
    });
  });
});
```

---

## Key Principles

- **Test behavior not implementation**
- **One assertion per test** (when practical)
- **Descriptive test names**
- **Arrange-Act-Assert pattern**
- **Mock external dependencies**

# Code Quality Review

Perform comprehensive code quality review: $ARGUMENTS

## Task

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not just symptoms.

Follow these steps to conduct a thorough code review:

1. **Code Quality Assessment**
   - Scan for code smells, anti-patterns, and potential bugs
   - Check for consistent coding style and naming conventions
   - Identify unused imports, variables, or dead code
   - Review error handling and logging practices

2. **Security Review**
   - Look for common security vulnerabilities (SQL injection, XSS, etc.)
   - Check for hardcoded secrets, API keys, or passwords
   - Review authentication and authorization logic
   - Examine input validation and sanitization

3. **Performance Analysis**
   - Identify potential performance bottlenecks
   - Check for inefficient algorithms or database queries
   - Review memory usage patterns and potential leaks
   - Analyze bundle size and optimization opportunities

4. **Architecture & Design**
   - Evaluate code organization and separation of concerns
   - Check for proper abstraction and modularity
   - Review dependency management and coupling
   - Assess scalability and maintainability

5. **Testing Coverage**
   - Check existing test coverage and quality
   - Identify areas lacking proper testing
   - Review test structure and organization
   - Suggest additional test scenarios

6. **Documentation Review**
   - Evaluate code comments and inline documentation
   - Check API documentation completeness
   - Review README and setup instructions
   - Identify areas needing better documentation

7. **Recommendations**
   - Prioritize issues by severity (critical, high, medium, low)
   - Provide specific, actionable recommendations
   - Suggest tools and practices for improvement
   - Create a summary report with next steps

Remember to be constructive and provide specific examples with file paths and line numbers where applicable.

## Phase 1: Local Quality Checks

> **⚠️ CRITICAL GATE**: Não prosseguir se qualquer check falhar

```bash
# Code quality & linting
bun run lint:check

# Type safety & build verification
bun run build

# Test coverage
bun run test:coverage
```

## Phase 2: Deployment Validation

> **✅ PREREQUISITE**: Phase 1 deve passar completamente

### 2.1 Deploy Status Check

```bash
# Railway deployment status
railway status

# Convex backend deployment
bunx convex deploy --prod
```

### 2.2 Deploy Logs Verification

> **🔍 CRITICAL**: Inspecionar logs para identificar erros de runtime/deploy

```bash
# Railway: Verificar logs recentes de deploy (últimas 100 linhas)
railway logs --latest -n 100

# Convex: Verificar logs de produção
bunx convex logs --prod --success --failure
```

### 2.3 Deploy Error Analysis

Se erros forem encontrados nos logs:

1. **Railway Errors** - Identificar:
   - Build failures (dependências, TypeScript, bundling)
   - Runtime errors (crashes, memory, timeouts)
   - Environment variable issues
   - Network/connection problems

2. **Convex Errors** - Identificar:
   - Function execution errors
   - Schema validation failures
   - Authentication/authorization issues
   - Query/mutation timeouts

3. **Ação**: Agregar todos os erros e prosseguir para Phase 3

## Phase 3: Error Aggregation & Auto-Research

Se erros forem detectados em qualquer fase:

1. **Protocolo de Agregação**: Coletar contexto completo:
   - Stack trace completo.
   - Versões de bibliotecas envolvidas.
   - Código fonte dos arquivos afetados.
   - Logs de erro do terminal e dashboard (Railway/Convex).
2. **Invoca automaticamente** o workflow de pesquisa:
   > `/research "QA Fix: [resumo]. Context: [logs/traces]. GOAL: Research docs/best practices and plan atomic fixes."`
3. **Gerar Atomic Tasks**: O plano DEVE quebrar cada fix em:
   - `[ ] Research API/pattern (if unknown)`
   - `[ ] Apply fix to [file]`
   - `[ ] Verify fix (unit/build/lint)`

3. **Aguarda Aprovação**: O usuário deve aprovar o `implementation_plan.md` e `task.md` gerados.

### Research Strategy (Docs & Best Practices)

O workflow `/research` garantirá:
- **Consulta a Docs Oficiais**: Uso obrigatório do `context7` e `librarian` para buscar a fonte da verdade (Convex, Clerk, TanStack, etc.).
- **Atomic Tasks**: Decomposição do fix em subtasks atômicas verificáveis no `task.md` (ex: "Research Error X", "Fix Component Y", "Verify Z").
- **Best Practices**: Garantia de que o fix segue os padrões recomendados, não apenas "workarounds".

### Skill Integration Strategy

DEVE incorporar as seguintes skills no plano de correção:

**A. Para Erros de Backend / Banco de Dados (Convex):**
> **USE SKILL**: `ai-data-analyst`
> - **Objetivo**: Analisar consistência de dados, schemas e logs de query.
> - **Ação**: Criar scripts Python para validar estado do banco vs. expectations.
> - **Comando Exemplo**: "Use ai-data-analyst para verificar se todos os usuários possuem 'stripeId' válido na tabela 'users' do Convex."

**B. Para Erros de Frontend / UI (React/TanStack):**
> **USE SKILL**: `webapp-testing`
> - **Objetivo**: Reproduzir bugs visuais, testar fluxos de interação e validar fixes.
> - **Ação**: Criar scripts Playwright (usando `scripts/with_server.py`) para reprodução controlada.
> - **Comando Exemplo**: "Use webapp-testing para criar um teste que simula o clique no botão 'Checkout' e captura o erro de console."

## Phase 4: Auto-Implementation

Após o plano de correção e tarefas serem aprovados:

1. **Invoca `/implement`** para executar o plano:
   - Consome `implementation_plan.md` e `task.md`.
   - Executa atomic tasks e subtasks geradas pelo `/research`.

2. **Re-executa `/qa`** para validação final (Loop de Feedback):
   - Se passar: ✅ Sucesso.
   - Se falhar: 🔄 Retorna para Phase 3 com novos erros.

## Success Metrics

| Gate | Command | Expected Result |
|------|---------|----------------|
| Lint | `bun run lint:check` | 0 errors |
| Build | `bun run build` | Clean build |
| Tests | `bun run test:coverage` | All tests pass |
| Deploy | `railway status` | Healthy |
| Backend | `bunx convex deploy --prod` | Success |
| Railway Logs | `railway logs --latest -n 100` | No errors in logs |
| Convex Logs | `bunx convex logs --prod --failure` | No failures |

## Quick Reference

| Task | Command |
|------|---------|
| Run QA pipeline | `/qa` |
| Fix errors automatically | `/qa --auto-fix` |
| Debug specific phase | `/qa --phase=lint` |

## Technical Notes

- **Auto-research**: Acionado automaticamente quando erros são detectados
- **Auto-implementation**: Executado após plano aprovado
- **Re-run automático**: `/qa` re-executa após `/implement` completar
- **Preserve tasks**: Novas tasks de fix são adicionadas ao TodoWrite existente

---

**Pipeline completo: `/qa` → detecta erros → `/research` → `/implement` → `/qa` (re-run)**