"use client";

import { useEffect, useState } from "react";

export function useStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stars")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.stars === "number") setStars(d.stars);
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}
