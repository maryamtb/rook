import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · Rook",
  description: "How Rook handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="max-w-[680px] mx-auto">
        <header className="mb-16">
          <Link
            href="/"
            aria-label="Back to Rook home"
            className="inline-block mb-10"
          >
            <Image
              src="/icon-512.png"
              alt="Rook"
              width={56}
              height={56}
              className="rounded-[14px] transition-transform hover:scale-105"
            />
          </Link>
          <h1 className="text-[clamp(28px,4vw,40px)] font-mono font-bold tracking-[-0.03em] leading-[1.1]">
            Privacy
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Last updated: April 27, 2026
          </p>
        </header>

        <div className="space-y-12 text-[14.5px] leading-[1.7] text-foreground/85">
          <section>
            <p>
              Rook is a notes app for developers, built by Maryam TB. This
              page explains what we collect, why, and how to remove your
              data.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              The app itself
            </h2>
            <p className="mb-3">
              Rook is local-first. Your notes are stored on your Mac in
              Rook&apos;s application support folder.{" "}
              <strong className="text-foreground font-medium">
                We don&apos;t send your notes anywhere.
              </strong>
            </p>
            <p className="mb-3">
              Starting with version 1.2, the app sends two kinds of anonymous
              data:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Anonymous usage events
                  </strong>{" "}
                  via Aptabase (EU-hosted): app launches and feature usage,
                  tagged with the app version. No note content, no IP, no
                  identifiers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Crash reports
                  </strong>{" "}
                  via Sentry (EU-hosted): when Rook crashes, the stack trace
                  and macOS version are sent so we can fix the bug. No note
                  content, no screenshots, no IP, no captured URLs.
                </span>
              </li>
            </ul>
            <p>
              The app also checks a public URL on each launch to see if a
              new version is available (auto-update). That check is
              read-only. No data is sent.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              The website (userook.app)
            </h2>
            <p className="mb-3">
              We use cookieless analytics, so we don&apos;t track you across
              sessions or identify individual visitors. We collect aggregate
              data only:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Page views and approximate referral source (Reddit, X, direct, etc.)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Download events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Sign-up form events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Approximate geography (country level)</span>
              </li>
            </ul>
            <p className="mb-3">
              No tracking cookies, cross-site tracking, or fingerprinting.
            </p>
            <p className="mb-3">Tools we use:</p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Vercel for hosting and analytics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>PostHog (cookieless mode) for events</span>
              </li>
            </ul>
            <p>
              For specifics on what runs in your browser, see the{" "}
              <Link
                href="/cookies"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground transition-colors"
              >
                cookies page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              When you sign up
            </h2>
            <p className="mb-3">
              If you sign up for updates or the lifetime discount, we
              collect:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Your email address</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>The date you signed up</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Which list you joined (lifetime or general updates)</span>
              </li>
            </ul>
            <p className="mb-3">
              We use this to send you product updates and major
              announcements. We don&apos;t sell your email, share it with
              anyone, or use it for anything else.
            </p>
            <p className="mb-3">
              Email addresses are stored in Supabase (supabase.com). Email
              delivery is handled by Resend (resend.com).
            </p>
            <p>
              We process your email based on your consent, which you can
              withdraw at any time using the unsubscribe link in any email
              or by emailing{" "}
              <a
                href="mailto:hello@userook.app"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground transition-colors"
              >
                hello@userook.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              How long we keep your data
            </h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  Email: until you unsubscribe (link in every email) or email
                  us to delete
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  Analytics events: retained per the providers&apos; defaults
                  (up to 1 year). Email us to delete events tied to your
                  address sooner.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  App telemetry: retained per Aptabase and Sentry defaults
                  (typically 30 to 90 days). Since events are anonymous, we
                  can&apos;t delete a specific user&apos;s events on request,
                  but we can purge the entire dataset.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Your rights
            </h2>
            <p className="mb-3">
              Email{" "}
              <a
                href="mailto:hello@userook.app"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground transition-colors"
              >
                hello@userook.app
              </a>{" "}
              to:
            </p>
            <ul className="space-y-2 mb-3 ml-4">
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>See what data we have associated with your email</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>Delete your data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rook/60 select-none shrink-0">·</span>
                <span>
                  Stop receiving emails (or use the unsubscribe link in any
                  email)
                </span>
              </li>
            </ul>
            <p>We aim to respond within 7 days.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Children
            </h2>
            <p>
              Rook is not directed at children under 13. We don&apos;t
              knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Changes
            </h2>
            <p>
              If we materially change what we collect or how we use it,
              we&apos;ll update this page and note the change. Existing email
              subscribers will be notified before any change that affects
              them.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Contact
            </h2>
            <p>
              Built by Maryam TB.
              <br />
              <a
                href="mailto:hello@userook.app"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground transition-colors"
              >
                hello@userook.app
              </a>
            </p>
          </section>
        </div>

        <footer className="mt-24 pt-8 border-t border-border/50 text-[13px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
