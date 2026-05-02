"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { BrandButton } from "@/components/brand-button";

import { Panel } from "./Panel";
import { useSubscribe } from "./useSubscribe";

export function SubscribeFlow() {
  const searchParams = useSearchParams();
  const [email] = useState(() => (searchParams.get("email") ?? "").trim());
  const [fromApp] = useState(() => searchParams.get("from") === "app");
  const sourceTag = fromApp ? "macos_app" : "subscribe_page";

  const { status, errorMessage, confirm } = useSubscribe(email, sourceTag);

  return (
    <main className="min-h-[100svh] flex items-center justify-center px-6 bg-background text-foreground">
      <div
        className="w-full max-w-md text-center space-y-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex justify-center">
          <Image
            src="/icon-128.png"
            alt="Rook"
            width={64}
            height={64}
            priority
            className="rounded-[14px]"
          />
        </div>

        {status === "ready" && (
          <div className="space-y-4">
            <Panel title="Confirm subscription" body={email} />
            <BrandButton onClick={confirm} className="h-10 px-6 cursor-pointer">
              Subscribe
            </BrandButton>
          </div>
        )}

        {status === "submitting" && <Panel title="Subscribing…" body={email} />}

        {status === "success" && (
          <Panel
            title="You're in."
            body="You can close this tab and return to Rook."
          />
        )}

        {status === "duplicate" && (
          <Panel
            title="You're already in."
            body="You can close this tab and return to Rook."
          />
        )}

        {status === "missingEmail" && (
          <Panel
            title="No email provided."
            body="Open Rook and click Subscribe again."
          />
        )}

        {status === "error" && (
          <div className="space-y-4">
            <Panel
              title="Couldn't subscribe."
              body={errorMessage ?? "Something went wrong. Please try again."}
            />
            {email && (
              <BrandButton onClick={confirm} className="h-10 px-6 cursor-pointer">
                Try again
              </BrandButton>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
