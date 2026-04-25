"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon-64.png" alt="Rook" width={18} height={18} className="rounded-sm" />
          <span className="text-xs font-mono text-muted-foreground/40">Rook</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground/40">
          <a href="mailto:hello@userook.app" className="hover:text-muted-foreground transition-colors">hello@userook.app</a>
          <Link href="/changelog" className="hover:text-muted-foreground transition-colors">Changelog</Link>
          <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">X</a>
          <a
            href="https://github.com/maryamtb/rook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors"
            onClick={() => posthog.capture("github_click", { source: "footer" })}
          >
            GitHub
          </a>
          <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">Blog</a>
        </div>
      </div>
    </footer>
  );
}
