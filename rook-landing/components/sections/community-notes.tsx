"use client";

import { motion } from "framer-motion";
import { AppMockup } from "@/components/mockup";
import { themes } from "@/lib/themes";

export function CommunityNotes() {
  return (
    <section id="community" className="py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Community Cheatsheets
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Markdown cheatsheets for common commands
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[720px] mx-auto"
        >
          <AppMockup theme={themes[3]} variant="aws" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[13px] font-mono text-muted-foreground"
        >
          <a
            href="https://github.com/maryamtb/rook/tree/main/community-notes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Browse all on GitHub →
          </a>
          <span aria-hidden className="hidden sm:inline text-muted-foreground/30">·</span>
          <a
            href="https://github.com/maryamtb/rook/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Introduce yourself in Discussions →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
