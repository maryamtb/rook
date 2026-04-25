"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { XIcon } from "@/components/icons";

const TWEET_URL = "https://x.com/userookapp";

export function TweetVibe() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <motion.a
          href={TWEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Rook</span>
              <span className="text-xs text-muted-foreground/70">@userookapp</span>
            </div>
            <XIcon className="ml-auto size-4 text-muted-foreground/40" />
          </div>
          <p className="mt-3 text-[15px] leading-[1.5]">
            if vscode and apple notes had a child ??
          </p>
        </motion.a>

        <motion.a
          href={TWEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Rook</span>
              <span className="text-xs text-muted-foreground/70">@userookapp</span>
            </div>
            <XIcon className="ml-auto size-4 text-muted-foreground/40" />
          </div>
          <div className="mt-3 rounded-lg bg-background/60 border border-border/40 p-3 font-mono text-[11px] leading-[1.75] overflow-x-auto">
            <div className="text-muted-foreground/50 whitespace-nowrap"># apps for code notes</div>
            <div className="whitespace-nowrap">
              <span className="text-[#c4a7e7]">apps</span>
              <span className="text-muted-foreground/80"> = [</span>
              <span className="text-[#7ec16e]">&quot;apple notes&quot;</span>
              <span className="text-muted-foreground/80">, </span>
              <span className="text-[#7ec16e]">&quot;notion&quot;</span>
              <span className="text-muted-foreground/80">, </span>
              <span className="text-[#7ec16e]">&quot;rook&quot;</span>
              <span className="text-muted-foreground/80">]</span>
            </div>
            <div className="mt-1">
              <span className="text-[#c4a7e7]">apps</span>
              <span className="text-muted-foreground/80">[</span>
              <span className="text-rook">-1</span>
              <span className="text-muted-foreground/80">]</span>
            </div>
          </div>
          <p className="mt-1 text-[15px] leading-[1.5]">?</p>
        </motion.a>

        <motion.a
          href={TWEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
          className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Rook</span>
              <span className="text-xs text-muted-foreground/70">@userookapp</span>
            </div>
            <XIcon className="ml-auto size-4 text-muted-foreground/40" />
          </div>
          <p className="mt-3 text-[15px] leading-[1.5]">
            the rook owns the file... fitting, for a notes app
          </p>
        </motion.a>
      </div>
    </section>
  );
}
