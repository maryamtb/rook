import { NextResponse } from "next/server";
import { DISCOUNT_CAP, getDiscountCount } from "@/lib/signups";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getDiscountCount();
    return NextResponse.json({
      count,
      cap: DISCOUNT_CAP,
      capReached: count >= DISCOUNT_CAP,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load count." },
      { status: 500 }
    );
  }
}
