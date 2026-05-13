"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { Mail } from "lucide-react";
import { useEmailForm } from "@/hooks/use-email-form";
import { useLaunchState } from "@/hooks/use-launch-state";
import { FooterNewsletter } from "@/components/footer-newsletter";
import { PRODUCT_HUNT_URL, SIGNUPS_DISABLED } from "@/lib/constants";
import { EVENT } from "@/lib/events";
import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import { TOAST_STYLE } from "@/lib/toast";
import type { SignupMeta } from "@/hooks/use-signup-meta";

const SUBMIT_TIMEOUT_MS = 10_000;

export function NotifyForm({ meta }: { meta: SignupMeta | null }) {
  const { email, setEmail, loading, setLoading, submitted, setSubmitted, isMounted } = useEmailForm();
  const [capJustFilled, setCapJustFilled] = useState(false);

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
          toast(data.error ?? "Waitlist just filled.", { style: TOAST_STYLE.highlight });
        } else if (res.status === 409) {
          captureEvent(EVENT.ProDiscountSignupDuplicate, { source: "homepage_cta" });
          toast(data.error ?? "You're already on the list.", { style: TOAST_STYLE.duplicate });
        } else {
          toast.error(data.error ?? "Something went wrong. Please try again in a few moments.");
        }
        return;
      }

      identifyEmail(email);
      captureEvent(EVENT.ProDiscountSignup, { source: "homepage_cta" });
      toast("Claimed! We'll email you when Pro is ready.", { style: TOAST_STYLE.success });
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
      <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
        <p className="text-[15px] font-semibold text-foreground">
          You&apos;re in! Support our launch on PH today:
        </p>
        <a
          href={PRODUCT_HUNT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Upvote Rook on Product Hunt"
          onClick={() => captureEvent(EVENT.ProductHuntClick, { source: "post_claim" })}
          className="inline-block transition-opacity hover:opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Upvote Rook on Product Hunt"
            width={250}
            height={54}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=light&t=1778598985994"
            className="h-12 w-auto"
          />
        </a>
      </div>
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
          className="h-10 sm:shrink-0 cursor-pointer bg-ph-orange hover:bg-ph-orange-hover text-white"
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
  const { showDiscount } = useLaunchState();
  if (!showDiscount) return null;
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
    <div className="max-w-sm mx-auto space-y-3 text-center">
      <p className="text-sm sm:text-[14px] text-muted-foreground">
        The first 100 spots are claimed. Pro is shipping soon, subscribe for updates:
      </p>
      <FooterNewsletter source="waitlist_closed" />
    </div>
  );
}
