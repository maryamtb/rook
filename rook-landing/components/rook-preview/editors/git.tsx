"use client";

import { useState, useEffect, useRef } from "react";
import type { ThemeColors } from "@/lib/themes";
import { CodeBlock, CodeLine, Token } from "./code-block";

export function GitAnimatedEditor({ t }: { t: ThemeColors; }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setCopied(true);
      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = setTimeout(cycle, 3200);
      }, 1500);
    };
    timerRef.current = setTimeout(cycle, 1800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-[20px] font-display font-bold mb-4 transition-colors duration-500" style={{ color: t.text }}>
        undo last commit
      </h2>

      <p className="text-[12.5px] mb-2 transition-colors duration-500" style={{ color: t.subtext }}>
        With changes staged:
      </p>
      <CodeBlock t={t} lang="bash">
        <CodeLine n={1} subtext={t.subtext}>
          <Token c={t.func}>git</Token> <Token c={t.codeText}>reset</Token> <Token c={t.keyword}>--soft</Token> <Token c={t.variable}>HEAD~1</Token>
        </CodeLine>
      </CodeBlock>

      <p className="text-[12.5px] mt-4 mb-2 transition-colors duration-500" style={{ color: t.subtext }}>
        Drops the changes too:
      </p>
      <CodeBlock t={t} lang="bash" copied={copied}>
        <CodeLine n={1} subtext={t.subtext}>
          <Token c={t.func}>git</Token> <Token c={t.codeText}>reset</Token> <Token c={t.keyword}>--hard</Token> <Token c={t.variable}>HEAD~1</Token>
        </CodeLine>
      </CodeBlock>

      <p className="text-[12.5px] mt-4 mb-2 transition-colors duration-500" style={{ color: t.subtext }}>
        If already pushed:
      </p>
      <CodeBlock t={t} lang="bash">
        <CodeLine n={1} subtext={t.subtext}>
          <Token c={t.func}>git</Token> <Token c={t.codeText}>revert</Token> <Token c={t.variable}>HEAD</Token>
        </CodeLine>
        <CodeLine n={2} subtext={t.subtext}>
          <Token c={t.func}>git</Token> <Token c={t.codeText}>push</Token>
        </CodeLine>
      </CodeBlock>
    </div>
  );
}
