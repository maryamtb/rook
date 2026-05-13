"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { APP_VERSION } from "@/lib/constants";
import { captureEvent } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";
import { useLaunchState } from "@/hooks";
import type { SignupMeta } from "@/hooks/use-signup-meta";

export function WhatsNewPill({ source, signupMeta }: { source: string; signupMeta?: SignupMeta | null }) {
  const { showDiscount } = useLaunchState();
  // Display caps at 100 to match the public "first 100" promise; the real DB cap (102) is just a buffer.
  const remaining = signupMeta ? Math.max(0, 100 - signupMeta.count) : null;
  const scarcityLabel =
    remaining === null ? "first 100" :
    remaining === 0 ? "spots filled" :
    `${remaining} remaining`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.26 }}
      className="flex justify-center mt-7"
    >
      <div
        className="relative group"
        style={
          showDiscount
            ? ({
                "--pill-shine-color": "rgba(255, 97, 84, 1)",
                "--pill-glow-color": "rgba(255, 97, 84, 0.45)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <span aria-hidden className="pill-glow absolute -inset-3 rounded-full" />
        {showDiscount ? (
          <a
            href="#download"
            className="relative inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border backdrop-blur-md text-[12px] text-foreground/85 hover:text-foreground transition-colors"
            style={{
              backgroundColor: "rgba(255, 97, 84, 0.08)",
              borderColor: "rgba(255, 97, 84, 0.35)",
            }}
            onClick={() => captureEvent(EVENT.ProDiscountHeroClick, { source })}
          >
            <span aria-hidden className="pill-shine absolute inset-0 rounded-full p-[1px]" />
            <span
              className="relative inline-flex items-center px-2 py-[2px] rounded-full font-mono text-[10.5px] tracking-tight font-semibold"
              style={{ backgroundColor: "rgba(255, 97, 84, 0.18)", color: "#FF6154" }}
            >
              PH
            </span>
            <span className="relative tabular-nums">lifetime pro discount · {scarcityLabel}</span>
            <span aria-hidden className="relative text-foreground/40 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-foreground/70">→</span>
          </a>
        ) : (
          <Link
            href={`/changelog#v${APP_VERSION}`}
            className="relative inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border/60 bg-background/40 backdrop-blur-md text-[12px] text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => captureEvent(EVENT.ChangelogClick, { source })}
          >
            <span aria-hidden className="pill-shine absolute inset-0 rounded-full p-[1px]" />
            <span
              className="relative inline-flex items-center px-2 py-[2px] rounded-full font-mono text-[10.5px] tracking-tight tabular-nums"
              style={{ backgroundColor: "rgba(140, 200, 192, 0.1)", color: "rgb(140, 200, 192)" }}
            >
              v{APP_VERSION}
            </span>
            <span className="relative">what&apos;s new</span>
            <span aria-hidden className="relative text-foreground/40 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-foreground/70">→</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
