"use client";

import type { ThemeColors } from "@/lib/themes";
import { SidebarToggleIcon } from "./sidebar-toggle-icon";
import { Shimmer } from "./shimmer";

export function TitleBar({
  t,
  onToggleClick,
  onNewNoteClick,
  toggleHinted,
  newNoteHinted,
  sidebarCollapsed,
}: {
  t: ThemeColors;
  onToggleClick?: () => void;
  onNewNoteClick?: () => void;
  toggleHinted?: boolean;
  newNoteHinted?: boolean;
  sidebarCollapsed?: boolean;
}) {
  return (
    <div
      className="flex items-center px-4 h-10 transition-colors duration-500"
      style={{ backgroundColor: t.panel }}
    >
      <div className="flex gap-[7px]">
        <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
      </div>

      {onToggleClick ? (
        <div className="ml-3 -my-1 relative">
          <Shimmer show={Boolean(toggleHinted)} accent={t.accent} radius={6} glowPad={5} />
          <button
            type="button"
            onClick={onToggleClick}
            className="relative px-1.5 py-1 rounded-md transition-all duration-200 hover:brightness-125 cursor-pointer"
            style={{ backgroundColor: "transparent" }}
            aria-label="Toggle sidebar"
          >
            <SidebarToggleIcon color={toggleHinted ? t.accent : t.subtext} collapsed={sidebarCollapsed} />
          </button>
        </div>
      ) : (
        <div className="ml-3">
          <SidebarToggleIcon color={t.subtext} collapsed={sidebarCollapsed} />
        </div>
      )}

      <div className="flex-1" />

      {onNewNoteClick ? (
        <div className="relative -my-0.5">
          <Shimmer show={Boolean(newNoteHinted)} accent={t.accent} radius={999} glowPad={6} />
          <button
            type="button"
            onClick={onNewNoteClick}
            className="relative flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 hover:brightness-110 cursor-pointer"
            style={{
              backgroundColor: newNoteHinted ? `${t.accent}26` : t.surface,
            }}
          >
            <svg
              className="w-[10px] h-[10px] transition-colors duration-200"
              style={{ color: newNoteHinted ? t.accent : t.subtext }}
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
            >
              <path d="M6 1v10M1 6h10" />
            </svg>
            <span
              className="text-[11px] font-medium transition-colors duration-200"
              style={{ color: newNoteHinted ? t.accent : t.subtext }}
            >
              New note
            </span>
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors duration-500"
          style={{ backgroundColor: t.surface }}
        >
          <svg
            className="w-[10px] h-[10px] transition-colors duration-500"
            style={{ color: t.subtext }}
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          <span className="text-[11px] font-medium transition-colors duration-500" style={{ color: t.subtext }}>
            New note
          </span>
        </div>
      )}
    </div>
  );
}
