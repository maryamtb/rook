"use client";

import { motion } from "framer-motion";
import { AppMockup } from "@/components/mockup";
import { themes } from "@/lib/themes";

type ThemesProps = {
  activeTheme: number;
  onSelect: (i: number) => void;
};

export function Themes({ activeTheme, onSelect }: ThemesProps) {
  return (
    <section id="themes" className="py-24 md:py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200, 120, 40, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1080px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Themes
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Five built-in themes, each with its own syntax highlighting
          </p>
        </motion.div>

        <div className="flex items-center justify-start sm:justify-center gap-1.5 mb-12 relative overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 no-scrollbar">
          {themes.map((t, i) => (
            <button
              key={t.name}
              onClick={() => onSelect(i)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap shrink-0 ${activeTheme === i
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {activeTheme === i && (
                <motion.div
                  layoutId="theme-tab-bg"
                  className="absolute inset-0 bg-secondary rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: t.accent }}
                  animate={{ scale: activeTheme === i ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                />
                {t.name}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[960px] mx-auto relative"
        >
          <motion.div
            className="absolute -inset-12 rounded-3xl pointer-events-none blur-3xl opacity-20"
            animate={{ backgroundColor: themes[activeTheme].accent }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="relative theme-morph hidden sm:block">
            <AppMockup theme={themes[activeTheme]} variant="dsa" />
          </div>
          <div className="relative theme-morph sm:hidden" role="presentation">
            <div className="rounded-xl overflow-hidden border shadow-2xl transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].bg, borderColor: themes[activeTheme].border }}>
              <div className="flex items-center px-3 h-9 transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].panel }}>
                <div className="flex gap-[6px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].surface }}>
                  <svg className="w-[8px] h-[8px] transition-colors duration-500" style={{ color: themes[activeTheme].subtext }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" /></svg>
                  <span className="text-[9px] font-medium transition-colors duration-500" style={{ color: themes[activeTheme].subtext }}>New note</span>
                </div>
              </div>
              <div className="p-5 transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].bg }}>
                <h2 className="text-[18px] font-bold mb-2 transition-colors duration-500" style={{ color: themes[activeTheme].text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>Binary Search</h2>
                <p className="text-xs leading-[1.7] mb-3 transition-colors duration-500" style={{ color: themes[activeTheme].subtext }}>
                  A divide-and-conquer algorithm for sorted arrays. Runs in <span className="font-mono text-[11px] px-1 py-0.5 rounded transition-colors duration-500" style={{ backgroundColor: `${themes[activeTheme].accent}18`, color: themes[activeTheme].accent }}>O(log n)</span> time.
                </p>
                <div className="rounded-lg overflow-hidden transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].codeBg }}>
                  <div className="flex items-center px-3 pt-2">
                    <span className="text-[9px] transition-colors duration-500" style={{ color: `${themes[activeTheme].subtext}99` }}>python</span>
                  </div>
                  <pre className="px-3 pb-3 pt-1 text-[10px] leading-[1.75] font-mono">
                    <span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>def</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].func }}>binary_search</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>(arr, target):</span>{"\n"}
                    {"  "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>,</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>hi</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].string }}>0</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>,</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].func }}>len</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>(arr) - 1</span>{"\n"}
                    {"  "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>while</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>&lt;=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>hi</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>:</span>{"\n"}
                    {"    "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>mid</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>+ (hi - lo) // 2</span>{"\n"}
                    {"    "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>if</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>arr</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>[mid] == target:</span>{"\n"}
                    {"      "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>return</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>mid</span>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
