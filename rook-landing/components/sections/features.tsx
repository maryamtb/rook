"use client";

import { motion } from "framer-motion";
import { FolderOpen, Lock } from "lucide-react";
import { cardReveal } from "@/lib/motion";
import { themes } from "@/lib/themes";
import { McpMark } from "@/components/mcp-mark";

const LANGUAGES = [
  { name: "Swift", color: "#f4a178" },
  { name: "Python", color: "#e4cc75" },
  { name: "TypeScript", color: "#8ab7fa" },
  { name: "JavaScript", color: "#eadb82" },
  { name: "Go", color: "#7dcbd5" },
  { name: "Rust", color: "#d9a68a" },
  { name: "SQL", color: "#c2a3e8" },
  { name: "Bash", color: "#a0c997" },
];

export function Features() {
  return (
    <section id="features" className="pt-20 pb-12 md:pt-24 md:pb-16">
      <motion.div {...cardReveal()} className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
              Features
            </h2>
            <span className="rounded-full border border-rook/30 bg-rook/10 px-3 py-1 text-sm font-medium text-rook">Free</span>
          </div>
          <p className="mt-3 text-base text-muted-foreground">
            Unlimited notes, forever
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          <div className="text-center">
            <div className="mx-auto flex max-w-[320px] min-h-16 flex-wrap content-center items-center justify-center gap-1.5 mb-3">
              {LANGUAGES.map((lang) => (
                <span key={lang.name} className="text-xs font-mono px-2 py-1 rounded border" style={{ color: lang.color, backgroundColor: `${lang.color}14`, borderColor: `${lang.color}30` }}>
                  {lang.name}
                </span>
              ))}
            </div>
            <p className="text-lg font-medium">Code Blocks</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Syntax highlighting for 35 languages, with automatic language detection on paste. Reuse values with dynamic variables.</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 h-16 mb-3 text-muted-foreground/80">
              <span className="text-[16px] font-bold">H</span>
              <span className="text-sm font-bold">B</span>
              <span className="text-sm italic">I</span>
              <span className="text-xs font-mono">{`{}`}</span>
              <span className="text-sm">☑</span>
            </div>
            <p className="text-lg font-medium">Markdown + more</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Write with headings, lists, to-dos, tables, quotes, highlights, images and wiki links. Paste as Markdown with ⌥⌘V, drag files into Rook to import, and export as .md files.</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 h-16 mb-3">
              {themes.map((t) => (
                <div key={t.name} className="w-5 h-5 rounded-full border border-border/30" style={{ backgroundColor: t.accent }} />
              ))}
            </div>
            <p className="text-lg font-medium">Themes &amp; Toolbar</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Create a calmer space to think. Choose from five themes and hide the toolbar controls you don’t use.</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 mb-3">
              <FolderOpen className="size-5 text-muted-foreground/80" />
            </div>
            <p className="text-lg font-medium">Organise Notes</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Save notes at the root of a collection, or organise them into notebooks and nested notebooks. Select a note and press Space to preview it.</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 mb-3">
              <Lock aria-hidden="true" className="size-5 text-muted-foreground/80" />
            </div>
            <p className="text-lg font-medium">Local &amp; Private</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Fully private notes. Stored locally. No account required.</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 mb-3">
              <McpMark size={20} />
            </div>
            <p className="text-lg font-medium text-foreground">Rook MCP</p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">Keep useful answers and code from your AI conversations. Save directly to Rook, with a separate inbox for each AI tool.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
