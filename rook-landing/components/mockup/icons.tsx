export function SidebarToggleIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-[15px] h-[15px] transition-colors duration-500"
      style={{ color }}
      viewBox="0 0 28 20" fill="none"
    >
      <rect x="1" y="1" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="1" width="9.5" height="18" rx="3" fill="currentColor" opacity="0.35" />
      <line x1="10.5" y1="1" x2="10.5" y2="19" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export function MockIcon({ name, color, size = 12 }: { name: string; color: string; size?: number }) {
  const s = `${size}px`;
  switch (name) {
    case "curlybraces":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M5.5 2C4 2 3 3 3 4.5V6c0 1-1 2-1 2s1 1 1 2v1.5C3 13 4 14 5.5 14" />
          <path d="M10.5 2C12 2 13 3 13 4.5V6c0 1 1 2 1 2s-1 1-1 2v1.5c0 1.5-1 2.5-2.5 2.5" />
        </svg>
      );
    case "checklist":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none">
          <rect x="1" y="2" width="5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2.5 4l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="8" y="3" width="7" height="1.5" rx="0.5" fill="currentColor" />
          <rect x="1" y="9" width="5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8" y="10" width="7" height="1.5" rx="0.5" fill="currentColor" />
        </svg>
      );
    case "list.bullet":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="currentColor">
          <circle cx="2" cy="4" r="1.2" /><circle cx="2" cy="8" r="1.2" /><circle cx="2" cy="12" r="1.2" />
          <rect x="5" y="3.2" width="10" height="1.6" rx="0.5" />
          <rect x="5" y="7.2" width="10" height="1.6" rx="0.5" />
          <rect x="5" y="11.2" width="10" height="1.6" rx="0.5" />
        </svg>
      );
    case "list.number":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="currentColor">
          <text x="0.8" y="5.5" fontSize="5" fontWeight="700" fontFamily="system-ui">1</text>
          <text x="0.8" y="9.5" fontSize="5" fontWeight="700" fontFamily="system-ui">2</text>
          <text x="0.8" y="13.5" fontSize="5" fontWeight="700" fontFamily="system-ui">3</text>
          <rect x="5" y="3.2" width="10" height="1.6" rx="0.5" />
          <rect x="5" y="7.2" width="10" height="1.6" rx="0.5" />
          <rect x="5" y="11.2" width="10" height="1.6" rx="0.5" />
        </svg>
      );
    case "h.square":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
          <path d="M5.5 5v6M10.5 5v6M5.5 8h5" />
        </svg>
      );
    case "text.alignleft":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="2" width="14" height="1.5" rx="0.5" />
          <rect x="1" y="5.5" width="10" height="1.5" rx="0.5" />
          <rect x="1" y="9" width="14" height="1.5" rx="0.5" />
          <rect x="1" y="12.5" width="8" height="1.5" rx="0.5" />
        </svg>
      );
    case "link":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M7 9l2-2" />
          <path d="M9.5 4.5l1-1a2.5 2.5 0 013.5 3.5l-1 1-1.5 1.5a2.5 2.5 0 01-3.5 0" />
          <path d="M6.5 11.5l-1 1a2.5 2.5 0 01-3.5-3.5l1-1L4.5 6.5a2.5 2.5 0 013.5 0" />
        </svg>
      );
    case "strikethrough":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5.3 5.5c0-1.4 1.2-2.5 2.7-2.5 1.5 0 2.7.8 2.9 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M10.7 10.5c0 1.4-1.2 2.5-2.7 2.5-1.5 0-2.7-.8-2.9-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      );
    case "highlighter":
      return (
        <svg width={s} height={s} style={{ color }} viewBox="0 0 16 16" fill="none">
          <path d="M9.5 2.5l4 4-6 6-1.5.5-.5-.5-1 1H2l1.5-2-.5-.5.5-1.5 6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="1" y1="15" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    default:
      return <div style={{ width: s, height: s }} />;
  }
}
