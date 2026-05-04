"use client";

import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";
import { TRANSITION } from "../tokens";
import { COLLECTIONS, type CollectionId } from "./data";
import { CollectionMenuItem } from "./menu-item";

export function CollectionDropdown({
  t,
  activeId,
  onSelect,
}: {
  t: ThemeColors;
  activeId: CollectionId;
  onSelect: (id: CollectionId) => void;
}) {
  return (
    <motion.div
      data-collection-menu
      role="menu"
      aria-label="Collections"
      initial={{ opacity: 0, y: -4, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -2, scale: 0.98 }}
      transition={TRANSITION.popover}
      className="absolute left-2 right-2 top-[40px] z-20 rounded-lg p-1 shadow-2xl"
      style={{ backgroundColor: t.panel, border: `1px solid ${t.border}` }}
    >
      <div
        className="flex items-center gap-2 px-2.5 h-[26px] mb-1 rounded-md"
        style={{ backgroundColor: t.surface }}
      >
        <svg
          aria-hidden="true"
          className="w-[10px] h-[10px] shrink-0"
          style={{ color: `${t.subtext}cc` }}
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 16 16"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" />
        </svg>
        <span className="text-[11px] flex-1" style={{ color: `${t.subtext}cc` }}>Find collection...</span>
      </div>
      {COLLECTIONS.map((c) => (
        <CollectionMenuItem
          key={c.id}
          t={t}
          label={c.label}
          color={c.color}
          selected={c.id === activeId}
          onClick={() => onSelect(c.id)}
        />
      ))}
      <div className="my-1 h-px" style={{ backgroundColor: `${t.border}cc` }} />
      <div role="menuitem" aria-disabled="true" className="flex items-center gap-2 px-2 py-1.5 rounded-md">
        <Trash2 aria-hidden="true" className="w-[12px] h-[12px]" style={{ color: `${t.subtext}cc` }} strokeWidth={1.6} />
        <span className="text-[11.5px] flex-1" style={{ color: t.subtext }}>Trash</span>
        <span className="text-[10px] font-mono shrink-0" style={{ color: `${t.subtext}99` }}>3</span>
      </div>
      <div role="menuitem" aria-disabled="true" className="flex items-center gap-2 px-2 py-1.5 rounded-md">
        <Plus aria-hidden="true" className="w-[12px] h-[12px]" style={{ color: `${t.subtext}cc` }} strokeWidth={1.8} />
        <span className="text-[11.5px]" style={{ color: t.subtext }}>New collection</span>
      </div>
    </motion.div>
  );
}
