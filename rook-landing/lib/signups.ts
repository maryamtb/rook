import { getSupabaseAdmin } from "@/lib/supabase";

// Real cap is 102 (2-row buffer for races); public copy still says "first 100".
export const DISCOUNT_CAP = 102;

// Only signups at or after this timestamp count toward the current round.
// 2026-05-19T07:01:00Z = 12:01 AM PDT on launch day. Keep in sync with db/discount-round.sql.
export const DISCOUNT_ROUND_START = "2026-05-19T07:01:00Z";

export async function getDiscountCount(): Promise<number> {
  const { count, error } = await getSupabaseAdmin()
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .gte("created_at", DISCOUNT_ROUND_START);

  if (error) throw error;
  return count ?? 0;
}
