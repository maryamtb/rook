"use client";

import { useState } from "react";
import { MonitorSmartphone } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BrandButton } from "@/components/brand-button";
import { subscribeRequest } from "@/lib/subscribe-client";
import {
  PLATFORM_LABELS,
  joinPlatformLabels,
  type Platform,
} from "@/lib/platforms";
import { captureEvent, identifyEmail } from "@/lib/posthog-safe";
import { EVENT } from "@/lib/events";
import { TOAST_STYLE } from "@/lib/toast";
import { cn } from "@/lib/utils";

type PlatformOption = { id: Platform; label: string; };

const DESKTOP_IDS: ReadonlyArray<Platform> = ["windows", "linux"];
const MOBILE_IDS: ReadonlyArray<Platform> = ["iphone", "ipad", "android"];

const DESKTOP_PLATFORMS: ReadonlyArray<PlatformOption> = DESKTOP_IDS.map(
  (id) => ({ id, label: PLATFORM_LABELS[id] }),
);
const MOBILE_PLATFORMS: ReadonlyArray<PlatformOption> = MOBILE_IDS.map(
  (id) => ({ id, label: PLATFORM_LABELS[id] }),
);

export function PlatformWaitlist({
  source,
  className,
  variant = "pill",
}: {
  source: string;
  className?: string;
  variant?: "pill" | "link";
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<Platform>>(new Set());
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const platforms = Array.from(selected);
  const hasSelection = platforms.length > 0;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) captureEvent(EVENT.PlatformWaitlistOpen, { source });
  }

  function togglePlatform(id: Platform) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !hasSelection || !email) return;
    setLoading(true);
    const outcome = await subscribeRequest(email, { platforms });
    setLoading(false);

    const joined = joinPlatformLabels(platforms);

    switch (outcome.kind) {
      case "ok":
        identifyEmail(email);
        captureEvent(EVENT.PlatformWaitlistSignup, { source, platforms });
        toast("You're on the list.", { style: TOAST_STYLE.success });
        setDoneMessage(
          `You're on the list for ${joined}. We'll let you know if support becomes available.`,
        );
        return;
      case "duplicate":
        captureEvent(EVENT.PlatformWaitlistDuplicate, { source, platforms });
        toast(outcome.message ?? "You're already on the list.", {
          style: TOAST_STYLE.duplicate,
        });
        setDoneMessage(
          outcome.message ?? `You're already on the list for ${joined}.`,
        );
        return;
      case "timeout":
        toast.error("The request took too long. Please try again.");
        return;
      case "error":
        toast.error(outcome.message);
        return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {variant === "link" ? (
          <button
            type="button"
            aria-label="Not on Mac? Join waitlist"
            className={cn(
              "underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground transition-colors cursor-pointer",
              className,
            )}
          >
            Not on Mac?
          </button>
        ) : (
          <button
            type="button"
            aria-label="Not on Mac? Join waitlist"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1 text-[12px] font-mono text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer whitespace-nowrap",
              className,
            )}
          >
            <MonitorSmartphone className="size-3.5 shrink-0" />
            <span>Not on Mac?</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogTitle className="text-[16px] font-semibold">
          Not on Mac?
        </DialogTitle>
        <DialogDescription className="text-[13px] text-muted-foreground">
          Rook is currently macOS only. Pick one or more platforms and we&apos;ll
          notify you if support is added.
        </DialogDescription>

        {doneMessage ? (
          <p className="pt-1 text-[14px] font-bold text-rook">{doneMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {DESKTOP_PLATFORMS.map((p) => (
                  <PlatformPill
                    key={p.id}
                    platform={p}
                    selected={selected.has(p.id)}
                    onToggle={togglePlatform}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MOBILE_PLATFORMS.map((p) => (
                  <PlatformPill
                    key={p.id}
                    platform={p}
                    selected={selected.has(p.id)}
                    onToggle={togglePlatform}
                  />
                ))}
              </div>
            </div>
            <Input
              type="email"
              placeholder="rhoward@dundermifflin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!hasSelection}
              className="h-10 w-full"
            />
            <BrandButton
              type="submit"
              disabled={!hasSelection || !email || loading}
              className="h-10 w-full cursor-pointer"
            >
              {loading ? "Sending..." : "Notify me"}
            </BrandButton>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PlatformPill({
  platform,
  selected,
  onToggle,
}: {
  platform: PlatformOption;
  selected: boolean;
  onToggle: (id: Platform) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle(platform.id)}
      className={cn(
        "h-10 rounded-md border text-[13px] font-mono transition-colors cursor-pointer",
        selected
          ? "border-rook bg-rook/10 text-rook"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
      )}
    >
      {platform.label}
    </button>
  );
}
