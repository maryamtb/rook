"use client";

import { motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";

export type BlockType = "h1" | "h2" | "body" | "code" | "bullet" | "todo";
export type Block = { id: string; type: BlockType; };

export function BlockView({ t, block, isLast }: { t: ThemeColors; block: Block; isLast: boolean; }) {
  const cursor = isLast ? <BlinkCursor color={t.accent} /> : null;
  switch (block.type) {
    case "h1":
      return (
        <h3 className="text-[22px] font-display font-bold leading-tight inline-flex items-center" style={{ color: t.text }}>
          <span style={{ color: `${t.subtext}66` }}>Heading 1</span>
          {cursor}
        </h3>
      );
    case "h2":
      return (
        <h4 className="text-[17px] font-display font-bold leading-tight inline-flex items-center" style={{ color: t.text }}>
          <span style={{ color: `${t.subtext}66` }}>Heading 2</span>
          {cursor}
        </h4>
      );
    case "body":
      return (
        <p className="text-[13px] leading-[1.7] inline-flex items-center" style={{ color: `${t.subtext}aa` }}>
          <span style={{ color: `${t.subtext}66` }}>Type something...</span>
          {cursor}
        </p>
      );
    case "code":
      return (
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: t.codeBg }}>
          <div className="flex items-center px-3.5 pt-2.5 pb-0.5">
            <span className="text-[10.5px]" style={{ color: `${t.subtext}cc` }}>bash</span>
          </div>
          <pre className="px-4 pb-3 pt-1 text-[11.5px] leading-[1.75] font-mono">
            {cursor}
          </pre>
        </div>
      );
    case "bullet":
      return (
        <div className="flex items-center gap-2 text-[14px] leading-[1.6]" style={{ color: t.text }}>
          <span style={{ color: t.text }}>•</span>
          {cursor}
        </div>
      );
    case "todo":
      return (
        <div className="flex items-center gap-2 text-[13px] leading-[1.5]">
          <span
            className="inline-block w-[14px] h-[14px] rounded-[3px] border shrink-0"
            style={{ borderColor: `${t.subtext}77` }}
          />
          <span style={{ color: `${t.subtext}66` }}>To-do item</span>
          {cursor}
        </div>
      );
  }
}

function BlinkCursor({ color }: { color: string; }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.15] }}
      transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse" }}
      className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
      style={{ backgroundColor: color }}
    />
  );
}
