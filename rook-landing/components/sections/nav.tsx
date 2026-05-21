"use client";

import Image from "next/image";
import { Download, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand-button";
import { GitHubIcon, XIcon } from "@/components/icons";
import { DMG_URL, SIGNUPS_DISABLED } from "@/lib/constants";
import { captureEvent } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";
import { SignupOutageBanner } from "./signup-outage-banner";
import { useStars } from "@/hooks";
import { MCP_ACCENT } from "@/components/mcp-mark";
import Link from "next/link";

export function Nav() {
  const stars = useStars();
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {SIGNUPS_DISABLED && <SignupOutageBanner />}
      <nav className="bg-background/60 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto flex sm:grid sm:grid-cols-[1fr_auto_1fr] items-center justify-between h-14 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 sm:justify-self-start">
            <Image src="/icon-64.png" alt="" width={22} height={22} className="rounded-[5px]" />
            <span className="text-[15px] font-mono font-semibold tracking-tight text-foreground">Rook</span>
          </Link>

          <div className="hidden sm:flex items-center gap-7 text-[13px] font-mono text-muted-foreground">
            <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/#themes" className="hover:text-foreground transition-colors">Themes</Link>
            <Link href="/#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</Link>
            <Link
              href="/mcp"
              className="inline-flex items-center gap-1.5 transition-colors hover:opacity-90"
              style={{ color: MCP_ACCENT }}
            >
              Rook MCP
              <span
                className="text-[9px] font-semibold tracking-[0.06em] px-1 py-[1px] rounded-full"
                style={{ backgroundColor: "rgba(140, 200, 192, 0.12)" }}
              >
                BETA
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <div className="hidden sm:flex items-center -space-x-1">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <XIcon className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="gap-1.5 px-2">
                <a
                  href="https://github.com/maryamtb/rook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={stars !== null ? `GitHub, ${stars} stars` : "GitHub"}
                  onClick={() => captureEvent(EVENT.GithubClick, { source: "nav" })}
                >
                  <GitHubIcon className="size-4" />
                  {stars !== null && (
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">
                      {stars}
                    </span>
                  )}
                </a>
              </Button>
            </div>
            <BrandButton asChild className="hidden sm:inline-flex">
              <a
                href={DMG_URL}
                download
                onClick={() => captureEvent(EVENT.InstallClickDmg, { source: "nav" })}
              >
                <Download className="size-4" />
                Download
              </a>
            </BrandButton>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
                <nav className="flex flex-col gap-6 px-6 pt-10 text-[15px] font-mono">
                  <SheetClose asChild>
                    <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#themes" className="text-muted-foreground hover:text-foreground transition-colors">Themes</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#shortcuts" className="text-muted-foreground hover:text-foreground transition-colors">Shortcuts</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/mcp"
                      className="inline-flex items-center gap-1.5 transition-colors hover:opacity-90"
                      style={{ color: MCP_ACCENT }}
                    >
                      Rook MCP
                      <span
                        className="text-[10px] font-semibold tracking-[0.06em] px-1.5 py-[1px] rounded-full"
                        style={{ backgroundColor: "rgba(140, 200, 192, 0.12)" }}
                      >
                        BETA
                      </span>
                    </Link>
                  </SheetClose>
                  <Separator className="my-1" />
                  <SheetClose asChild>
                    <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                      <XIcon className="size-[18px]" />
                      X
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="https://github.com/maryamtb/rook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => captureEvent(EVENT.GithubClick, { source: "nav_mobile" })}
                    >
                      <GitHubIcon className="size-[18px]" />
                      <span>GitHub</span>
                      {stars !== null && (
                        <span className="ml-auto text-[13px] font-mono tabular-nums text-muted-foreground/60">
                          {stars}
                        </span>
                      )}
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <BrandButton size="lg" asChild className="mt-2 w-full">
                      <Link
                        href="/#download"
                        onClick={() => captureEvent(EVENT.InstallClickMobileRedirect, { source: "nav_mobile" })}
                      >
                        <Mail className="size-4" />
                        Subscribe for updates
                      </Link>
                    </BrandButton>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
