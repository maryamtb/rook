import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog · Rook",
  description: "What's new in Rook.",
};

type Entry = {
  version: string;
  date: string;
  title?: string;
  notes: string[];
};

const entries: Entry[] = [
  {
    version: "1.0",
    date: "2026-04-24",
    notes: [
      "rich text: headings, lists, todos, inline code, code blocks",
      "five themes: dark, light, paper, terminal, midnight",
      "syntax highlighting for 17 languages, including bash, python, and json, with auto-detect",
      "basic slash menu for blocks",
      "basic horizontal edit menu on double click",
      "shortcuts: ⌘n to create a note, ⌘k / ⌘f to search, ⌘\\ to toggle the sidebar, ⌘⇧⌫ to delete a note, ⌘⇧↵ to insert a code block, ⌘, for settings, ⌘z / ⌘⇧z to undo and redo, ⌘= / ⌘- to zoom in and out, ⌥+click for multi-cursor",
      "notebooks to organize notes",
      "trash with restore",
      "local JSON store at ~/Library/Application Support/Rook/store.json",
      "autosave debounced 300ms after the last keystroke",
      "universal binary for apple silicon and intel, macOS 15.2+",
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
              className="rounded-[14px] transition-transform hover:scale-105"
            />
          </Link>
          <h1 className="text-[clamp(28px,4vw,40px)] font-mono font-bold tracking-[-0.03em] leading-[1.1]">
            Changelog
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Release notes for Rook
          </p>
        </header>

        <ol className="space-y-16">
          {entries.map((entry) => (
            <li key={entry.version} id={`v${entry.version}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[13px] font-semibold text-[#E8962E] tabular-nums">
                  v{entry.version}
                </span>
                <span className="font-mono text-[12px] text-muted-foreground/70 tabular-nums">
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
                    <span className="text-[#E8962E]/60 select-none shrink-0">·</span>
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
