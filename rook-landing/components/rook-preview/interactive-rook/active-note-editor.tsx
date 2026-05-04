"use client";

import type { ThemeColors } from "@/lib/themes";
import {
  ClaudeStaticEditor,
  DebugAnimatedEditor,
  DsaAnimatedEditor,
  GitAnimatedEditor,
} from "../editors";
import { NewNoteInteractive } from "./new-note";
import type { NoteId } from "./collection";

export function ActiveNoteEditor({ active, t }: { active: NoteId; t: ThemeColors }) {
  switch (active) {
    case "claude-first": return <ClaudeStaticEditor t={t} />;
    case "debug-fetch": return <DebugAnimatedEditor t={t} />;
    case "git-undo": return <GitAnimatedEditor t={t} />;
    case "dsa-bsearch": return <DsaAnimatedEditor t={t} />;
    case "new-note": return <NewNoteInteractive t={t} />;
  }
}
