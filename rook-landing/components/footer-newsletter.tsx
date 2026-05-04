"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { useEmailForm } from "@/hooks/use-email-form";
import { EVENT } from "@/lib/events";
import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import { subscribeRequest } from "@/lib/subscribe-client";
import { TOAST_STYLE } from "@/lib/toast";

export function FooterNewsletter({ source = "footer_newsletter" }: { source?: string }) {
  const { email, setEmail, loading, setLoading, submitted, setSubmitted, isMounted } = useEmailForm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const outcome = await subscribeRequest(email);
    if (!isMounted.current) return;

    switch (outcome.kind) {
      case "ok":
        identifyEmail(email);
        captureEvent(EVENT.SubscriberSignup, { source });
        toast("Subscribed.", { style: TOAST_STYLE.success });
        setSubmitted(true);
        break;
      case "duplicate":
        captureEvent(EVENT.SubscriberSignupDuplicate, { source });
        toast(outcome.message ?? "You're already in.", { style: TOAST_STYLE.duplicate });
        setSubmitted(true);
        break;
      case "timeout":
        toast.error("The request took too long. Please try again.");
        break;
      case "error":
        toast.error(outcome.message);
        break;
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <p className="text-[13px] text-muted-foreground">
        You&apos;re on the list. ✏️
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 items-stretch sm:w-auto sm:flex-row sm:items-center"
    >
      <Input
        type="email"
        placeholder="rhoward@dundermifflin.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-9 sm:w-64"
        aria-label="Email address"
      />
      <BrandButton
        type="submit"
        disabled={loading}
        className="h-9 sm:shrink-0 cursor-pointer"
      >
        {loading ? "Sending…" : "Subscribe"}
      </BrandButton>
    </form>
  );
}
