"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ThemeColors } from "@/lib/themes";
import { TitleBar } from "../title-bar";
import { ActiveNoteEditor } from "./active-note-editor";
import { InteractiveSidebar } from "./sidebar";
import { LAYOUT, SIDEBAR_BG, TRANSITION } from "./tokens";
import { useInteractiveRook } from "./use-interactive-rook";

export function InteractiveRook({ theme: t }: { theme: ThemeColors }) {
  const {
    containerRef,
    collection,
    sidebarCollapsed,
    collectionMenuOpen,
    untitledNotes,
    activeNote,
    expanded,
    touched,
    onToggle,
    onCollectionClick,
    onCollectionSelect,
    onNewNote,
    onNotebookToggle,
    onNoteClick,
  } = useInteractiveRook();

  const isLight = t.name === "Light" || t.name === "Paper";

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: LAYOUT.mockupMaxWidth }} role="presentation">
      <div
        ref={containerRef}
        className="relative rounded-xl shadow-2xl overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: SIDEBAR_BG.outer,
          border: `1px solid ${t.border}`,
          filter: isLight ? "brightness(0.92)" : undefined,
        }}
      >
        <TitleBar
          t={t}
          onToggleClick={onToggle}
          onNewNoteClick={onNewNote}
          toggleHinted={!touched.toggle}
          newNoteHinted={!touched.newnote}
          sidebarCollapsed={sidebarCollapsed}
          showMcp
          bg={SIDEBAR_BG.outer}
        />

        <div className="relative flex" style={{ minHeight: LAYOUT.mockupMinHeight }}>
          <motion.div
            initial={false}
            animate={{ width: sidebarCollapsed ? 0 : LAYOUT.sidebarWrapperWidth, opacity: sidebarCollapsed ? 0 : 1 }}
            transition={{ width: TRANSITION.slide, opacity: TRANSITION.fadeShort }}
            className="overflow-hidden shrink-0"
          >
            <div className="pb-2 pl-[7px] pr-[7px] h-full" style={{ width: LAYOUT.sidebarWrapperWidth }}>
              <InteractiveSidebar
                t={t}
                collection={collection}
                collectionMenuOpen={collectionMenuOpen}
                collectionHinted={!touched.collection}
                navigateHinted={!touched.navigate}
                untitledNotes={untitledNotes}
                activeNote={activeNote}
                expanded={expanded}
                onCollectionClick={onCollectionClick}
                onCollectionSelect={onCollectionSelect}
                onNotebookToggle={onNotebookToggle}
                onNoteClick={onNoteClick}
              />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0 flex flex-col pt-3.5 pr-3.5 pb-3.5">
          <div
            className="flex-1 flex flex-col min-w-0 relative overflow-hidden rounded-[14px] transition-colors duration-500"
            style={{
              backgroundColor: t.bg,
              boxShadow: isLight ? "0 3px 12px rgba(0,0,0,0.08)" : "0 4px 16px rgba(0,0,0,0.28)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeNote === "new-note" ? `new-note-${untitledNotes[untitledNotes.length - 1]}` : activeNote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={TRANSITION.fade}
              >
                <ActiveNoteEditor active={activeNote} t={t} />
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
