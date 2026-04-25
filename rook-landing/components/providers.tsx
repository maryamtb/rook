"use client";

import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { PostHogInit } from "@/components/posthog-init";

export function Providers({ children }: { children: React.ReactNode; }) {
  return (
    <MotionConfig reducedMotion="user">
      <PostHogInit />
      {children}
      <Toaster richColors position="bottom-right" />
      <Analytics />
    </MotionConfig>
  );
}
