import type { Metadata } from "next";
import { Suspense } from "react";

import { SubscribeFlow } from "./SubscribeFlow";

export const metadata: Metadata = {
  title: "Subscribe · Rook",
  description: "Confirm your subscription to Rook updates.",
  robots: { index: false, follow: false },
};

export default function SubscribePage() {
  return (
    <Suspense fallback={<SubscribeFallback />}>
      <SubscribeFlow />
    </Suspense>
  );
}

function SubscribeFallback() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading subscription page"
      className="min-h-[100svh] flex items-center justify-center px-6 bg-background text-foreground"
    />
  );
}
