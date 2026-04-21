import type { ThemeColors } from "@/lib/themes";
import { CodeBlock, CodeLine, Token } from "./code-block";

export function AwsStaticEditor({ t }: { t: ThemeColors; }) {
  return (
    <div className="p-6">
      <h2 className="text-[20px] font-bold mb-2 transition-colors duration-500" style={{ color: t.text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>
        aws cli quick ref
      </h2>
      <p className="text-[13px] leading-[1.7] mb-4 transition-colors duration-500" style={{ color: t.subtext }}>
        SSO login, profile switching, identity check.
      </p>

      <p className="text-[13px] font-semibold mb-2 transition-colors duration-500" style={{ color: t.text }}>SSO</p>
      <CodeBlock t={t} lang="bash">
        <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>configure sso</Token></CodeLine>
        <CodeLine n={2} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>sso login</Token> <Token c={t.keyword}>--profile</Token> <Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
        <CodeLine n={3} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>sso logout</Token></CodeLine>
      </CodeBlock>

      <p className="text-[13px] font-semibold mb-2 mt-5 transition-colors duration-500" style={{ color: t.text }}>Profiles</p>
      <CodeBlock t={t} lang="bash">
        <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>configure list-profiles</Token></CodeLine>
        <CodeLine n={2} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>s3 ls</Token> <Token c={t.keyword}>--profile</Token> <Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
        <CodeLine n={3} subtext={t.subtext}><Token c={t.keyword}>export</Token> <Token c={t.variable}>AWS_PROFILE</Token><Token c={t.codeText}>=</Token><Token c={t.variable}>&lt;name&gt;</Token></CodeLine>
      </CodeBlock>

      <p className="text-[13px] font-semibold mb-2 mt-5 transition-colors duration-500" style={{ color: t.text }}>Who am I?</p>
      <CodeBlock t={t} lang="bash">
        <CodeLine n={1} subtext={t.subtext}><Token c={t.func}>aws</Token> <Token c={t.codeText}>sts get-caller-identity</Token></CodeLine>
      </CodeBlock>
    </div>
  );
}
