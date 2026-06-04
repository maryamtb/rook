import type { ThemeColors } from "@/lib/themes";
import { SidebarToggleIcon } from "./sidebar-toggle-icon";
import { McpMark } from "@/components/mcp-mark";

export type MobileNote = {
  title: string;
  description: React.ReactNode;
  codeLang: string;
  code: React.ReactNode;
};

export function MobileMockup({ theme: t, note }: { theme: ThemeColors; note: MobileNote }) {
  return (
    <div
      className="rounded-xl overflow-hidden border shadow-2xl transition-colors duration-500"
      style={{ backgroundColor: t.bg, borderColor: t.border }}
      role="presentation"
    >
      <div
        className="flex items-center px-3 h-9 transition-colors duration-500"
        style={{ backgroundColor: t.panel }}
      >
        <div className="flex gap-[6px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-2.5">
          <SidebarToggleIcon color={t.subtext} collapsed />
        </div>
        <div className="flex-1" />
        <div className="flex items-center mr-2">
          <McpMark size={14} />
        </div>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: t.surface }}
        >
          <svg
            aria-hidden="true"
            className="w-[8px] h-[8px] transition-colors duration-500"
            style={{ color: t.subtext }}
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          <span className="text-[9px] font-medium transition-colors duration-500" style={{ color: t.subtext }}>
            New note
          </span>
        </div>
      </div>

      <div className="p-5 transition-colors duration-500" style={{ backgroundColor: t.bg }}>
        <h2
          className="text-[18px] font-display font-bold mb-2 transition-colors duration-500"
          style={{ color: t.text }}
        >
          {note.title}
        </h2>
        <p className="text-xs leading-[1.7] mb-3 transition-colors duration-500" style={{ color: t.subtext }}>
          {note.description}
        </p>
        <div className="rounded-lg overflow-hidden transition-colors duration-500" style={{ backgroundColor: t.codeBg }}>
          <div className="flex items-center px-3 pt-2">
            <span className="text-[9px] transition-colors duration-500" style={{ color: `${t.subtext}99` }}>
              {note.codeLang}
            </span>
          </div>
          <pre className="px-3 pb-3 pt-1 text-[10px] leading-[1.75] font-mono whitespace-pre-wrap break-words">
            {note.code}
          </pre>
        </div>
      </div>
    </div>
  );
}
