# Lesson 1: Follow a registration request

This describes the first foundation milestone. The database milestone in [Lesson 2](LESSON_2.md) now replaces registration's temporary HTTP 501 response with account creation and HTTP 201. The email endpoint remains unavailable.

## What you are learning

A reliable agent needs reliable tools. An API that reports success without completing its job would mislead both a person and an agent. This milestone makes the existing prototype report what actually happened before we add a database.

## Follow the code

1. In `app/get-started/signup/register/page.tsx`, React state stores field values. `useEffect` reads the country saved in the browser tab. The browser checks required fields and password confirmation for immediate feedback.
2. `handleSubmit` prevents normal page reload and sends JSON with `fetch('/api/register')`. It excludes password confirmation, trims name/email/address, and removes leading local phone zeros before adding the international country code. Submitting state disables the button during a request.
3. In `app/api/register/route.ts`, `POST` parses the request. Invalid JSON returns HTTP 400.
4. `app/lib/registration.ts` checks data types, required fields, email format, supported country, phone format/prefix, password complexity, and length limits. Invalid fields produce HTTP 400 with `{ error, errors }`.
5. Valid input currently produces HTTP 501 with an explicit unavailable message. No account has been saved, so it must not return account creation success. A future database implementation will replace this response with persistence followed by HTTP 201.
6. The browser uses `response.ok` to decide whether the request succeeded, displays errors, and stays on the form. Network failures produce an unable-to-confirm message rather than a success alert.

Browser validation improves usability. Server validation is essential because callers can bypass the browser and send requests directly. The phone checks enforce international formatting and the selected prefix; they do not verify that the number exists or belongs to the user.

## Other changes

- Login and reset password now state that they are unavailable, instead of logging passwords or doing nothing.
- The email placeholder returns HTTP 501 and never reads or logs a password. Future welcome emails should be sent server-side after account creation.
- ESLint now uses compatibility configuration appropriate for the installed Next.js 15 package.
- Unescaped JSX punctuation was corrected without changing the displayed text.
- Unused Google font downloads were removed; CSS already specifies system fonts.

## Run the checks

```powershell
npm test
npm run lint
npm run build
```

Tests use synthetic details and exercise malformed requests, invalid field types, supported countries, phone prefixes, passwords, and length limits. Building also checks TypeScript and produces the application for production.

## Try it yourself

Run `npm run dev`, select Nigeria or Ghana, and fill in fictional details. A valid form should say that account creation is unavailable. Open browser developer tools, select Network, and inspect the registration request's status and response. Never share a screenshot containing a real password.

Then explain these three questions in your own words:

1. Why must the server validate input even when the browser already does?
2. What is the difference between HTTP 400, 501, and 201 in this flow?
3. Where will database insertion belong, and why should success follow insertion?

Next milestone: PostgreSQL tables, migrations, and persisted accounts with authentication. The AI agent comes after those backend tools behave reliably.
