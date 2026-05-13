import { McpMark, MCP_ACCENT } from "@/components/mcp-mark";

export function McpBetaPill({ textColor }: { textColor: string }) {
  return (
    <div
      className="flex items-center gap-[7px] px-3 rounded-full"
      style={{
        height: 24,
        backgroundColor: "rgba(68, 143, 133, 0.1)",
      }}
    >
      <McpMark />
      <span className="text-[12px] font-medium" style={{ color: textColor }}>
        MCP
      </span>
      <span
        className="text-[10px] font-semibold tracking-[0.04em]"
        style={{ color: MCP_ACCENT }}
      >
        BETA
      </span>
    </div>
  );
}
