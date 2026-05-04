"use client";

import type { ThemeColors } from "@/lib/themes";

type Item = { text: string; checked: boolean; };

const ITEMS: Item[] = [
  { text: "checked DNS resolution from the logs (resolves)", checked: true },
  { text: "curl'd the API from local with same headers (works)", checked: true },
  { text: "console logged the response headers being sent", checked: false },
];

export function DebugAnimatedEditor({ t }: { t: ThemeColors; }) {
  return (
    <div className="p-6">
      <h2 className="text-[19px] font-display font-bold mb-2 transition-colors duration-500" style={{ color: t.text }}>
        next.js fetch fails in prod, works local
      </h2>
      <p className="text-[13px] leading-[1.7] mb-3 transition-colors duration-500" style={{ color: t.subtext }}>
        Works on my machine, breaks on Vercel. Logs show CORS error but I have{" "}
        <span className="font-mono text-[11px] px-1 py-0.5 rounded transition-colors duration-500" style={{ backgroundColor: `${t.accent}18`, color: t.accent }}>
          access-control-allow-origin
        </span>{" "}
        set.
      </p>

      <div className="rounded-lg overflow-hidden mb-4 transition-colors duration-500" style={{ backgroundColor: t.codeBg }}>
        <div className="flex items-center px-3.5 pt-2.5 pb-0.5">
          <span className="text-[10.5px] transition-colors duration-500" style={{ color: `${t.subtext}cc` }}>console</span>
        </div>
        <pre className="px-4 pb-3 pt-1 text-[11px] leading-[1.65] font-mono whitespace-pre-wrap break-words" style={{ color: t.codeText }}>
          <span style={{ color: t.keyword }}>Access to fetch</span>
          <span> at </span>
          <span style={{ color: t.string }}>&apos;https://api.rook.app/auth&apos;</span>
          <span> from origin </span>
          <span style={{ color: t.string }}>&apos;https://userook.app&apos;</span>
          <span> has been blocked by CORS policy: No </span>
          <span style={{ color: t.func }}>&apos;Access-Control-Allow-Origin&apos;</span>
          <span> header is present on the requested resource.</span>
        </pre>
      </div>

      <p className="text-[13px] font-semibold mb-2 transition-colors duration-500" style={{ color: t.text }}>
        things i&apos;ve tried so far
      </p>
      <div className="space-y-1.5">
        {ITEMS.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 text-[12.5px] leading-[1.5]">
            <div
              aria-hidden
              className="mt-[2px] w-[14px] h-[14px] rounded-[3px] border flex items-center justify-center shrink-0 transition-colors duration-300"
              style={{
                borderColor: item.checked ? t.accent : `${t.subtext}66`,
                backgroundColor: item.checked ? t.accent : "transparent",
              }}
            >
              {item.checked && (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.5L5 9L9.5 3.5" stroke={t.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className="transition-colors duration-300"
              style={{
                color: item.checked ? `${t.subtext}99` : t.text,
                textDecorationLine: item.checked ? "line-through" : "none",
                textDecorationColor: `${t.subtext}66`,
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
