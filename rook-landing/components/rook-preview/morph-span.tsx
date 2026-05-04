export function MorphSpan({ color, children }: { color: string; children: React.ReactNode; }) {
  return (
    <span className="transition-colors duration-500" style={{ color }}>
      {children}
    </span>
  );
}
