import type { ThemeColors } from "@/lib/themes";
import { SidebarToggleIcon } from "./icons";

export function TitleBar({ t }: { t: ThemeColors }) {
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
      <div className="ml-3">
        <SidebarToggleIcon color={t.subtext} />
      </div>
      <div className="flex-1" />
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
    </div>
  );
}
