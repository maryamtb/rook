import type { ThemeColors } from "@/lib/themes";
import { KeycapHint } from "./keycap-hint";

export function CollectionSelector({ t, label }: { t: ThemeColors; label: string; }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 h-[30px] rounded-lg transition-colors duration-500"
      style={{ backgroundColor: `${t.accent}14` }}
    >
      <span className="text-[12px] font-medium transition-colors duration-500 flex-1 truncate" style={{ color: t.text }}>
        {label}
      </span>
      <KeycapHint t={t}>⇧⌘P</KeycapHint>
    </div>
  );
}
