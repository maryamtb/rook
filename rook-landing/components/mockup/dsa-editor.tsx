"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { CodeBlock, CodeLine, Token } from "./code-block";
import { SelectionToolbarPanel } from "./selection-toolbar";

type Phase = "idle" | "select" | "toolbar";

export function DsaAnimatedEditor({ t }: { t: ThemeColors }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setPhase("select");
      timerRef.current = setTimeout(() => {
        setPhase("toolbar");
        timerRef.current = setTimeout(() => {
          setPhase("idle");
          timerRef.current = setTimeout(cycle, 2200);
        }, 3200);
      }, 350);
    };
    timerRef.current = setTimeout(cycle, 1400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const showSelect = phase === "select" || phase === "toolbar";
  const showToolbar = phase === "toolbar";

  return (
    <div className="relative h-full p-6">
      <h2 className="text-[20px] font-bold mb-2 transition-colors duration-500" style={{ color: t.text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>
        Binary Search
      </h2>
      <p className="text-[13px] leading-[1.7] mb-4 transition-colors duration-500 relative" style={{ color: t.subtext }}>
        A divide-and-conquer algorithm that locates a target in a{" "}
        <span className="relative inline-block">
          <AnimatePresence>
            {showSelect && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-[2px] origin-left"
                style={{ backgroundColor: `${t.accent}30` }}
              />
            )}
          </AnimatePresence>
          <span className="relative">sorted array</span>
        </span>{" "}
        by repeatedly halving the search space.
        Runs in <span className="font-mono text-xs px-1 py-0.5 rounded transition-colors duration-500" style={{ backgroundColor: `${t.accent}18`, color: t.accent }}>O(log n)</span> time
        and <span className="font-mono text-xs px-1 py-0.5 rounded transition-colors duration-500" style={{ backgroundColor: `${t.accent}18`, color: t.accent }}>O(1)</span> space.
      </p>

      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[24px] left-[290px] pointer-events-none z-10"
          >
            <SelectionToolbarPanel t={t} />
          </motion.div>
        )}
      </AnimatePresence>

      <CodeBlock t={t} lang="python">
        <CodeLine n={1} subtext={t.subtext}>
          <Token c={t.keyword}>def</Token> <Token c={t.func}>binary_search</Token><Token c={t.codeText}>(</Token><Token c={t.variable}>arr</Token><Token c={t.codeText}>,</Token> <Token c={t.variable}>target</Token><Token c={t.codeText}>):</Token>
        </CodeLine>
        <CodeLine n={2} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>lo</Token><Token c={t.codeText}>,</Token> <Token c={t.variable}>hi</Token> <Token c={t.codeText}>=</Token> <Token c={t.string}>0</Token><Token c={t.codeText}>,</Token> <Token c={t.func}>len</Token><Token c={t.codeText}>(</Token><Token c={t.variable}>arr</Token><Token c={t.codeText}>)</Token> <Token c={t.codeText}>-</Token> <Token c={t.string}>1</Token>
        </CodeLine>
        <CodeLine n={3} subtext={t.subtext}>
          {"    "}<Token c={t.keyword}>while</Token> <Token c={t.variable}>lo</Token> <Token c={t.codeText}>&lt;=</Token> <Token c={t.variable}>hi</Token><Token c={t.codeText}>:</Token>
        </CodeLine>
        <CodeLine n={4} subtext={t.subtext}>
          {"        "}<Token c={t.variable}>mid</Token> <Token c={t.codeText}>=</Token> <Token c={t.variable}>lo</Token> <Token c={t.codeText}>+</Token> <Token c={t.codeText}>(</Token><Token c={t.variable}>hi</Token> <Token c={t.codeText}>-</Token> <Token c={t.variable}>lo</Token><Token c={t.codeText}>)</Token> <Token c={t.codeText}>{"//"}</Token> <Token c={t.string}>2</Token>
        </CodeLine>
        <CodeLine n={5} subtext={t.subtext}>
          {"        "}<Token c={t.keyword}>if</Token> <Token c={t.variable}>arr</Token><Token c={t.codeText}>[</Token><Token c={t.variable}>mid</Token><Token c={t.codeText}>]</Token> <Token c={t.codeText}>==</Token> <Token c={t.variable}>target</Token><Token c={t.codeText}>:</Token>
        </CodeLine>
        <CodeLine n={6} subtext={t.subtext}>
          {"            "}<Token c={t.keyword}>return</Token> <Token c={t.variable}>mid</Token>
        </CodeLine>
        <CodeLine n={7} subtext={t.subtext}>
          {"        "}<Token c={t.keyword}>elif</Token> <Token c={t.variable}>arr</Token><Token c={t.codeText}>[</Token><Token c={t.variable}>mid</Token><Token c={t.codeText}>]</Token> <Token c={t.codeText}>&lt;</Token> <Token c={t.variable}>target</Token><Token c={t.codeText}>:</Token>
        </CodeLine>
        <CodeLine n={8} subtext={t.subtext}>
          {"            "}<Token c={t.variable}>lo</Token> <Token c={t.codeText}>=</Token> <Token c={t.variable}>mid</Token> <Token c={t.codeText}>+</Token> <Token c={t.string}>1</Token>
        </CodeLine>
        <CodeLine n={9} subtext={t.subtext}>
          {"        "}<Token c={t.keyword}>else</Token><Token c={t.codeText}>:</Token>
        </CodeLine>
        <CodeLine n={10} subtext={t.subtext}>
          {"            "}<Token c={t.variable}>hi</Token> <Token c={t.codeText}>=</Token> <Token c={t.variable}>mid</Token> <Token c={t.codeText}>-</Token> <Token c={t.string}>1</Token>
        </CodeLine>
        <CodeLine n={11} subtext={t.subtext}>
          {"    "}<Token c={t.keyword}>return</Token> <Token c={t.codeText}>-</Token><Token c={t.string}>1</Token>
        </CodeLine>
      </CodeBlock>
    </div>
  );
}
