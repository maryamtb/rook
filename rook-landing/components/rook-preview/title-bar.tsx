"use client";

import type { ThemeColors } from "@/lib/themes";
import { TrafficLights } from "./traffic-lights";
import { SidebarToggleButton } from "./sidebar-toggle-button";
import { NewNoteButton } from "./new-note-button";
import { McpMark } from "@/components/mcp-mark";

export function TitleBar({
  t,
  onToggleClick,
  onNewNoteClick,
  toggleHinted,
  newNoteHinted,
  sidebarCollapsed,
  showMcp,
  bg,
}: {
  t: ThemeColors;
  onToggleClick?: () => void;
  onNewNoteClick?: () => void;
  toggleHinted?: boolean;
  newNoteHinted?: boolean;
  sidebarCollapsed?: boolean;
  showMcp?: boolean;
  bg?: string;
}) {
  return (
    <div
      className="flex items-center px-4 h-10 transition-colors duration-500"
      style={{ backgroundColor: bg ?? t.panel }}
    >
      <TrafficLights />

      <SidebarToggleButton
        t={t}
        onClick={onToggleClick}
        hinted={toggleHinted}
        collapsed={sidebarCollapsed}
      />

      <div className="flex-1" />

      {showMcp && (
        <div className="mr-3 flex items-center" data-mcp-pill>
          <McpMark size={18} />
        </div>
      )}

      <NewNoteButton t={t} onClick={onNewNoteClick} hinted={newNoteHinted} />
    </div>
  );
}
