"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandButton } from "@/components/brand-button";
import { APP_VERSION, DMG_URL } from "@/lib/constants";
import { captureEvent } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";

export function DownloadCta({ source }: { source: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
      className="mt-5"
    >
      <BrandButton size="lg" asChild className="hidden sm:inline-flex">
        <a href={DMG_URL} download onClick={() => captureEvent(EVENT.InstallClick, { source })}>
          <Download className="size-4" />
          Download v{APP_VERSION} for macOS
        </a>
      </BrandButton>
      <p className="sm:hidden text-[15px] font-semibold text-foreground">
        Make your first move on a Mac!
      </p>
    </motion.div>
  );
}
