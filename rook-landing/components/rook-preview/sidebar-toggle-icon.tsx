export function SidebarToggleIcon({ color, collapsed }: { color: string; collapsed?: boolean; }) {
  return (
    <svg
      className="w-[15px] h-[15px] transition-colors duration-500"
      style={{ color }}
      viewBox="0 0 28 20" fill="none"
    >
      <rect x="1" y="1" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="1"
        y="1"
        width={collapsed ? 7 : 13}
        height="18"
        rx="3"
        fill="currentColor"
        opacity="0.35"
      />
      <line
        x1={collapsed ? 8 : 14}
        y1="1"
        x2={collapsed ? 8 : 14}
        y2="19"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
      />
    </svg>
  );
}
