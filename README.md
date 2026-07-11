# Quiver

> A modern, open-source automation platform - An alternative to Zapier and N8N

## Overview

**Quiver** is a powerful workflow automation platform that enables you to connect your apps and automate repetitive tasks without coding. Built with modern web technologies, Quiver provides a seamless experience for creating, managing, and deploying automation workflows across multiple services.

Whether you're looking to automate data synchronization, trigger notifications, or build complex multi-step workflows, Quiver offers an intuitive interface and robust infrastructure to handle your automation needs at scale.

### Why Quiver?

Unlike traditional automation platforms, Quiver is:
- **Open Source** - Full transparency and community-driven development
- **Self-Hostable** - Deploy on your own infrastructure for complete control
- **Modern Stack** - Built with the latest web technologies (Next.js 15, React 19, TypeScript)
- **Type-Safe** - End-to-end type safety from database to UI
- **Developer-First** - Easy to extend with custom integrations and workflows

### Key Features

- 🔗 **Connect Multiple Apps** - Integrate with popular services and APIs
- ⚡ **Real-time Automation** - Instant triggers and actions
- 🎨 **Visual Workflow Builder** - Drag-and-drop interface for creating automations
- 🤖 **AI-Powered Workflows** - Integrate with OpenAI, Google Gemini, and Anthropic Claude
- 🔐 **Secure Authentication** - Built-in auth system with session management
 - 📊 **Monitoring & Logs** - Track your automation runs and performance
 - 🐛 **Error Tracking** - Real-time error monitoring with Sentry
 - 🧾 **Subscriptions & Billing** - Monetize with Polar checkout and customer portal
 - 🚀 **Scalable Architecture** - Built to handle high-volume workflows
 - 💾 **Persistent Storage** - PostgreSQL database with Prisma ORM
 - 🎯 **Type-Safe APIs** - End-to-end type safety with tRPC

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components
 - **[Motion](https://motion.dev/)** - High-performance animations
 - **[Embla Carousel](https://www.embla-carousel.com/)** - Performant carousel/slider
 - **[Lucide Icons](https://lucide.dev/)** - Icon set for React
 - **[React Flow (XYFlow)](https://xyflow.com/)** - Graph editor for the visual workflow builder
 - **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching for Next.js

### Backend
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source database
- **[Better Auth](https://better-auth.com/)** - Authentication library
- **[Polar](https://polar.sh/)** - Subscriptions, checkout, and customer portal
- **[Inngest](https://www.inngest.com/)** - Durable workflow engine for background jobs
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - Unified AI framework for LLMs
- **[Sentry](https://sentry.io/)** - Error tracking and performance monitoring
 - **[SuperJSON](https://github.com/blitz-js/superjson)** - Rich data serialization for tRPC

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
 - **[nuqs](https://github.com/47ng/nuqs)** - URL search params state for Next.js
 - **[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)** - Resizable split panes
 - **[jotai](https://jotai.org/)** - Lightweight state management used in parts of the UI

### AI & Machine Learning
- **[OpenAI](https://openai.com/)** - GPT-4 and other OpenAI models
- **[Google Gemini](https://deepmind.google/technologies/gemini/)** - Google's advanced AI models
- **[Anthropic Claude](https://www.anthropic.com/)** - Claude Sonnet and other models

### Developer Tools
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Turbopack](https://turbo.build/pack)** - Incremental bundler
- **[Sentry](https://sentry.io/)** - Application monitoring and error tracking
 - **[react-error-boundary](https://github.com/bvaughn/react-error-boundary)** - Resilient UI error boundaries

### Utilities
- **[random-word-slugs](https://github.com/coollabsio/random-word-slugs)** - Human-readable ID/slug generation
 - **[date-fns](https://date-fns.org/)** - Date utilities
 - **[react-day-picker](https://react-day-picker.js.org/)** - Date picker component
 - **[Recharts](https://recharts.org/en-US)** - Composable charting library
 - **[vaul](https://vaul.emilkowal.ski/)** - Accessible drawer component
 - **[@paralleldrive/cuid2](https://github.com/paralleldrive/cuid2)** - Compact id generation used in the codebase

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **PostgreSQL** database
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhijeetkv/quiver.git
   cd quiver
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/quiver"
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # AI Provider API Keys
   OPENAI_API_KEY="your-openai-api-key"
   GOOGLE_GENERATIVE_AI_API_KEY="your-google-api-key"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   
   # Sentry (optional for error tracking)
   SENTRY_DSN="your-sentry-dsn"
   
  # Polar (subscriptions & billing)
  POLAR_ACCESS_TOKEN="your-polar-access-token"
  POLAR_SUCCESS_URL="http://localhost:3000" # Where to redirect after successful checkout
   
   # Inngest (optional for local dev, required for production)
   # INNGEST_EVENT_KEY="your-inngest-event-key"
   # INNGEST_SIGNING_KEY="your-inngest-signing-key"
   ```

### Environment variables (detailed)

The app expects the following environment variables (explanations):

- `DATABASE_URL` — Postgres connection string used by Prisma
- `BETTER_AUTH_SECRET` — Secret for Better Auth (session signing)
- `BETTER_AUTH_URL` — The base URL used by Better Auth for emails and redirects
- `OPENAI_API_KEY` — OpenAI API key (used by the Vercel AI SDK)
- `GOOGLE_GENERATIVE_AI_API_KEY` — Google Generative AI key (Gemini)
- `ANTHROPIC_API_KEY` — Anthropic API key (Claude)
- `SENTRY_DSN` — Sentry DSN for error tracking (optional)
- `POLAR_ACCESS_TOKEN` — Polar API token (sandbox by default)
- `POLAR_SUCCESS_URL` — Redirect URL after successful Polar checkout
- `INNGEST_EVENT_KEY` — (Optional) Inngest event key for remote event publishing
- `INNGEST_SIGNING_KEY` — (Optional) Inngest signing key for webhook verification

Keep secrets out of source control. For local development you can create `.env.local` and add values there.

4. **Run database migrations**
   ```bash
   pnpm prisma migrate dev
   # or
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   pnpm prisma generate
   # or
   npx prisma generate
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

7. **(Optional) Start Inngest dev server**
   
   In a separate terminal:
   ```bash
   npx inngest-cli@latest dev
   ```
   
   Visit [http://localhost:8288](http://localhost:8288) for the Inngest dashboard.

8. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quiver/
├── prisma/                         # Database layer
│   ├── schema.prisma               #   Data models, enums, relations
│   └── migrations/                 #   Version-controlled schema migrations
│
├── src/
│   ├── app/                        # ─── Next.js App Router ───────────────
│   │   ├── (auth)/                 #   Public route-group
│   │   │   ├── login/              #     Login page
│   │   │   └── signup/             #     Registration page
│   │   ├── (dashboard)/            #   Authenticated route-group
│   │   │   ├── (editor)/           #     Full-screen workflow editor
│   │   │   │   └── workflows/[workflowId]/
│   │   │   └── (rest)/             #     Sidebar-based CRUD pages
│   │   │       ├── workflows/      #       Workflow list
│   │   │       ├── credentials/    #       Credential list + detail + new
│   │   │       │   ├── [credentialId]/
│   │   │       │   └── new/
│   │   │       └── executions/     #       Execution history + detail
│   │   │           └── [executionId]/
│   │   ├── actions/                #   Server Actions
│   │   │   └── realtime.ts         #     Inngest realtime subscription tokens
│   │   ├── api/                    #   HTTP API routes
│   │   │   ├── auth/[...all]/      #     Better Auth catch-all handler
│   │   │   ├── inngest/            #     Inngest webhook endpoint
│   │   │   ├── trpc/[trpc]/        #     tRPC HTTP handler
│   │   │   ├── webhooks/           #     External webhook receivers
│   │   │   │   ├── google-form/    #       Google Form submissions
│   │   │   │   └── stripe/         #       Stripe events
│   │   │   └── sentry-example-api/ #     Sentry sample route
│   │   ├── sentry-example-page/    #   Sentry sample frontend page
│   │   ├── global-error.tsx        #   App-level Sentry error boundary
│   │   ├── globals.css             #   Global styles + Tailwind
│   │   └── layout.tsx              #   Root layout
│   │
│   ├── components/                 # ─── Shared UI Components ─────────────
│   │   ├── app-header.tsx          #   Top navigation bar
│   │   ├── app-sidebar.tsx         #   Dashboard sidebar navigation
│   │   ├── background.tsx          #   Background visual effects
│   │   ├── entity-components.tsx   #   Reusable entity list/detail UI
│   │   ├── initial-node.tsx        #   INITIAL placeholder node
│   │   ├── node-selector.tsx       #   Node-type picker modal
│   │   ├── upgrade-modal.tsx       #   Premium upgrade prompt
│   │   ├── workflow-node.tsx       #   Generic workflow node wrapper
│   │   ├── react-flow/             #   React Flow primitives
│   │   │   ├── base-handle.tsx     #     Handle connector component
│   │   │   ├── base-node.tsx       #     Base node chrome (card + header)
│   │   │   ├── node-status-indicator.tsx  # Live status badge (loading/success/error)
│   │   │   └── placeholder-node.tsx      # "Add node" placeholder
│   │   └── ui/                     #   shadcn/ui + Radix primitives
│   │
│   ├── config/                     # ─── Configuration ────────────────────
│   │   ├── constants.ts            #   App-wide constants
│   │   └── node-components.ts      #   React Flow node-type → component registry
│   │
│   ├── features/                   # ─── Domain Feature Modules ───────────
│   │   ├── auth/                   #   Authentication
│   │   │   └── components/         #     login-form, register-form
│   │   ├── editor/                 #   Visual Workflow Editor
│   │   │   └── components/         #     editor, editor-header, add-node-button
│   │   │       └── store/          #       Jotai atoms (editor state)
│   │   ├── credentials/            #   API Key / Secret Management
│   │   │   ├── components/         #     credential.tsx, credentials.tsx
│   │   │   ├── hooks/              #     use-credentials, use-credentials-params
│   │   │   ├── params.ts           #     URL search-param definitions
│   │   │   └── server/             #     tRPC router, prefetch, params-loader
│   │   ├── executions/             #   Workflow Run History & Node Executors
│   │   │   ├── components/         #     Per-node-type UI + executors
│   │   │   │   ├── anthropic/      #       node, dialog, executor, action
│   │   │   │   ├── discord/        #       ↳ same pattern
│   │   │   │   ├── gemini/         #       ↳ same pattern
│   │   │   │   ├── http-request/   #       ↳ same pattern
│   │   │   │   ├── openai/         #       ↳ same pattern
│   │   │   │   ├── slack/          #       ↳ same pattern
│   │   │   │   ├── base-execution-node.tsx
│   │   │   │   ├── execution.tsx   #     Single execution detail page
│   │   │   │   └── executions.tsx  #     Execution list page
│   │   │   ├── hooks/              #     use-executions, use-node-status
│   │   │   ├── lib/
│   │   │   │   └── executor-registry.ts  # NodeType → executor map
│   │   │   ├── params.ts
│   │   │   ├── server/             #     tRPC router, prefetch, params-loader
│   │   │   └── types.ts            #     NodeExecutor, WorkflowContext types
│   │   ├── subscriptions/          #   Polar Billing
│   │   │   └── hooks/              #     use-subscription
│   │   ├── triggers/               #   Workflow Trigger Nodes
│   │   │   └── components/
│   │   │       ├── base-trigger-node.tsx
│   │   │       ├── google-form-trigger/  # node, dialog, executor, actions, utils
│   │   │       ├── manual-trigger/       # node, dialog, executor, actions
│   │   │       └── stripe-trigger/       # node, dialog, executor
│   │   └── workflows/              #   Workflow CRUD
│   │       ├── components/          #     workflows.tsx (list page)
│   │       ├── hooks/               #     use-workflows, use-workflows-params
│   │       ├── params.ts
│   │       └── server/              #     tRPC router, prefetch, params-loader
│   │
│   ├── hooks/                      # ─── Global React Hooks ───────────────
│   │   ├── use-entity-search.tsx   #   Generic entity search
│   │   ├── use-mobile.ts           #   Responsive breakpoint detection
│   │   ├── use-node-status.ts      #   Inngest realtime node status
│   │   └── use-upgrade-modal.tsx   #   Premium upgrade modal state
│   │
│   ├── inngest/                    # ─── Background Job Engine ────────────
│   │   ├── client.ts               #   Inngest client instance
│   │   ├── functions.ts            #   Workflow execution function (execute-workflow)
│   │   ├── utils.ts                #   Topological sort, sendWorkflowExecution helper
│   │   └── channel/                #   Inngest Realtime channels
│   │       ├── anthropic.ts        #     Anthropic execution status channel
│   │       ├── discord.ts          #     Discord execution status channel
│   │       ├── gemini.ts           #     Gemini execution status channel
│   │       ├── google-form-trigger.ts
│   │       ├── http-request.ts     #     HTTP request execution status channel
│   │       ├── manual-trigger.ts
│   │       ├── openai.ts           #     OpenAI execution status channel
│   │       ├── slack.ts            #     Slack execution status channel
│   │       └── stripe-trigger.ts
│   │
│   ├── lib/                        # ─── Shared Utilities ─────────────────
│   │   ├── auth.ts                 #   Better Auth server config
│   │   ├── auth-client.ts          #   Better Auth browser client
│   │   ├── auth-utils.ts           #   requireAuth / requireUnauth helpers
│   │   ├── db.ts                   #   Prisma client singleton
│   │   ├── encryption.ts           #   Cryptr encrypt / decrypt (credentials)
│   │   ├── polar.ts                #   Polar SDK client
│   │   └── utils.ts                #   cn() and misc helpers
│   │
│   ├── trpc/                       # ─── tRPC Wiring ──────────────────────
│   │   ├── client.tsx              #   React Query + tRPC provider
│   │   ├── init.ts                 #   Context, baseProcedure, protectedProcedure, premiumProcedure
│   │   ├── query-client.ts         #   TanStack Query client factory
│   │   ├── server.tsx              #   Server-side tRPC caller
│   │   └── routers/
│   │       └── _app.ts             #   Root router (workflows, credentials, executions)
│   │
│   ├── generated/
│   │   └── prisma/                 #   Auto-generated Prisma Client
│   ├── instrumentation.ts          #   Server-side Sentry init
│   └── instrumentation-client.ts   #   Client-side Sentry + session replay
│
├── public/                         # Static assets & icons
├── sentry.server.config.ts         # Sentry server runtime config
├── sentry.edge.config.ts           # Sentry edge runtime config
├── next.config.ts                  # Next.js configuration
├── biome.json                      # Biome linter/formatter config
├── components.json                 # shadcn/ui CLI config
├── tsconfig.json                   # TypeScript configuration
├── postcss.config.mjs              # PostCSS (Tailwind)
└── package.json
```

## Architecture

### High-Level System Overview

```mermaid
graph TB
    subgraph Client["🖥️ Browser"]
        UI["React 19 UI<br/>(App Router + RSC)"]
        RQ["TanStack Query"]
        TRPC_C["tRPC Client"]
        JOTAI["Jotai Atoms<br/>(Editor State)"]
        RF["React Flow<br/>(Visual Editor)"]
    end

    subgraph NextServer["⚡ Next.js Server"]
        AppRouter["App Router<br/>(Pages + Layouts)"]
        TRPC_S["tRPC Server<br/>(Routers)"]
        AUTH["Better Auth<br/>(Sessions)"]
        SA["Server Actions<br/>(Realtime Tokens)"]
        WH["Webhook Routes<br/>(/api/webhooks/*)"]
    end

    subgraph Data["🗄️ Data Layer"]
        PRISMA["Prisma ORM"]
        PG[("PostgreSQL")]
    end

    subgraph BackgroundJobs["⚙️ Background Jobs"]
        INN_CLIENT["Inngest Client"]
        INN_FN["execute-workflow<br/>Function"]
        EXEC_REG["Executor Registry"]
        RT["Inngest Realtime<br/>(Channels)"]
    end

    subgraph External["🌐 External Services"]
        AI["AI Providers<br/>(OpenAI / Gemini / Claude)"]
        POLAR["Polar<br/>(Billing)"]
        SENTRY["Sentry<br/>(Monitoring)"]
        DISCORD["Discord API"]
        SLACK["Slack API"]
        STRIPE["Stripe Webhooks"]
        GFORM["Google Forms"]
    end

    UI --> RQ --> TRPC_C --> TRPC_S
    UI --> RF --> JOTAI
    TRPC_S --> AUTH
    TRPC_S --> PRISMA --> PG
    TRPC_S --> INN_CLIENT
    SA --> RT
    RT -.->|"realtime status"| UI
    WH --> INN_CLIENT
    INN_CLIENT --> INN_FN --> EXEC_REG
    EXEC_REG --> AI
    EXEC_REG --> DISCORD
    EXEC_REG --> SLACK
    EXEC_REG --> PRISMA
    AUTH --> POLAR
    NextServer --> SENTRY
    Client --> SENTRY
    STRIPE --> WH
    GFORM --> WH
```

### Request Lifecycle

Shows how a typical user action flows through the stack:

```mermaid
sequenceDiagram
    participant B as Browser
    participant RSC as App Router (RSC)
    participant tRPC as tRPC Router
    participant Auth as Better Auth
    participant Polar as Polar SDK
    participant DB as PostgreSQL
    participant Inngest as Inngest

    B->>RSC: Navigate to /workflows
    RSC->>tRPC: Server-side prefetch (workflows.getMany)
    tRPC->>Auth: getSession(headers)
    Auth-->>tRPC: Session { user }
    tRPC->>DB: prisma.workflow.findMany()
    DB-->>tRPC: Workflow[]
    tRPC-->>RSC: Hydrated data
    RSC-->>B: Rendered page + dehydrated cache

    B->>tRPC: workflows.create (mutation)
    tRPC->>Auth: getSession(headers)
    Auth-->>tRPC: Session { user }
    tRPC->>Polar: customers.getStateExternal()
    Polar-->>tRPC: activeSubscriptions ✅
    tRPC->>DB: prisma.workflow.create()
    DB-->>tRPC: Workflow
    tRPC-->>B: Created workflow

    B->>tRPC: Execute workflow (mutation)
    tRPC->>Inngest: send("workflows/execute.workflow")
    Inngest-->>tRPC: Event accepted
    tRPC-->>B: Execution started
    Inngest->>DB: Create Execution record
    Inngest->>Inngest: Run nodes in topological order
    Inngest-->>B: Realtime status updates (loading → success/error)
```

### Workflow Execution Pipeline

Details how Inngest executes a workflow graph node-by-node:

```mermaid
flowchart TD
    START(["Event: workflows/execute.workflow"]) --> CREATE["step.run: create-execution<br/>Create Execution record in DB"]
    CREATE --> PREPARE["step.run: prepare-workflow<br/>Load nodes + connections"]
    PREPARE --> TOPO["Topological Sort<br/>(toposort library)"]
    TOPO --> USERID["step.run: find-user-id"]
    USERID --> LOOP{"For each node<br/>in sorted order"}
    LOOP --> LOOKUP["getExecutor(node.type)<br/>from executor-registry"]
    LOOKUP --> EXEC["executor(data, nodeId,<br/>userId, context, step)"]

    EXEC --> RT_LOAD["step.realtime.publish<br/>status: loading"]
    RT_LOAD --> WORK["Node-specific work<br/>(AI call, HTTP request,<br/>Discord/Slack message, etc.)"]
    WORK --> RT_OK["step.realtime.publish<br/>status: success"]
    RT_OK --> CTX["Merge result<br/>into context"]
    CTX --> LOOP

    WORK -->|error| RT_ERR["step.realtime.publish<br/>status: error"]
    RT_ERR --> FAIL["Throw / onFailure handler<br/>marks Execution FAILED"]

    LOOP -->|done| UPDATE["step.run: update-execution<br/>status: SUCCESS"]
    UPDATE --> DONE(["Return result"])

    style START fill:#4f46e5,color:#fff
    style DONE fill:#16a34a,color:#fff
    style FAIL fill:#dc2626,color:#fff
```

### Feature Module Pattern

Each domain feature follows a consistent internal structure:

```mermaid
graph LR
    subgraph Feature["features/<name>/"]
        COMP["components/<br/>React components<br/>(node, dialog, list, detail)"]
        HOOKS["hooks/<br/>React Query wrappers<br/>(use-*, use-*-params)"]
        SERVER["server/<br/>tRPC router<br/>+ prefetch + params-loader"]
        PARAMS["params.ts<br/>nuqs search-param<br/>definitions"]
        TYPES["types.ts<br/>Shared TypeScript types"]
    end

    subgraph NodeModule["components/<node-type>/"]
        NODE["node.tsx<br/>React Flow node UI"]
        DIALOG["dialog.tsx<br/>Config dialog"]
        EXECUTOR["executor.ts<br/>Inngest step logic"]
        ACTION["action.ts<br/>Server Action for<br/>realtime token"]
    end

    COMP --> NodeModule
    HOOKS --> SERVER
    SERVER --> PARAMS

    style Feature fill:#f8fafc,stroke:#334155
    style NodeModule fill:#eff6ff,stroke:#3b82f6
```

### Registered Node Types

| Category | Node Type | UI Component | Executor | Inngest Channel |
|----------|-----------|-------------|----------|-----------------|
| **Triggers** | `MANUAL_TRIGGER` | ManualTriggerNode | manualTriggerExecutor | manual-trigger |
| | `GOOGLE_FORM_TRIGGER` | GoogleFormTrigger | googleFormTriggerExecutor | google-form-trigger |
| | `STRIPE_TRIGGER` | StripeTriggerNode | stripeTriggerExecutor | stripe-trigger |
| **AI** | `GEMINI` | GeminiNode | geminiExecutor | gemini-execution |
| | `OPENAI` | OpenAiNode | openAiExecutor | openai-execution |
| | `ANTHROPIC` | AnthropicNode | anthropicExecutor | anthropic-execution |
| **Actions** | `HTTP_REQUEST` | HttpRequestNode | httpRequestExecutor | http-request-execution |
| | `DISCORD` | DiscordNode | discordExecutor | discord-execution |
| | `SLACK` | SlackNode | slackExecutor | slack-execution |
| **Internal** | `INITIAL` | InitialNode | _(passthrough)_ | — |

### Database Schema (ER Diagram)

```mermaid
erDiagram
    User ||--o{ Session : "has"
    User ||--o{ Account : "has"
    User ||--o{ Workflow : "owns"
    User ||--o{ Credential : "owns"
    Workflow ||--o{ Node : "contains"
    Workflow ||--o{ Connection : "contains"
    Workflow ||--o{ Execution : "produces"
    Node ||--o{ Connection : "fromNode"
    Node ||--o{ Connection : "toNode"
    Credential ||--o{ Node : "used by"

    User {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }

    Session {
        string id PK
        datetime expiresAt
        string token UK
        string ipAddress
        string userAgent
        string userId FK
    }

    Account {
        string id PK
        string accountId
        string providerId
        string userId FK
        string accessToken
        string refreshToken
    }

    Verification {
        string id PK
        string identifier
        string value
        datetime expiresAt
    }

    Credential {
        string id PK
        string name
        string value
        CredentialType type
        string userId FK
    }

    Workflow {
        string id PK
        string name
        string userId FK
        datetime createdAt
        datetime updatedAt
    }

    Node {
        string id PK
        string workflowId FK
        string name
        NodeType type
        json position
        json data
        string credentialId FK
    }

    Connection {
        string id PK
        string workflowId FK
        string fromNodeId FK
        string toNodeId FK
        string fromOutput
        string toInput
    }

    Execution {
        string id PK
        string workflowId FK
        ExecutionStatus status
        string error
        string inngestEventId UK
        json output
        datetime startedAt
        datetime completedAt
    }
```

### tRPC Router Hierarchy

```mermaid
graph TD
    ROOT["appRouter (_app.ts)"] --> WF["workflows"]
    ROOT --> CRED["credentials"]
    ROOT --> EXEC["executions"]

    WF --> WF_C["create (premiumProcedure)"]
    WF --> WF_R["remove"]
    WF --> WF_U["updateName"]
    WF --> WF_G1["getOne"]
    WF --> WF_G2["getMany (paginated)"]

    CRED --> CRED_C["create"]
    CRED --> CRED_R["remove"]
    CRED --> CRED_G1["getOne"]
    CRED --> CRED_G2["getMany"]

    EXEC --> EXEC_G1["getOne"]
    EXEC --> EXEC_G2["getMany (paginated)"]

    style ROOT fill:#6366f1,color:#fff
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |
| `npx inngest-cli@latest dev` | Start Inngest dev server (port 8288) |

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** – Core user record; relates to sessions, accounts, and workflows
- **Session** – Session records with IP and user agent tracking
- **Account** – OAuth/credentials account linkage
- **Verification** – Email and identity verification tokens
- **Workflow** – Workflow document owned by a user; relates to nodes and connections
- **Node** – A node inside a workflow graph with position, type, and data
- **Connection** – An edge from one node to another; unique per from/to/handle pair
- **NodeType (enum)** – Currently `INITIAL`; extend as more node types are added

- **NodeType (enum)** – Values: `INITIAL`, `MANUAL_TRIGGER`, `HTTP_REQUEST` (extendable as new node types are added)

Relationships:
- A `User` has many `Workflow`s
- A `Workflow` has many `Node`s and many `Connection`s
- Each `Connection` links `fromNode -> toNode` with optional `fromOutput/toInput` handles

Run migrations with:
```bash
pnpm prisma migrate dev
```

View your data with Prisma Studio:
```bash
pnpm prisma studio
```

## Authentication

Quiver uses [Better Auth](https://better-auth.com/) for authentication, providing:

- ✅ Email/Password authentication
- ✅ Session management with JWT
- ✅ Email verification
- ✅ Secure password hashing
- ✅ OAuth providers support (extensible)

Authentication routes:
- `/login` - User login
- `/signup` - User registration

## Subscriptions & Billing (Polar)

Quiver integrates with [Polar](https://polar.sh/) to handle subscriptions, checkout, and customer portals. This lets you monetize premium features easily while keeping the developer experience smooth.

### What’s included

- 🔒 Create Polar customers automatically on signup
- 🧾 Hosted checkout for paid plans (configured products)
- 🪪 Customer portal for managing subscriptions
- 🔐 Premium route protection via tRPC middleware

### Where it’s configured

- `src/lib/polar.ts` – Polar SDK client using `POLAR_ACCESS_TOKEN` (sandbox by default)
- `src/lib/auth.ts` – Better Auth + Polar plugin configuration:
  - `createCustomerOnSignUp: true`
  - `checkout({ products: [...] , successUrl: POLAR_SUCCESS_URL })`
  - `portal()` for self-serve subscription management
- `src/trpc/init.ts` – `premiumProcedure` middleware that checks active subscriptions and throws `FORBIDDEN` if missing

### Gating premium APIs (example)

```ts
// src/trpc/init.ts
export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id,
  });
  if (!customer.activeSubscriptions || customer.activeSubscriptions.length === 0) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Premium membership required' });
  }
  return next({ ctx: { ...ctx, customer } });
});
```

Use `premiumProcedure` instead of `protectedProcedure` for any tRPC endpoints that require an active subscription.

## Workflows & Background Jobs

There are two related concerns in the codebase:

1) Workflow CRUD and visual editing (synchronous, via tRPC + Prisma):
- API lives in `src/features/workflows/server/routers.ts` mounted under `workflows` in the root router
- Endpoints:
  - `workflows.create` – Premium-gated; creates a new workflow pre-seeded with an `INITIAL` node
  - `workflows.remove` – Delete a workflow owned by the current user
  - `workflows.updateName` – Rename a workflow
  - `workflows.getOne` – Returns nodes and edges transformed to `@xyflow/react` shape
  - `workflows.getMany` – Paginated list with search and sorting
- Uses `random-word-slugs` to generate default names
- Uses `premiumProcedure` to enforce active subscription on create

2) Background jobs (asynchronous, via Inngest):
- Inngest is integrated and currently used to demonstrate an AI execution pipeline
- Function id `execute-ai` handles the `execute/ai` event and runs multiple AI providers in parallel with observability

### Inngest Dev Server

Run the Inngest dev server to test and monitor jobs locally:

```bash
npx inngest-cli@latest dev
```

Then visit [http://localhost:8288](http://localhost:8288) to view the dashboard.

### Client usage (tRPC)

A tiny example showing how to call the `workflows` endpoints using the tRPC React context exported from `src/trpc/client.tsx`:

```tsx
import { useTRPC } from '@/trpc/client';

export default function WorkflowsList() {
  const trpc = useTRPC();

  // Paginated list
  const { data } = trpc.workflows.getMany.useQuery({ page: 1, pageSize: 10 });

  // Create (premium-gated)
  const create = trpc.workflows.create.useMutation();

  return (
    <div>
      <button onClick={() => create.mutateAsync()}>Create workflow</button>
      <ul>
        {data?.items?.map((wf) => (
          <li key={wf.id}>{wf.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## AI Integration

Quiver integrates seamlessly with multiple AI providers through the Vercel AI SDK and Inngest's AI wrapper, enabling:

- 🤖 **Multi-Provider Support** - OpenAI, Google Gemini, and Anthropic Claude
- 🔄 **Automatic Retries** - Built-in error handling for AI API calls
- 📊 **Observable AI Steps** - Monitor and debug AI interactions in Inngest dashboard
- 🎯 **Type-Safe** - Full TypeScript support for all AI operations
- ⚡ **Parallel Processing** - Run multiple AI models simultaneously


### Supported AI Models (as configured)

| Provider | Model in code | Notes |
|----------|----------------|-------|
| OpenAI | `gpt-4` | General-purpose, reasoning, code generation |
| Google Gemini | `gemini-2.5-flash` | Fast responses, long context |
| Anthropic Claude | `claude-sonnet-4-5` | Extended context, complex reasoning |

## Error Tracking & Monitoring

Quiver uses [Sentry](https://sentry.io/) for comprehensive error tracking and performance monitoring across your entire application:

- 🐛 **Real-time Error Tracking** - Catch and diagnose errors before users report them
- 📊 **Performance Monitoring** - Track response times and identify bottlenecks
- 🤖 **AI Integration Monitoring** - Vercel AI SDK integration for tracking AI operations
- 🔍 **Session Replay** - See exactly what users experienced when errors occur
- 📝 **Console Logging** - Capture console logs for better debugging
- 🌐 **Full Stack Coverage** - Client, server, and edge runtime monitoring

### Sentry Configuration

Sentry is configured in three files:

**Server-side** (`sentry.server.config.ts`):
```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Track AI SDK operations
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
```

**Edge Runtime** (`sentry.edge.config.ts`):
```ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1,
  enableLogs: true,
});
```

**Client-side** (`src/instrumentation-client.ts`):
```ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration(), // Session replay for debugging
  ],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Features Monitored

- **Workflow Execution Errors** - Track failures in background jobs
- **AI API Calls** - Monitor inputs, outputs, and failures from OpenAI, Gemini, Claude
- **Database Queries** - Identify slow or failing Prisma operations
- **Authentication Issues** - Capture auth failures and security events
- **API Response Times** - Monitor tRPC endpoint performance

Try it locally:
- Visit `/sentry-example-page` to send a sample frontend error and trace a request through `/api/sentry-example-api`.


## Deployment

### Prerequisites for Production

1. Set up a PostgreSQL database (Railway, Supabase, Neon, etc.)
2. Configure environment variables
3. Build the application

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abhijeetkv/quiver)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Railway** - Automatic deployments with PostgreSQL
- **Render** - Full-stack hosting
- **AWS/GCP/Azure** - Enterprise-grade hosting

## Roadmap

### Core Features
- [ ] Visual workflow builder UI with drag-and-drop
- [ ] Pre-built app integrations (Gmail, Slack, GitHub, etc.)
- [ ] Webhook support for external triggers
- [ ] Scheduled workflows (Cron jobs)
- [ ] Conditional logic and branching in workflows
- [ ] Error handling and retry mechanisms
- [ ] Workflow templates library

### AI Features
- [x] Multi-provider AI integration (OpenAI, Gemini, Claude)
- [x] AI step observability with Inngest
- [ ] AI-powered workflow suggestions
- [ ] Natural language workflow creation
- [ ] Sentiment analysis actions
- [ ] Content generation steps
- [ ] Image generation integration
- [ ] Vector embeddings and semantic search

### Platform Features
- [x] Subscriptions & billing (Polar checkout & portal)
- [ ] Team collaboration features
- [ ] Analytics and insights dashboard
- [ ] API rate limiting
- [ ] Workflow versioning
- [ ] Custom code actions (JavaScript/Python)
- [ ] Workflow marketplace
- [ ] Multi-tenant support

## What's Built Today (MVP)

Currently implemented features:

- ✅ **Authentication System**
  - Email/password signup and login with Better Auth
  - Session management with secure token handling
  - Route guards (`requireAuth` / `requireUnauth`)
  - Protected and public routes

- ✅ **Workflow Management**
  - Create and list workflows via tRPC
  - Workflows stored in PostgreSQL via Prisma
  - Type-safe API with full client/server integration

- ✅ **Background Job Processing**
  - Inngest integration for durable workflow execution
  - Multi-step job example with sleep/wait capabilities
  - Job triggering from tRPC mutations
  - Local development dashboard at `localhost:8288`

- ✅ **AI Integration**
  - Multi-provider AI support (OpenAI, Google Gemini, Anthropic Claude)
  - Inngest AI wrapper for automatic retries and observability
  - Parallel AI model execution
  - Type-safe AI workflow definitions

- ✅ **Subscriptions & Billing**
  - Polar integration with hosted checkout & customer portal
  - Automatic customer creation on signup
  - Premium API protection via `premiumProcedure`

- ✅ **Error Tracking & Monitoring**
  - Sentry integration for full-stack error tracking
  - AI operation monitoring with Vercel AI SDK integration
  - Session replay for debugging user issues
  - Performance monitoring across client, server, and edge runtimes
  - Console log capture for comprehensive debugging

- ✅ **Modern UI Framework**
  - shadcn/ui components with Radix primitives
  - Tailwind CSS v4 for styling
  - Toast notifications with Sonner
  - Form handling with React Hook Form + Zod validation

- ✅ **Developer Experience**
  - Biome for fast linting and formatting
  - Turbopack for rapid development builds
  - Full TypeScript type safety across stack
  - tRPC for end-to-end type-safe APIs

### Current Flow Example

1. User signs up/logs in → Better Auth creates session
2. User clicks "Create Workflow" → `workflows.create` mutation runs (premium-gated)
3. Prisma creates workflow plus an initial `INITIAL` node
4. UI navigates to the editor and loads via `workflows.getOne` → nodes and edges in `@xyflow/react` shape
5. User edits graph; server persists changes via dedicated endpoints (TBD)

**AI Execution Example:**

1. User triggers an AI test → backend emits `execute/ai` event
2. Inngest function `execute-ai` runs three providers in parallel (Gemini, OpenAI, Claude)
3. Each call is wrapped with `step.ai.wrap` for retries and telemetry (visible in Inngest + Sentry)
4. Result aggregated and returned/logged with full observability

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Zapier](https://zapier.com/) and [Make](https://www.make.com/)
- Built with amazing open-source tools
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## Support

- 📧 Email: support@quiver.dev
- 🐛 Issues: [GitHub Issues](https://github.com/Abhijeetkv/quiver/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Abhijeetkv/quiver/discussions)

---

Star ⭐ this repository if you find it helpful!
