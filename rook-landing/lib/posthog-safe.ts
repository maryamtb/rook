import posthog from "posthog-js";

export function captureEvent(event: string, properties: Record<string, unknown>) {
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
