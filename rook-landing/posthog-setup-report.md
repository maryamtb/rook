<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new) — PostHog is now initialized using the Next.js 15.3+ recommended pattern (`instrumentation-client.ts`) with exception capture enabled, a reverse proxy via `/ingest`, and EU host.
- **`next.config.ts`** (updated) — Added reverse proxy rewrites routing `/ingest/*` to `eu.i.posthog.com` and `/ingest/static/*`, `/ingest/array/*` to `eu-assets.i.posthog.com`. Also set `skipTrailingSlashRedirect: true`.
- **`components/posthog-init.tsx`** (updated) — Converted to a no-op component. PostHog initialization was moved to `instrumentation-client.ts` to avoid double-init.
- **`lib/posthog-server.ts`** (new) — Server-side PostHog client using `posthog-node`.
- **`app/api/waitlist/route.ts`** (updated) — Added server-side `waitlist_signup` event capture and `identify` call on successful new waitlist insertions.
- **`components/notify-form.tsx`** (updated) — Added `waitlist_signup` and `waitlist_signup_duplicate` capture, plus `posthog.identify()` with email on success.
- **`app/early/page.tsx`** (updated) — Added `early_access_signup` capture (with `returning` property) and `posthog.identify()` on both new and returning users.
- **`app/page.tsx`** (updated) — Added `github_click` (nav + hero) and `product_hunt_click` (nav + hero mobile) event captures.
- **`.env.local`** (updated) — Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
- **`posthog-node`** installed as a production dependency.

## Events

| Event | Description | File |
|---|---|---|
| `install_click` | Download button click, with `source` property (pre-existing) | `app/page.tsx`, `app/early/page.tsx`, `components/countdown-banner.tsx` |
| `waitlist_signup` | User successfully joins the waitlist | `components/notify-form.tsx`, `app/api/waitlist/route.ts` |
| `waitlist_signup_duplicate` | User tries to join but is already on the list (409) | `components/notify-form.tsx` |
| `early_access_signup` | User submits email on the early access page | `app/early/page.tsx` |
| `github_click` | User clicks the GitHub repository link | `app/page.tsx` |
| `product_hunt_click` | User clicks the Product Hunt badge | `app/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://eu.posthog.com/project/165868/dashboard/641928
- **Install clicks by source:** https://eu.posthog.com/project/165868/insights/Mn4rfsmq
- **Waitlist signups over time:** https://eu.posthog.com/project/165868/insights/thFnMwNu
- **Waitlist to install funnel:** https://eu.posthog.com/project/165868/insights/0XnQBB5d
- **GitHub & Product Hunt clicks:** https://eu.posthog.com/project/165868/insights/ZUdDK6bB
- **Early access to install funnel:** https://eu.posthog.com/project/165868/insights/UJrVblEt

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
