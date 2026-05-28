"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

export type TocItem = { id: string; label: string; children?: TocItem[] };

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const allIds = items.flatMap((i) => [i.id, ...(i.children?.map((c) => c.id) ?? [])]);
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const baseLink = "block py-1 transition-colors";

  return (
    <nav className="space-y-0.5 text-[13px]">
      {items.map((item) => {
        const active = activeId === item.id || item.children?.some((c) => c.id === activeId);
        return (
          <div key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${baseLink} ${active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}
            </a>
            {item.children && (
              <div className="ml-3 border-l border-border/40 pl-3 mt-0.5 mb-1 space-y-0.5">
                {item.children.map((child) => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    className={`block py-0.5 text-[12.5px] transition-colors ${
                      activeId === child.id
                        ? "text-foreground"
                        : "text-muted-foreground/70 hover:text-foreground/90"
                    }`}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function CopyBlock({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative group my-3">
      <pre className="text-[12.5px] leading-[1.65] font-mono bg-foreground/[0.04] border border-border/60 rounded-lg px-4 py-3 pr-12 whitespace-pre-wrap break-all">
        <code>{colorizeShell(text)}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-md text-foreground/50 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

const SHELL_COMMANDS = new Set(["claude", "codex", "gemini", "cursor", "npm", "pnpm", "yarn"]);

const C_KEYWORD = "rgb(197, 165, 220)";
const C_STRING = "rgb(140, 200, 192)";
const C_PUNCT = "rgb(150, 165, 180)";
const C_FLAG = "rgb(225, 175, 130)";

function colorizeShell(text: string): ReactNode {
  if (text.includes("\n") && (text.startsWith("[") || text.startsWith("{"))) {
    return colorizeConfig(text);
  }
  const tokens = text.split(/(\s+)/);
  let sawCommand = false;
  return tokens.map((tok, i) => {
    if (/^\s+$/.test(tok)) return tok;
    if (!sawCommand && SHELL_COMMANDS.has(tok)) {
      sawCommand = true;
      return <span key={i} style={{ color: C_KEYWORD }}>{tok}</span>;
    }
    if (/^--?[\w-]+$/.test(tok) || tok === "--") {
      return <span key={i} style={{ color: C_FLAG }}>{tok}</span>;
    }
    if (tok.startsWith('"') && tok.endsWith('"')) {
      return <span key={i} style={{ color: C_STRING }}>{tok}</span>;
    }
    return tok;
  });
}

function colorizeConfig(text: string): ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const eol = i < lines.length - 1 ? "\n" : "";
    const sectionMatch = line.match(/^(\[)([^\]]+)(\])$/);
    if (sectionMatch) {
      return (
        <span key={i}>
          <span style={{ color: C_PUNCT }}>{sectionMatch[1]}</span>
          <span style={{ color: C_KEYWORD }}>{sectionMatch[2]}</span>
          <span style={{ color: C_PUNCT }}>{sectionMatch[3]}</span>
          {eol}
        </span>
      );
    }
    const kv = line.match(/^(\s*)("?[\w-]+"?)(\s*[:=]\s*)(.*?)(,?)$/);
    if (kv) {
      const value = kv[4];
      const valueColored =
        value.startsWith('"') && value.endsWith('"')
          ? <span style={{ color: C_STRING }}>{value}</span>
          : value === "{" || value === "}" || value === "[" || value === "]" || value === "[]"
          ? <span style={{ color: C_PUNCT }}>{value}</span>
          : value;
      return (
        <span key={i}>
          {kv[1]}
          <span style={{ color: C_FLAG }}>{kv[2]}</span>
          <span style={{ color: C_PUNCT }}>{kv[3]}</span>
          {valueColored}
          <span style={{ color: C_PUNCT }}>{kv[5]}</span>
          {eol}
        </span>
      );
    }
    return <span key={i}><span style={{ color: C_PUNCT }}>{line}</span>{eol}</span>;
  });
}

export function ExpandableImage({
  src,
  alt,
  description,
  width,
  height,
  loading,
}: {
  src: string;
  alt: string;
  description: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Open "${alt}" full size`}
          className="block w-full cursor-zoom-in transition-opacity hover:opacity-95"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            loading={loading}
          />
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="!max-w-[95vw] w-[95vw] p-0 border-none bg-transparent shadow-none"
      >
        <VisuallyHidden.Root asChild>
          <DialogTitle>{alt}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden.Root>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg"
          priority
        />
      </DialogContent>
    </Dialog>
  );
}

export type ConfigItem = { id: string; label: string; content: ReactNode };

export function ConfigAccordion({
  items,
  initial = [],
}: {
  items: ConfigItem[];
  initial?: string[];
}) {
  const [value, setValue] = useState<string[]>(initial);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      if (items.some((i) => i.id === hash)) {
        setValue((v) => (v.includes(hash) ? v : [...v, hash]));
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items]);

  return (
    <Accordion
      type="multiple"
      value={value}
      onValueChange={setValue}
      className="my-4 border-t border-border/60"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          id={item.id}
          className="scroll-mt-24 border-border/60"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex flex-1 items-center gap-3 py-5 text-left text-[17px] font-semibold tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-md">
              <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
              {item.label}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="pl-7 pb-6">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function CursorInstallButton({ deeplink }: { deeplink: string }) {
  return (
    <a
      href={deeplink}
      className="inline-flex items-center gap-2 px-4 py-2 my-3 rounded-lg border border-border/60 bg-foreground/[0.04] hover:bg-foreground/[0.07] transition-colors text-[13.5px] font-medium text-foreground"
    >
      Add to Cursor
    </a>
  );
}
