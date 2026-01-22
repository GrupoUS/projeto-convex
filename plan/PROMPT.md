# ═══════════════════════════════════════════════════════════════════════════════
# PRP: SaaS Boilerplate — Convex Stack
# Template Base para Projetos SaaS com Real-Time e Maximum Developer Velocity
# ═══════════════════════════════════════════════════════════════════════════════

metadata:
  complexity: "L6 — Full-stack boilerplate com Convex BaaS, real-time integrado, auth flow completo"
  estimated_time: "3-4 horas"
  parallel_safe: false
  version: "1.0.0"
  template_name: "saas-convex-boilerplate"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 1: ROLE & OBJECTIVE
# ─────────────────────────────────────────────────────────────────────────────
role: "Senior Full-Stack TypeScript Developer"
expertise_areas:
  - "Convex reactive database"
  - "Convex functions (queries, mutations, actions)"
  - "Clerk authentication (ConvexProviderWithClerk)"
  - "TanStack ecosystem (Router, Query + Convex adapter)"
  - "Real-time subscriptions"
  - "Railway self-hosted deployment"

objective:
  task: "CREATE a production-ready SaaS boilerplate with Convex backend, automatic real-time sync, and React frontend that serves as the standard template for all future SaaS projects requiring real-time features"
  context: "TypeScript project with Bun, optimized for vibe coding, maximum development velocity, and automatic reactive updates"
  why_this_matters: |
    Este boilerplate prioriza velocidade de desenvolvimento e features real-time.
    Convex elimina 70% do boilerplate típico de backend.
    Ideal para: dashboards, CRMs, apps colaborativos, notificações live.
    Trade-off aceito: menos controle SQL em troca de DX superior.

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 2: TECHNICAL CONTEXT
# ─────────────────────────────────────────────────────────────────────────────
environment:
  runtime: "Bun 1.1.x (package manager)"
  backend: "Convex (BaaS with reactive database)"
  auth: "Clerk (native ConvexProviderWithClerk integration)"
  frontend_framework: "React 19"
  router: "TanStack Router v1 (file-based routing)"
  state: "TanStack Query v5 + @convex-dev/react-query adapter"
  ui: "shadcn/ui + Tailwind CSS v4"
  build: "Vite 6.x"
  testing: "Vitest + Testing Library"
  deployment: "Convex Cloud (managed) OR Railway (self-hosted)"

project_structure:
  root: |
    saas-convex-boilerplate/
    ├── convex/                     # Convex backend
    │   ├── _generated/             # Auto-generated (git-ignored)
    │   ├── schema.ts               # Database schema
    │   ├── users.ts                # User queries/mutations
    │   ├── auth.config.ts          # Auth configuration
    │   └── http.ts                 # HTTP routes (webhooks)
    ├── src/
    │   ├── routes/                 # TanStack file-based routes
    │   │   ├── __root.tsx
    │   │   ├── index.tsx
    │   │   ├── _auth/
    │   │   │   ├── sign-in.tsx
    │   │   │   └── sign-up.tsx
    │   │   └── _protected/
    │   │       └── dashboard.tsx
    │   ├── components/
    │   │   ├── ui/                 # shadcn components
    │   │   ├── layout/             # Layout components
    │   │   └── features/           # Feature components
    │   ├── hooks/                  # Custom hooks
    │   ├── lib/                    # Utilities
    │   └── main.tsx
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── convex.json
    ├── package.json
    └── README.md

naming_conventions:
  files: "kebab-case (user-queries.ts)"
  components: "PascalCase (UserProfile.tsx)"
  convex_functions: "camelCase (getUserById)"
  database_tables: "camelCase (userProfiles)"
  database_fields: "camelCase (createdAt)"

constraints:
  non_negotiable:
    - "100% TypeScript — zero `any` types"
    - "Convex schema como source of truth para types"
    - "Clerk JWT tokens validados pelo Convex"
    - "Real-time updates automáticos via useQuery"
    - "Zero manual caching — Convex gerencia tudo"
  preferences:
    - "Usar @convex-dev/react-query para integração TanStack"
    - "Validators Convex (v.string(), etc) ao invés de Zod no backend"
    - "Zod apenas no frontend para form validation"
    - "Convex actions para side effects (emails, external APIs)"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 3: RESEARCH DIRECTIVES
# ─────────────────────────────────────────────────────────────────────────────
research_phase:
  required_before_implementation:
    - source: "https://docs.convex.dev/llms.txt"
      focus: "LLM-optimized documentation, latest patterns"
    - source: "https://docs.convex.dev/auth/clerk"
      focus: "ConvexProviderWithClerk setup"
    - source: "https://docs.convex.dev/client/react/tanstack-query"
      focus: "@convex-dev/react-query adapter patterns"
    - source: "https://docs.convex.dev/database/schemas"
      focus: "Schema definition, validators, indexes"
    - source: "https://tanstack.com/router/latest"
      focus: "File-based routing with Vite"

  validation_questions:
    - "ConvexProviderWithClerk envolve ClerkProvider ou é separado?"
    - "@convex-dev/react-query usa useQuery ou convexQuery wrapper?"
    - "Como definir indexes otimizados para queries frequentes?"
    - "Convex actions vs mutations — quando usar cada um?"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 4: CHAIN OF THOUGHT PROCESS
# ─────────────────────────────────────────────────────────────────────────────
chain_of_thought:
  analyze:
    core_requirements:
      - "Schema Convex com users e tables auxiliares"
      - "Auth flow integrado Clerk + Convex"
      - "Real-time queries com TanStack Query adapter"
      - "Protected routes com auth check"
      - "Dashboard exemplo com dados reativos"
    
    integration_points:
      - "Clerk → Convex: ConvexProviderWithClerk + useStoreUserEffect"
      - "Convex → TanStack Query: @convex-dev/react-query adapter"
      - "TanStack Router → Protected routes: beforeLoad auth check"

  tree_of_thoughts:
    approach_a:
      description: "Convex direto com useQuery/useMutation nativo"
      pros: ["Menos dependências", "Documentação oficial"]
      cons: ["Não integra com TanStack Query devtools"]
      viability_score: 4
    approach_b:
      description: "Convex + @convex-dev/react-query adapter"
      pros: ["DevTools TanStack", "Padrões familiares", "Prefetching"]
      cons: ["Dependência extra", "Layer adicional"]
      viability_score: 5
    selected_approach: "approach_b"
    rationale: |
      O adapter oficial @convex-dev/react-query oferece o melhor dos dois mundos:
      real-time automático do Convex + DX familiar do TanStack Query.
      DevTools unificados facilitam debugging. Worth the extra dependency.

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 5: ATOMIC TASKS
# ─────────────────────────────────────────────────────────────────────────────
atomic_tasks:

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 1: PROJECT INITIALIZATION
  # ═══════════════════════════════════════════════════════════════════════════
  
  - id: "AT-001"
    title: "Initialize project with Vite and Convex"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    implementation:
      files_to_create:
        - "package.json"
        - "vite.config.ts"
        - "tsconfig.json"
        - "convex.json"
        - ".env.local"
        - ".env.example"
        - ".gitignore"
      commands:
        - "mkdir saas-convex-boilerplate && cd saas-convex-boilerplate"
        - "bun create vite . --template react-ts"
        - "bun add convex @clerk/clerk-react"
        - "bunx convex dev --once (init convex)"
      validation: "bunx convex dev starts successfully"
      rollback: "rm -rf saas-convex-boilerplate"
    acceptance_criteria:
      - "Vite project inicializado com React + TypeScript"
      - "Convex CLI instalado e projeto conectado"
      - "convex/_generated/ criado com types"
      - ".env.local com CONVEX_DEPLOYMENT e CLERK keys"
    deliverables:
      package_json: |
        {
          "name": "saas-convex-boilerplate",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "dev:backend": "convex dev",
            "dev:all": "concurrently \"bun run dev\" \"bun run dev:backend\"",
            "build": "vite build",
            "preview": "vite preview",
            "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            "typecheck": "tsc --noEmit"
          },
          "dependencies": {
            "@clerk/clerk-react": "^5.x",
            "@convex-dev/react-query": "^0.x",
            "@tanstack/react-query": "^5.x",
            "@tanstack/react-router": "^1.x",
            "convex": "^1.x",
            "react": "^19.x",
            "react-dom": "^19.x"
          },
          "devDependencies": {
            "@tanstack/router-plugin": "^1.x",
            "@types/react": "^19.x",
            "@types/react-dom": "^19.x",
            "@vitejs/plugin-react": "^4.x",
            "concurrently": "^9.x",
            "typescript": "^5.x",
            "vite": "^6.x"
          }
        }
      env_example: |
        # Convex
        CONVEX_DEPLOYMENT=dev:your-deployment
        
        # Clerk
        VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
        CLERK_SECRET_KEY=sk_test_xxx
        
        # Convex needs Clerk issuer URL
        CLERK_JWT_ISSUER_DOMAIN=https://xxx.clerk.accounts.dev
      convex_json: |
        {
          "functions": "convex/",
          "authInfo": []
        }

  - id: "AT-002"
    title: "Setup TanStack Router with file-based routing"
    phase: 1
    priority: "critical"
    dependencies: ["AT-001"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "src/main.tsx"
        - "src/routeTree.gen.ts (auto)"
        - "src/routes/__root.tsx"
        - "src/routes/index.tsx"
      files_to_modify:
        - "vite.config.ts"
      commands:
        - "bun add @tanstack/react-router @tanstack/react-query"
        - "bun add -D @tanstack/router-plugin @tanstack/router-devtools @tanstack/react-query-devtools"
      validation: "bun run dev shows home page"
      rollback: "rm -rf src/routes"
    acceptance_criteria:
      - "TanStack Router plugin configurado no Vite"
      - "File-based routing gerando routeTree automaticamente"
      - "Root route com Outlet funcionando"
      - "DevTools disponíveis em development"
    deliverables:
      vite_config: |
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
        import path from 'path';
        
        export default defineConfig({
          plugins: [
            TanStackRouterVite({
              target: 'react',
              autoCodeSplitting: true,
            }),
            react(),
          ],
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
        });
      main_tsx: |
        import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import { RouterProvider, createRouter } from '@tanstack/react-router';
        import { QueryClient } from '@tanstack/react-query';
        import { ConvexQueryClient } from '@convex-dev/react-query';
        import { ConvexProvider, ConvexReactClient } from 'convex/react';
        import { ClerkProvider, useAuth } from '@clerk/clerk-react';
        import { ConvexProviderWithClerk } from 'convex/react-clerk';
        import { routeTree } from './routeTree.gen';
        import './index.css';
        
        const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
        const convexQueryClient = new ConvexQueryClient(convex);
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              queryKeyHashFn: convexQueryClient.hashFn(),
              queryFn: convexQueryClient.queryFn(),
            },
          },
        });
        convexQueryClient.connect(queryClient);
        
        const router = createRouter({
          routeTree,
          context: { queryClient, convex },
          defaultPreload: 'intent',
        });
        
        declare module '@tanstack/react-router' {
          interface Register {
            router: typeof router;
          }
        }
        
        const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        
        if (!CLERK_KEY) {
          throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
        }
        
        function App() {
          return (
            <ClerkProvider publishableKey={CLERK_KEY}>
              <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <RouterProvider router={router} />
              </ConvexProviderWithClerk>
            </ClerkProvider>
          );
        }
        
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <App />
          </StrictMode>
        );

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 2: CONVEX BACKEND
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-003"
    title: "Define Convex schema with users table"
    phase: 2
    priority: "critical"
    dependencies: ["AT-002"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "convex/schema.ts"
      validation: "bunx convex dev generates types without errors"
      rollback: "rm convex/schema.ts"
    acceptance_criteria:
      - "Users table com campos padrão"
      - "Indexes para queries frequentes"
      - "Types auto-gerados em convex/_generated"
    deliverables:
      schema: |
        import { defineSchema, defineTable } from 'convex/server';
        import { v } from 'convex/values';
        
        export default defineSchema({
          users: defineTable({
            // Clerk user ID
            clerkId: v.string(),
            // User info synced from Clerk
            email: v.string(),
            name: v.optional(v.string()),
            imageUrl: v.optional(v.string()),
            // Timestamps
            createdAt: v.number(),
            updatedAt: v.number(),
          })
            .index('by_clerk_id', ['clerkId'])
            .index('by_email', ['email']),
          
          // Example: Add more tables as needed
          // projects: defineTable({
          //   name: v.string(),
          //   ownerId: v.id('users'),
          //   createdAt: v.number(),
          // }).index('by_owner', ['ownerId']),
        });

  - id: "AT-004"
    title: "Configure Clerk authentication for Convex"
    phase: 2
    priority: "critical"
    dependencies: ["AT-003"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "convex/auth.config.ts"
      commands:
        - "Configure Clerk JWT template for Convex in Clerk Dashboard"
      validation: "Auth context available in Convex functions"
      rollback: "rm convex/auth.config.ts"
    acceptance_criteria:
      - "auth.config.ts exporta providers array"
      - "Clerk JWT issuer configurado"
      - "ctx.auth disponível em functions"
    deliverables:
      auth_config: |
        export default {
          providers: [
            {
              domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
              applicationID: "convex",
            },
          ],
        };

  - id: "AT-005"
    title: "Create user queries and mutations"
    phase: 2
    priority: "critical"
    dependencies: ["AT-004"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "convex/users.ts"
        - "convex/lib/utils.ts"
      validation: "User functions work via Convex dashboard"
      rollback: "rm convex/users.ts convex/lib"
    acceptance_criteria:
      - "getCurrentUser query retorna user autenticado"
      - "upsertUser mutation cria/atualiza user"
      - "Proper auth validation em todas functions"
      - "Helper para get authenticated user"
    deliverables:
      users_functions: |
        import { v } from 'convex/values';
        import { query, mutation, QueryCtx, MutationCtx } from './_generated/server';
        import { Id } from './_generated/dataModel';
        
        // Helper to get current user or throw
        export async function getCurrentUserOrThrow(ctx: QueryCtx | MutationCtx) {
          const identity = await ctx.auth.getUserIdentity();
          if (!identity) {
            throw new Error('Unauthorized');
          }
          
          const user = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique();
          
          if (!user) {
            throw new Error('User not found');
          }
          
          return user;
        }
        
        // Get current authenticated user
        export const getCurrentUser = query({
          args: {},
          handler: async (ctx) => {
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
              return null;
            }
            
            return await ctx.db
              .query('users')
              .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
              .unique();
          },
        });
        
        // Upsert user (called after Clerk sign-in/sign-up)
        export const upsertUser = mutation({
          args: {
            email: v.string(),
            name: v.optional(v.string()),
            imageUrl: v.optional(v.string()),
          },
          handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
              throw new Error('Unauthorized');
            }
            
            const existingUser = await ctx.db
              .query('users')
              .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
              .unique();
            
            const now = Date.now();
            
            if (existingUser) {
              await ctx.db.patch(existingUser._id, {
                ...args,
                updatedAt: now,
              });
              return existingUser._id;
            }
            
            return await ctx.db.insert('users', {
              clerkId: identity.subject,
              ...args,
              createdAt: now,
              updatedAt: now,
            });
          },
        });
        
        // Update current user
        export const updateCurrentUser = mutation({
          args: {
            name: v.optional(v.string()),
            imageUrl: v.optional(v.string()),
          },
          handler: async (ctx, args) => {
            const user = await getCurrentUserOrThrow(ctx);
            
            await ctx.db.patch(user._id, {
              ...args,
              updatedAt: Date.now(),
            });
            
            return user._id;
          },
        });

  - id: "AT-006"
    title: "Setup Clerk webhook for user sync"
    phase: 2
    priority: "high"
    dependencies: ["AT-005"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "convex/http.ts"
      commands:
        - "Configure webhook in Clerk Dashboard pointing to Convex HTTP endpoint"
      validation: "Webhook creates user on Clerk signup"
      rollback: "rm convex/http.ts"
    acceptance_criteria:
      - "HTTP route para /clerk-webhook"
      - "Verifica webhook signature"
      - "Cria user automaticamente no signup"
      - "Deleta user no account deletion"
    deliverables:
      http_routes: |
        import { httpRouter } from 'convex/server';
        import { httpAction } from './_generated/server';
        import { api } from './_generated/api';
        import { Webhook } from 'svix';
        
        const http = httpRouter();
        
        http.route({
          path: '/clerk-webhook',
          method: 'POST',
          handler: httpAction(async (ctx, request) => {
            const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
            if (!webhookSecret) {
              return new Response('Webhook secret not configured', { status: 500 });
            }
            
            const svixId = request.headers.get('svix-id');
            const svixTimestamp = request.headers.get('svix-timestamp');
            const svixSignature = request.headers.get('svix-signature');
            
            if (!svixId || !svixTimestamp || !svixSignature) {
              return new Response('Missing svix headers', { status: 400 });
            }
            
            const body = await request.text();
            
            const wh = new Webhook(webhookSecret);
            let evt: any;
            
            try {
              evt = wh.verify(body, {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
              });
            } catch (err) {
              console.error('Webhook verification failed:', err);
              return new Response('Invalid signature', { status: 400 });
            }
            
            const eventType = evt.type;
            
            if (eventType === 'user.created' || eventType === 'user.updated') {
              const { id, email_addresses, first_name, last_name, image_url } = evt.data;
              const email = email_addresses?.[0]?.email_address;
              const name = [first_name, last_name].filter(Boolean).join(' ') || undefined;
              
              if (email) {
                await ctx.runMutation(api.users.upsertUser, {
                  email,
                  name,
                  imageUrl: image_url,
                });
              }
            }
            
            if (eventType === 'user.deleted') {
              // Handle user deletion if needed
              // await ctx.runMutation(api.users.deleteByClerkId, { clerkId: evt.data.id });
            }
            
            return new Response('OK', { status: 200 });
          }),
        });
        
        export default http;

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 3: FRONTEND INTEGRATION
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-007"
    title: "Setup shadcn/ui and Tailwind CSS"
    phase: 3
    priority: "high"
    dependencies: ["AT-002"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "tailwind.config.ts"
        - "postcss.config.js"
        - "src/index.css"
        - "components.json"
        - "src/lib/utils.ts"
        - "src/components/ui/button.tsx"
      commands:
        - "bun add tailwindcss postcss autoprefixer"
        - "bun add class-variance-authority clsx tailwind-merge lucide-react"
        - "bunx shadcn@latest init"
        - "bunx shadcn@latest add button card input"
      validation: "Components render with correct styles"
      rollback: "Remove Tailwind and shadcn config"
    acceptance_criteria:
      - "Tailwind CSS funcionando"
      - "shadcn/ui CLI configurado"
      - "Dark mode support"
      - "Componentes básicos instalados"

  - id: "AT-008"
    title: "Create custom hooks for Convex + TanStack Query"
    phase: 3
    priority: "high"
    dependencies: ["AT-005", "AT-007"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "src/hooks/use-current-user.ts"
        - "src/hooks/use-store-user.ts"
        - "src/hooks/index.ts"
      validation: "Hooks return correct data"
      rollback: "rm -rf src/hooks"
    acceptance_criteria:
      - "useCurrentUser retorna user com real-time updates"
      - "useStoreUser synca user após auth"
      - "Loading e error states handled"
    deliverables:
      use_current_user: |
        import { useQuery } from '@tanstack/react-query';
        import { convexQuery } from '@convex-dev/react-query';
        import { api } from '../../convex/_generated/api';
        
        export function useCurrentUser() {
          return useQuery(convexQuery(api.users.getCurrentUser, {}));
        }
      use_store_user: |
        import { useEffect } from 'react';
        import { useUser } from '@clerk/clerk-react';
        import { useMutation } from 'convex/react';
        import { api } from '../../convex/_generated/api';
        
        export function useStoreUser() {
          const { user, isLoaded } = useUser();
          const upsertUser = useMutation(api.users.upsertUser);
          
          useEffect(() => {
            if (!isLoaded || !user) return;
            
            const email = user.primaryEmailAddress?.emailAddress;
            if (!email) return;
            
            upsertUser({
              email,
              name: user.fullName ?? undefined,
              imageUrl: user.imageUrl ?? undefined,
            }).catch(console.error);
          }, [isLoaded, user, upsertUser]);
        }

  - id: "AT-009"
    title: "Create authentication pages"
    phase: 3
    priority: "high"
    dependencies: ["AT-008"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "src/routes/_auth.tsx"
        - "src/routes/_auth/sign-in.tsx"
        - "src/routes/_auth/sign-up.tsx"
      validation: "Auth pages render Clerk components"
      rollback: "rm -rf src/routes/_auth"
    acceptance_criteria:
      - "Sign in page com SignIn component"
      - "Sign up page com SignUp component"
      - "Redirect após auth success"
    deliverables:
      sign_in: |
        import { createFileRoute } from '@tanstack/react-router';
        import { SignIn } from '@clerk/clerk-react';
        
        export const Route = createFileRoute('/_auth/sign-in')({
          component: SignInPage,
        });
        
        function SignInPage() {
          return (
            <div className="flex min-h-screen items-center justify-center">
              <SignIn 
                routing="path" 
                path="/sign-in" 
                signUpUrl="/sign-up"
                forceRedirectUrl="/dashboard"
              />
            </div>
          );
        }

  - id: "AT-010"
    title: "Create protected dashboard route"
    phase: 3
    priority: "high"
    dependencies: ["AT-009"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "src/routes/_protected.tsx"
        - "src/routes/_protected/dashboard.tsx"
        - "src/components/layout/header.tsx"
        - "src/components/layout/user-nav.tsx"
      validation: "Dashboard shows user data with real-time updates"
      rollback: "rm -rf src/routes/_protected"
    acceptance_criteria:
      - "Protected layout com auth check"
      - "Redirect para sign-in se não autenticado"
      - "Dashboard mostra dados do user"
      - "User nav com dropdown"
    deliverables:
      protected_layout: |
        import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
        import { useAuth } from '@clerk/clerk-react';
        import { useStoreUser } from '@/hooks/use-store-user';
        import { Header } from '@/components/layout/header';
        
        export const Route = createFileRoute('/_protected')({
          beforeLoad: async ({ context }) => {
            // Client-side auth check happens in component
          },
          component: ProtectedLayout,
        });
        
        function ProtectedLayout() {
          const { isLoaded, isSignedIn } = useAuth();
          
          // Sync user to Convex on auth
          useStoreUser();
          
          if (!isLoaded) {
            return (
              <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            );
          }
          
          if (!isSignedIn) {
            // Redirect to sign-in
            window.location.href = '/sign-in';
            return null;
          }
          
          return (
            <div className="min-h-screen bg-background">
              <Header />
              <main className="container mx-auto py-6 px-4">
                <Outlet />
              </main>
            </div>
          );
        }
      dashboard: |
        import { createFileRoute } from '@tanstack/react-router';
        import { useCurrentUser } from '@/hooks/use-current-user';
        import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
        
        export const Route = createFileRoute('/_protected/dashboard')({
          component: DashboardPage,
        });
        
        function DashboardPage() {
          const { data: user, isLoading } = useCurrentUser();
          
          if (isLoading) {
            return <div>Loading...</div>;
          }
          
          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hello, {user?.name || user?.email || 'User'}!
                    </p>
                  </CardContent>
                </Card>
                
                {/* Add more dashboard cards here */}
              </div>
            </div>
          );
        }

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 4: POLISH & DEPLOYMENT
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-011"
    title: "Setup testing infrastructure"
    phase: 4
    priority: "medium"
    dependencies: ["AT-010"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "vitest.config.ts"
        - "src/__tests__/setup.ts"
        - "src/__tests__/hooks.test.tsx"
      commands:
        - "bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom"
      validation: "bun run test passes"
      rollback: "Remove test config"
    acceptance_criteria:
      - "Vitest configurado"
      - "React Testing Library setup"
      - "Example tests para hooks"

  - id: "AT-012"
    title: "Create deployment configuration"
    phase: 4
    priority: "high"
    dependencies: ["AT-010"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "Dockerfile (for self-hosted)"
        - ".github/workflows/deploy.yml"
        - "docs/DEPLOYMENT.md"
      validation: "CI workflow runs successfully"
      rollback: "Remove deployment configs"
    acceptance_criteria:
      - "Convex Cloud deployment via CLI"
      - "Vite build para static hosting"
      - "CI/CD workflow com typecheck, lint, build"
      - "Self-hosted option documentado"

  - id: "AT-013"
    title: "Create comprehensive documentation"
    phase: 4
    priority: "medium"
    dependencies: ["AT-012"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "README.md"
        - "docs/SETUP.md"
        - "docs/ARCHITECTURE.md"
        - "docs/CONVEX-PATTERNS.md"
      validation: "Docs render correctly"
      rollback: "Remove docs"
    acceptance_criteria:
      - "Quick start guide"
      - "Architecture overview"
      - "Convex patterns and best practices"
      - "Deployment instructions"

  - id: "AT-014"
    title: "Final validation and cleanup"
    phase: 4
    priority: "critical"
    dependencies: ["AT-013"]
    parallel_safe: false
    implementation:
      commands:
        - "bun run lint"
        - "bun run typecheck"
        - "bun run test"
        - "bun run build"
        - "bunx convex deploy --preview"
      validation: "All commands pass"
      rollback: "N/A"
    acceptance_criteria:
      - "Zero lint errors"
      - "Zero TypeScript errors"
      - "All tests passing"
      - "Build successful"
      - "Convex preview deploy works"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 6: VALIDATION GATES
# ─────────────────────────────────────────────────────────────────────────────
validation:
  automated:
    - id: "VT-001"
      command: "bun run build"
      expected: "Exit code 0"
    - id: "VT-002"
      command: "bun run lint"
      expected: "No errors"
    - id: "VT-003"
      command: "bun run typecheck"
      expected: "No errors"
    - id: "VT-004"
      command: "bunx convex deploy --preview"
      expected: "Preview deployment succeeds"

  manual_checklist:
    - "[ ] Sign up → User created in Convex"
    - "[ ] Sign in → Dashboard shows user data"
    - "[ ] Real-time: Change user name in DB → UI updates instantly"
    - "[ ] Protected routes redirect unauthenticated users"
    - "[ ] Mobile responsive"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 7: OUTPUT CONTRACT
# ─────────────────────────────────────────────────────────────────────────────
output:
  format: "Single-folder project, production-ready, clone-and-customize"
  
  success_definition: |
    O boilerplate está completo quando:
    1. `git clone && bun install && bun run dev:all` funciona
    2. Auth flow end-to-end com Clerk + Convex
    3. Real-time updates automáticos funcionando
    4. Dashboard exemplo com dados reativos
    5. Deploy para Convex Cloud com um comando
    6. Zero errors em lint, typecheck, tests
    7. Documentação permite onboarding em < 20 minutos

  repository_structure: |
    saas-convex-boilerplate/
    ├── convex/               # Convex backend
    │   ├── schema.ts
    │   ├── users.ts
    │   ├── auth.config.ts
    │   └── http.ts
    ├── src/
    │   ├── routes/           # TanStack Router
    │   ├── components/       # UI components
    │   ├── hooks/            # Custom hooks
    │   └── lib/              # Utilities
    ├── docs/                 # Documentation
    ├── vite.config.ts
    ├── convex.json
    └── README.md