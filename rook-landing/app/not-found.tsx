"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [blink, setBlink] = useState(true);
  const [typed, setTyped] = useState("");
  const fullText = "This page doesn't exist. Maybe it's in another notebook.";

  useEffect(() => {
    const cursor = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-[520px] w-full">
        <div
          className="rounded-xl overflow-hidden border border-border shadow-2xl"
          style={{ backgroundColor: "#181818" }}
        >
          <div
            className="flex items-center gap-2 px-4 h-12 border-b border-border"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex gap-[7px]">
              <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
            </div>
            <span className="ml-2 text-[11px] font-mono font-medium text-[#9D9D9D]">
              Rook / Untitled Note
            </span>
          </div>

          <div className="p-6 space-y-4">
            <h1
              className="text-[28px] font-semibold tracking-tight"
              style={{ color: "#EEEEEE" }}
            >
              404
            </h1>

            <div className="min-h-[80px]">
              <p
                className="text-sm leading-[1.75]"
                style={{ color: "#9D9D9D" }}
              >
                {typed}
                <span
                  className={`inline-block w-[2px] h-[16px] ml-[1px] align-text-bottom ${blink ? "bg-rook" : "bg-transparent"}`}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rook text-background text-[13px] font-medium hover:bg-rook-hover transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
