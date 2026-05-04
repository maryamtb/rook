"use client";

import { Check } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";

export function CollectionMenuItem({
  t, label, color, selected, onClick,
}: {
  t: ThemeColors;
  label: string;
  color: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      aria-current={selected ? "true" : undefined}
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-colors duration-150 hover:brightness-110 text-left cursor-pointer"
      style={{ backgroundColor: selected ? `${t.accent}10` : "transparent" }}
    >
      <span
        aria-hidden="true"
        className="w-[8px] h-[8px] rounded-full shrink-0"
        style={{ backgroundColor: color, boxShadow: `0 0 0 1px ${color}33` }}
      />
      <span className="text-[12px] flex-1 truncate" style={{ color: t.text }}>
        {label}
      </span>
      {selected && <Check aria-hidden="true" className="w-[12px] h-[12px]" style={{ color: t.text }} strokeWidth={2} />}
    </button>
  );
}
