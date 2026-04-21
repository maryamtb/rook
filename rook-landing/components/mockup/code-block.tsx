import type { ThemeColors } from "@/lib/themes";

export function CodeBlock({ t, lang, children }: { t: ThemeColors; lang: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden transition-colors duration-500" style={{ backgroundColor: t.codeBg }}>
      <div className="flex items-center px-3.5 pt-2.5 pb-0.5">
        <span className="text-[10.5px] transition-colors duration-500" style={{ color: `${t.subtext}99` }}>{lang}</span>
        <div className="flex-1" />
        <svg className="w-[11px] h-[11px] transition-colors duration-500" style={{ color: `${t.subtext}44` }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="9" height="9" rx="1.5" />
          <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
        </svg>
      </div>
      <pre className="px-4 pb-3 pt-1 text-[11.5px] leading-[1.75] font-mono overflow-hidden">{children}</pre>
    </div>
  );
}

export function Token({ c, children }: { c: string; children: React.ReactNode }) {
  return <span className="transition-colors duration-500" style={{ color: c }}>{children}</span>;
}

export function CodeLine({ n, subtext, children }: { n: number; subtext: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="inline-block w-[18px] text-right transition-colors duration-500" style={{ color: `${subtext}44` }}>{n}</span>
      <span>{"  "}</span>
      {children}
    </div>
  );
}
