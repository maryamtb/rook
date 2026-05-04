"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { NotebookHeader } from "../notebook-header";
import { NoteItem } from "../note-item";
import { Shimmer } from "../shimmer";
import { NewNoteItem } from "./new-note-item";
import type { Collection, NoteId } from "./collection";
import { TRANSITION } from "./tokens";

export function NotebookList({
  t,
  collection,
  expanded,
  activeNote,
  untitledNotes,
  navigateHinted,
  onNotebookToggle,
  onNoteClick,
}: {
  t: ThemeColors;
  collection: Collection;
  expanded: Set<string>;
  activeNote: NoteId;
  untitledNotes: string[];
  navigateHinted: boolean;
  onNotebookToggle: (id: string) => void;
  onNoteClick: (opensAs?: NoteId) => void;
}) {
  const firstNotebookId = collection.notebooks[0]?.id;

  return (
    <div className="flex-1 px-2 pt-1 space-y-0.5 overflow-y-auto overflow-x-hidden">
      {collection.notebooks.map((nb, idx) => {
        const isExpanded = expanded.has(nb.id);
        const isFirst = nb.id === firstNotebookId;
        const totalCount = isFirst ? nb.notes.length + untitledNotes.length : nb.notes.length;
        const showHint = navigateHinted && idx === 1;
        return (
          <div key={nb.id}>
            <div className="relative">
              {showHint && !isExpanded && <Shimmer show radius={6} glowPad={4} />}
              <NotebookHeader
                t={t}
                label={nb.label}
                count={totalCount}
                expanded={isExpanded}
                onClick={() => onNotebookToggle(nb.id)}
              />
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={TRANSITION.expand}
                  className="ml-4 overflow-hidden"
                >
                  <div className="space-y-0.5 pt-0.5">
                    {isFirst && untitledNotes.map((id, i) => (
                      <NewNoteItem
                        key={id}
                        t={t}
                        active={activeNote === "new-note" && i === untitledNotes.length - 1}
                      />
                    ))}
                    {nb.notes.map((n) => (
                      <NoteItem
                        key={n.id}
                        t={t}
                        label={n.label}
                        active={!!n.opensAs && activeNote === n.opensAs}
                        opensable={!!n.opensAs}
                        onClick={() => onNoteClick(n.opensAs)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
