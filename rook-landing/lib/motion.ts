export const EASE_OUT = "easeOut" as const;

export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;
export const REVEAL_VIEWPORT_TIGHT = { once: true, margin: "-40px" } as const;

export const sectionHeading = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration: 0.5, ease: EASE_OUT },
} as const;

export const sectionContent = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: REVEAL_VIEWPORT_TIGHT,
  transition: { duration: 0.6, ease: EASE_OUT },
} as const;

export function cardReveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  } as const;
}
