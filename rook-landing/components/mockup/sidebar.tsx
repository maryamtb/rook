import type { ThemeColors } from "@/lib/themes";
import type { MockupVariant } from "./app-mockup";

export function Sidebar({ t, variant }: { t: ThemeColors; variant: MockupVariant; }) {
  return (
    <div
      className="w-[200px] shrink-0 flex flex-col self-stretch transition-colors duration-500"
      style={{ backgroundColor: t.panel }}
    >
      <div className="px-2 pt-2.5 pb-1.5">
        <div
          className="flex items-center gap-2 px-2.5 h-[28px] rounded-lg transition-colors duration-500"
          style={{ border: `1px solid ${t.border}50` }}
        >
          <svg className="w-[10px] h-[10px] transition-colors duration-500 shrink-0" style={{ color: `${t.subtext}80` }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <span className="text-[11px] transition-colors duration-500 flex-1" style={{ color: `${t.subtext}66` }}>
            Search notes...
          </span>
          <span className="text-[9px] font-mono transition-colors duration-500 shrink-0" style={{ color: `${t.subtext}50` }}>
            {"⌘"}K
          </span>
        </div>
      </div>

      <div className="flex-1 px-2 pt-1 space-y-0.5 overflow-hidden">
        <div
          className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md transition-colors duration-500"
          style={{ backgroundColor: `${t.accent}18` }}
        >
          <svg className="w-[11px] h-[11px] transition-colors duration-500 shrink-0" style={{ color: t.accent }} fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 3.5A1.5 1.5 0 012.5 2h3.879a1.5 1.5 0 011.06.44l1.122 1.12A1.5 1.5 0 009.62 4H13.5A1.5 1.5 0 0115 5.5v7a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 12.5v-9z" />
          </svg>
          <span className="text-[12px] transition-colors duration-500 flex-1 truncate" style={{ color: t.text }}>
            {variant === "dsa" ? "DSA Practice" : "CLI Quick Refs"}
          </span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full transition-colors duration-500 shrink-0"
            style={{ color: t.subtext, backgroundColor: t.surface }}
          >
            3
          </span>
        </div>

        <div className="ml-4 space-y-0.5">
          {variant === "dsa" ? (
            <>
              <NoteItem label="Binary Search" active t={t} />
              <NoteItem label="Two Pointers" t={t} />
              <NoteItem label="BFS / DFS" t={t} />
            </>
          ) : variant === "aws" ? (
            <>
              <NoteItem label="aws cli quick ref" active t={t} />
              <NoteItem label="kubectl quick ref" t={t} />
              <NoteItem label="Docker commands" t={t} />
            </>
          ) : (
            <>
              <NoteItem label="kubectl quick ref" active t={t} />
              <NoteItem label="Docker commands" t={t} />
              <NoteItem label="Git workflows" t={t} />
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md mt-0.5">
          <svg className="w-[11px] h-[11px] transition-colors duration-500 shrink-0" style={{ color: `${t.subtext}aa` }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
            <path d="M1.5 3.5A1.5 1.5 0 013 2h3.879a1.5 1.5 0 011.06.44l1.122 1.12A1.5 1.5 0 0010.12 4H13A1.5 1.5 0 0114.5 5.5v7A1.5 1.5 0 0113 14H3a1.5 1.5 0 01-1.5-1.5v-9z" />
          </svg>
          <span className="text-[12px] transition-colors duration-500 flex-1 truncate" style={{ color: t.subtext }}>
            {variant === "dsa" ? "System Design" : "Work Notes"}
          </span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full transition-colors duration-500 shrink-0"
            style={{ color: `${t.subtext}99`, backgroundColor: t.surface }}
          >
            2
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md mt-0.5">
          <svg
            className="w-[10px] h-[10px] transition-colors duration-500 shrink-0"
            style={{ color: `${t.subtext}66` }}
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          <span className="text-[11px] transition-colors duration-500" style={{ color: `${t.subtext}66` }}>
            New Notebook
          </span>
        </div>
      </div>
    </div>
  );
}

function NoteItem({ label, active, t }: { label: string; active?: boolean; t: ThemeColors; }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-[3px] rounded-[5px] transition-colors duration-500"
      style={{ backgroundColor: active ? `${t.accent}15` : "transparent" }}
    >
      <svg className="w-[10px] h-[10px] transition-colors duration-500 shrink-0" style={{ color: active ? t.accent : `${t.subtext}66` }} viewBox="0 0 16 16">
        {active ? (
          <path d="M4 1.5A1.5 1.5 0 015.5 0h4.586a1.5 1.5 0 011.06.44l2.914 2.914A1.5 1.5 0 0114.5 4.414V14.5a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 14.5v-13z" fill="currentColor" />
        ) : (
          <path d="M4 1.5A1.5 1.5 0 015.5 0h4.586a1.5 1.5 0 011.06.44l2.914 2.914A1.5 1.5 0 0114.5 4.414V14.5a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 14.5v-13z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        )}
      </svg>
      <span className="text-[11px] font-mono transition-colors duration-500 truncate" style={{ color: active ? t.text : `${t.subtext}aa` }}>
        {label}
      </span>
    </div>
  );
}
