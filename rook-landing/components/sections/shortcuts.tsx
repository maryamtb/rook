"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const SHORTCUTS = [
  { keys: ["⌘", "N"], action: "New note" },
  { keys: ["⌘", "F"], action: "Search" },
  { keys: ["⌘", "⇧", "↵"], action: "Code block" },
  { keys: ["⌘", ","], action: "Settings" },
  { keys: ["⌥", "Click"], action: "Multi-cursor" },
  { keys: ["⌘", "⇧", "⌫"], action: "Delete note" },
];

export function Shortcuts() {
  return (
    <section id="shortcuts" className="py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Shortcuts
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            All the usual suspects, and a few more
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 max-w-[640px] mx-auto"
        >
          {SHORTCUTS.map((s) => (
            <div
              key={s.action}
              className="flex items-center justify-between py-3 border-b border-border/50"
            >
              <span className="text-sm text-muted-foreground">{s.action}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, ki) => (
                  <Badge
                    key={ki}
                    variant="outline"
                    asChild
                    className="text-xs font-medium text-foreground/60 border-border bg-secondary/30 px-2 py-0.5 rounded-[5px] min-w-[28px] justify-center"
                  >
                    <kbd>{k}</kbd>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
