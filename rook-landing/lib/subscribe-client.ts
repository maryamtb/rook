import type { Platform } from "@/lib/platforms";

export type { Platform };

export type SubscribeOutcome =
  | { kind: "ok"; }
  | { kind: "duplicate"; message?: string; }
  | { kind: "error"; message: string; }
  | { kind: "timeout"; };

const SUBMIT_TIMEOUT_MS = 10_000;

export async function subscribeRequest(
  email: string,
  options: { platforms?: Platform[]; } = {},
): Promise<SubscribeOutcome> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  const hasPlatforms = options.platforms && options.platforms.length > 0;
  const endpoint = hasPlatforms ? "/api/platform-waitlist" : "/api/subscribers";
  const body = hasPlatforms
    ? { email, platforms: options.platforms }
    : { email };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data: { error?: string; } = await res.json().catch(() => ({}));

    if (res.ok) return { kind: "ok" };
    if (res.status === 409) return { kind: "duplicate", message: data.error };
    return {
      kind: "error",
      message: data.error ?? "Something went wrong. Please try again in a few moments.",
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { kind: "timeout" };
    }
    return { kind: "error", message: "Something went wrong. Please try again in a few moments." };
  } finally {
    window.clearTimeout(timeout);
  }
}
