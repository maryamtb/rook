"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { themes } from "@/lib/themes";

const LANGUAGES = ["Swift", "Python", "TypeScript", "Go", "Rust"];

export function Features() {
  return (
    <section id="features" className="py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="text-center mb-14">
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Features
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Built for the way developers take notes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16 md:gap-14">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {LANGUAGES.map((lang) => (
                <span key={lang} className="text-[11px] font-mono text-muted-foreground/50 bg-secondary/50 px-1.5 py-0.5 rounded">
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium">Code Blocks</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">17 languages with syntax highlighting</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3 text-muted-foreground/40">
              <span className="text-[16px] font-bold">H</span>
              <span className="text-sm font-bold">B</span>
              <span className="text-sm italic">I</span>
              <span className="text-xs font-mono">{`{}`}</span>
              <span className="text-sm">☑</span>
            </div>
            <p className="text-sm font-medium">Rich Text + Code</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Headings, lists, todos, code blocks</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {themes.map((t) => (
                <div key={t.name} className="w-5 h-5 rounded-full border border-border/30" style={{ backgroundColor: t.accent }} />
              ))}
            </div>
            <p className="text-sm font-medium">5 Themes</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Dark, Light, Terminal, Paper, Midnight</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Lock className="size-5 text-muted-foreground/40" />
            </div>
            <p className="text-sm font-medium">Local & Private</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">No cloud, no account, your machine</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
