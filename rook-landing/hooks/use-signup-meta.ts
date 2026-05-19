"use client";

import { useEffect, useState } from "react";
import {
  DISCOUNT_CAP,
  DISCOUNT_ROUND_START_MS,
  type SignupState,
} from "@/lib/signups";
import { SIGNUPS_DISABLED } from "@/lib/constants";

export type SignupMeta = { count: number; cap: number; state: SignupState };

function initialFallback(): SignupMeta {
  if (SIGNUPS_DISABLED) return { count: 0, cap: DISCOUNT_CAP, state: "disabled" };
  if (Date.now() < DISCOUNT_ROUND_START_MS) return { count: 0, cap: DISCOUNT_CAP, state: "prelaunch" };
  return { count: 0, cap: DISCOUNT_CAP, state: "discount" };
}

export function useSignupMeta() {
  const [meta, setMeta] = useState<SignupMeta | null>(() => initialFallback());

  useEffect(() => {
    let cancelled = false;

    fetch("/api/signups/count")
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        return (await r.json()) as SignupMeta;
      })
      .then((d) => {
        if (!cancelled) setMeta(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return meta;
}
