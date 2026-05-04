"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { APP_VERSION } from "@/lib/constants";
import { captureEvent } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";

export function WhatsNewPill({ source }: { source: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.26 }}
      className="hidden sm:flex justify-center mt-7"
    >
      <div className="relative group">
        <span aria-hidden className="pill-glow absolute -inset-3 rounded-full" />
        <Link
          href={`/changelog#v${APP_VERSION}`}
          className="relative inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border/60 bg-background/40 backdrop-blur-md text-[12px] text-foreground/80 hover:text-foreground transition-colors"
          onClick={() => captureEvent(EVENT.ChangelogClick, { source })}
        >
          <span aria-hidden className="pill-shine absolute inset-0 rounded-full p-[1px]" />
          <span className="relative inline-flex items-center px-2 py-[2px] rounded-full bg-rook/[0.14] text-rook font-mono text-[10.5px] tracking-tight tabular-nums">
            v{APP_VERSION}
          </span>
          <span className="relative">what&apos;s new</span>
          <span aria-hidden className="relative text-foreground/40 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-foreground/70">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
