"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { CodeBlock, CodeLine, Token } from "./code-block";
import { SlashMenuPanel } from "./slash-menu";

type Phase = "idle" | "scroll" | "slash" | "menu";

export function AuthAnimatedEditor({ t }: { t: ThemeColors }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setPhase("scroll");
      timerRef.current = setTimeout(() => {
        setPhase("slash");
        timerRef.current = setTimeout(() => {
          setPhase("menu");
          timerRef.current = setTimeout(() => {
            setPhase("idle");
            timerRef.current = setTimeout(cycle, 2000);
          }, 3000);
        }, 400);
      }, 500);
    };
    timerRef.current = setTimeout(cycle, 1800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const isScrolled = phase === "scroll" || phase === "slash" || phase === "menu";
  const showSlash = phase === "slash" || phase === "menu";
  const showMenu = phase === "menu";

  return (
    <div className="relative h-full">
      <motion.div
        className="p-6"
        animate={{ y: isScrolled ? -50 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-[20px] font-bold mb-2 transition-colors duration-500" style={{ color: t.text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>
          kubectl quick ref
        </h2>
        <p className="text-[13px] leading-[1.7] mb-4 transition-colors duration-500" style={{ color: t.subtext }}>
          Commands for managing context, pods, deployments.
        </p>

        <p className="text-[13px] font-semibold mb-2 transition-colors duration-500" style={{ color: t.text }}>Contexts</p>
        <CodeBlock t={t} lang="bash">
          <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>config get-contexts</Token></CodeLine>
          <CodeLine n={2} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>config use-context</Token> <Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
          <CodeLine n={3} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>config current-context</Token></CodeLine>
        </CodeBlock>

        <p className="text-[13px] font-semibold mb-2 mt-5 transition-colors duration-500" style={{ color: t.text }}>Pods</p>
        <CodeBlock t={t} lang="bash">
          <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>get pods -n</Token> <Token c={t.variable}>&lt;namespace&gt;</Token></CodeLine>
          <CodeLine n={2} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>logs</Token> <Token c={t.variable}>&lt;pod-name&gt;</Token> <Token c={t.keyword}>--tail</Token><Token c={t.codeText}>=100 -f</Token></CodeLine>
          <CodeLine n={3} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>exec -it</Token> <Token c={t.variable}>&lt;pod-name&gt;</Token> <Token c={t.codeText}>-- /bin/sh</Token></CodeLine>
        </CodeBlock>

        <p className="text-[13px] font-semibold mb-2 mt-5 transition-colors duration-500" style={{ color: t.text }}>Deployments</p>
        <CodeBlock t={t} lang="bash">
          <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>rollout restart deployment</Token> <Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
          <CodeLine n={2} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>rollout status deployment</Token> <Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
          <CodeLine n={3} subtext={t.subtext}><Token c={t.func}>kubectl</Token> <Token c={t.codeText}>delete pod</Token> <Token c={t.variable}>&lt;pod-name&gt;</Token> <Token c={t.keyword}>--grace-period</Token><Token c={t.codeText}>=0</Token></CodeLine>
        </CodeBlock>

        <div className="mt-6 h-[22px]">
          <AnimatePresence>
            {showSlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center"
              >
                <span className="text-[13px] font-mono transition-colors duration-500" style={{ color: t.accent }}>/</span>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="w-[1.5px] h-[16px] ml-px"
                  style={{ backgroundColor: t.accent }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ bottom: isScrolled ? 50 : 0 }}
            className="absolute left-6 z-10 pointer-events-none"
          >
            <SlashMenuPanel t={t} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
