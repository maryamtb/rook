import { motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { MockIcon } from "./icons";

type SlashMenuItem = { icon: string; label: string; shortLabel: string; selected?: boolean };

const items: SlashMenuItem[] = [
  { icon: "curlybraces", label: "Code Block", shortLabel: "code", selected: true },
  { icon: "checklist", label: "Todo", shortLabel: "todo" },
  { icon: "list.bullet", label: "Bullet List", shortLabel: "bullet" },
  { icon: "list.number", label: "Numbered List", shortLabel: "num" },
  { icon: "h.square", label: "Heading 1", shortLabel: "h1" },
  { icon: "h.square", label: "Heading 2", shortLabel: "h2" },
  { icon: "h.square", label: "Heading 3", shortLabel: "h3" },
  { icon: "text.alignleft", label: "Body", shortLabel: "body" },
  { icon: "link", label: "Link", shortLabel: "link" },
  { icon: "strikethrough", label: "Strikethrough", shortLabel: "strike" },
  { icon: "highlighter", label: "Highlight", shortLabel: "hl" },
];

export function SlashMenuPanel({ t }: { t: ThemeColors }) {
  return (
    <div
      className="w-[220px] rounded-xl overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: t.panel, boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
    >
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5">
        <span className="text-[12px] font-bold font-mono transition-colors duration-500" style={{ color: t.accent }}>/</span>
        <span className="flex-1" />
        <span className="text-[9px] font-mono transition-colors duration-500" style={{ color: `${t.subtext}50` }}>{items.length}</span>
      </div>
      <div className="h-px transition-colors duration-500" style={{ backgroundColor: `${t.border}30` }} />
      <div className="p-1 max-h-[230px] overflow-hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12, delay: 0.03 * i }}
            className="flex items-center gap-2.5 px-2.5 py-[5px] rounded-md transition-colors duration-500"
            style={{ backgroundColor: item.selected ? t.surface : "transparent" }}
          >
            <MockIcon name={item.icon} color={item.selected ? t.accent : `${t.subtext}80`} size={12} />
            <span className="text-[11px] flex-1 transition-colors duration-500" style={{ color: item.selected ? t.text : t.subtext }}>{item.label}</span>
            <span className="text-[9px] font-mono transition-colors duration-500" style={{ color: `${t.subtext}40` }}>{item.shortLabel}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
