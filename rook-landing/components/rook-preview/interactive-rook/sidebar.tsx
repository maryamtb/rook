"use client";

import { AnimatePresence } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { NewNotebookFooter } from "../notebook-footer";
import { SearchBar } from "../search-bar";
import { CollectionDropdown, CollectionPill, type Collection, type CollectionId, type NoteId } from "./collection";
import { NotebookList } from "./notebook-list";
import { LAYOUT, SIDEBAR_BG } from "./tokens";

export function InteractiveSidebar({
  t,
  collection,
  collectionMenuOpen,
  collectionHinted,
  navigateHinted,
  untitledNotes,
  activeNote,
  expanded,
  onCollectionClick,
  onCollectionSelect,
  onNotebookToggle,
  onNoteClick,
}: {
  t: ThemeColors;
  collection: Collection;
  collectionMenuOpen: boolean;
  collectionHinted: boolean;
  navigateHinted: boolean;
  untitledNotes: string[];
  activeNote: NoteId;
  expanded: Set<string>;
  onCollectionClick: () => void;
  onCollectionSelect: (id: CollectionId) => void;
  onNotebookToggle: (id: string) => void;
  onNoteClick: (opensAs?: NoteId) => void;
}) {
  return (
    <div
      className="shrink-0 hidden sm:flex sm:flex-col h-full rounded-lg overflow-hidden"
      style={{ width: LAYOUT.sidebarWidth, backgroundColor: SIDEBAR_BG.outer }}
    >
      <div
        style={{ backgroundColor: SIDEBAR_BG.inner }}
        className="flex-1 flex flex-col"
      >
        <div className="px-2 pt-4 pb-1 relative">
          <CollectionPill
            t={t}
            collection={collection}
            open={collectionMenuOpen}
            hinted={collectionHinted}
            onClick={onCollectionClick}
          />
          <AnimatePresence>
            {collectionMenuOpen && (
              <CollectionDropdown
                t={t}
                activeId={collection.id}
                onSelect={onCollectionSelect}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="px-2 pt-1 pb-1.5">
          <SearchBar t={t} />
        </div>

        <NotebookList
          t={t}
          collection={collection}
          expanded={expanded}
          activeNote={activeNote}
          untitledNotes={untitledNotes}
          navigateHinted={navigateHinted}
          onNotebookToggle={onNotebookToggle}
          onNoteClick={onNoteClick}
        />

        <NewNotebookFooter t={t} />
      </div>
    </div>
  );
}
