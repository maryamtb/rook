"use client";

import { motion } from "framer-motion";
import { AppMockup, MobileMockup, type MobileNote } from "@/components/rook-preview";
import { sectionContent, sectionHeading } from "@/lib/motion";
import { themes } from "@/lib/themes";

const T = themes[3];

const AWS_NOTE: MobileNote = {
  title: "aws cli quick ref",
  description: "SSO across multiple accounts. login, switching, who-am-i.",
  codeLang: "bash",
  code: (
    <>
      <span style={{ color: T.func }}>aws</span>
      <span style={{ color: T.codeText }}> sso login </span>
      <span style={{ color: T.keyword }}>--profile</span>
      <span style={{ color: T.codeText }}> </span>
      <span style={{ color: T.variable }}>&lt;name&gt;</span>{"\n"}
      <span style={{ color: T.func }}>aws</span>
      <span style={{ color: T.codeText }}> configure list-profiles</span>{"\n"}
      <span style={{ color: T.keyword }}>export</span>
      <span style={{ color: T.codeText }}> </span>
      <span style={{ color: T.variable }}>AWS_PROFILE</span>
      <span style={{ color: T.codeText }}>=</span>
      <span style={{ color: T.variable }}>&lt;name&gt;</span>{"\n"}
      <span style={{ color: T.func }}>aws</span>
      <span style={{ color: T.codeText }}> sts get-caller-identity</span>
    </>
  ),
};

export function CommunityNotes() {
  return (
    <section id="community" className="py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto px-6">
        <motion.div {...sectionHeading} className="text-center mb-14">
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Community Cheatsheets
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Markdown cheatsheets for common commands
          </p>
        </motion.div>

        <motion.div {...sectionContent} className="max-w-[1040px] mx-auto">
          <div className="hidden sm:block">
            <AppMockup theme={themes[3]} variant="aws" />
          </div>
          <div className="sm:hidden">
            <MobileMockup theme={themes[3]} note={AWS_NOTE} />
          </div>
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
