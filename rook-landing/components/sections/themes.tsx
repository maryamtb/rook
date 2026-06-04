"use client";

import { motion } from "framer-motion";
import { AppMockup, MobileMockup, MorphSpan, type MobileNote } from "@/components/rook-preview";
import { sectionContent, sectionHeading } from "@/lib/motion";
import { themes, type ThemeColors } from "@/lib/themes";

function binarySearchNote(t: ThemeColors): MobileNote {
  return {
    title: "Binary Search",
    description: (
      <>
        A divide-and-conquer algorithm for sorted arrays. Runs in{" "}
        <span
          className="font-mono text-[11px] px-1 py-0.5 rounded transition-colors duration-500"
          style={{ backgroundColor: `${t.accent}18`, color: t.accent }}
        >
          O(log n)
        </span>{" "}
        time.
      </>
    ),
    codeLang: "python",
    code: (
      <>
        <MorphSpan color={t.keyword}>def</MorphSpan>{" "}
        <MorphSpan color={t.func}>binary_search</MorphSpan>
        <MorphSpan color={t.codeText}>(arr, target):</MorphSpan>{"\n"}
        {"  "}
        <MorphSpan color={t.variable}>lo</MorphSpan>
        <MorphSpan color={t.codeText}>,</MorphSpan>{" "}
        <MorphSpan color={t.variable}>hi</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>=</MorphSpan>{" "}
        <MorphSpan color={t.string}>0</MorphSpan>
        <MorphSpan color={t.codeText}>,</MorphSpan>{" "}
        <MorphSpan color={t.func}>len</MorphSpan>
        <MorphSpan color={t.codeText}>(arr) - 1</MorphSpan>{"\n"}
        {"  "}
        <MorphSpan color={t.keyword}>while</MorphSpan>{" "}
        <MorphSpan color={t.variable}>lo</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>&lt;=</MorphSpan>{" "}
        <MorphSpan color={t.variable}>hi</MorphSpan>
        <MorphSpan color={t.codeText}>:</MorphSpan>{"\n"}
        {"    "}
        <MorphSpan color={t.variable}>mid</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>=</MorphSpan>{" "}
        <MorphSpan color={t.variable}>lo</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>+ (hi - lo) // 2</MorphSpan>{"\n"}
        {"    "}
        <MorphSpan color={t.keyword}>if</MorphSpan>{" "}
        <MorphSpan color={t.variable}>arr</MorphSpan>
        <MorphSpan color={t.codeText}>[mid] == target:</MorphSpan>{"\n"}
        {"      "}
        <MorphSpan color={t.keyword}>return</MorphSpan>{" "}
        <MorphSpan color={t.variable}>mid</MorphSpan>{"\n"}
        {"    "}
        <MorphSpan color={t.keyword}>elif</MorphSpan>{" "}
        <MorphSpan color={t.variable}>arr</MorphSpan>
        <MorphSpan color={t.codeText}>[mid] &lt; target:</MorphSpan>{"\n"}
        {"      "}
        <MorphSpan color={t.variable}>lo</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>= </MorphSpan>
        <MorphSpan color={t.variable}>mid</MorphSpan>
        <MorphSpan color={t.codeText}> + </MorphSpan>
        <MorphSpan color={t.string}>1</MorphSpan>{"\n"}
        {"    "}
        <MorphSpan color={t.keyword}>else</MorphSpan>
        <MorphSpan color={t.codeText}>:</MorphSpan>{"\n"}
        {"      "}
        <MorphSpan color={t.variable}>hi</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>= </MorphSpan>
        <MorphSpan color={t.variable}>mid</MorphSpan>
        <MorphSpan color={t.codeText}> - </MorphSpan>
        <MorphSpan color={t.string}>1</MorphSpan>{"\n"}
        {"  "}
        <MorphSpan color={t.keyword}>return</MorphSpan>{" "}
        <MorphSpan color={t.codeText}>-</MorphSpan>
        <MorphSpan color={t.string}>1</MorphSpan>
      </>
    ),
  };
}

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
          {...sectionHeading}
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

        <div className="max-w-[960px] mx-auto relative">
          {themes.map((t, i) => (
            <div
              key={t.name}
              aria-hidden
              className="absolute -inset-12 rounded-3xl pointer-events-none blur-3xl"
              style={{
                backgroundColor: t.accent,
                opacity: activeTheme === i ? 0.2 : 0,
                transform: "translateZ(0)",
                transition: "opacity 1.2s ease-in-out",
              }}
            />
          ))}

          <motion.div {...sectionContent} className="relative">
            <div className="relative theme-morph hidden sm:block">
              <AppMockup theme={themes[activeTheme]} variant="dsa" />
            </div>
            <div className="relative theme-morph sm:hidden">
              <MobileMockup theme={themes[activeTheme]} note={binarySearchNote(themes[activeTheme])} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
