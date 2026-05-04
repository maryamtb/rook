"use client";

import type { ThemeColors } from "@/lib/themes";
import { KeycapHint } from "../../keycap-hint";
import { Shimmer } from "../../shimmer";
import type { Collection } from "./data";

export function CollectionPill({
  t, collection, open, hinted, onClick,
}: {
  t: ThemeColors;
  collection: Collection;
  open: boolean;
  hinted: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative">
      <Shimmer show={hinted} radius={8} glowPad={6} />
      <button
        type="button"
        data-collection-trigger
        onClick={onClick}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Switch collection (current: ${collection.label})`}
        className="relative w-full flex items-center gap-2 px-2.5 h-[30px] rounded-lg transition-all duration-200 hover:brightness-105 cursor-pointer"
        style={{
          backgroundColor: open ? `${collection.color}55` : `${collection.color}33`,
          boxShadow: open ? `0 0 0 1px ${collection.color}88` : undefined,
        }}
      >
        <span
          className="text-[12px] font-semibold flex-1 truncate text-left transition-colors duration-200"
          style={{ color: t.text }}
        >
          {collection.label}
        </span>
        <KeycapHint t={t}>⇧⌘P</KeycapHint>
      </button>
    </div>
  );
}
