import { getSupabaseAdmin } from "@/lib/supabase";

export const DISCOUNT_CAP = 100;

export async function getDiscountCount(): Promise<number> {
  const { count, error } = await getSupabaseAdmin()
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
}
