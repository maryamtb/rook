export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const TRANSITION = {
  popover: { duration: 0.18, ease: EASE_SMOOTH },
  fade: { duration: 0.22, ease: "easeOut" as const },
  fadeShort: { duration: 0.25 },
  expand: { duration: 0.3, ease: EASE_SMOOTH },
  slide: { duration: 0.4, ease: EASE_SMOOTH },
} as const;

export const LAYOUT = {
  sidebarWidth: 210,
  sidebarWrapperWidth: 224,
  mockupMinHeight: 480,
  mockupMaxWidth: 860,
} as const;

export const SIDEBAR_BG = {
  outer: "#efedeb",
  inner: "#f2f0ee",
} as const;
