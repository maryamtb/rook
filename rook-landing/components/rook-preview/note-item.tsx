"use client";

import { File } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";

export function NoteItem({
  t, label, active, opensable, onClick,
}: {
  t: ThemeColors;
  label: string;
  active?: boolean;
  opensable?: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <File
        className="w-[11px] h-[11px] shrink-0 transition-colors duration-300"
        style={{ color: active ? t.accent : `${t.subtext}cc` }}
        fill={active ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
      <span
        className="text-[11px] font-mono truncate transition-colors duration-300"
        style={{ color: active ? t.text : `${t.subtext}cc` }}
      >
        {label}
      </span>
      {opensable && !active && (
        <span
          aria-hidden
          className="w-[5px] h-[5px] rounded-full shrink-0"
          style={{ backgroundColor: `${t.accent}80` }}
        />
      )}
    </>
  );

  const bgStyle = { backgroundColor: active ? `${t.accent}15` : "transparent" };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={opensable ? onClick : undefined}
        disabled={!opensable}
        className={`w-full flex items-center gap-1.5 px-2 py-[3px] rounded-[5px] transition-colors duration-300 text-left ${opensable ? "hover:brightness-110 cursor-pointer" : "cursor-default opacity-70"}`}
        style={bgStyle}
      >
        {inner}
      </button>
    );
  }
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-[3px] rounded-[5px] transition-colors duration-300"
      style={bgStyle}
    >
      {inner}
    </div>
  );
}
