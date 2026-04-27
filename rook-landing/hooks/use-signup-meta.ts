"use client";

import { useEffect, useState } from "react";
import { SHOW_DISCOUNT_COUNTER } from "@/lib/constants";

export type SignupMeta = { count: number; cap: number; capReached: boolean; };

const FALLBACK: SignupMeta = { count: 0, cap: 105, capReached: false };

export function useSignupMeta() {
  const [meta, setMeta] = useState<SignupMeta | null>(
    SHOW_DISCOUNT_COUNTER ? null : FALLBACK,
  );

  useEffect(() => {
    if (!SHOW_DISCOUNT_COUNTER) return;

    let cancelled = false;
    fetch("/api/signups/count")
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        return (await r.json()) as SignupMeta;
      })
      .then((d) => {
        if (!cancelled) setMeta(d);
      })
      .catch(() => {
        if (!cancelled) setMeta(FALLBACK);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return meta;
}
