"use client";

import { useEffect, useRef, useState } from "react";
import { COLLECTIONS, MAX_UNTITLED, type CollectionId, type NoteId } from "./collection";

type Touched = { toggle: boolean; collection: boolean; newnote: boolean; navigate: boolean };

export function useInteractiveRook() {
  const [activeCollection, setActiveCollection] = useState<CollectionId>("from-claude");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
  const [untitledNotes, setUntitledNotes] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<NoteId>("claude-first");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["claude"]));
  const [touched, setTouched] = useState<Touched>({
    toggle: false, collection: false, newnote: false, navigate: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const collection = COLLECTIONS.find((c) => c.id === activeCollection) ?? COLLECTIONS[0];

  const onToggle = () => {
    setSidebarCollapsed((s) => !s);
    setTouched((p) => ({ ...p, toggle: true }));
  };

  const onCollectionClick = () => {
    setCollectionMenuOpen((s) => !s);
    setTouched((p) => ({ ...p, collection: true }));
  };

  const onCollectionSelect = (id: CollectionId) => {
    const next = COLLECTIONS.find((c) => c.id === id);
    if (!next) return;
    setActiveCollection(id);
    setActiveNote(next.defaultActive);
    setExpanded(new Set([next.defaultExpanded]));
    setUntitledNotes([]);
    setCollectionMenuOpen(false);
  };

  const onNewNote = () => {
    const id = `untitled-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setUntitledNotes((arr) => {
      const next = [...arr, id];
      return next.length > MAX_UNTITLED ? next.slice(next.length - MAX_UNTITLED) : next;
    });
    setActiveNote("new-note");
    setExpanded((prev) => {
      const next = new Set(prev);
      next.add(collection.notebooks[0].id);
      return next;
    });
    setTouched((p) => ({ ...p, newnote: true }));
  };

  const onNotebookToggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setTouched((p) => ({ ...p, navigate: true }));
  };

  const onNoteClick = (opensAs?: NoteId) => {
    if (!opensAs) return;
    setActiveNote(opensAs);
    setUntitledNotes([]);
    setTouched((p) => ({ ...p, navigate: true }));
  };

  useEffect(() => {
    if (!collectionMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      if (!containerRef.current?.contains(tgt)) return;
      if (tgt.closest("[data-collection-menu]") || tgt.closest("[data-collection-trigger]")) return;
      setCollectionMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [collectionMenuOpen]);

  return {
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
  };
}
