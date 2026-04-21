import type { ThemeColors } from "@/lib/themes";
import { MockIcon } from "./icons";

export function SelectionToolbarPanel({ t }: { t: ThemeColors }) {
  const ic = t.subtext;
  return (
    <div
      className="flex items-center gap-0 px-1.5 py-1 rounded-lg transition-colors duration-500"
      style={{ backgroundColor: t.panel, boxShadow: "0 6px 24px rgba(0,0,0,0.35)" }}
    >
      <ToolBtn t={t}><span className="text-[13px] font-semibold" style={{ color: ic }}>A</span></ToolBtn>
      <ToolBtn t={t}><MockIcon name="list.bullet" color={ic} size={13} /></ToolBtn>

      <ToolSep border={t.border} />

      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <path d="M4 2.5h4.2c1.7 0 3 1.1 3 2.5 0 1-.6 1.8-1.4 2.2.9.4 1.7 1.3 1.7 2.5 0 1.6-1.4 2.8-3.2 2.8H4V2.5zm1.8 4.2h2.3c.7 0 1.2-.5 1.2-1.1s-.5-1.1-1.2-1.1H5.8v2.2zm0 4.3h2.6c.8 0 1.3-.5 1.3-1.2 0-.7-.5-1.2-1.3-1.2H5.8v2.4z" fill="currentColor"/>
        </svg>
      </ToolBtn>
      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <line x1="6" y1="2.5" x2="12" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4" y1="13.5" x2="10" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="10" y1="2.5" x2="6" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </ToolBtn>
      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <path d="M4.5 2v5.2c0 2 1.6 3.3 3.5 3.3s3.5-1.3 3.5-3.3V2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="3" y1="14" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </ToolBtn>
      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5.3 5.5c0-1.4 1.2-2.5 2.7-2.5 1.5 0 2.7.8 2.9 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M10.7 10.5c0 1.4-1.2 2.5-2.7 2.5-1.5 0-2.7-.8-2.9-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
      </ToolBtn>

      <ToolSep border={t.border} />

      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <line x1="6" y1="1.5" x2="4.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11.5" y1="1.5" x2="10" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="5.5" x2="14" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="10.5" x2="14" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </ToolBtn>
      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <path d="M9.5 2.5l4 4-6 6-1.5.5-.5-.5-1 1H2l1.5-2-.5-.5.5-1.5 6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="8.5" y1="3.5" x2="12.5" y2="7.5" stroke="currentColor" strokeWidth="1"/>
          <line x1="1" y1="15" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </ToolBtn>
      <ToolBtn t={t}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: ic }}>
          <path d="M7 9l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9.5 4.5l1-1a2.5 2.5 0 013.5 3.5l-1 1-1.5 1.5a2.5 2.5 0 01-3.5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M6.5 11.5l-1 1a2.5 2.5 0 01-3.5-3.5l1-1L4.5 6.5a2.5 2.5 0 013.5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </ToolBtn>
    </div>
  );
}

function ToolBtn({ t, children }: { t: ThemeColors; children: React.ReactNode }) {
  return (
    <div className="w-[26px] h-[24px] flex items-center justify-center rounded-[5px] transition-colors duration-500" style={{ color: t.subtext }}>
      {children}
    </div>
  );
}

function ToolSep({ border }: { border: string }) {
  return <div className="w-px h-[16px] mx-1 transition-colors duration-500" style={{ backgroundColor: `${border}50` }} />;
}
