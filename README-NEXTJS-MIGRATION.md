# APTG ISP — Next.js migration preview

These files are a migration draft for the APTG ISP interface. They are intended to be reviewed and tested on a dedicated branch before being promoted to main.

## Files in this change
- `package.json` — Next.js scripts and dependencies
- `app/layout.tsx` — root layout and metadata
- `app/page.tsx` — mobile-responsive APTG landing page and preview UI
- `app/globals.css` — migrated styles
- `postcss.config.mjs` — Next.js-compatible PostCSS config
- `tsconfig.json` — TypeScript config for Next.js

## Current limitations
- Mobile Money payment collection and verified payment callbacks are not enabled.
- Customer authentication is a UI preview; it does not authenticate users.
- Router provisioning and automatic internet expiry are not enabled.
- Existing AppDeploy backend endpoints are not yet migrated into Next.js route handlers.
- The older Vite entry files remain in the repository as a reference during migration.

## Vercel settings
- Framework preset: Next.js
- Root directory: `./`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave unset / let Next.js choose its default

Test a preview deployment before making it the production target.
