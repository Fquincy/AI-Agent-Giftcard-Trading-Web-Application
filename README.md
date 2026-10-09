# Leyou Exchange — AI Agent Learning Project

A Next.js, React, and TypeScript gift card trading prototype being developed into an AI agent portfolio project.

## Current status

The website includes a landing page, onboarding, country selection for Nigeria and Ghana, registration, and login screens. Registration does not persist accounts, login does not authenticate, and the email endpoint does not send emails. No database, agent, live rates, trading, or payouts are implemented. Some handlers log passwords; use fictional data until corrected.

## Run locally

Requires Node.js and npm. From this directory:

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. Other configured commands: `npm run build`, `npm start`, and `npm run lint`. Build and lint have not been verified as part of this documentation work.

## Structure

- `app/page.tsx`: landing page.
- `app/layout.tsx`: shared layout, metadata, and font loading.
- `app/get-started/`: onboarding and registration pages.
- `app/login/page.tsx`: login form.
- `app/api/register/route.ts`: placeholder registration endpoint.
- `app/api/send-welcome-email/route.ts`: placeholder email endpoint.
- CSS files: styling, animations, responsive layouts.
- `public/`: logos, gift card illustrations, and flags.

## Learning plan

See [the learning roadmap](docs/LEARNING_ROADMAP.md) for the proposed milestones and job preparation plan.

## Repository hygiene

Keep API keys, environment files, real customer details, and gift card codes out of Git. The ignore rules exclude local environment files, dependencies, and build output. Use synthetic data for demonstrations.

Brand direction is yellow and white with dark text. The supplied hex value `#ffdef8` is pale pink, so confirm the intended yellow before applying a theme change. Current styling primarily uses mint green.
