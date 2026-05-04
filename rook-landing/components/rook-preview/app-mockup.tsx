"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { TitleBar } from "./title-bar";
import { Sidebar } from "./sidebar";
import {
  AuthAnimatedEditor,
  AwsStaticEditor,
  ClaudeStaticEditor,
  DebugAnimatedEditor,
  DsaAnimatedEditor,
  GitAnimatedEditor,
} from "./editors";
import type { MockupVariant } from "./variants";

export type { MockupVariant };

function VariantEditor({ variant, t }: { variant: MockupVariant; t: ThemeColors; }) {
  switch (variant) {
    case "auth": return <AuthAnimatedEditor t={t} />;
    case "aws": return <AwsStaticEditor t={t} />;
    case "dsa": return <DsaAnimatedEditor t={t} />;
    case "git": return <GitAnimatedEditor t={t} />;
    case "debug": return <DebugAnimatedEditor t={t} />;
    case "claude": return <ClaudeStaticEditor t={t} />;
  }
}

export function AppMockup({ theme: t, variant = "auth" }: { theme: ThemeColors; variant?: MockupVariant; }) {
  const isLight = t.name === "Light" || t.name === "Paper";

  return (
    <div className="relative w-full mx-auto" role="presentation">
      <div
        className="relative rounded-xl shadow-2xl overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: t.panel,
          border: `1px solid ${t.border}`,
          filter: isLight ? "brightness(0.82)" : undefined,
        }}
      >
        <TitleBar t={t} />

        <div className="relative min-h-[540px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={variant}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex"
            >
              <div className="pb-2 pl-[7px] pr-[7px] shrink-0">
                <Sidebar t={t} variant={variant} />
              </div>
              <div
                className="flex-1 flex flex-col min-w-0 relative overflow-hidden rounded-tl-lg transition-colors duration-500"
                style={{ backgroundColor: t.bg }}
              >
                <div className="flex-1 overflow-hidden transition-colors duration-500" style={{ backgroundColor: t.bg }}>
                  <VariantEditor variant={variant} t={t} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
