import type { ThemeColors } from "@/lib/themes";

export function NewNotebookFooter({ t }: { t: ThemeColors }) {
  return (
    <div className="px-2 pt-1 pb-2">
      <div className="flex items-center gap-1.5 px-1.5 py-[5px] rounded-md">
        <svg
          aria-hidden="true"
          className="w-[10px] h-[10px] shrink-0"
          style={{ color: `${t.subtext}cc` }}
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 12 12"
        >
          <path d="M6 1v10M1 6h10" />
        </svg>
        <span className="text-[11px]" style={{ color: `${t.subtext}cc` }}>
          New Notebook
        </span>
      </div>
    </div>
  );
}
