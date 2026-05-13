import type { ThemeColors } from "@/lib/themes";
import { SidebarToggleIcon } from "./sidebar-toggle-icon";

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
        <div
          className="flex items-center gap-1 px-2 mr-1.5 rounded-full"
          style={{ height: 18, backgroundColor: "rgba(140, 200, 192, 0.1)" }}
        >
          <svg width="9" height="9" viewBox="0 0 180 180" fill="none" style={{ color: "rgb(140, 200, 192)", opacity: 0.9 }} aria-hidden="true">
            <path d="M18 84.85L85.88 16.97c9.37-9.37 24.57-9.37 33.94 0 9.37 9.37 9.37 24.57 0 33.94L68.56 102.18" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
            <path d="M69.27 101.47L119.82 50.91c9.37-9.37 24.57-9.37 33.94 0l.36.35c9.37 9.37 9.37 24.57 0 33.94L92.72 146.6c-3.12 3.12-3.12 8.19 0 11.31l12.61 12.61" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
            <path d="M102.85 33.94L52.65 84.15c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l50.21-50.2" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
          </svg>
          <span className="text-[8.5px] font-medium" style={{ color: t.text }}>MCP</span>
          <span className="text-[7.5px] font-semibold tracking-[0.04em]" style={{ color: "rgb(140, 200, 192)" }}>BETA</span>
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
