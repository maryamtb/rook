"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandButton } from "@/components/brand-button";
import { NotifyForm, WaitlistClosedNotice } from "@/components/notify-form";
import { FooterNewsletter } from "@/components/sections/footer-newsletter";
import { APP_VERSION, DMG_URL, SHOW_DISCOUNT_COUNTER } from "@/lib/constants";
import { captureEvent } from "@/lib/posthog-safe";
import type { SignupMeta } from "@/hooks/use-signup-meta";

type CtaProps = {
  capReached: boolean;
  signupMeta: SignupMeta | null;
};

export function Cta({ capReached, signupMeta }: CtaProps) {
  return (
    <section id="download" className="py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[480px] mx-auto px-6 text-center"
      >
        <Image
          src="/icon-512.png"
          alt=""
          width={56}
          height={56}
          className="mx-auto mb-6 rounded-2xl"
        />

        <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
          Download Rook
        </h2>

        <p className="mt-3 text-[15px] text-muted-foreground">
          Free, local, for macOS
        </p>

        <div className="mt-8 hidden sm:block">
          <BrandButton size="lg" asChild>
            <a href={DMG_URL} download onClick={() => captureEvent("install_click", { source: "footer_cta" })}>
              <Download className="size-4" />
              Download v{APP_VERSION} for macOS
            </a>
          </BrandButton>
        </div>

        <p className="mt-3 text-[12px] font-mono text-muted-foreground/70 hidden sm:block">
          Notarized by Apple
        </p>

        <p className="mt-2 text-xs text-muted-foreground/40 hidden sm:block">
          macOS 14+. Apple Silicon &amp; Intel.
        </p>

        <div className="mt-10 pt-8 border-t border-border/30">
          {SHOW_DISCOUNT_COUNTER ? (
            capReached ? (
              <WaitlistClosedNotice />
            ) : (
              <>
                <p className="text-sm sm:text-[13px] text-muted-foreground mb-3">
                  <span className="text-foreground font-medium">First 100 signups</span> get a lifetime discount on Pro.
                </p>
                <NotifyForm meta={signupMeta} />
              </>
            )
          ) : (
            <div className="max-w-sm mx-auto">
              <p className="text-sm sm:text-[13px] text-muted-foreground mb-3 text-center">
                <span className="text-foreground font-medium">Pro is on the way.</span> Subscribe for updates.
              </p>
              <div className="sm:flex sm:justify-center">
                <FooterNewsletter source="cta" />
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 text-xs text-muted-foreground/60">
          Say hi in{" "}
          <a href="https://github.com/maryamtb/rook/discussions" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">GitHub Discussions</a>
          {". Follow on "}
          <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">X</a>
          {". Read the story on "}
          <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">Dev.to</a>.
        </p>
      </motion.div>
    </section>
  );
}
