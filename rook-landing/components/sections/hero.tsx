"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import { Download } from "lucide-react";
import { AppMockup } from "@/components/mockup";
import { BrandButton } from "@/components/brand-button";
import { GitHubIcon } from "@/components/icons";
import { themes } from "@/lib/themes";
import { DMG_URL, PRODUCT_HUNT_URL } from "@/lib/constants";

export function Hero({ capReached }: { capReached: boolean; }) {
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
            className="mx-auto mb-8 rounded-[18px]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="text-[clamp(28px,5vw,56px)] font-mono font-bold tracking-[-0.03em] leading-[1.12] text-foreground"
        >
          The note-taking app
          <br className="hidden sm:block" />
          {" "}for developers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[440px] mx-auto"
        >
          Rich text and code blocks, syntax highlighting, and various themes.
          Available for macOS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
          className="mt-8"
        >
          <BrandButton size="lg" asChild className="hidden sm:inline-flex">
            <a href={DMG_URL} download onClick={() => posthog.capture("install_click", { source: "hero" })}>
              <Download className="size-4" />
              Download 1.2.2 for macOS
            </a>
          </BrandButton>
          <p className="sm:hidden text-[15px] font-semibold text-foreground">
            Make your first move on a Mac!
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="hidden sm:block mt-3 text-[12px] font-mono text-muted-foreground/70"
        >
          Notarized by Apple
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.42 }}
          className="mt-4 text-[13px] font-mono text-rook/90"
        >
          {capReached ? (
            <>
              Pro is on the way.{" "}
              <a href="#download" className="underline decoration-rook/40 underline-offset-4 hover:decoration-rook/80 transition-colors">
                Subscribe for updates
              </a>.
            </>
          ) : (
            <>
              First 100 signups get a{" "}
              <a href="#download" className="underline decoration-rook/40 underline-offset-4 hover:decoration-rook/80 transition-colors">
                lifetime discount on Pro
              </a>.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-2.5 text-xs text-muted-foreground/50"
        >
          <span>Free. macOS 14+. Apple Silicon &amp; Intel.</span>
          <span aria-hidden className="text-muted-foreground/30">·</span>
          <a
            href="https://github.com/maryamtb/rook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => posthog.capture("github_click", { source: "hero" })}
          >
            <GitHubIcon className="size-3" />
            GitHub
          </a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          href={PRODUCT_HUNT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 sm:hidden inline-block transition-opacity hover:opacity-80"
          aria-label="Rook on Product Hunt"
          onClick={() => posthog.capture("product_hunt_click", { source: "hero" })}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Rook on Product Hunt"
            width={210}
            height={45}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=dark&t=1776961478535"
          />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        className="mt-16 md:mt-20 max-w-[1080px] mx-auto px-4 sm:px-6 relative"
      >
        <div className="hidden sm:block">
          <AppMockup theme={themes[0]} />
        </div>
        <div className="sm:hidden overflow-hidden rounded-xl border shadow-2xl" style={{ backgroundColor: themes[0].bg, borderColor: themes[0].border }} role="presentation">
          <div className="flex items-center px-3 h-9" style={{ backgroundColor: themes[0].panel }}>
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: themes[0].surface }}>
              <svg className="w-[8px] h-[8px]" style={{ color: themes[0].subtext }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" /></svg>
              <span className="text-[9px] font-medium" style={{ color: themes[0].subtext }}>New note</span>
            </div>
          </div>
          <div className="p-5" style={{ backgroundColor: themes[0].bg }}>
            <h2 className="text-[18px] font-bold mb-2" style={{ color: themes[0].text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>kubectl quick ref</h2>
            <p className="text-xs leading-[1.7] mb-3" style={{ color: themes[0].subtext }}>
              Commands for managing context, pods, deployments.
            </p>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: themes[0].codeBg }}>
              <div className="flex items-center px-3 pt-2">
                <span className="text-[9px]" style={{ color: `${themes[0].subtext}99` }}>bash</span>
              </div>
              <pre className="px-3 pb-3 pt-1 text-[10px] leading-[1.75] font-mono">
                <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>config get-contexts</span>{"\n"}
                <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>config use-context</span> <span style={{ color: themes[0].variable }}>&lt;name&gt;</span>{"\n"}
                <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>get pods -n</span> <span style={{ color: themes[0].variable }}>&lt;ns&gt;</span>{"\n"}
                <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>logs</span> <span style={{ color: themes[0].variable }}>&lt;pod&gt;</span> <span style={{ color: themes[0].keyword }}>--tail</span><span style={{ color: themes[0].codeText }}>=100 -f</span>
              </pre>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-px inset-x-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 10%, transparent 100%)" }} />
      </motion.div>
    </section>
  );
}
