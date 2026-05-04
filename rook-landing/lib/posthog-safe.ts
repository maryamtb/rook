import posthog from "posthog-js";
import type { EventName } from "./events";

export function captureEvent(event: EventName, properties: Record<string, unknown>) {
  try {
    posthog.capture(event, properties);
  } catch {
    // best-effort
  }
}

export function identifyEmail(email: string) {
  try {
    posthog.identify(email, { email });
  } catch {
    // best-effort
  }
}
