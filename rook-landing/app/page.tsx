"use client";

import { PageGradients } from "@/components/page-gradients";
import { Separator } from "@/components/ui/separator";
import { useSignupMeta, useStars, useThemeCarousel } from "@/hooks";
import { SHOW_DISCOUNT_COUNTER } from "@/lib/constants";
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
  const stars = useStars();
  const { activeTheme, selectTheme } = useThemeCarousel();
  const capReached = SHOW_DISCOUNT_COUNTER && (signupMeta?.capReached ?? false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <PageGradients />

      <Nav stars={stars} />
      <Hero />
      <Features />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <Themes activeTheme={activeTheme} onSelect={selectTheme} />
      <Shortcuts />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <CommunityNotes />
      <Separator className="max-w-[1080px] mx-auto opacity-50" />
      <Cta capReached={capReached} signupMeta={signupMeta} />
      <TweetVibe />
      <Separator />
      <Footer />
    </main>
  );
}
