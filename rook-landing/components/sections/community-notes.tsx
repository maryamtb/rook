"use client";

import { motion } from "framer-motion";
import { DiscordIcon } from "@/components/icons";
import { DISCORD_URL } from "@/lib/constants";
import { sectionContent } from "@/lib/motion";

export function CommunityNotes() {
  return (
    <section id="community" className="py-12 md:py-16">
      <motion.div {...sectionContent} className="max-w-[1080px] mx-auto px-6 flex flex-col items-center text-center">
        <DiscordIcon className="w-10 h-8 text-[#8b90ff] mb-5" />
        <div>
          <h2 className="text-2xl sm:text-[28px] font-semibold tracking-tight">Join the Rook Discord</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Ask questions, share feedback, and become a Rook beta tester
          </p>
        </div>
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#5865f2] px-5 py-3 text-base font-medium text-white transition-colors hover:bg-[#4752c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b90ff] focus-visible:ring-offset-4 focus-visible:ring-offset-background">
          Join the Discord <span aria-hidden="true">→</span>
        </a>
      </motion.div>
    </section>
  );
}
