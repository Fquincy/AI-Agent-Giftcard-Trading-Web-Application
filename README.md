# Leyou Exchange — AI Agent Learning Project

A Next.js, React, and TypeScript gift card trading prototype being developed into an AI agent portfolio project.

## Current status

The website includes a landing page, onboarding, country selection for Nigeria and Ghana, registration, login, and an authenticated dashboard. PostgreSQL persists accounts and sessions. Passwords are hashed with bcrypt; session tokens are stored as SHA-256 hashes. Trade queries are restricted to the signed-in user. Seeded rates are fictional. AI chat, trading, payouts, email delivery, and password reset are not implemented. Use fictional data for learning.

## Run locally

Requires Node.js 22.18+ (24 LTS recommended) and npm. Tests use Node's built-in TypeScript support. From this directory:

```powershell
npm ci
npm run db:generate
npm run db:local
```

Keep the database terminal open. On first launch it creates an ignored `.env` with a randomly generated local database password and stores data in ignored `.local/postgres/`.

In a second terminal in this directory:

```powershell
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000, register with sample details, and log in to see `/dashboard`. Other commands: `npm run build`, `npm start`, `npm run lint`, `npm test`, and `npm run test:integration` (requires a running database and production build). System fonts allow builds without downloading Google fonts.

For an existing PostgreSQL server, copy `.env.example` to `.env`, set `DATABASE_URL`, and skip `db:local`. When deploying, set `APP_ORIGIN` to the exact HTTPS origin and run migrations. See [Lesson 2](docs/LESSON_2.md) for architecture and current limitations.

## Structure

- `app/page.tsx`: landing page.
- `app/layout.tsx`: shared layout and metadata.
- `app/lib/registration.ts`: server validation and shared password rules.
- `app/get-started/`: onboarding and registration pages.
- `app/login/page.tsx`: login form.
- `app/api/register/route.ts`: validation and persisted registration.
- `app/api/login/`, `app/api/logout/`, `app/api/me/`: session endpoints.
- `app/api/trades/`: authenticated trade queries.
- `app/dashboard/`: authenticated account page.
- `app/lib/auth.ts`, `app/lib/db.ts`: session helpers and shared Prisma client.
- `prisma/`: schema, migrations, and fictional seed data.
- `scripts/local-db.mjs`: development PostgreSQL runner.
- `app/api/send-welcome-email/route.ts`: placeholder email endpoint.
- CSS files: styling, animations, responsive layouts.
- `public/`: logos, gift card illustrations, and flags.

## Learning plan

See [the learning roadmap](docs/LEARNING_ROADMAP.md) for the proposed milestones and job preparation plan.

Start with [Lesson 1: registration request flow](docs/LESSON_1.md) to understand the foundation changes and try a small exercise.

Continue with [Lesson 2: database and authentication](docs/LESSON_2.md).

## Repository hygiene

Keep API keys, environment files, real customer details, and gift card codes out of Git. The ignore rules exclude local environment files, dependencies, and build output. Use synthetic data for demonstrations.

Brand direction is yellow and white with dark text. The supplied hex value `#ffdef8` is pale pink, so confirm the intended yellow before applying a theme change. Current styling primarily uses mint green.
