"use client";

import type { ThemeColors } from "@/lib/themes";
import { MockIcon } from "../../editors/mock-icon";
import type { BlockType } from "./blocks";

export type MenuItem = { type: BlockType; icon: string; label: string; shortLabel: string; };

export const MENU_ITEMS: MenuItem[] = [
  { type: "code", icon: "curlybraces", label: "Code Block", shortLabel: "code" },
  { type: "todo", icon: "checklist", label: "Todo", shortLabel: "todo" },
  { type: "bullet", icon: "list.bullet", label: "Bullet List", shortLabel: "bullet" },
  { type: "h1", icon: "h.square", label: "Heading 1", shortLabel: "h1" },
  { type: "h2", icon: "h.square", label: "Heading 2", shortLabel: "h2" },
  { type: "body", icon: "text.alignleft", label: "Body", shortLabel: "body" },
];

export function SlashMenu({
  t, selectedIdx, onSelect, onHover,
}: {
  t: ThemeColors;
  selectedIdx: number;
  onSelect: (i: number) => void;
  onHover: (i: number) => void;
}) {
  return (
    <div
      className="w-[220px] rounded-xl overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: t.panel, boxShadow: "0 10px 35px rgba(0,0,0,0.35)", border: `1px solid ${t.border}` }}
    >
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5">
        <span className="text-xs font-bold font-mono" style={{ color: t.accent }}>/</span>
        <span className="flex-1" />
        <span className="text-[9px] font-mono" style={{ color: `${t.subtext}cc` }}>{MENU_ITEMS.length}</span>
      </div>
      <div className="h-px" style={{ backgroundColor: `${t.border}80` }} />
      <div className="p-1">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => onHover(i)}
            onClick={() => onSelect(i)}
            className="w-full flex items-center gap-2.5 px-2.5 py-[5px] rounded-md transition-colors duration-150 text-left cursor-pointer"
            style={{ backgroundColor: i === selectedIdx ? t.surface : "transparent" }}
          >
            <MockIcon name={item.icon} color={i === selectedIdx ? t.accent : `${t.subtext}cc`} size={12} />
            <span className="text-[11px] flex-1" style={{ color: i === selectedIdx ? t.text : t.subtext }}>{item.label}</span>
            <span className="text-[9px] font-mono" style={{ color: `${t.subtext}cc` }}>{item.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
