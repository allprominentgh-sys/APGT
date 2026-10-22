# All Prominent Telecommunication Ghana (APTG) — Community ISP

Source snapshot copied from AppDeploy app `communitynet-isp-ugpgmr` (source version `1792681912677`).

## Stack
- React 19, Vite 6, TypeScript
- Tailwind CSS
- AppDeploy backend routes and persistence adapter

## Internet plans
- GH₵10 — 24 hours
- GH₵15 — 3 days
- GH₵35 — 7 days
- GH₵150 — 30 days

## Important notes
- This repository is a source backup only. No deployment was started and the live AppDeploy site was not changed.
- Mobile Money collection, verified payment webhook handling, router integration, and automatic expiry enforcement are not yet enabled in this source. The backend intentionally fails closed until these integrations are configured and verified.
- Never commit production credentials or API tokens. Use the hosting platform's secure secret manager.
- The backend imports `@appdeploy/sdk`; running outside AppDeploy may require adapting that integration.

## Imported source files
- `backend/index.ts`
- `backend/realtime-subscribers.ts`
- `backend/realtime.ts`
- `index.html`
- `package.json`
- `postcss.config.js`
- `src/App.tsx`
- `src/index.css`
- `src/main.tsx`
- `tailwind.config.js`
- `tests/tests.json`
- `tsconfig.json`
- `vite.config.ts`
