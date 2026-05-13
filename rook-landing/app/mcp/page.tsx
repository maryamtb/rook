import type { Metadata } from "next";
import { Nav, Footer } from "@/components/sections";
import { PageGradients } from "@/components/page-gradients";
import { DMG_URL } from "@/lib/constants";
import { Toc, CopyBlock, CursorInstallButton, ExpandableImage, type TocItem } from "./client";
import { ArchitectureDiagram } from "./architecture-diagram";

export const metadata: Metadata = {
  title: "Rook MCP · Save AI notes to Rook",
  description:
    "Rook 1.3.0 adds the Model Context Protocol. Ask Claude Code, Claude Desktop, Cursor, or Gemini CLI to save notes to Rook. Each tool gets its own inbox.",
};

const SAGE = "rgb(140, 200, 192)";
const SAGE_BG = "rgba(140, 200, 192, 0.1)";

const ROOK_MCP_BIN =
  "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp";

const CLAUDE_CODE_CMD = `claude mcp add rook --scope user -- ${ROOK_MCP_BIN}`;
const CLAUDE_CODE_CMD_LOCAL = `claude mcp add rook --scope local -- ${ROOK_MCP_BIN}`;
const GEMINI_CMD = `gemini mcp add -s user rook -- ${ROOK_MCP_BIN}`;
const CLAUDE_DESKTOP_JSON = `{
  "mcpServers": {
    "rook": {
      "command": "${ROOK_MCP_BIN}",
      "args": []
    }
  }
}`;
const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=rook&config=eyJjb21tYW5kIjoiL0FwcGxpY2F0aW9ucy9Sb29rLmFwcC9Db250ZW50cy9IZWxwZXJzL3Jvb2stbWNwLmFwcC9Db250ZW50cy9NYWNPUy9yb29rLW1jcCIsImFyZ3MiOltdfQ==";

const TOC_ITEMS: TocItem[] = [
  { id: "overview", label: "Rook MCP" },
  {
    id: "configuration",
    label: "Configuration",
    children: [
      { id: "claude-code", label: "Claude Code" },
      { id: "gemini-cli", label: "Gemini CLI" },
      { id: "claude-desktop", label: "Claude Desktop" },
      { id: "cursor", label: "Cursor" },
    ],
  },
  { id: "how-it-works", label: "How it works" },
  { id: "tools", label: "Tools" },
  { id: "common-questions", label: "Common questions" },
];

const h2 = "text-[24px] font-semibold tracking-tight mt-16 mb-5 scroll-mt-20";
const h3 = "text-[17px] font-semibold tracking-tight mt-10 mb-3 scroll-mt-20";
const h4 = "text-[15px] font-semibold tracking-tight mt-8 mb-2 text-foreground";
const p = "text-[15px] text-foreground/85 leading-[1.75] my-4";
const figure = "rounded-xl overflow-hidden border border-border/60 bg-foreground/[0.02] my-6";
const codeInline =
  "font-mono text-[13px] bg-foreground/[0.06] px-1.5 py-0.5 rounded";

export default function MCPPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip relative">
      <PageGradients />
      <Nav />

      <div className="pt-32 pb-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80 mb-4 font-medium">
                  On this page
                </p>
                <Toc items={TOC_ITEMS} />
              </div>
            </aside>

            <article className="max-w-[720px]">
              <header id="overview" className="mb-10 scroll-mt-20">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <h1 className="text-[clamp(30px,4vw,40px)] font-mono font-bold tracking-[-0.03em] leading-[1.05]">
                    Rook MCP
                  </h1>
                  <span
                    className="inline-flex items-center px-2 py-[3px] rounded-full text-[10.5px] font-semibold tracking-[0.06em]"
                    style={{ backgroundColor: SAGE_BG, color: SAGE }}
                  >
                    BETA
                  </span>
                </div>
                <p className="text-[16px] text-foreground/85 leading-[1.7] mb-4">
                  Rook 1.3.0 adds support for the Model Context Protocol (MCP),
                  the open protocol AI tools use to talk to programs and data
                  sources. Claude Code, Claude Desktop, Cursor, and Gemini CLI
                  can save notes to Rook over MCP. Saves appear in Rook
                  immediately.
                </p>
                <p className="text-[15px] text-foreground/75 leading-[1.7]">
                  Useful when you&apos;d otherwise be copy-pasting AI output
                  by hand: a code snippet from a chat, a debugging session
                  summary, action items from a long thread, or the text to prompt the next AI session. Each connected AI
                  saves to Rook. 
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-border/60 bg-foreground/[0.02] px-3 py-1.5 text-[13px]">
                  <span className="text-muted-foreground">Requires Rook 1.3.0 or later.</span>
                  <a
                    href={DMG_URL}
                    download
                    className="text-rook hover:opacity-80 underline decoration-rook/40 underline-offset-4 transition-colors"
                  >
                    Download
                  </a>
                  <span className="text-muted-foreground/60">·</span>
                  <a
                    href="https://github.com/maryamtb/rook/tree/main/rook-mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rook hover:opacity-80 underline decoration-rook/40 underline-offset-4 transition-colors"
                  >
                    Source code
                  </a>
                </div>
              </header>

              <section id="configuration" className="scroll-mt-20">
                <h2 className={h2}>Configuration</h2>
                <p className={p}>
                  This section walks through setting up Rook MCP with 4 local
                  clients: Claude Code, Claude Desktop, Gemini CLI, and Cursor.
                </p>

                <h3 id="claude-code" className={h3}>
                  Claude Code
                </h3>
                <p className={p}>
                  Add the Rook MCP server to Claude Code with either flag,
                  user-scoped or local-scoped:
                </p>
                <CopyBlock text={CLAUDE_CODE_CMD} label="Claude Code (user scope)" />
                <p className={p}>
                  User scope sets the Rook MCP server in every Claude Code
                  session, regardless of directory.
                </p>
                <CopyBlock text={CLAUDE_CODE_CMD_LOCAL} label="Claude Code (local scope)" />
                <p className={p}>
                  Local scope sets it for the current repo only.
                </p>
                <p className={p}>Then, in a new Claude Code session:</p>
                <CopyBlock text={`save "hello from claude code" to Rook`} label="example save" />
                <p className={p}>
                  You&apos;ll see a &ldquo;Saved to Rook inbox&rdquo;
                  confirmation, and a Claude Inbox appears in Rook with the
                  note inside.
                </p>
                <p className={p}>
                  Run <code className={codeInline}>claude mcp list</code> to
                  see configured servers.
                </p>

                <h3 id="gemini-cli" className={h3}>
                  Gemini CLI
                </h3>
                <CopyBlock text={GEMINI_CMD} label="Gemini CLI command" />
                <p className={p}>
                  Gemini needs per-folder trust before it will use MCP
                  servers. In the folder where you want Gemini to access Rook,
                  run{" "}
                  <code className={codeInline}>/permissions trust</code>{" "}
                  inside a Gemini session, then quit Gemini (Ctrl+C twice)
                  and reopen it in the same folder. After that,{" "}
                  <code className={codeInline}>save &quot;hello from Gemini&quot; to Rook</code>{" "}
                  works.
                </p>
                <p className={p}>
                  The trust step is per-folder. Repeat it in any new project
                  where you use Gemini.
                </p>
                <p className={p}>
                  Run <code className={codeInline}>gemini mcp list</code> to
                  see configured servers.
                </p>

                <h3 id="claude-desktop" className={h3}>
                  Claude Desktop
                </h3>
                <p className={p}>
                  In Claude Desktop, open Settings → Developer → Edit Config.
                  The config file opens in your default text editor. Add the{" "}
                  <code className={codeInline}>rook</code> entry below. If you
                  already have other MCP servers configured, merge it into the
                  existing{" "}
                  <code className={codeInline}>mcpServers</code> block:
                </p>
                <CopyBlock text={CLAUDE_DESKTOP_JSON} label="Claude Desktop config" />
                <p className={p}>
                  After saving and reopening Claude Desktop,{" "}
                  <code className={codeInline}>save &quot;hello from Claude Desktop&quot; to Rook</code>{" "}
                  works.
                </p>
                <p className={p}>
                  Configured servers appear in Settings → Developer.
                </p>

                <h3 id="cursor" className={h3}>
                  Cursor
                </h3>
                <p className={p}>
                  Cursor supports installing MCP servers via deeplink:
                </p>
                <CursorInstallButton deeplink={CURSOR_DEEPLINK} />
                <p className={p}>
                  Clicking &ldquo;Add to Cursor&rdquo; opens Cursor with a
                  confirmation dialog. Click Install, then restart Cursor.
                  After that,{" "}
                  <code className={codeInline}>save &quot;hello from Cursor&quot; to Rook</code>{" "}
                  works.
                </p>
                <p className={p}>
                  Configured servers appear in Settings → Tools &amp; MCPs.
                </p>

                <figure className={figure}>
                  <ExpandableImage
                    src="/cursor-setup.png"
                    alt="rook installed in Cursor's Tools and MCPs panel"
                    description="rook installed in Cursor's Tools and MCPs panel"
                    width={1440}
                    height={900}
                    loading="eager"
                  />
                </figure>
              </section>

              <section id="how-it-works" className="scroll-mt-20">
                <h2 className={h2}>How it works</h2>
                <p className={p}>
                  Rook 1.3.0 includes the MCP helper, a separate binary
                  installed alongside Rook. When an AI tool connects to Rook,
                  it launches the helper as a child process and communicates
                  with it over stdio. The helper writes saves to a shared
                  inbox folder, an app group container that macOS lets both
                  the helper and Rook access. Rook reads from that folder.
                </p>

                <figure className={figure}>
                  <ArchitectureDiagram />
                </figure>

                <p className={p}>
                  The helper exposes one tool: append a note. An AI tool
                  connected through MCP can add new notes, but cannot read,
                  modify, or remove existing ones.
                </p>
                <p className={p}>
                  The helper runs inside macOS&apos;s app sandbox. Its
                  entitlements allow two operations: receiving messages from
                  the AI tool that spawned it, and appending to Rook&apos;s
                  shared inbox.
                </p>
                <p className={p}>
                  The AI tool and helper communicate over local IPC
                  (inter-process communication) only. The helper has no
                  network access and exits when its parent AI tool quits.
                </p>
                <figure className={figure}>
                  <ExpandableImage
                    src="/rook-mcp.png"
                    alt="Rook MCP and Claude code"
                    description="Rook MCP and Claude code"
                    width={1440}
                    height={900}
                    loading={"eager"}
                  />
                </figure>
                <figure className={figure}>
                  <ExpandableImage
                    src="/mcp-popover.png"
                    alt="MCP activity popover with recent saves"
                    description="MCP activity popover with recent saves"
                    width={1440}
                    height={900}
                    loading="eager"
                  />
                </figure>
              </section>

              <section id="tools" className="scroll-mt-20">
                <h2 className={h2}>Tools</h2>
                <p className={p}>
                  rook-mcp implements MCP protocol 2024-11-05 over stdio. The
                  server exposes one tool.
                </p>

                <h3 id="append-to-inbox" className={h3}>
                  <code className="font-mono">append_to_inbox</code>
                </h3>
                <p className={p}>
                  Appends text to the calling client&apos;s Rook inbox.
                </p>

                <h4 className={h4}>Parameters</h4>
                <div className="my-4 overflow-x-auto rounded-lg border border-border/60">
                  <table className="w-full text-[14px]">
                    <thead className="bg-foreground/[0.03]">
                      <tr className="text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                        <th className="px-3 py-2 font-medium">Name</th>
                        <th className="px-3 py-2 font-medium">Type</th>
                        <th className="px-3 py-2 font-medium">Required</th>
                        <th className="px-3 py-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/85">
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">content</code></td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">string</td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">yes</td>
                        <td className="px-3 py-2.5 align-top">The text to save, up to 100,000 characters.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">title</code></td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">string</td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">no</td>
                        <td className="px-3 py-2.5 align-top">Short heading shown above the content. Up to 200 characters.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className={h4}>Returns</h4>
                <p className={p}>
                  A confirmation string. Without a title:{" "}
                  <code className={codeInline}>Saved to Rook inbox 2026-05-12.</code>{" "}
                  With a title:{" "}
                  <code className={codeInline}>Saved to Rook inbox 2026-05-12 under &quot;my title&quot;.</code>
                </p>

                <h4 className={h4}>Errors</h4>
                <div className="my-4 overflow-x-auto rounded-lg border border-border/60">
                  <table className="w-full text-[14px]">
                    <thead className="bg-foreground/[0.03]">
                      <tr className="text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                        <th className="px-3 py-2 font-medium">Code</th>
                        <th className="px-3 py-2 font-medium">Name</th>
                        <th className="px-3 py-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/85">
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32002</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">rate_limited</code></td>
                        <td className="px-3 py-2.5 align-top">More than 100 saves in 60 seconds. Each client process has its own budget.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32003</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">paused</code></td>
                        <td className="px-3 py-2.5 align-top">MCP is paused in Rook (Settings → MCP → Resume).</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32004</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">input_invalid</code></td>
                        <td className="px-3 py-2.5 align-top">Content is empty, exceeds 100,000 characters, or title is empty after sanitization.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="common-questions" className="scroll-mt-20">
                <h2 className={h2}>Common questions</h2>

                <h4 className={h4}>Will my AI see existing Rook notes?</h4>
                <p className={p}>
                  No. The helper exposes no read or list operations. A
                  connected AI can add notes but cannot see existing ones.
                </p>

                <h4 className={h4}>Does Rook MCP send data off-device?</h4>
                <p className={p}>
                  No. Communication is stdio only, and the helper&apos;s
                  sandbox blocks network access. Saves are written to a local
                  folder that Rook reads from.
                </p>

                <h4 className={h4}>Where do saves go?</h4>
                <p className={p}>
                  Each AI gets its own collection in Rook: Claude Inbox,
                  Cursor Inbox, Gemini Inbox. Saves from the same client
                  within a day are grouped into a single note.
                </p>

                <h4 className={h4}>How can it be turned off?</h4>
                <p className={p}>
                  Settings → MCP has a master toggle. The Pause toggle blocks
                  new saves without removing the client-side configuration.
                </p>

                <h4 className={h4}>How do I remove the integration entirely?</h4>
                <p className={p}>
                  Run the matching remove command for each client:
                </p>
                <ul className="text-[15px] text-foreground/85 leading-[1.75] my-4 pl-5 list-disc space-y-1.5">
                  <li>
                    Claude Code: <code className={codeInline}>claude mcp remove rook</code>
                  </li>
                  <li>
                    Gemini CLI: <code className={codeInline}>gemini mcp remove rook</code>
                  </li>
                  <li>
                    Claude Desktop: remove the <code className={codeInline}>rook</code> block from Settings → Developer → Edit Config
                  </li>
                  <li>
                    Cursor: remove <code className={codeInline}>rook</code> from the User MCP Servers list in Settings → Tools &amp; MCPs
                  </li>
                </ul>

                <h4 className={h4}>Are there limits?</h4>
                <p className={p}>
                  Up to 100 saves per minute per session, and up to 100,000
                  characters per save.
                </p>

                <h4 className={h4}>What if Rook isn&apos;t running when an AI tries to save?</h4>
                <p className={p}>
                  The helper writes the save to disk regardless. Rook picks it
                  up the next time it reads the inbox.
                </p>

                <h4 className={h4}>How can I see what&apos;s been saved?</h4>
                <p className={p}>
                  Click the MCP indicator in Rook&apos;s toolbar. The activity
                  log shows every save attempt with the client name, content
                  size, status, and time.
                </p>

                <figure className={figure}>
                  <ExpandableImage
                    src="/mcp-inboxes.png"
                    alt="Per-tool inboxes in the Rook sidebar"
                    description="Per-tool inboxes in the Rook sidebar"
                    width={1440}
                    height={900}
                    loading="eager"
                  />
                </figure>
              </section>

            </article>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
