# Lesson 2: Database and authentication

## What is implemented

Registration now creates a PostgreSQL user record with a normalized email and bcrypt password hash. Login verifies that hash, creates a seven-day database session, and sets an HTTP-only cookie. Logout deletes the session and clears the cookie. The dashboard and trade API require a valid session.

This uses a small application-owned session implementation and the maintained bcryptjs hashing library. It is a learning implementation, not a complete identity platform. Email verification, password recovery, stronger distributed abuse protection, and external identity providers are future work.

## Run it

From the application directory:

```powershell
npm ci
npm run db:generate
npm run db:local
```

Leave that terminal open. In a second terminal:

```powershell
npm run db:migrate
npm run db:seed
npm run dev
```

Visit http://localhost:3000 and use fictional registration details. Select your country first, create an account, and then log in. The dashboard starts with no trades for a new account; this milestone does not create transactions or move money.

The local runner starts actual PostgreSQL 17 through a development-only portable binary package. It listens on 127.0.0.1:54329. It creates `.env` only if absent, generates a random password, and stores data in `.local/postgres/`. Both are ignored by Git. Ctrl+C stops PostgreSQL while preserving its data. Restarting `db:local` reuses the same cluster. Do not remove the environment file without retaining the database credentials.

If you already have PostgreSQL, copy `.env.example` to `.env` and supply your connection string. Skip `db:local`. The portable runner is for local learning; use a managed or independently operated PostgreSQL service for deployment.

## Understand the tables

| Table | Purpose |
| --- | --- |
| User | Profile fields, unique lowercase email, hashed password |
| Session | Token hash, account relationship, expiry |
| LoginAttempt | Persistent counters for a fixed 15-minute window |
| GiftCardType | Gift card categories |
| Rate | Fictional currency rates using fixed-precision decimal |
| Trade | Owner, card type, amount in minor units, currency, status |
| SupportTicket | Owner and support request metadata |

Read `prisma/schema.prisma` for relationships and indexes. The SQL migration creates the tables reproducibly. `npm run db:migrate` applies committed migrations; when deliberately changing the schema in development, create a new migration with `npx prisma migrate dev --name describe_change`.

`npm run db:seed` upserts three card categories and six fictional rates. It does not create passwords, demo users, or market quotes. Existing rate records are preserved. `npm run db:studio` opens Prisma's database viewer; treat it as a development administration tool, not an application user screen.

## Follow login

1. `app/login/page.tsx` sends email/password to `/api/login` over HTTP locally, or HTTPS in deployment.
2. The API checks request origin, validates types and lengths, normalizes email, and checks a persistent per-email attempt counter.
3. bcrypt compares the submitted password to the stored hash. Unknown users get the same error as incorrect passwords.
4. A cryptographically random token is created. Only its SHA-256 hash is stored in PostgreSQL. Login also revokes the previous session token presented by this browser.
5. The raw token goes into an HTTP-only, SameSite=Lax cookie. Production sets Secure, so deploy over HTTPS. JavaScript cannot read an HTTP-only cookie.
6. On an authenticated request, `getCurrentUser` hashes the cookie token, looks up its session, checks expiry, and identifies the user.

Registration rejects passwords over 72 UTF-8 bytes because bcrypt otherwise silently truncates them. Password confirmation never reaches the API. Neither passwords nor tokens are printed in application logs.

State-changing auth endpoints require an Origin header matching `APP_ORIGIN`, or the inferred request origin in local development. Set the exact `APP_ORIGIN` in deployment, especially behind proxies. API clients must send that header too. This check addresses browser cross-origin requests; it is not a substitute for authentication or abuse protection.

## Why one user cannot read another user's trades

`/api/trades` always derives the owner from the session and includes `userId: user.id` in the database query. A supplied userId query parameter cannot override that filter. A requested trade belonging to another account returns 404. The dashboard applies the same owner filter.

This is the pattern future agent tools will use: the model supplies task arguments, while the server supplies the authenticated identity and enforces permissions.

## Verify it

With the database running:

```powershell
npm test
npm run lint
npm run build
npm run test:integration
```

Integration tests start a production server on port 3108, register two unique synthetic accounts, and clean up their data afterwards. They check persistence, duplicate normalization, password hashing, wrong credentials, cookie flags, protected routes, cross-user denial, token hashing, expiration, rotation, logout, and login throttling. Do not run them against a production database.

## Current limits

The 10-attempt limit is per normalized email and operation per 15-minute fixed window. It persists across processes, but does not stop attackers varying emails and can temporarily lock out an account. Use an appropriate gateway/distributed limiter before public use. Expired sessions and counters should be pruned periodically. Email verification, recovery, and MFA are not implemented. Dependency advisories must be reviewed before deployment. No real gift card data or financial transactions belong in this learning environment.

## Your exercise

Register a fictional account and locate its row in Prisma Studio. Confirm the password field contains a hash. Log in, inspect the session cookie in browser developer tools, and locate the related Session record. Log out and confirm the Session record is deleted. Restart the database and verify the User row is still present.

Explain in your own words why hashing a password differs from encrypting it, why the server decides the trade owner, and why deleting a cookie alone would not revoke a stolen session token.

Next milestone: a server-side FAQ assistant, followed by controlled rate and trade lookup tools.
