import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, XIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="pt-12 pb-10 bg-muted/20 border-t border-border/40">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/icon-128.png" alt="" width={28} height={28} className="rounded-[7px]" />
          <span className="text-[14px] font-mono font-semibold text-foreground">Rook</span>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-xs text-muted-foreground/80 sm:justify-end sm:gap-5">
          <Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Blog</a>
          <a href="mailto:hello@userook.app" className="hover:text-foreground transition-colors">hello@userook.app</a>
          <div className="flex items-center gap-3 text-muted-foreground/60 sm:ml-2">
            <a
              href="https://x.com/userookapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-foreground transition-colors"
            >
              <XIcon className="size-3.5" />
            </a>
            <a
              href="https://github.com/maryamtb/rook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-foreground transition-colors"
            >
              <GitHubIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
