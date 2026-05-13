import type { ThemeColors } from "@/lib/themes";
import { Shimmer } from "./shimmer";

function PlusIcon({ color, duration }: { color: string; duration: number }) {
  return (
    <svg
      className="w-[10px] h-[10px]"
      style={{ color, transitionProperty: "color", transitionDuration: `${duration}ms` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      viewBox="0 0 12 12"
    >
      <path d="M6 1v10M1 6h10" />
    </svg>
  );
}

export function NewNoteButton({
  t,
  onClick,
  hinted,
}: {
  t: ThemeColors;
  onClick?: () => void;
  hinted?: boolean;
}) {
  if (!onClick) {
    return (
      <div
        className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors duration-500"
        style={{ backgroundColor: t.surface }}
      >
        <PlusIcon color={t.subtext} duration={500} />
        <span
          className="text-[11px] font-medium transition-colors duration-500"
          style={{ color: t.subtext }}
        >
          New note
        </span>
      </div>
    );
  }
  const fg = hinted ? t.accent : t.subtext;
  return (
    <div className="relative -my-0.5">
      <Shimmer show={Boolean(hinted)} accent={t.accent} radius={999} glowPad={6} />
      <button
        type="button"
        onClick={onClick}
        className="relative flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 hover:brightness-110 cursor-pointer"
        style={{
          backgroundColor: hinted ? `${t.accent}26` : t.surface,
        }}
      >
        <PlusIcon color={fg} duration={200} />
        <span
          className="text-[11px] font-medium transition-colors duration-200"
          style={{ color: fg }}
        >
          New note
        </span>
      </button>
    </div>
  );
}
