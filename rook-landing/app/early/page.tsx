"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Mail } from "lucide-react";
import { toast } from "sonner";

const DMG_URL = "https://lfubd2pcrenetvqi.public.blob.vercel-storage.com/Rook.dmg";
const UNLOCK_KEY = "rook-early-unlocked";

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

export default function Leaked() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok && res.status !== 409) {
        toast.error(data.error || "Something went wrong. Try again?");
        return;
      }

      if (res.status === 409) {
        toast("Welcome back! Ready to install.", { style: { background: "#E8962E", color: "#111", border: "none" } });
      } else {
        toast("You're in! Ready to install.", { style: { background: "#2D6A4F", color: "#fff", border: "none" } });
      }

      localStorage.setItem(UNLOCK_KEY, "1");
      setUnlocked(true);
    } catch {
      toast.error("Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse 120% 70% at 50% 40%, rgba(200, 120, 40, 0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232, 150, 46, 0.08) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <div className="relative z-10 max-w-[540px] w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a href="/" aria-label="Back to Rook home" className="inline-block">
            <Image
              src="/icon-512.png"
              alt="Rook"
              width={88}
              height={88}
              className="mx-auto mb-8 rounded-[20px] transition-transform hover:scale-105"
            />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="text-[13px] font-mono text-[#E8962E]/80 mb-3"
        >
          you found early access
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
          className="text-[clamp(28px,5vw,48px)] font-mono font-bold tracking-[-0.03em] leading-[1.15] text-foreground"
        >
          Rook
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
          className="mt-5 text-[16px] text-muted-foreground leading-relaxed max-w-[420px] mx-auto"
        >
          The note-taking app for developers.
          <br />
          Code blocks, themes, fully local.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-10"
        >
          {unlocked ? (
            <Button
              size="lg"
              asChild
              className="bg-[#E8962E] text-background hover:bg-[#d4841e] h-12 px-8 text-[15px] font-semibold"
            >
              <a href={DMG_URL} download>
                <Download className="size-4" />
                Install Rook
              </a>
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 max-w-sm mx-auto">
              <p className="text-[13px] text-muted-foreground">
                Drop your email to get the install link.
              </p>
              <div className="flex items-center gap-2 w-full">
                <Input
                  type="email"
                  placeholder="rhoward@dundermifflin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#E8962E] text-background hover:bg-[#d4841e] h-12 px-5 text-[14px] font-semibold shrink-0 cursor-pointer"
                >
                  <Mail className="size-4" />
                  {loading ? "..." : "Continue"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 text-[12px] text-muted-foreground/50"
        >
          macOS 14+. Apple Silicon &amp; Intel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://x.com/userookapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="size-3.5" />
                Follow on X
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/maryamtb/rook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="size-3.5" />
                Star on GitHub
              </a>
            </Button>
          </div>
          <a
            href="https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Rook - The note-taking app for developers | Product Hunt"
              width={250}
              height={54}
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1130811&theme=dark&t=1776961478535"
            />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
