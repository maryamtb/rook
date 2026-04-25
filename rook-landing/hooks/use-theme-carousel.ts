"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { themes } from "@/lib/themes";

const ROTATE_MS = 5000;

export function useThemeCarousel() {
  const [activeTheme, setActiveTheme] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCarousel = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % themes.length);
    }, ROTATE_MS);
  }, []);

  useEffect(() => {
    startCarousel();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCarousel]);

  const selectTheme = (i: number) => {
    setActiveTheme(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return { activeTheme, selectTheme };
}
