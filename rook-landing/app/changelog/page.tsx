import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FooterNewsletter } from "@/components/footer-newsletter";

export const metadata: Metadata = {
  title: "Changelog · Rook",
  description: "What's new in Rook.",
};

type Entry = {
  version: string;
  date: string;
  title?: string;
  notes: React.ReactNode[];
};

const entries: Entry[] = [
  {
    version: "1.3.5",
    date: "2026-06-19",
    notes: [
      "Markdown: import files as notes by dragging them in or from File → Import with images rendered, improved paste from web AI chats, copy and paste between notes keeps formatting intact, and paste an image with cmd+V to drop it inline or cmd+opt+V as a Markdown image link",
      "Option added for the append_to_inbox MCP tool to create a new note on each save or group by day",
      "Cleaner labels for additional AI MCP clients",
      "Duplicate a note, or create a new note from a notebook's right-click menu",
      "Trash groups by collection with full paths, with restore from the menu",
      "Connect an Obsidian vault: files with a tag you choose (frontmatter, inline, or both) appear as read-only views, full note or code block, with a link back to the source. Setup in Settings → Connections",
      "Editor fixes: list editing, inline code chips that wrap cleanly, Japanese line height, and selection",
      "Fix for removing a link from the right-click menu, which previously left it in place",
      "Smoother sidebar toggle and resize, added scroll bar on long notes",
      "Performance improvements and fixes for large notes",
    ],
  },
  {
    version: "1.3.4",
    date: "2026-06-03",
    notes: [
      "Major redesign across the app: sidebar and header, search, editor and slash menus, MCP badge, and a menu bar with search and an improved layout",
      "Appearance settings: show or hide the MCP badge and sidebar button in the toolbar, plus a font size selector for the sidebar",
      "Refined editor experience: moving the selection around, backspacing into a code block",
      "Nested notebooks: three nesting levels (excluding AI notebooks), with drag to move and carets. On notebook preview, formatted inline code and code blocks render",
      "Notes get a last-updated timestamp in the view, and get info on right-click",
      "Added wikilinks feature: link to another Rook note with search, and create, edit, or remove the link from the menu",
      "Added inline images feature, with right-click to Quick Look, open in Preview, or resize (sm, md, lg)",
      "Added support for highlighted text",
      "Fixed multi-cursor, now behaves like VS Code",
      "Added syntax highlighting for Go, Dockerfile, and C#",
      "Fixed pasting from web AI chats: full answers no longer collapse into a single code block, and short snippets keep their language instead of falling to plain text",
    ],
  },
  {
    version: "1.3.3",
    date: "2026-05-28",
    notes: [
      "MCP support for Codex. Saves reach its AI inbox in Rook.",
      "AI saves formatting: activity popover and menu bar format input as rich text",
      "Menu bar: support for light mode appearance",
      "Support for batch MCP saves",
      "Added Cisco syntax highlighting",
      "Quieter byline (time, vendor, id) for AI inbox saves",
      "Inline code styling included in the slash menu",
      "TypeScript and JS syntax highlighting enhanced",
      "Performance improvements throughout",
    ],
  },
  {
    version: "1.3.2",
    date: "2026-05-19",
    notes: [
      "Polished menu bar: quick capture, recent notes, and the latest AI saves are one click away",
      "Snappier animations app-wide",
      "Code blocks paint their backgrounds and headers more smoothly",
      "Search opens with the cursor ready",
      "Editor and toolbar polish for macOS Tahoe",
    ],
  },
  {
    version: "1.3.1",
    date: "2026-05-17",
    notes: [
      "Rook menu bar: capture quick notes, look up recent ones, and view MCP AI activity without opening the app",
      "Refreshed editor look: code blocks, fonts, inline code chips, and more",
      "Notes saved by Claude Code, Claude Desktop, Cursor, and Gemini now render as styled markdown: headings, fenced code blocks, lists, todos, and inline code",
      'Paste markdown as rich text with Option+Cmd+V, or right-click "Paste as Markdown"',
      "Notifications when AI saves to your inbox",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-05-13",
    notes: [
      <>
        Rook MCP beta: Claude Code, Claude Desktop, Cursor, and Gemini CLI can save notes to Rook through a sandboxed helper that runs locally. Each AI gets its own inbox, with saves grouped into one note per day. Disabled by default; enable in Settings → MCP.{" "}
        <Link href="/mcp" className="inline-block text-rook hover:opacity-80 underline decoration-rook/40 underline-offset-4 transition-colors">
          Set it up →
        </Link>
      </>,
      "SnippetsLab import: pick your folder import preferences, either all as one collection, or one collection per SnippetsLab folder",
      "Bulk move and delete for notes and notebooks on shift hold",
    ],
  },
  {
    version: "1.2.4",
    date: "2026-05-07",
    notes: [
      "more accurate syntax highlighting across more languages",
      "much longer code blocks paste and edit responsively",
      "bulk delete notes and notebooks: shift-click to select multiple, then delete",
      "smarter paste from web pages: headings, bold, and italic come through from articles",
      "todos keep their strikethrough through indent and outdent",
      "inline code colors and backgrounds stay consistent across theme switches and reloads",
    ],
  },
  {
    version: "1.2.3",
    date: "2026-05-02",
    notes: [
      "a new look",
      "collections: a new top-level container above notebooks",
      "smarter paste: code blocks preserved between notes, formatted output from markdown, IDE, and terminal sources",
      "editor shortcuts: cmd+x cuts the line, cmd+delete clears a code-block line, cmd+up/down jump to start and end of a note",
      "press space to preview notes in notebooks",
      "shortcuts cheatsheet (cmd+/)",
      "smoother zoom and sidebar animations",
      "bash CLI commands colored in the theme accent",
      "search finds notebooks and collections, not just notes",
      "import from snippetslab",
      "strikethrough text formatting",
    ],
  },
  {
    version: "1.2.2",
    date: "2026-04-28",
    notes: [
      "fixed automatic updates for sandboxed installs",
      "smoother link editor: cleaner empty state, focus returns to note on Done, explicit http preserved",
      "inline code: refreshed light and paper themes, color preserved on titles, background survives theme switch",
    ],
  },
  {
    version: "1.2.1",
    date: "2026-04-28",
    notes: [
      "added stack-frame filtering to error reporting",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-26",
    notes: [
      "theme and color picker selections now persist correctly",
      "automatic updates: rook can now install new versions in the background",
      "smoother code blocks: cursor and return-key behavior around blocks, language and styling preserved across relaunches",
      "slash menu: heading commands and link support added",
      "general polish across the editor, sidebar, and zoom",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-04-24",
    notes: [
      "rich text: headings, lists, todos, inline code, code blocks",
      "five themes: dark, light, paper, terminal, midnight",
      "syntax highlighting for 17 languages, including bash, python, and json, with auto-detect",
      "basic slash menu for blocks",
      "basic horizontal edit menu on double click",
      "shortcuts: cmd+n to create a note, cmd+k / cmd+f to search, cmd+\\ to toggle the sidebar, cmd+shift+delete to delete a note, cmd+shift+return to insert a code block, cmd+, for settings, cmd+z / cmd+shift+z to undo and redo, cmd+= / cmd+- to zoom in and out, opt+click for multi-cursor",
      "notebooks to organize notes",
      "trash with restore",
      "local JSON store at ~/Library/Application Support/Rook/store.json",
      "autosave debounced 300ms after the last keystroke",
    ],
  },
];

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="max-w-[680px] mx-auto">
        <header className="mb-16">
          <Link
            href="/"
            aria-label="Back to Rook home"
            className="inline-block mb-10"
          >
            <Image
              src="/icon-512.png"
              alt="Rook"
              width={56}
              height={56}
              priority
              className="rounded-[14px] transition-transform hover:scale-105"
            />
          </Link>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div>
              <h1 className="text-[clamp(28px,4vw,40px)] font-mono font-bold tracking-[-0.03em] leading-[1.1]">
                Changelog
              </h1>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                Release notes for Rook
              </p>
            </div>
            <FooterNewsletter source="changelog_page" />
          </div>
        </header>

        <ol className="space-y-16">
          {entries.map((entry) => (
            <li key={entry.version} id={`v${entry.version}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[13px] font-semibold text-rook tabular-nums">
                  v{entry.version}
                </span>
                <span className="font-mono text-xs text-muted-foreground/70 tabular-nums">
                  {formatDate(entry.date)}
                </span>
              </div>

              {entry.title && (
                <h2 className="text-[20px] font-semibold tracking-tight mb-4">
                  {entry.title}
                </h2>
              )}

              <ul className="space-y-2">
                {entry.notes.map((note, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[14.5px] leading-[1.7] text-foreground/85"
                  >
                    <span className="text-rook/60 select-none shrink-0">·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <footer className="mt-24 pt-8 border-t border-border/50 text-[13px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
