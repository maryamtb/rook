import type { ThemeColors } from "@/lib/themes";
import { SidebarToggleIcon } from "./sidebar-toggle-icon";
import { Shimmer } from "./shimmer";

export function SidebarToggleButton({
  t,
  onClick,
  hinted,
  collapsed,
}: {
  t: ThemeColors;
  onClick?: () => void;
  hinted?: boolean;
  collapsed?: boolean;
}) {
  if (!onClick) {
    return (
      <div className="ml-3">
        <SidebarToggleIcon color={t.subtext} collapsed={collapsed} />
      </div>
    );
  }
  return (
    <div className="ml-3 -my-1 relative">
      <Shimmer show={Boolean(hinted)} accent={t.accent} radius={6} glowPad={5} />
      <button
        type="button"
        onClick={onClick}
        className="relative px-1.5 py-1 rounded-md transition-all duration-200 hover:brightness-125 cursor-pointer"
        style={{ backgroundColor: "transparent" }}
        aria-label="Toggle sidebar"
      >
        <SidebarToggleIcon color={hinted ? t.accent : t.subtext} collapsed={collapsed} />
      </button>
    </div>
  );
}
