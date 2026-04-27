import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies · Rook",
  description: "Rook's site runs without tracking cookies.",
};

export default function CookiesPage() {
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
            Cookies
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Rook&apos;s site runs without tracking cookies
          </p>
        </header>

        <div className="space-y-12 text-[14.5px] leading-[1.7] text-foreground/85">
          <section>
            <p>
              This site uses cookieless analytics by design.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Vercel Analytics
            </h2>
            <p>
              Counts page views and aggregate web vitals (load times, route
              counts). Cookieless and anonymous.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              PostHog
            </h2>
            <p>
              Configured with{" "}
              <code className="font-mono text-[13px] text-rook">
                persistence: &quot;memory&quot;
              </code>
              . PostHog generates a session ID that exists only for your
              current visit and disappears when you close the tab. No
              cookies, no localStorage entries, no cross-session identifier.
              Once you submit your email through a sign-up form, your email
              is sent server-side along with the signup event so we can
              measure signup conversions. We don&apos;t link your email to
              anonymous browsing before that point.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              Strictly necessary
            </h2>
            <p>
              The hosting provider (Vercel) may use short-lived cookies for
              security and to route requests reliably. These are essential
              for the site to function and don&apos;t track you.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight mb-3 text-foreground">
              The macOS app
            </h2>
            <p>
              The macOS app doesn&apos;t use cookies. For what the app does
              send (anonymous, EU-hosted), see the{" "}
              <Link
                href="/privacy"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground transition-colors"
              >
                privacy page
              </Link>
              .
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
