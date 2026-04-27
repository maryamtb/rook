"use client";

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

const TOP_GRADIENT =
  "radial-gradient(ellipse 120% 70% at 70% 50%, rgba(200, 120, 40, 0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 55% 45%, rgba(232, 150, 46, 0.08) 0%, transparent 70%)";

const BOTTOM_GRADIENT =
  "radial-gradient(ellipse 120% 70% at 70% 50%, rgba(200, 120, 40, 0.10) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 55% 45%, rgba(232, 150, 46, 0.08) 0%, transparent 50%)";

export default function Home() {
  const signupMeta = useSignupMeta();
  const stars = useStars();
  const { activeTheme, selectTheme } = useThemeCarousel();
  const capReached = !SHOW_DISCOUNT_COUNTER || (signupMeta?.capReached ?? false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div
        className="absolute top-[50px] left-0 right-0 h-[700px] pointer-events-none z-0"
        style={{ background: TOP_GRADIENT }}
      />
      <div
        className="absolute bottom-[50px] left-0 right-0 h-[700px] pointer-events-none z-0"
        style={{ background: BOTTOM_GRADIENT }}
      />

      <Nav stars={stars} />
      <Hero capReached={capReached} />
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
