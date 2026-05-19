import { getSupabaseAdmin } from "@/lib/supabase";
import { SIGNUPS_DISABLED } from "@/lib/constants";

// Real cap is 102 (2-row buffer for races); public copy still says "first 100".
export const DISCOUNT_CAP = 102;

// Only signups at or after this timestamp count toward the current round.
// 2026-05-20T07:01:00Z = 12:01 AM PDT on launch day. Keep in sync with the Supabase trigger.
export const DISCOUNT_ROUND_START = "2026-05-20T07:01:00Z";
export const DISCOUNT_ROUND_START_MS = Date.parse(DISCOUNT_ROUND_START);

export type SignupState = "disabled" | "prelaunch" | "discount" | "closed";

export function computeSignupState(count: number, nowMs: number = Date.now()): SignupState {
  if (SIGNUPS_DISABLED) return "disabled";
  if (nowMs < DISCOUNT_ROUND_START_MS) return "prelaunch";
  if (count >= DISCOUNT_CAP) return "closed";
  return "discount";
}

export async function getDiscountCount(): Promise<number> {
  const { count, error } = await getSupabaseAdmin()
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .gte("created_at", DISCOUNT_ROUND_START);

  if (error) throw error;
  return count ?? 0;
}
