"use client";

import type { ThemeColors } from "@/lib/themes";
import { CodeBlock, CodeLine, Token } from "./code-block";

export function ClaudeStaticEditor({ t }: { t: ThemeColors; }) {
  return (
    <div className="p-6">
      <h2 className="text-[20px] font-display font-bold mb-2 transition-colors duration-500" style={{ color: t.text }}>
        my first API call: Dunder Mifflin Infinity 2.0
      </h2>
      <p className="text-[13px] leading-[1.7] mb-3 transition-colors duration-500" style={{ color: t.subtext }}>
        Apparently, this is how you call the AI, and these are some of the main params you pass to it
      </p>

      <ul className="space-y-1 mb-4 pl-3 text-[12.5px] leading-[1.6] transition-colors duration-500" style={{ color: t.subtext }}>
        <li className="flex gap-3">
          <span className="text-[18px] leading-[1] mt-[2px]" style={{ color: t.text }}>•</span>
          <span><strong style={{ color: t.text }}>temperature</strong> controls how &ldquo;creative&rdquo; the response gets (0 is deterministic, 1 is wild)</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[18px] leading-[1] mt-[2px]" style={{ color: t.text }}>•</span>
          <span><strong style={{ color: t.text }}>max_tokens</strong> caps the response length (1024 ≈ 750 words)</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[18px] leading-[1] mt-[2px]" style={{ color: t.text }}>•</span>
          <span><strong style={{ color: t.text }}>system</strong> message tells the AI how to behave (e.g., &ldquo;be concise&rdquo;)</span>
        </li>
      </ul>

      <CodeBlock t={t} lang="python">
        <CodeLine n={1} subtext={t.subtext}>
          <Token c={t.keyword}>import</Token> <Token c={t.codeText}>anthropic</Token>
        </CodeLine>
        <CodeLine n={2} subtext={t.subtext}> </CodeLine>
        <CodeLine n={3} subtext={t.subtext}>
          <Token c={t.variable}>client</Token> <Token c={t.codeText}>=</Token> <Token c={t.func}>anthropic.Anthropic</Token><Token c={t.codeText}>()</Token>
        </CodeLine>
        <CodeLine n={4} subtext={t.subtext}> </CodeLine>
        <CodeLine n={5} subtext={t.subtext}>
          <Token c={t.variable}>response</Token> <Token c={t.codeText}>=</Token> <Token c={t.variable}>client</Token><Token c={t.codeText}>.</Token><Token c={t.func}>messages.create</Token><Token c={t.codeText}>(</Token>
        </CodeLine>
        <CodeLine n={6} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>model</Token><Token c={t.codeText}>=</Token><Token c={t.string}>&quot;claude-sonnet-4-6&quot;</Token><Token c={t.codeText}>,</Token>
        </CodeLine>
        <CodeLine n={7} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>max_tokens</Token><Token c={t.codeText}>=</Token><Token c={t.string}>1024</Token><Token c={t.codeText}>,</Token>
        </CodeLine>
        <CodeLine n={8} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>temperature</Token><Token c={t.codeText}>=</Token><Token c={t.string}>0.7</Token><Token c={t.codeText}>,</Token>
        </CodeLine>
        <CodeLine n={9} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>system</Token><Token c={t.codeText}>=</Token><Token c={t.string}>&quot;You are a thought leader.&quot;</Token><Token c={t.codeText}>,</Token>
        </CodeLine>
        <CodeLine n={10} subtext={t.subtext}>
          {"    "}<Token c={t.variable}>messages</Token><Token c={t.codeText}>=[{"{"}</Token>
        </CodeLine>
        <CodeLine n={11} subtext={t.subtext}>
          {"        "}<Token c={t.string}>&quot;role&quot;</Token><Token c={t.codeText}>: </Token><Token c={t.string}>&quot;user&quot;</Token><Token c={t.codeText}>,</Token>
        </CodeLine>
        <CodeLine n={12} subtext={t.subtext}>
          {"        "}<Token c={t.string}>&quot;content&quot;</Token><Token c={t.codeText}>: </Token><Token c={t.string} className="font-extrabold">&quot;Build Dunder Mifflin Infinity 2.0. No Mistakes.&quot;</Token>
        </CodeLine>
        <CodeLine n={13} subtext={t.subtext}>
          {"    "}<Token c={t.codeText}>{"}"}]</Token>
        </CodeLine>
        <CodeLine n={14} subtext={t.subtext}>
          <Token c={t.codeText}>)</Token>
        </CodeLine>
        <CodeLine n={15} subtext={t.subtext}>
          <Token c={t.func}>print</Token><Token c={t.codeText}>(</Token><Token c={t.variable}>response</Token><Token c={t.codeText}>.</Token><Token c={t.variable}>content</Token><Token c={t.codeText}>[</Token><Token c={t.string}>0</Token><Token c={t.codeText}>].</Token><Token c={t.variable}>text</Token><Token c={t.codeText}>)</Token>
        </CodeLine>
      </CodeBlock>
    </div>
  );
}
