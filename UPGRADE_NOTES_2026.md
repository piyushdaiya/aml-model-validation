# Upgrade Notes 2026

## Summary

- Stabilized the npm dependency tree and regenerated `package-lock.json` without `--force` or `--legacy-peer-deps`.
- Kept the app on Next.js 16 and moved React/React DOM plus React type packages to the React 19 line expected by the current Next release.
- Kept Prisma on the latest Prisma 6 line instead of migrating to Prisma 7, to avoid the required generator output/import rewrite and keep the database layer changes minimal.
- Replaced the removed `next lint` flow with ESLint CLI plus a flat `eslint.config.mjs`.
- Repaired the auth routes and Prisma singleton path so `/api/auth/register` now returns JSON responses instead of crashing during module evaluation.
- Updated the calendar wrapper for `react-day-picker` 9 and resolved the `date-fns` peer conflict cleanly.

## Dependency Changes

Notable direct package changes:

- `react`: `^18` -> `^19.2.0`
- `react-dom`: `^18` -> `^19.2.0`
- `@types/react`: `^18` -> `^19.2.2`
- `@types/react-dom`: `^18` -> `^19.2.2`
- `react-day-picker`: `8.10.1` -> `^9.11.1`
- `prisma`: `^6.12.0` -> `^6.19.0`
- `@prisma/client`: stayed on Prisma 6 and resolved to `6.19.2`
- `vaul`: `^0.9.6` -> `^1.1.2`
- `recharts`: `latest` -> `^3.4.0`
- `react-force-graph-2d`: `latest` -> `^1.27.0`
- `next-themes`: `latest` -> `^0.4.6`
- `jose`: `latest` -> `^6.1.2`
- `bcryptjs`: `latest` -> `^3.0.2`
- Added `eslint` and `eslint-config-next`
- Replaced `lint` script from `next lint` to `eslint .`

## Compatibility Decisions

- Prisma 7 was intentionally not adopted.
  Prisma 7 requires the client generator `output` field and import-path changes away from `@prisma/client`. This repo did not need that churn to become stable and working.
- `react-day-picker` was upgraded instead of downgrading `date-fns`.
  That resolved the install blocker while keeping the app on the newer `date-fns` line already present in the project.
- Next 16 stays in place.
  The repo was already on the Next 16 line, so the smallest safe move was framework alignment, not another major jump.
- `next lint` was removed.
  Next 16 removed that command, so linting now runs through ESLint directly.

## Auth and Prisma Fixes

- `lib/db.ts` now uses a clean Prisma singleton export pattern.
- `app/api/auth/register/route.ts` now:
  - trims and normalizes input
  - validates required fields
  - enforces a minimum password length
  - checks for existing users safely
  - hashes passwords with `bcryptjs`
  - creates a user with schema-compatible fields
  - returns structured JSON for success and failure paths
- `app/api/auth/login/route.ts` and `app/api/auth/logout/route.ts` now use Next 16 async cookie APIs.
- `app/register/page.tsx` now tolerates non-JSON responses defensively, but the route was also fixed so normal API failures return JSON.

## Commands Run

- `git checkout -b chore/full-dependency-upgrade-2026`
- `npm install`
- `npx prisma generate`
- `npm run build`
- `npx prisma db push`
- `npm run lint`
- `PORT=3001 npm start`
- `curl -s -i -X POST http://localhost:3001/api/auth/register ...`
- `npx tsc --noEmit --incremental false`

## Verification Results

- `npm install`: passed
- `npx prisma generate`: passed
- `npx prisma db push`: passed, database already in sync
- `npm run build`: passed
- `npm run lint`: passed
- Live `/api/auth/register` verification:
  - invalid payload returned JSON `400`
  - valid payload returned JSON `201`

## Remaining Manual Follow-ups

- Strict TypeScript is still not clean across the UI layer.
  `npx tsc --noEmit --incremental false` still reports many pre-existing type issues, so `next.config.mjs` still skips TypeScript build failures for now.
- There is no test suite configured in `package.json`, and no test files were found to run.
- Standardize on an LTS Node release in local/CI environments.
  This work was validated in the current machine environment, but Next 16 officially targets Node 20.9+.
