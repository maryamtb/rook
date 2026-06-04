"use client";

import { File } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";

export function NewNoteItem({ t, active }: { t: ThemeColors; active?: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-[3px] rounded-[5px]"
      style={{ backgroundColor: active ? `${t.accent}15` : "transparent" }}
    >
      <File
        className="w-[11px] h-[11px] shrink-0"
        style={{ color: active ? t.accent : `${t.subtext}cc` }}
        fill={active ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
      <span
        className="text-[11px] font-mono truncate flex-1 min-w-0"
        style={{ color: active ? t.text : `${t.subtext}cc` }}
      >
        New note
      </span>
      <span
        className="text-[9px] font-mono shrink-0 tabular-nums"
        style={{ color: active ? t.accent : `${t.subtext}99` }}
      >
        now
      </span>
    </div>
  );
}
