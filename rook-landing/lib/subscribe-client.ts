export type SubscribeOutcome =
  | { kind: "ok"; }
  | { kind: "duplicate"; message?: string; }
  | { kind: "error"; message: string; }
  | { kind: "timeout"; };

const SUBMIT_TIMEOUT_MS = 10_000;

export async function subscribeRequest(email: string): Promise<SubscribeOutcome> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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
