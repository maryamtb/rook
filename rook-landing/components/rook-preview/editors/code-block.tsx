import { AnimatePresence, motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";

const COPY_GREEN = "#4ade80";

export function CodeBlock({ t, lang, children, copied }: { t: ThemeColors; lang: string; children: React.ReactNode; copied?: boolean; }) {
  return (
    <div className="rounded-lg overflow-hidden transition-colors duration-500" style={{ backgroundColor: t.codeBg }}>
      <div className="flex items-center px-3.5 pt-2.5 pb-0.5">
        <span className="text-[10.5px] transition-colors duration-500" style={{ color: `${t.subtext}cc` }}>{lang}</span>
        <div className="flex-1" />
        <div className="relative w-[11px] h-[11px]">
          <AnimatePresence initial={false} mode="wait">
            {copied ? (
              <motion.svg
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute inset-0"
                viewBox="0 0 16 16" fill="none" stroke={COPY_GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M3 8.5L6.5 12L13 4.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="absolute inset-0 transition-colors duration-500"
                style={{ color: `${t.subtext}cc` }}
                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              >
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </div>
      <pre className="px-4 pb-3 pt-1 text-[11.5px] leading-[1.75] font-mono whitespace-pre-wrap break-words">{children}</pre>
    </div>
  );
}

export function Token({ c, children, className }: { c: string; children: React.ReactNode; className?: string; }) {
  return <span className={`transition-colors duration-500${className ? ` ${className}` : ""}`} style={{ color: c }}>{children}</span>;
}

export function CodeLine({ n, subtext, children, className }: { n: number; subtext: string; children: React.ReactNode; className?: string; }) {
  return (
    <div className={className}>
      <span className="inline-block w-[18px] text-right transition-colors duration-500" style={{ color: `${subtext}cc` }}>{n}</span>
      <span>{"  "}</span>
      {children}
    </div>
  );
}
