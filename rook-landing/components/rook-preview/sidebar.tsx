import type { ThemeColors } from "@/lib/themes";
import { NewNotebookFooter } from "./notebook-footer";
import { NotebookHeader } from "./notebook-header";
import { NoteItem } from "./note-item";
import { SearchBar } from "./search-bar";
import { CollectionSelector } from "./collection-selector";
import { MOCKUP_VARIANTS, type MockupVariant } from "./variants";

export function Sidebar({ t, variant }: { t: ThemeColors; variant: MockupVariant }) {
  const data = MOCKUP_VARIANTS[variant];

  return (
    <div
      className="w-[210px] shrink-0 hidden sm:flex sm:flex-col h-full rounded-lg overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: t.panel }}
    >
      <div
        style={{ backgroundColor: t.panel }}
        className="flex-1 flex flex-col"
      >
        <div className="px-2 pt-4 pb-1">
          <CollectionSelector t={t} label={data.collection} />
        </div>

        <div className="px-2 pt-1 pb-1.5">
          <SearchBar t={t} />
        </div>

        <div className="flex-1 px-2 pt-1 space-y-0.5 overflow-hidden">
          <NotebookHeader t={t} label={data.active.label} count={data.active.count} active />
          <div className="ml-4 space-y-0.5">
            {data.active.notes?.map((note) => (
              <NoteItem key={note.label} t={t} label={note.label} active={note.active} time={note.time} />
            ))}
          </div>

          {data.secondary.map((nb) => (
            <div key={nb.label}>
              <NotebookHeader t={t} label={nb.label} count={nb.count} expanded={nb.expanded} />
              {nb.expanded && nb.notes && (
                <div className="ml-4 space-y-0.5">
                  {nb.notes.map((note) => (
                    <NoteItem key={note.label} t={t} label={note.label} active={note.active} time={note.time} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <NewNotebookFooter t={t} />
      </div>
    </div>
  );
}
