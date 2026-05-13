export const MCP_ACCENT = "rgb(140, 200, 192)";

export function McpMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      style={{ color: MCP_ACCENT, opacity: 0.9 }}
      aria-hidden="true"
    >
      <path d="M18 84.85L85.88 16.97c9.37-9.37 24.57-9.37 33.94 0 9.37 9.37 9.37 24.57 0 33.94L68.56 102.18" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
      <path d="M69.27 101.47L119.82 50.91c9.37-9.37 24.57-9.37 33.94 0l.36.35c9.37 9.37 9.37 24.57 0 33.94L92.72 146.6c-3.12 3.12-3.12 8.19 0 11.31l12.61 12.61" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
      <path d="M102.85 33.94L52.65 84.15c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l50.21-50.2" stroke="currentColor" strokeWidth={16} strokeLinecap="round" />
    </svg>
  );
}
