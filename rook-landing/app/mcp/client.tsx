"use client";

import { useEffect, useState } from "react";
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
        <code>{text}</code>
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
