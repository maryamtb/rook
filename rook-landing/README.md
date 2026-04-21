# rook-landing

The marketing site behind [userook.app](https://userook.app). Next.js 15, TypeScript, Tailwind, shadcn/ui, Framer Motion. Waitlist form backed by Supabase with notifications via Resend.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in the values before running.

## Scripts

```bash
pnpm dev           # Next.js dev server
pnpm build         # production build
pnpm start         # run production build locally
pnpm lint          # eslint
```

## Layout

```
app/
  api/waitlist/    # POST handler (Supabase insert + Resend email)
  page.tsx         # landing page
  not-found.tsx    # 404
components/
  mockup/          # animated app mockup (split by piece)
  ui/              # shadcn primitives
  notify-form.tsx  # waitlist form
lib/
  themes.ts        # theme palettes used by the mockup
  supabase.ts      # Supabase client (singleton)
```

## Environment

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key (public, RLS enforced) |
| `RESEND_API_KEY` | Resend API key for waitlist emails |
| `NOTIFY_EMAIL` | Where new-signup notifications land |
