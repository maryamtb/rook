import type { ThemeColors } from "@/lib/themes";

export function KeycapHint({ t, children }: { t: ThemeColors; children: React.ReactNode; }) {
  return (
    <span
      className="inline-flex items-center text-[10px] font-mono shrink-0 tracking-tight"
      style={{ color: `${t.subtext}cc` }}
    >
      {children}
    </span>
  );
}
