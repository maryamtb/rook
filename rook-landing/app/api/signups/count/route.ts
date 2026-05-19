import { NextResponse } from "next/server";
import { DISCOUNT_CAP, computeSignupState, getDiscountCount } from "@/lib/signups";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getDiscountCount();
    const state = computeSignupState(count);
    return NextResponse.json({
      count,
      cap: DISCOUNT_CAP,
      state,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load count." },
      { status: 500 }
    );
  }
}
