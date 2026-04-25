"use client";

import { useEffect, useState } from "react";

export type SignupMeta = { count: number; cap: number; capReached: boolean; };

const FALLBACK: SignupMeta = { count: 0, cap: 105, capReached: false };

export function useSignupMeta() {
  const [meta, setMeta] = useState<SignupMeta | null>(null);

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
      .catch(() => {
        if (!cancelled) setMeta(FALLBACK);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return meta;
}
