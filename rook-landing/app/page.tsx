"use client";

import { PageGradients } from "@/components/page-gradients";
import { Separator } from "@/components/ui/separator";
import { useSignupMeta, useThemeCarousel } from "@/hooks";
import {
  Nav,
  Hero,
  Features,
  Themes,
  Shortcuts,
  CommunityNotes,
  Cta,
  TweetVibe,
  Footer,
} from "@/components/sections";

export default function Home() {
  const signupMeta = useSignupMeta();
  const { activeTheme, selectTheme } = useThemeCarousel();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <PageGradients />

      <Nav />
      <Hero signupMeta={signupMeta} />
      <Features />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <Themes activeTheme={activeTheme} onSelect={selectTheme} />
      <Shortcuts />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <CommunityNotes />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <Cta signupMeta={signupMeta} />
      <TweetVibe />
      <Separator />
      <Footer />
    </main>
  );
}
