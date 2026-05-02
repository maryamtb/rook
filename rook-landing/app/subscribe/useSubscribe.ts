"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import { subscribeRequest } from "@/lib/subscribe-client";

export type Status =
  | "ready"
  | "submitting"
  | "success"
  | "duplicate"
  | "error"
  | "missingEmail";

export function useSubscribe(email: string, sourceTag: string) {
  const [status, setStatus] = useState<Status>(email ? "ready" : "missingEmail");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const confirm = useCallback(async () => {
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMessage(null);

    const outcome = await subscribeRequest(email);
    if (!isMounted.current) return;

    switch (outcome.kind) {
      case "ok":
        identifyEmail(email);
        captureEvent("subscriber_signup", { source: sourceTag });
        setStatus("success");
        return;
      case "duplicate":
        captureEvent("subscriber_signup_duplicate", { source: sourceTag });
        setStatus("duplicate");
        return;
      case "timeout":
        setErrorMessage("The request took too long. Please try again.");
        setStatus("error");
        return;
      case "error":
        setErrorMessage(outcome.message);
        setStatus("error");
        return;
    }
  }, [email, sourceTag, status]);

  return { status, errorMessage, confirm };
}
