"use client";

import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { Mail } from "lucide-react";
import { SHOW_DISCOUNT_COUNTER, SIGNUPS_DISABLED } from "@/lib/constants";
import type { SignupMeta } from "@/hooks/use-signup-meta";

export function NotifyForm({ meta, capReached: capReachedProp }: { meta: SignupMeta | null; capReached: boolean; }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [forcedCapReached, setForcedCapReached] = useState(false);

  const capReached = forcedCapReached || capReachedProp;
  const endpoint = capReached ? "/api/subscribers" : "/api/waitlist";
  const eventBase = capReached ? "subscriber_signup" : "pro_discount_signup";
  const buttonLabel = capReached ? "Subscribe" : "Claim discount";
  const successMessage = capReached
    ? "Subscribed."
    : "Claimed! We'll email you when Pro is ready.";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (SIGNUPS_DISABLED) return;
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 410) {
          // Cap was reached between page load and submit. Switch to launch variant.
          setForcedCapReached(true);
          toast(data.error, { style: { background: "var(--rook)", color: "#111", border: "none" } });
        } else if (res.status === 409) {
          posthog.capture(`${eventBase}_duplicate`, { source: "homepage_cta" });
          toast(data.error, { style: { background: "var(--rook)", color: "#111", border: "none" } });
        } else {
          toast.error(data.error || "Something went wrong. Please try again in a few moments.");
        }
        return;
      }

      posthog.identify(email, { email });
      posthog.capture(eventBase, { source: "homepage_cta" });
      toast(successMessage, { style: { background: "#2D6A4F", color: "#fff", border: "none" } });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again in a few moments.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-[15px] text-muted-foreground">
        You&apos;re on the list! More soon ✏️
      </p>
    );
  }

  return (
    <div className="max-w-sm mx-auto">
      <CountPill meta={meta} forcedCapReached={forcedCapReached} />
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
          {SIGNUPS_DISABLED ? "Unavailable" : loading ? "Sending..." : buttonLabel}
        </BrandButton>
      </form>
    </div>
  );
}

const DISPLAY_CAP = 100;

function CountPill({ meta, forcedCapReached }: { meta: SignupMeta | null; forcedCapReached: boolean; }) {
  if (!SHOW_DISCOUNT_COUNTER) return null;

  if (!meta) {
    return <p className="mb-3 h-[20px]" aria-hidden />;
  }

  const capReached = forcedCapReached || meta.capReached;
  if (capReached) return null;

  const shown = Math.min(meta.count, DISPLAY_CAP);

  return (
    <p className="mb-3 text-sm sm:text-[13px] text-muted-foreground text-center">
      <span className="text-foreground font-medium tabular-nums">{shown} / {DISPLAY_CAP}</span>{" "}
      discount spots claimed
    </p>
  );
}
