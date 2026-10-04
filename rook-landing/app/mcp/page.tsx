import type { Metadata } from "next";
import { Nav, Footer } from "@/components/sections";
import { PageGradients } from "@/components/page-gradients";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DMG_URL } from "@/lib/constants";
import { Toc, CopyBlock, ConfigAccordion, CursorInstallButton, ExpandableImage, type ConfigItem, type TocItem } from "./client";

export const metadata: Metadata = {
  title: "Rook MCP · Save AI notes to Rook",
  description:
    "Save anything while you code with AI, directly to Rook.",
};

const ROOK_MCP_BIN =
  "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp";

const CLAUDE_CODE_CMD = `claude mcp add rook --scope user -- ${ROOK_MCP_BIN}`;
const CLAUDE_CODE_CMD_LOCAL = `claude mcp add rook --scope local -- ${ROOK_MCP_BIN}`;
const CODEX_CMD = `codex mcp add rook -- ${ROOK_MCP_BIN}`;
const CODEX_TOML = `[mcp_servers.rook]
command = "${ROOK_MCP_BIN}"`;
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
  { id: "configuration", label: "Configuration" },
  { id: "how-it-works", label: "How it works" },
  { id: "questions", label: "Common questions" },
  { id: "reference", label: "Technical reference" },
];

const h2 = "text-[24px] font-semibold tracking-tight mt-16 mb-5 scroll-mt-20";
const h3 = "text-[17px] font-semibold tracking-tight mt-10 mb-3 scroll-mt-20";
const h4 = "text-[15px] font-semibold tracking-tight mt-8 mb-2 text-foreground";
const p = "text-[15px] text-foreground/85 leading-[1.75] my-4";
const pTight = "text-[15px] text-foreground/85 leading-[1.75] mb-4 first:mt-0";
const figure = "rounded-xl overflow-hidden border border-border/60 bg-foreground/[0.02] my-6";
const codeInline =
  "font-mono text-[13px] bg-foreground/[0.06] px-1.5 py-0.5 rounded";

const CONFIG_ITEMS: ConfigItem[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    content: (
      <>
        <p className={pTight}>
          Register the Rook MCP server at user scope to make it available across projects:
        </p>
        <CopyBlock text={CLAUDE_CODE_CMD} label="Claude Code (user scope)" />
        <details className="my-4">
          <summary className="cursor-pointer text-[13px] text-muted-foreground hover:text-foreground">Project-specific configuration</summary>
          <CopyBlock text={CLAUDE_CODE_CMD_LOCAL} label="Claude Code (local scope)" />
          <p className={p}>Run this command from the project directory instead of registering at user scope.</p>
        </details>
        <p className={p}>Start a new Claude Code session after registration.</p>
        <p className={p}>
          Type <code className={codeInline}>/mcp</code> inside a Claude
          Code session to see configured servers.
        </p>
      </>
    ),
  },
  {
    id: "codex",
    label: "Codex",
    content: (
      <>
        <p className={pTight}>Add the Rook MCP server to Codex with:</p>
        <CopyBlock text={CODEX_CMD} label="Codex command" />
        <details className="my-4">
          <summary className="cursor-pointer text-[13px] text-muted-foreground hover:text-foreground">Manual configuration</summary>
          <p className={p}>Add the following entry to <code className={codeInline}>~/.codex/config.toml</code>:</p>
          <CopyBlock text={CODEX_TOML} label="Codex config" />
        </details>
        <p className={p}>Start a new Codex session after registration.</p>
        <p className={p}>
          Type <code className={codeInline}>/mcp</code> inside a Codex
          session to see configured servers.
        </p>
      </>
    ),
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    content: (
      <>
        <CopyBlock text={GEMINI_CMD} label="Gemini CLI command" />
        <p className={p}>
          Gemini needs per-folder trust before it will use MCP servers. In
          the folder where you want Gemini to access Rook, run{" "}
          <code className={codeInline}>/permissions trust</code> inside a
          Gemini session, then quit Gemini (Ctrl+C twice) and reopen it in
          the same folder.
        </p>
        <p className={p}>
          The trust step is per-folder. Repeat it in any new project where
          you use Gemini.
        </p>
        <p className={p}>
          Run <code className={codeInline}>gemini mcp list</code> to see
          configured servers.
        </p>
      </>
    ),
  },
  {
    id: "cursor",
    label: "Cursor",
    content: (
      <>
        <p className={pTight}>Use the installation link below to register Rook in Cursor:</p>
        <CursorInstallButton deeplink={CURSOR_DEEPLINK} />
        <p className={p}>
          Clicking &ldquo;Add to Cursor&rdquo; opens Cursor with a
          confirmation dialog. Click Install, then restart Cursor.
        </p>
        <p className={p}>
          Configured servers appear in Settings → Tools &amp; MCPs.
        </p>
        <figure className={figure}>
          <ExpandableImage src="/cursor-setup.png" alt="Rook MCP installation in Cursor" description="Cursor shows the Rook helper command and the append_to_inbox tool in Tools and MCPs." width={2048} height={1160} loading="lazy" />
        </figure>
      </>
    ),
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    content: (
      <>
        <p className={pTight}>
          In Claude Desktop, open Settings → Developer → Edit Config. The
          config file opens in your default text editor. Add the{" "}
          <code className={codeInline}>rook</code> entry below. If you
          already have other MCP servers configured, merge it into the
          existing <code className={codeInline}>mcpServers</code> block:
        </p>
        <CopyBlock text={CLAUDE_DESKTOP_JSON} label="Claude Desktop config" />
        <p className={p}>
          Save the file and reopen Claude Desktop.
        </p>
        <p className={p}>Configured servers appear in Settings → Developer.</p>
      </>
    ),
  },
  {
    id: "other-clients",
    label: "Other MCP clients",
    content: (
      <>
        <p className={pTight}>For OpenCode or another client that supports local MCP servers, add a server named <code className={codeInline}>rook</code> using the stdio transport. Set its executable to the following path, with no arguments.</p>
        <CopyBlock text={ROOK_MCP_BIN} label="Rook MCP executable path" />
        <p className={p}>Use your client&apos;s configuration format. The client launches the helper directly; no server URL or port is required.</p>
      </>
    ),
  },
];

export default function MCPPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip relative">
      <PageGradients />
      <Nav />
      <div className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-[1100px] lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">On this page</p>
              <Toc items={TOC_ITEMS} />
            </div>
          </aside>
          <article className="min-w-0 max-w-[720px]">
            <header id="overview" className="scroll-mt-24">
              <h1 className="font-mono text-[clamp(30px,4vw,40px)] font-bold tracking-[-0.03em]">Rook MCP</h1>
              <p className="mt-4 text-[18px] leading-relaxed text-foreground/90">Save anything while you code with AI, directly to Rook.</p>
              <p className={p}>
                Rook supports the{" "}
                <a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener noreferrer" className="text-rook underline underline-offset-4">Model Context Protocol (MCP)</a>,
                the open protocol AI tools use to talk to programs and data sources. Connect any tool that supports local MCP servers, including OpenCode, Claude, Codex, Cursor and Gemini. Each tool saves to its own inbox in Rook.
              </p>
                <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-md border border-border/60 bg-foreground/[0.02] px-3 py-1.5 text-[13px]">
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

            <section id="configuration" className="scroll-mt-24">
              <h2 className={h2}>Configuration</h2>
              <h3 className={h3}>1. Enable MCP in Rook</h3>
              <p className={p}>Install Rook in /Applications, then open Settings → MCP and select Enable.</p>
              <h3 className={h3}>2. Configure your MCP client</h3>
              <p className={p}>Select your client below and follow its configuration instructions.</p>
              <ConfigAccordion items={CONFIG_ITEMS} />
              <h3 className={h3}>3. Verify the connection</h3>
              <p className={p}>Start a new session in your configured client and send the following request.</p>
              <CopyBlock text='Save "hello from my AI tool" to Rook' label="example save" />
              <p className={p}>Verify that the saved text appears in the client&apos;s inbox in Rook. By default, saves from the same client are grouped into one note per day. To create a separate note for each save, change Save style in Settings → MCP. This setting applies to new saves only.</p>
              <figure className={figure}>
                <ExpandableImage src="/mcp-inboxes.png" alt="Separate AI inboxes in Rook" description="Rook groups saves into an inbox for each connected AI tool." width={1440} height={900} loading="lazy" />
                <figcaption className="px-4 py-3 text-[12px] text-muted-foreground">Separate inboxes for each connected MCP client.</figcaption>
              </figure>
            </section>

            <section id="how-it-works" className="scroll-mt-24">
              <h2 className={h2}>How it works</h2>
              <p className={p}>The MCP client launches the helper bundled with Rook and communicates with it over standard input and output (stdio). The helper writes to a shared local inbox, which Rook reads to import saved content.</p>
              <figure className={figure}>
                <ArchitectureDiagram />
              </figure>
              <p className={p}>The helper runs in the macOS app sandbox without network access. It exposes one tool for appending content to the inbox, with no operations to read, modify or delete existing notes. This allows AI tools to save content to Rook without access to your existing notes.</p>
            </section>

            <section id="questions" className="scroll-mt-24">
              <h2 className={h2}>Common questions</h2>
              <details className="border-b border-border/60 py-4">
                <summary className="cursor-pointer text-[15px] font-medium">Can I save multiple items or long content?</summary>
                <p className={p}>Yes. A client can save multiple items through consecutive append_to_inbox requests. Each request accepts one content value and an optional title.</p>
                <p className={p}>For content over 100,000 characters, the helper instructs the client to split the text into consecutive requests, preserving each part verbatim and in order. The client performs the split; the helper does not split oversized requests automatically. Each request counts toward the rate limit and follows your Save style setting.</p>
              </details>
              <details className="border-b border-border/60 py-4">
                <summary className="cursor-pointer text-[15px] font-medium">Does saved content support Markdown?</summary>
                <p className={p}>Rook renders saved Markdown as formatted notes, including headings, fenced code blocks, lists, task lists, links and text emphasis. Include a language identifier on fenced code blocks for syntax highlighting.</p>
              </details>
                <details className="border-b border-border/60 py-4">
<summary className="cursor-pointer text-[15px] font-medium">How do I disable or pause MCP?</summary>

                <p className={p}>
                  In Settings → MCP, clear Enable to disable the integration. Select Pause new saves to suspend writes without removing the client configuration.
                </p></details>


                <details className="border-b border-border/60 py-4">
<summary className="cursor-pointer text-[15px] font-medium">How do I remove the integration entirely?</summary>

                <p className={p}>
                  Run the matching remove command for each client:
                </p>
                <ul className="text-[15px] text-foreground/85 leading-[1.75] my-4 pl-5 list-disc space-y-1.5">
                  <li>
                    Claude Code: <code className={codeInline}>claude mcp remove rook</code>
                  </li>
                  <li>
                    Codex: <code className={codeInline}>codex mcp remove rook</code>
                  </li>
                  <li>
                    Gemini CLI: <code className={codeInline}>gemini mcp remove rook</code>
                  </li>
                  <li>
                    Cursor: remove <code className={codeInline}>rook</code> from the User MCP Servers list in Settings → Tools &amp; MCPs
                  </li>
                  <li>
                    Claude Desktop: remove the <code className={codeInline}>rook</code> block from Settings → Developer → Edit Config
                  </li>
                </ul></details>


                <details className="border-b border-border/60 py-4">
<summary className="cursor-pointer text-[15px] font-medium">Are there limits?</summary>

                <p className={p}>
                  Each Rook MCP helper process accepts up to 100 save requests in a rolling 60-second window. Requests that fail validation or are paused also count toward this limit. Each request supports up to 100,000 characters of content.
                </p></details>


                <details className="border-b border-border/60 py-4">
<summary className="cursor-pointer text-[15px] font-medium">Can a client save while Rook is not running?</summary>

                <p className={p}>
                  Yes. The helper writes the content to disk. Rook imports it the next time it reads the inbox.
                </p></details>


                <details className="border-b border-border/60 py-4">
<summary className="cursor-pointer text-[15px] font-medium">How do I inspect save activity?</summary>

                <p className={p}>
                  Click the MCP indicator in Rook&apos;s toolbar to inspect recent inbox activity. Use the server logs below to diagnose requests rejected before they reach the inbox.
                </p>

</details>

              <details className="border-b border-border/60 py-4">
                <summary className="cursor-pointer text-[15px] font-medium">How do I inspect server logs?</summary>
                <p className={p}>Run the following command in Terminal to stream helper logs, then submit a save request from your MCP client.</p>
                <CopyBlock text={"/usr/bin/log stream --level info --predicate 'subsystem == \"com.userook.rook.mcp\"'"} label="live MCP logs" />
                <p className={p}>The helper also writes to stderr, which your AI client may capture.</p>
              </details>
            </section>

            <section id="reference" className="scroll-mt-24">
              <h2 className={h2}>Technical reference</h2>
              <details className="rounded-lg border border-border/60 px-4 py-4 sm:px-5">
                <summary className="cursor-pointer text-[15px] font-medium">append_to_inbox · parameters, responses and errors</summary>
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
                        <td className="px-3 py-2.5 align-top">Markdown content to save, up to 100,000 characters per request.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">title</code></td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">string</td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">no</td>
                        <td className="px-3 py-2.5 align-top">Optional heading. Titles longer than 200 characters are truncated after sanitization.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className={h4}>Returns</h4>
                <p className={p}>
                  A tool result containing a text confirmation. Without a title:{" "}
                  <code className={codeInline}>Saved to Rook inbox.</code>{" "}
                  With a title:{" "}
                  <code className={codeInline}>Saved to Rook inbox under &quot;my title&quot;.</code>
                </p>

                <h4 className={h4}>Errors</h4>
                <p className={p}>The current helper uses -32005 for both oversized content and write failures. Inspect the error message to distinguish them.</p>
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
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32700</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">parse error</code></td>
                        <td className="px-3 py-2.5 align-top">The request could not be decoded as a JSON-RPC request.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32600</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">invalid request</code></td>
                        <td className="px-3 py-2.5 align-top">The jsonrpc version is missing or invalid, or the method was called before initialization.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32601</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">method not found / tool not found</code></td>
                        <td className="px-3 py-2.5 align-top">The requested method or tool is not supported.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32001</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">entitlement_unavailable</code></td>
                        <td className="px-3 py-2.5 align-top">The helper cannot access the shared app-group container.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32002</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">rate_limited</code></td>
                        <td className="px-3 py-2.5 align-top">The helper process has reached 100 save requests in a rolling 60-second window.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32003</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">paused</code></td>
                        <td className="px-3 py-2.5 align-top">MCP is paused in Rook. Clear Pause new saves in Settings → MCP.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32004</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">input_invalid</code></td>
                        <td className="px-3 py-2.5 align-top">Request parameters are invalid, or content or title is empty after sanitization.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32005</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">content_too_long</code></td>
                        <td className="px-3 py-2.5 align-top">Content exceeds 100,000 characters. Split it into consecutive requests without summarizing or omitting text.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32005</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">store_write_failed</code></td>
                        <td className="px-3 py-2.5 align-top">The helper could not write the content to the inbox.</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2.5 align-top font-mono text-[13px] text-muted-foreground">-32006</td>
                        <td className="px-3 py-2.5 align-top"><code className="font-mono text-[13px]">disabled</code></td>
                        <td className="px-3 py-2.5 align-top">MCP is disabled. Select Enable in Settings → MCP.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </section>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}
