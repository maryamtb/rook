"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { type Block, type BlockType, BlockView } from "./blocks";
import { MENU_ITEMS, SlashMenu } from "./slash-menu";
import { EASE_SMOOTH, TRANSITION } from "../tokens";

export function NewNoteInteractive({ t }: { t: ThemeColors; }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setSelectedIdx(0);
    setMenuOpen(true);
  };
  const closeMenu = () => setMenuOpen(false);
  const insertBlock = (type: BlockType) => {
    const id = `b-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    setBlocks((prev) => [...prev, { id, type }]);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!editorRef.current) return;
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (isTyping) return;

      if (e.key === "/" && !menuOpen) {
        e.preventDefault();
        openMenu();
        return;
      }
      if (!menuOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => (i + 1) % MENU_ITEMS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        insertBlock(MENU_ITEMS[selectedIdx].type);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, selectedIdx]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt.closest("[data-slash-menu]")) return;
      setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const empty = blocks.length === 0;

  return (
    <div ref={editorRef} className="p-6 relative">
      <h2
        className="text-[20px] font-display font-bold mb-3 transition-colors duration-500 inline-flex items-center"
        style={{ color: t.text }}
      >
        <span>New note</span>
        {empty && (
          <motion.span
            animate={{ opacity: [1, 0.15] }}
            transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[2px] h-[20px] ml-0.5 align-middle"
            style={{ backgroundColor: t.accent }}
          />
        )}
      </h2>

      {empty && (
        <button
          type="button"
          onClick={openMenu}
          className="text-[13px] leading-[1.7] flex items-center gap-2 hover:brightness-125 transition-all cursor-pointer"
          style={{ color: `${t.subtext}cc` }}
        >
          Press
          <span
            className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-[7px] text-[12px] font-mono font-medium"
            style={{
              background: `linear-gradient(180deg, ${t.surface} 0%, ${t.codeBg} 100%)`,
              color: t.text,
              boxShadow: `inset 0 0.5px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.07), 0 0 0 0.5px ${t.border}`,
            }}
          >
            /
          </span>
          to get started with blocks
        </button>
      )}

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {blocks.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_SMOOTH }}
            >
              <BlockView t={t} block={b} isLast={i === blocks.length - 1} />
            </motion.div>
          ))}
        </AnimatePresence>

        {!empty && (
          <button
            type="button"
            onClick={openMenu}
            className="text-[12px] flex items-center gap-1.5 hover:brightness-125 transition-all cursor-pointer"
            style={{ color: `${t.subtext}aa` }}
          >
            <span
              className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-0.5 rounded text-[10px] font-mono"
              style={{
                backgroundColor: t.surface,
                color: t.subtext,
                border: `1px solid ${t.border}`,
              }}
            >
              /
            </span>
            add another block
          </button>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-slash-menu
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={TRANSITION.popover}
            className="absolute z-30 left-6"
            style={{ top: empty ? 64 : Math.min(64 + blocks.length * 56, 240) }}
          >
            <SlashMenu t={t} selectedIdx={selectedIdx} onSelect={(i) => insertBlock(MENU_ITEMS[i].type)} onHover={setSelectedIdx} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
