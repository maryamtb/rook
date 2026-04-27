"use client";

import Image from "next/image";
import posthog from "posthog-js";
import { Download, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand-button";
import { GitHubIcon, XIcon } from "@/components/icons";
import { DMG_URL, PRODUCT_HUNT_URL } from "@/lib/constants";

export function Nav({ stars }: { stars: number | null; }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <SignupOutageBanner />
      <nav className="bg-background/60 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto flex sm:grid sm:grid-cols-[1fr_auto_1fr] items-center justify-between h-14 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 sm:justify-self-start">
            <Image src="/icon-64.png" alt="" width={22} height={22} className="rounded-[5px]" />
            <span className="text-[15px] font-mono font-semibold tracking-tight text-foreground">Rook</span>
          </a>

          <div className="hidden sm:flex items-center gap-7 text-[13px] font-mono text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#themes" className="hover:text-foreground transition-colors">Themes</a>
            <a href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</a>
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={PRODUCT_HUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rook on Product Hunt"
              className="hidden sm:inline-block transition-opacity hover:opacity-80"
              onClick={() => posthog.capture("product_hunt_click", { source: "nav" })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Rook on Product Hunt"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=light&t=1776961478535"
                className="h-8 w-auto"
              />
            </a>
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
                  onClick={() => posthog.capture("github_click", { source: "nav" })}
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
              <a href={DMG_URL} download onClick={() => posthog.capture("install_click", { source: "nav" })}>
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
                <nav className="flex flex-col gap-6 px-6 pt-10 text-[15px] font-mono">
                  <SheetClose asChild>
                    <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a href="#themes" className="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a href="#shortcuts" className="text-muted-foreground hover:text-foreground transition-colors">Shortcuts</a>
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
                      onClick={() => posthog.capture("github_click", { source: "nav_mobile" })}
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
                      <a
                        href="#download"
                        onClick={() => posthog.capture("install_click_mobile_redirect", { source: "nav_mobile" })}
                      >
                        <Mail className="size-4" />
                        Subscribe for updates
                      </a>
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

function SignupOutageBanner() {
  return (
    <div role="status" className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2 text-[12px] sm:text-[13px] leading-snug text-amber-200 text-center">
        <span aria-hidden className="mr-1">⚠️</span>
        Signups are temporarily unavailable due to a third-party outage. Try again in a few hours, or email{" "}
        <a
          href="mailto:hello@userook.app"
          className="underline decoration-amber-200/40 underline-offset-2 hover:decoration-amber-200 transition-colors"
        >
          hello@userook.app
        </a>{" "}
        to be added manually.
      </div>
    </div>
  );
}
