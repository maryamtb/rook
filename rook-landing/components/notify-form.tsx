"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

      if (!res.ok) {
        if (res.status === 409) {
          toast(data.error, { style: { background: "#E8962E", color: "#111", border: "none" } });
        } else {
          toast.error(data.error);
        }
        return;
      }

      toast("You're in! We'll notify you as soon as Rook launches.", { style: { background: "#2D6A4F", color: "#fff", border: "none" } });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-[15px] text-muted-foreground">
        You&apos;re on the list. We&apos;ll be in touch!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-sm mx-auto">
      <Input
        type="email"
        placeholder="rhoward@dundermifflin.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-10"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#E8962E] text-background hover:bg-[#d4841e] h-10 shrink-0 cursor-pointer"
      >
        <Mail className="size-4" />
        {loading ? "Sending..." : "Notify Me"}
      </Button>
    </form>
  );
}
