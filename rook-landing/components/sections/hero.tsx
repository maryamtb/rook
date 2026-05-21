"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InteractiveRook, MobileMockup, type MobileNote } from "@/components/rook-preview";
import { themes } from "@/lib/themes";
import { useLaunchState } from "@/hooks/use-launch-state";
import { captureEvent } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";
import { DownloadCta } from "./download-cta";
import { WhatsNewPill } from "./whats-new-pill";
import { HeroMcpLinkMobile, HeroMcpLinkDesktop } from "./hero-mcp-link";
import { PlatformWaitlist } from "@/components/platform-waitlist";
import type { SignupMeta } from "@/hooks/use-signup-meta";

const HERO_THEME_IDX = 3;
const HERO_THEME = themes[HERO_THEME_IDX];

const CLAUDE_FIRST_API_NOTE: MobileNote = {
  title: "my first API call: Dunder Mifflin Infinity 2.0",
  description: "Apparently, this is how you call the AI, and these are some of the main params you pass to it",
  codeLang: "python",
  code: (
    <>
      <span style={{ color: HERO_THEME.variable }}>response</span>
      <span style={{ color: HERO_THEME.codeText }}> = </span>
      <span style={{ color: HERO_THEME.func }}>client.messages.create</span>
      <span style={{ color: HERO_THEME.codeText }}>(</span>{"\n"}
      {"  "}
      <span style={{ color: HERO_THEME.variable }}>system</span>
      <span style={{ color: HERO_THEME.codeText }}>=</span>
      <span style={{ color: HERO_THEME.string }}>&quot;You are a thought leader.&quot;</span>
      <span style={{ color: HERO_THEME.codeText }}>,</span>{"\n"}
      {"  "}
      <span style={{ color: HERO_THEME.variable }}>messages</span>
      <span style={{ color: HERO_THEME.codeText }}>=[{"{"}</span>{"\n"}
      {"    "}
      <span style={{ color: HERO_THEME.string }}>&quot;content&quot;</span>
      <span style={{ color: HERO_THEME.codeText }}>: </span>
      <span style={{ color: HERO_THEME.string }} className="font-extrabold">&quot;Build Dunder Mifflin Infinity 2.0. No Mistakes.&quot;</span>{"\n"}
      {"  "}
      <span style={{ color: HERO_THEME.codeText }}>{"}"}]</span>{"\n"}
      <span style={{ color: HERO_THEME.codeText }}>)</span>
    </>
  ),
};

export function Hero({ signupMeta }: { signupMeta: SignupMeta | null }) {
  const { showDiscount } = useLaunchState(signupMeta);

  return (
    <section className="pt-[140px] md:pt-[176px]">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="/icon-512.png"
            alt="Rook"
            width={72}
            height={72}
            priority
            className="mx-auto mb-8 rounded-[18px]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="whitespace-nowrap text-[clamp(22px,6.5vw,52px)] font-mono font-bold tracking-[-0.03em] leading-[1.12] text-foreground"
        >
          Notes that speak <span className="text-rook shimmer">code</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[580px] mx-auto"
        >
          A native Mac notes app for the code you write, paste, and keep around
        </motion.p>

        <WhatsNewPill source="hero" signupMeta={signupMeta} />

        <DownloadCta source="hero" />

        {!showDiscount && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="mt-4 text-[13px] font-mono text-rook/90"
          >
            Pro is on the way.{" "}
            <a
              href="#download"
              className="underline decoration-rook/40 underline-offset-4 hover:decoration-rook/80 transition-colors"
              onClick={() => captureEvent(EVENT.SubscribeClick, { source: "hero" })}
            >
              Subscribe for updates
            </a>
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden sm:flex mt-4 items-center justify-center gap-1 font-mono text-[11px] tracking-wide text-muted-foreground/55"
        >
          <span>Free. macOS 14+. Apple Silicon &amp; Intel</span>
          <PlatformWaitlist source="hero_spec" className="ml-1" />
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        className="mt-16 md:mt-20 max-w-[1080px] mx-auto px-4 sm:px-6 relative"
      >
        <HeroMcpLinkMobile />

        <div className="hidden sm:block">
          <InteractiveRook theme={themes[HERO_THEME_IDX]} />
        </div>

        <HeroMcpLinkDesktop />

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.95 }}
          className="hidden lg:block absolute pointer-events-none select-none"
          style={{ top: -78, right: 190, width: 75, height: 75 }}
          aria-hidden="true"
        >
          <Image
            src="/arrow.svg"
            width={75}
            height={75}
            alt=""
            className="w-full h-full opacity-70"
          />
        </motion.div>

        <div className="sm:hidden">
          <MobileMockup theme={HERO_THEME} note={CLAUDE_FIRST_API_NOTE} />
        </div>
        <div className="absolute -bottom-px inset-x-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 10%, transparent 100%)" }} />
      </motion.div>
    </section>
  );
}
