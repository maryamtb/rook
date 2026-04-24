"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppMockup } from "@/components/mockup";
import { themes } from "@/lib/themes";
import { Download, Lock, Menu } from "lucide-react";
import { NotifyForm } from "@/components/notify-form";

const DMG_URL = "https://lfubd2pcrenetvqi.public.blob.vercel-storage.com/Rook.dmg";

function GitHubIcon({ className }: { className?: string; }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string; }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";

const shortcuts = [
  { keys: ["⌘", "N"], action: "New note" },
  { keys: ["⌘", "F"], action: "Search" },
  { keys: ["⌘", "⇧", "↵"], action: "Code block" },
  { keys: ["⌘", ","], action: "Settings" },
  { keys: ["⌥", "Click"], action: "Multi-cursor" },
  { keys: ["⌘", "⇧", "⌫"], action: "Delete note" },
];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [stars, setStars] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/stars")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.stars === "number") setStars(d.stars);
      })
      .catch(() => { });
  }, []);

  const startCarousel = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % themes.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startCarousel();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startCarousel]);

  const selectTheme = (i: number) => {
    setActiveTheme(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div
        className="absolute top-[50px] left-0 right-0 h-[700px] pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse 120% 70% at 70% 50%, rgba(200, 120, 40, 0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 55% 45%, rgba(232, 150, 46, 0.08) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute bottom-[50px] left-0 right-0 h-[700px] pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse 120% 70% at 70% 50%, rgba(200, 120, 40, 0.10) 0%, transparent 50%)",
            "radial-gradient(ellipse 50% 40% at 55% 45%, rgba(232, 150, 46, 0.08) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/60 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto flex sm:grid sm:grid-cols-[1fr_auto_1fr] items-center justify-between h-14 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 sm:justify-self-start">
            <Image src="/icon-64.png" alt="Rook" width={22} height={22} className="rounded-[5px]" />
            <span className="text-[15px] font-mono font-semibold tracking-tight text-foreground">Rook</span>
          </a>

          <div className="hidden sm:flex items-center gap-7 text-[13px] font-mono text-muted-foreground/60">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#themes" className="hover:text-foreground transition-colors">Themes</a>
            <a href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</a>
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href="https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rook on Product Hunt"
              className="hidden sm:inline-block transition-opacity hover:opacity-80"
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
                <a href="https://github.com/maryamtb/rook" target="_blank" rel="noopener noreferrer" aria-label={stars !== null ? `GitHub, ${stars} stars` : "GitHub"}>
                  <GitHubIcon className="size-4" />
                  {stars !== null && (
                    <span className="text-[12px] font-mono tabular-nums text-muted-foreground/70">
                      {stars}
                    </span>
                  )}
                </a>
              </Button>
            </div>
            <Button asChild className="bg-[#E8962E] text-background hover:bg-[#d4841e] hidden sm:inline-flex">
              <a href={DMG_URL} download>
                <Download className="size-4" />
                Download
              </a>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="flex flex-col gap-6 px-6 pt-10 text-[15px] font-mono">
                  <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                  <a href="#themes" className="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
                  <a href="#shortcuts" className="text-muted-foreground hover:text-foreground transition-colors">Shortcuts</a>
                  <Separator className="my-1" />
                  <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <XIcon className="size-[18px]" />
                    X
                  </a>
                  <a href="https://github.com/maryamtb/rook" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <GitHubIcon className="size-[18px]" />
                    <span>GitHub</span>
                    {stars !== null && (
                      <span className="ml-auto text-[13px] font-mono tabular-nums text-muted-foreground/60">
                        {stars}
                      </span>
                    )}
                  </a>
                  <Button asChild className="bg-[#E8962E] text-background hover:bg-[#d4841e] mt-2">
                    <a href={DMG_URL} download>
                      <Download className="size-4" />
                      Download
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-[140px] md:pt-[176px]">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/icon-512.png"
              alt="Rook"
              width={72}
              height={72}
              className="mx-auto mb-8 rounded-[18px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="text-[clamp(28px,5vw,56px)] font-mono font-bold tracking-[-0.03em] leading-[1.12] text-foreground"
          >
            The note-taking app
            <br className="hidden sm:block" />
            {" "}for developers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[440px] mx-auto"
          >
            Rich text and code blocks, syntax highlighting, and various themes.
            Available for macOS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
            className="mt-8"
          >
            <Button
              size="lg"
              asChild
              className="bg-[#E8962E] text-background hover:bg-[#d4841e] h-12 px-8 text-[15px] font-semibold"
            >
              <a href={DMG_URL} download>
                <Download className="size-4" />
                Download for macOS
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.42 }}
            className="mt-4 text-[13px] font-mono text-[#E8962E]/90"
          >
            First 100 installs get a{" "}
            <a href="#download" className="underline decoration-[#E8962E]/40 underline-offset-4 hover:decoration-[#E8962E]/80 transition-colors">
              lifetime discount on Pro
            </a>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2.5 text-[12px] text-muted-foreground/50"
          >
            <span>Free. macOS 14+. Apple Silicon &amp; Intel.</span>
            <span aria-hidden className="text-muted-foreground/30">·</span>
            <a href="https://github.com/maryamtb/rook" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              <GitHubIcon className="size-3" />
              GitHub
            </a>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href="https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 sm:hidden inline-block transition-opacity hover:opacity-80"
            aria-label="Rook on Product Hunt"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Rook on Product Hunt"
              width={210}
              height={45}
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=dark&t=1776961478535"
            />
          </motion.a>
        </div>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          className="mt-16 md:mt-20 max-w-[1080px] mx-auto px-4 sm:px-6 relative"
        >
          <div className="hidden sm:block">
            <AppMockup theme={themes[0]} />
          </div>
          <div className="sm:hidden overflow-hidden rounded-xl border shadow-2xl" style={{ backgroundColor: themes[0].bg, borderColor: themes[0].border }}>
            <div className="flex items-center px-3 h-9" style={{ backgroundColor: themes[0].panel }}>
              <div className="flex gap-[6px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: themes[0].surface }}>
                <svg className="w-[8px] h-[8px]" style={{ color: themes[0].subtext }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" /></svg>
                <span className="text-[9px] font-medium" style={{ color: themes[0].subtext }}>New note</span>
              </div>
            </div>
            <div className="p-5" style={{ backgroundColor: themes[0].bg }}>
              <h2 className="text-[18px] font-bold mb-2" style={{ color: themes[0].text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>kubectl quick ref</h2>
              <p className="text-[12px] leading-[1.7] mb-3" style={{ color: themes[0].subtext }}>
                Commands for managing context, pods, deployments.
              </p>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: themes[0].codeBg }}>
                <div className="flex items-center px-3 pt-2">
                  <span className="text-[9px]" style={{ color: `${themes[0].subtext}99` }}>bash</span>
                </div>
                <pre className="px-3 pb-3 pt-1 text-[10px] leading-[1.75] font-mono">
                  <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>config get-contexts</span>{"\n"}
                  <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>config use-context</span> <span style={{ color: themes[0].variable }}>&lt;name&gt;</span>{"\n"}
                  <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>get pods -n</span> <span style={{ color: themes[0].variable }}>&lt;ns&gt;</span>{"\n"}
                  <span style={{ color: themes[0].func }}>kubectl</span> <span style={{ color: themes[0].codeText }}>logs</span> <span style={{ color: themes[0].variable }}>&lt;pod&gt;</span> <span style={{ color: themes[0].keyword }}>--tail</span><span style={{ color: themes[0].codeText }}>=100 -f</span>
                </pre>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-px inset-x-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 10%, transparent 100%)" }} />
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[1200px] mx-auto px-6"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16 md:gap-14">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {["Swift", "Python", "TypeScript", "Go", "Rust"].map((lang) => (
                  <span key={lang} className="text-[11px] font-mono text-muted-foreground/50 bg-secondary/50 px-1.5 py-0.5 rounded">
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-[14px] font-medium">Code Blocks</p>
              <p className="text-[12px] text-muted-foreground/60 mt-0.5">17 languages with syntax highlighting</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3 text-muted-foreground/40">
                <span className="text-[16px] font-bold">H</span>
                <span className="text-[14px] font-bold">B</span>
                <span className="text-[14px] italic">I</span>
                <span className="text-[12px] font-mono">{`{}`}</span>
                <span className="text-[14px]">☑</span>
              </div>
              <p className="text-[14px] font-medium">Rich Text + Code</p>
              <p className="text-[12px] text-muted-foreground/60 mt-0.5">Headings, lists, todos, code blocks</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {themes.map((t) => (
                  <div key={t.name} className="w-5 h-5 rounded-full border border-border/30" style={{ backgroundColor: t.accent }} />
                ))}
              </div>
              <p className="text-[14px] font-medium">5 Themes</p>
              <p className="text-[12px] text-muted-foreground/60 mt-0.5">Dark, Light, Terminal, Paper, Midnight</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Lock className="size-5 text-muted-foreground/40" />
              </div>
              <p className="text-[14px] font-medium">Local & Private</p>
              <p className="text-[12px] text-muted-foreground/60 mt-0.5">No cloud, no account, your machine</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-[1080px] mx-auto opacity-50" />

      {/* ── Themes ── */}
      <section id="themes" className="py-24 md:py-32 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200, 120, 40, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1080px] mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
              Themes
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Five built-in themes, each with its own syntax highlighting
            </p>
          </motion.div>

          {/* Theme tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 mb-12 relative overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 no-scrollbar">
            {themes.map((t, i) => (
              <button
                key={t.name}
                onClick={() => selectTheme(i)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap shrink-0 ${activeTheme === i
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeTheme === i && (
                  <motion.div
                    layoutId="theme-tab-bg"
                    className="absolute inset-0 bg-secondary rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: t.accent }}
                    animate={{ scale: activeTheme === i ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  />
                  {t.name}
                </span>
              </button>
            ))}
          </div>

          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[960px] mx-auto relative"
          >
            <motion.div
              className="absolute -inset-12 rounded-3xl pointer-events-none blur-3xl opacity-20"
              animate={{ backgroundColor: themes[activeTheme].accent }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            <div className="relative theme-morph hidden sm:block">
              <AppMockup theme={themes[activeTheme]} variant="dsa" />
            </div>
            <div className="relative theme-morph sm:hidden">
              <div className="rounded-xl overflow-hidden border shadow-2xl transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].bg, borderColor: themes[activeTheme].border }}>
                <div className="flex items-center px-3 h-9 transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].panel }}>
                  <div className="flex gap-[6px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].surface }}>
                    <svg className="w-[8px] h-[8px] transition-colors duration-500" style={{ color: themes[activeTheme].subtext }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" /></svg>
                    <span className="text-[9px] font-medium transition-colors duration-500" style={{ color: themes[activeTheme].subtext }}>New note</span>
                  </div>
                </div>
                <div className="p-5 transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].bg }}>
                  <h2 className="text-[18px] font-bold mb-2 transition-colors duration-500" style={{ color: themes[activeTheme].text, fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}>Binary Search</h2>
                  <p className="text-[12px] leading-[1.7] mb-3 transition-colors duration-500" style={{ color: themes[activeTheme].subtext }}>
                    A divide-and-conquer algorithm for sorted arrays. Runs in <span className="font-mono text-[11px] px-1 py-0.5 rounded transition-colors duration-500" style={{ backgroundColor: `${themes[activeTheme].accent}18`, color: themes[activeTheme].accent }}>O(log n)</span> time.
                  </p>
                  <div className="rounded-lg overflow-hidden transition-colors duration-500" style={{ backgroundColor: themes[activeTheme].codeBg }}>
                    <div className="flex items-center px-3 pt-2">
                      <span className="text-[9px] transition-colors duration-500" style={{ color: `${themes[activeTheme].subtext}99` }}>python</span>
                    </div>
                    <pre className="px-3 pb-3 pt-1 text-[10px] leading-[1.75] font-mono">
                      <span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>def</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].func }}>binary_search</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>(arr, target):</span>{"\n"}
                      {"  "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>,</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>hi</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].string }}>0</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>,</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].func }}>len</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>(arr) - 1</span>{"\n"}
                      {"  "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>while</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>&lt;=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>hi</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>:</span>{"\n"}
                      {"    "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>mid</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>=</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>lo</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>+ (hi - lo) // 2</span>{"\n"}
                      {"    "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>if</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>arr</span><span className="transition-colors duration-500" style={{ color: themes[activeTheme].codeText }}>[mid] == target:</span>{"\n"}
                      {"      "}<span className="transition-colors duration-500" style={{ color: themes[activeTheme].keyword }}>return</span> <span className="transition-colors duration-500" style={{ color: themes[activeTheme].variable }}>mid</span>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="max-w-[1080px] mx-auto opacity-50" />

      {/* ── Shortcuts ── */}
      <section id="shortcuts" className="py-24 md:py-32">
        <div className="max-w-[1080px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
              Shortcuts
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              All the usual suspects, and a few more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 max-w-[640px] mx-auto"
          >
            {shortcuts.map((s) => (
              <div
                key={s.action}
                className="flex items-center justify-between py-3 border-b border-border/50"
              >
                <span className="text-[14px] text-muted-foreground">{s.action}</span>
                <div className="flex items-center gap-1">
                  {s.keys.map((k, ki) => (
                    <Badge
                      key={ki}
                      variant="outline"
                      className="text-[12px] font-medium text-foreground/60 border-border bg-secondary/30 px-2 py-0.5 rounded-[5px] min-w-[28px] justify-center"
                    >
                      {k}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Separator className="max-w-[1080px] mx-auto opacity-50" />

      {/* ── Community Notes ── */}
      <section id="community" className="py-24 md:py-32">
        <div className="max-w-[1080px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
              Community Cheatsheets
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Markdown cheatsheets for common commands
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[720px] mx-auto"
          >
            <AppMockup theme={themes[3]} variant="aws" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[13px] font-mono text-muted-foreground"
          >
            <a
              href="https://github.com/maryamtb/rook/tree/main/community-notes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Browse all on GitHub →
            </a>
            <span aria-hidden className="hidden sm:inline text-muted-foreground/30">·</span>
            <a
              href="https://github.com/maryamtb/rook/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Introduce yourself in Discussions →
            </a>
          </motion.div>
        </div>
      </section>

      <Separator className="max-w-[1080px] mx-auto opacity-50" />

      {/* ── CTA ── */}
      <section id="download" className="py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[480px] mx-auto px-6 text-center"
        >
          <Image
            src="/icon-512.png"
            alt="Rook"
            width={56}
            height={56}
            className="mx-auto mb-6 rounded-2xl"
          />

          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
            Download Rook
          </h2>

          <p className="mt-3 text-[15px] text-muted-foreground">
            Free, local, for macOS
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              asChild
              className="bg-[#E8962E] text-background hover:bg-[#d4841e] h-12 px-8 text-[15px] font-semibold"
            >
              <a href={DMG_URL} download>
                <Download className="size-4" />
                Download for macOS
              </a>
            </Button>
          </div>

          <p className="mt-3 text-[12px] text-muted-foreground/40">
            macOS 14+. Apple Silicon &amp; Intel.
          </p>

          <div className="mt-10 pt-8 border-t border-border/30">
            <p className="text-[13px] text-muted-foreground mb-3"><span className="text-foreground font-medium">First 100 installs</span> get a lifetime discount on Pro.</p>
            <NotifyForm />
          </div>

          <p className="mt-8 text-[12px] text-muted-foreground/60">
            Say hi in{" "}
            <a href="https://github.com/maryamtb/rook/discussions" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">GitHub Discussions</a>
            {". Follow on "}
            <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">X</a>
            {". Read the story on "}
            <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground transition-colors">Dev.to</a>.
          </p>

          {/* <a
            href="https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block transition-opacity hover:opacity-80"
          >
            eslint-disable-next-line @next/next/no-img-element
            <img
              alt="Rook - The note-taking app for developers | Product Hunt"
              width={250}
              height={54}
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=dark&t=1776961478535"
            />
          </a> */}
        </motion.div>
      </section>

      {/* ── Tweet vibe ── */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <motion.a
            href="https://x.com/userookapp"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-semibold">Rook</span>
                <span className="text-[12px] text-muted-foreground/70">@userookapp</span>
              </div>
              <XIcon className="ml-auto size-4 text-muted-foreground/40" />
            </div>
            <p className="mt-3 text-[15px] leading-[1.5]">
              if vscode and apple notes had a child ??
            </p>
          </motion.a>

          <motion.a
            href="https://x.com/userookapp"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-semibold">Rook</span>
                <span className="text-[12px] text-muted-foreground/70">@userookapp</span>
              </div>
              <XIcon className="ml-auto size-4 text-muted-foreground/40" />
            </div>
            <div className="mt-3 rounded-lg bg-background/60 border border-border/40 p-3 font-mono text-[11px] leading-[1.75] overflow-x-auto">
              <div className="text-muted-foreground/50 whitespace-nowrap"># apps for code notes</div>
              <div className="whitespace-nowrap">
                <span className="text-[#c4a7e7]">apps</span>
                <span className="text-muted-foreground/80"> = [</span>
                <span className="text-[#7ec16e]">&quot;apple notes&quot;</span>
                <span className="text-muted-foreground/80">, </span>
                <span className="text-[#7ec16e]">&quot;notion&quot;</span>
                <span className="text-muted-foreground/80">, </span>
                <span className="text-[#7ec16e]">&quot;rook&quot;</span>
                <span className="text-muted-foreground/80">]</span>
              </div>
              <div className="mt-1">
                <span className="text-[#c4a7e7]">apps</span>
                <span className="text-muted-foreground/80">[</span>
                <span className="text-[#E8962E]">-1</span>
                <span className="text-muted-foreground/80">]</span>
              </div>
            </div>
            <p className="mt-1 text-[15px] leading-[1.5]">?</p>
          </motion.a>

          <motion.a
            href="https://x.com/userookapp"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="block rounded-2xl border border-border/60 bg-secondary/20 p-5 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Image src="/icon-64.png" alt="" width={36} height={36} className="rounded-full" />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-semibold">Rook</span>
                <span className="text-[12px] text-muted-foreground/70">@userookapp</span>
              </div>
              <XIcon className="ml-auto size-4 text-muted-foreground/40" />
            </div>
            <p className="mt-3 text-[15px] leading-[1.5]">
              the rook owns the file... fitting, for a notes app
            </p>
          </motion.a>
        </div>
      </section>

      {/* ── Footer ── */}
      <Separator />
      <footer className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icon-64.png" alt="Rook" width={18} height={18} className="rounded-sm" />
            <span className="text-[12px] font-mono text-muted-foreground/40">Rook</span>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground/40">
            <a href="mailto:hello@userook.app" className="hover:text-muted-foreground transition-colors">hello@userook.app</a>
            <a href="https://x.com/userookapp" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">X</a>
            <a href="https://github.com/maryamtb/rook" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">GitHub</a>
            <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
