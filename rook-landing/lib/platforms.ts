export type Platform = "windows" | "linux" | "iphone" | "ipad" | "android";

export const PLATFORM_LABELS: Record<Platform, string> = {
  windows: "Windows",
  linux: "Linux",
  iphone: "iPhone",
  ipad: "iPad",
  android: "Android",
};

export function isPlatform(value: unknown): value is Platform {
  return typeof value === "string" && value in PLATFORM_LABELS;
}

export function platformLabel(p: Platform): string {
  return PLATFORM_LABELS[p];
}

export function joinPlatformLabels(
  ids: Platform[],
  fallback = "your platform",
): string {
  if (ids.length === 0) return fallback;
  const labels = ids.map(platformLabel);
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}
