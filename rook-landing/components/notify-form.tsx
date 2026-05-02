"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { Mail } from "lucide-react";
import { SHOW_DISCOUNT_COUNTER, SIGNUPS_DISABLED } from "@/lib/constants";
import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import type { SignupMeta } from "@/hooks/use-signup-meta";

const SUBMIT_TIMEOUT_MS = 10_000;

export function NotifyForm({ meta }: { meta: SignupMeta | null }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [capJustFilled, setCapJustFilled] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (SIGNUPS_DISABLED || loading) return;
    setLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!isMounted.current) return;

      if (!res.ok) {
        if (res.status === 410) {
          setCapJustFilled(true);
          toast(data.error ?? "Waitlist just filled.", { style: { background: "var(--rook)", color: "#111", border: "none" } });
        } else if (res.status === 409) {
          captureEvent("pro_discount_signup_duplicate", { source: "homepage_cta" });
          toast(data.error ?? "You're already on the list.", { style: { background: "#3D5F53", color: "#fff", border: "none" } });
        } else {
          toast.error(data.error ?? "Something went wrong. Please try again in a few moments.");
        }
        return;
      }

      identifyEmail(email);
      captureEvent("pro_discount_signup", { source: "homepage_cta" });
      toast("Claimed! We'll email you when Pro is ready.", { style: { background: "#2D6A4F", color: "#fff", border: "none" } });
      setSubmitted(true);
    } catch (err) {
      if (!isMounted.current) return;
      const aborted = err instanceof DOMException && err.name === "AbortError";
      toast.error(
        aborted
          ? "The request took too long. Please try again."
          : "Something went wrong. Please try again in a few moments.",
      );
    } finally {
      window.clearTimeout(timeout);
      if (isMounted.current) setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-[15px] text-muted-foreground">
        You&apos;re on the list! More soon ✏️
      </p>
    );
  }

  if (capJustFilled) {
    return <WaitlistClosedNotice />;
  }

  return (
    <div className="max-w-sm mx-auto">
      <CountPill meta={meta} />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input
          type="email"
          placeholder={SIGNUPS_DISABLED ? "Signups paused" : "rhoward@dundermifflin.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={SIGNUPS_DISABLED}
          className="h-10 w-full"
        />
        <BrandButton
          type="submit"
          disabled={SIGNUPS_DISABLED || loading || !meta}
          className="h-10 sm:shrink-0 cursor-pointer"
        >
          <Mail className="size-4" />
          {SIGNUPS_DISABLED ? "Unavailable" : loading ? "Sending..." : "Claim discount"}
        </BrandButton>
      </form>
    </div>
  );
}

const DISPLAY_CAP = 100;

function CountPill({ meta }: { meta: SignupMeta | null }) {
  if (!SHOW_DISCOUNT_COUNTER) return null;
  if (!meta) return <p className="mb-3 h-[20px]" aria-hidden />;
  if (meta.capReached) return null;

  const shown = Math.min(meta.count, DISPLAY_CAP);

  return (
    <p className="mb-3 text-sm sm:text-[13px] text-muted-foreground text-center">
      <span className="text-foreground font-medium tabular-nums">{shown} / {DISPLAY_CAP}</span>{" "}
      discount spots claimed
    </p>
  );
}

export function WaitlistClosedNotice() {
  return (
    <div className="max-w-sm mx-auto text-sm sm:text-[14px] text-muted-foreground space-y-2">
      <p>The Pro discount waitlist is full. We&apos;ll reopen it closer to launch.</p>
      <p>
        Want release notes in the meantime?{" "}
        <Link href="#download" className="underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground transition-colors">
          Subscribe here
        </Link>
        .
      </p>
    </div>
  );
}
