"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import { subscribeRequest } from "@/lib/subscribe-client";

export function FooterNewsletter({ source = "footer_newsletter" }: { source?: string; }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const outcome = await subscribeRequest(email);
    if (!isMounted.current) return;

    switch (outcome.kind) {
      case "ok":
        identifyEmail(email);
        captureEvent("subscriber_signup", { source });
        toast("Subscribed.", { style: { background: "#2D6A4F", color: "#fff", border: "none" } });
        setSubmitted(true);
        break;
      case "duplicate":
        captureEvent("subscriber_signup_duplicate", { source });
        toast(outcome.message ?? "You're already in.", { style: { background: "#3D5F53", color: "#fff", border: "none" } });
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
