"use client";

import { Folder, FolderOpen } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";

export function NotebookHeader({
  t, label, count, active, expanded, onClick,
}: {
  t: ThemeColors;
  label: string;
  count: number;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}) {
  const Icon = active || expanded ? FolderOpen : Folder;
  const inner = (
    <>
      <Icon
        className="w-[11px] h-[11px] shrink-0 transition-colors duration-300"
        style={{ color: active || expanded ? t.accent : `${t.subtext}cc` }}
        strokeWidth={1.5}
      />
      <span
        className="text-xs flex-1 truncate transition-colors duration-300"
        style={{ color: active || expanded ? t.text : t.subtext }}
      >
        {label}
      </span>
      <span
        className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0 transition-colors duration-300"
        style={{ color: active ? t.subtext : `${t.subtext}cc`, backgroundColor: t.surface }}
      >
        {count}
      </span>
    </>
  );

  const bgStyle = { backgroundColor: active ? `${t.accent}18` : "transparent" };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        className="relative w-full flex items-center gap-1.5 px-1.5 py-[5px] rounded-md transition-colors duration-300 hover:brightness-110 text-left cursor-pointer"
        style={bgStyle}
      >
        {inner}
      </button>
    );
  }
  return (
    <div
      className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md transition-colors duration-300"
      style={bgStyle}
    >
      {inner}
    </div>
  );
}
