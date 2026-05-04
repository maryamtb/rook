import type { ThemeColors } from "@/lib/themes";
import { KeycapHint } from "./keycap-hint";

export function SearchBar({ t }: { t: ThemeColors; }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 h-[28px] rounded-lg transition-colors duration-500"
      style={{ border: `1px solid ${t.border}50` }}
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
      <span className="text-[11px] flex-1" style={{ color: `${t.subtext}cc` }}>
        Search notes...
      </span>
      <KeycapHint t={t}>⌘K</KeycapHint>
    </div>
  );
}
