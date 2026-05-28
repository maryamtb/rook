"use client";

import { motion } from "framer-motion";
import { McpMark, MCP_ACCENT } from "@/components/mcp-mark";

export function HeroMcpLinkMobile() {
  return (
    <motion.a
      href="/mcp"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
      className="lg:hidden flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mb-4 px-4 text-[13px] leading-snug text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
    >
      <span className="inline-flex items-center gap-1.5">
        <McpMark size={13} />
        <span style={{ color: MCP_ACCENT }} className="font-semibold">
          Rook MCP
        </span>
        <span
          className="text-[9.5px] font-semibold tracking-[0.08em] px-1.5 py-[1px] rounded-full"
          style={{ color: MCP_ACCENT, backgroundColor: "rgba(140, 200, 192, 0.12)" }}
        >
          BETA
        </span>
      </span>
      <span className="text-center">
        Save notes to Rook from Claude, Codex, Cursor, and Gemini{" "}
        <span className="text-foreground/50 hidden min-[415px]:inline">→</span>
      </span>
    </motion.a>
  );
}

export function HeroMcpLinkDesktop() {
  return (
    <motion.a
      href="/mcp"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
      className="group hidden lg:block absolute select-none whitespace-nowrap text-center"
      style={{ top: -150, right: 102 }}
    >
      <span
        className="mcp-shine-halo inline-flex items-center justify-center gap-1.5 mb-1 transition-opacity group-hover:opacity-80"
        style={{ color: MCP_ACCENT }}
      >
        <McpMark />
        <span className="mcp-shine font-semibold text-[14px]">Rook MCP</span>
        <span className="text-[12px] opacity-60 group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </span>
      <div className="text-[15px] text-foreground leading-[1.4] font-normal transition-opacity group-hover:opacity-80">
        <div>Save to Rook from Claude,</div>
        <div>Codex, Cursor, and Gemini</div>
      </div>
    </motion.a>
  );
}
