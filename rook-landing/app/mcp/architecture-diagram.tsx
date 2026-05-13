export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 720 150"
      className="w-full h-auto p-5"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="arch-title arch-desc"
    >
      <title id="arch-title">Rook MCP architecture</title>
      <desc id="arch-desc">
        An AI tool talks to rook-mcp over stdio. rook-mcp runs sandboxed and
        appends to a shared inbox on disk. Rook reads from the inbox.
      </desc>
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.55" />
        </marker>
      </defs>

      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        {/* AI tool box */}
        <rect x="0" y="20" width="140" height="60" rx="6"
              fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <text x="70" y="46" textAnchor="middle" fontSize="13" fill="currentColor">AI tool</text>
        <text x="70" y="64" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.55">client</text>
        <text x="70" y="105" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">Claude Code, Cursor,</text>
        <text x="70" y="120" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">Gemini, Claude Desktop</text>

        {/* stdio arrow (bidirectional) */}
        <line x1="146" y1="50" x2="184" y2="50"
              stroke="currentColor" strokeOpacity="0.5"
              markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
        <text x="165" y="32" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">stdio</text>
        <text x="165" y="43" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.45">(JSON-RPC)</text>

        {/* rook-mcp box (sandboxed, sage accent) */}
        <rect x="190" y="20" width="140" height="60" rx="6"
              fill="rgba(140, 200, 192, 0.06)"
              stroke="rgb(140, 200, 192)" strokeOpacity="0.6"
              strokeDasharray="4 2" />
        <text x="260" y="46" textAnchor="middle" fontSize="13" fill="currentColor">rook-mcp</text>
        <text x="260" y="64" textAnchor="middle" fontSize="11" fill="rgb(140, 200, 192)">sandboxed</text>
        <text x="260" y="105" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">appends to</text>
        <text x="260" y="120" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">inbox</text>

        {/* write arrow */}
        <line x1="336" y1="50" x2="374" y2="50"
              stroke="currentColor" strokeOpacity="0.5"
              markerEnd="url(#arrowhead)" />
        <text x="355" y="40" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">write</text>

        {/* shared inbox box */}
        <rect x="380" y="20" width="140" height="60" rx="6"
              fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <text x="450" y="46" textAnchor="middle" fontSize="13" fill="currentColor">shared inbox</text>
        <text x="450" y="64" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.55">on disk</text>
        <text x="450" y="105" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">app group</text>
        <text x="450" y="120" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">container</text>

        {/* read arrow */}
        <line x1="526" y1="50" x2="564" y2="50"
              stroke="currentColor" strokeOpacity="0.5"
              markerEnd="url(#arrowhead)" />
        <text x="545" y="40" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">read</text>

        {/* Rook box */}
        <rect x="570" y="20" width="140" height="60" rx="6"
              fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <text x="640" y="46" textAnchor="middle" fontSize="13" fill="currentColor">Rook</text>
        <text x="640" y="64" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.55">notes app</text>
      </g>
    </svg>
  );
}
