import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { PostHogInit } from "@/components/posthog-init";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PostHogInit />
      {children}
      <Toaster richColors position="bottom-right" />
      <Analytics />
    </>
  );
}
