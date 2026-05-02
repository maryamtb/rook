import { File, Folder, FolderOpen } from "lucide-react";
import type { ThemeColors } from "@/lib/themes";
import type { MockupVariant } from "./app-mockup";

export function Sidebar({ t, variant }: { t: ThemeColors; variant: MockupVariant; }) {
  return (
    <div
      className="w-[210px] shrink-0 hidden sm:flex sm:flex-col h-full rounded-lg overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: `${t.panel}b3`,
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
      }}
    >
      <div style={{
        backgroundColor: `${t.bg}`, backdropFilter: "blur(84px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
      }} className="flex-1 flex flex-col">
        <div className="px-2 pt-4 pb-1">
          <WorkspaceSelector t={t} variant={variant} />
        </div>

        <div className="px-2 pt-1 pb-1.5">
          <div
            className="flex items-center gap-2 px-2.5 h-[28px] rounded-lg transition-colors duration-500"
            style={{ border: `1px solid ${t.border}50` }}
          >
            <svg className="w-[10px] h-[10px] transition-colors duration-500 shrink-0" style={{ color: `${t.subtext}cc` }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <span className="text-[11px] transition-colors duration-500 flex-1" style={{ color: `${t.subtext}cc` }}>
              Search notes...
            </span>
            <KeycapHint t={t}>{"⌘K"}</KeycapHint>
          </div>
        </div>

        <div className="flex-1 px-2 pt-1 space-y-0.5 overflow-hidden">
          <NotebookHeader t={t} label={activeLabel(variant)} count={3} active />

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

          {variant === "dsa" ? (
            <>
              <NotebookHeader t={t} label="System Design" count={5} expanded />
              <div className="ml-4 space-y-0.5">
                <NoteItem label="Scalability" t={t} />
                <NoteItem label="Availability" t={t} />
                <NoteItem label="Consistency" t={t} />
              </div>
              <NotebookHeader t={t} label="Patterns" count={8} />
              <NotebookHeader t={t} label="Templates" count={3} />
              <NotebookHeader t={t} label="Mock Interviews" count={2} />
            </>
          ) : (
            secondaryNotebooks(variant).map((nb) => (
              <NotebookHeader key={nb.label} t={t} label={nb.label} count={nb.count} />
            ))
          )}
        </div>

        <div className="px-2 pt-1 pb-2">
          <div className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md">
            <svg
              className="w-[10px] h-[10px] transition-colors duration-500 shrink-0"
              style={{ color: `${t.subtext}cc` }}
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
            >
              <path d="M6 1v10M1 6h10" />
            </svg>
            <span className="text-[11px] transition-colors duration-500" style={{ color: `${t.subtext}cc` }}>
              New Notebook
            </span>
          </div>
        </div>
      </div>
    </div >
  );
}

function activeLabel(variant: MockupVariant): string {
  if (variant === "dsa") return "DSA Practice";
  return "CLI Quick Refs";
}

function workspaceLabel(variant: MockupVariant): string {
  if (variant === "dsa") return "interview prep";
  return "work notes";
}

function secondaryNotebooks(variant: MockupVariant): { label: string; count: number; }[] {
  if (variant === "dsa") {
    return [
      { label: "System Design", count: 5 },
      { label: "Behavioral", count: 8 },
      { label: "Templates", count: 3 },
      { label: "Mock Interviews", count: 2 },
    ];
  }
  return [
    { label: "Backend / API", count: 4 },
    { label: "Frontend", count: 2 },
    { label: "Utilities", count: 5 },
    { label: "TIL", count: 3 },
  ];
}

function WorkspaceSelector({ t, variant }: { t: ThemeColors; variant: MockupVariant; }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 h-[30px] rounded-lg transition-colors duration-500"
      style={{ backgroundColor: `${t.accent}14` }}
    >
      <span className="text-[12px] font-medium transition-colors duration-500 flex-1 truncate" style={{ color: t.text }}>
        {workspaceLabel(variant)}
      </span>
      <KeycapHint t={t}>{"⇧⌘P"}</KeycapHint>
    </div>
  );
}

function KeycapHint({ t, children }: { t: ThemeColors; children: React.ReactNode; }) {
  return (
    <span
      className="inline-flex items-center text-[10px] font-mono transition-colors duration-500 shrink-0 tracking-tight"
      style={{ color: `${t.subtext}cc` }}
    >
      {children}
    </span>
  );
}

function NotebookHeader({ t, label, count, active, expanded }: { t: ThemeColors; label: string; count: number; active?: boolean; expanded?: boolean; }) {
  const Icon = active || expanded ? FolderOpen : Folder;
  return (
    <div
      className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md transition-colors duration-500"
      style={{ backgroundColor: active ? `${t.accent}18` : "transparent" }}
    >
      <Icon
        className="w-[11px] h-[11px] transition-colors duration-500 shrink-0"
        style={{ color: active ? t.accent : `${t.subtext}cc` }}
        strokeWidth={1.5}
      />
      <span className="text-xs transition-colors duration-500 flex-1 truncate" style={{ color: active ? t.text : t.subtext }}>
        {label}
      </span>
      <span
        className="text-[9px] px-1.5 py-0.5 rounded-full transition-colors duration-500 shrink-0"
        style={{ color: active ? t.subtext : `${t.subtext}cc`, backgroundColor: t.surface }}
      >
        {count}
      </span>
    </div>
  );
}

function NoteItem({ label, active, t }: { label: string; active?: boolean; t: ThemeColors; }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-[3px] rounded-[5px] transition-colors duration-500"
      style={{ backgroundColor: active ? `${t.accent}15` : "transparent" }}
    >
      <File
        className="w-[11px] h-[11px] transition-colors duration-500 shrink-0"
        style={{ color: active ? t.accent : `${t.subtext}cc` }}
        fill={active ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
      <span className="text-[11px] font-mono transition-colors duration-500 truncate" style={{ color: active ? t.text : `${t.subtext}cc` }}>
        {label}
      </span>
    </div>
  );
}
