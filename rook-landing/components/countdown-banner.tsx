"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-04-24T17:00:00+01:00");
const DOWNLOAD_URL = "https://lfubd2pcrenetvqi.public.blob.vercel-storage.com/Rook.dmg";

export function CountdownBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, LAUNCH_DATE.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) {
    return (
      <div className="fixed top-0 inset-x-0 z-[60] bg-[#E8962E]/10 backdrop-blur-xl border-b border-[#E8962E]/20 py-2.5 text-center text-[13px] font-mono">
        <span className="text-muted-foreground">Download Rook Friday</span>
      </div>
    );
  }

  if (remaining === 0) {
    return (
      <div className="fixed top-0 inset-x-0 z-[60] bg-[#E8962E]/10 backdrop-blur-xl border-b border-[#E8962E]/20 py-2.5 text-center text-[13px] font-mono">
        <a href={DOWNLOAD_URL} className="text-foreground font-medium hover:underline">
          Download Rook now →
        </a>
      </div>
    );
  }

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-[#E8962E]/10 backdrop-blur-xl border-b border-[#E8962E]/20 py-2.5 text-center text-[13px] font-mono">
      <span className="text-muted-foreground">Download Rook in </span>
      <span className="text-foreground font-medium tabular-nums">
        {days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}
