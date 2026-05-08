"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandButton } from "@/components/brand-button";
import { DMG_URL, MAS_URL, MAS_BADGE_URL } from "@/lib/constants";
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
      <div className="hidden sm:flex sm:items-center sm:justify-center sm:gap-3">
        <BrandButton size="lg" asChild>
          <a href={DMG_URL} download onClick={() => captureEvent(EVENT.InstallClick, { source })}>
            <Download className="size-4" />
            Download for Mac
          </a>
        </BrandButton>
        <a
          href={MAS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => captureEvent(EVENT.InstallClickMas, { source })}
          aria-label="Download on the Mac App Store"
          className="inline-flex transition-opacity hover:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAS_BADGE_URL}
            alt="Download on the App Store"
            className="h-[50px] w-full"
          />
        </a>
      </div>
      <p className="sm:hidden text-[15px] font-semibold text-foreground">
        Make your first move on a Mac!
      </p>
    </motion.div>
  );
}
