export type NoteId =
  | "claude-first" | "debug-fetch" | "git-undo" | "dsa-bsearch" | "new-note";

export type CollectionId = "from-claude" | "work-notes" | "interview-prep";

export type Note = { id: string; label: string; opensAs?: NoteId; time?: string; };
export type Notebook = { id: string; label: string; notes: Note[]; };
export type Collection = {
  id: CollectionId;
  label: string;
  color: string;
  notebooks: Notebook[];
  defaultActive: NoteId;
  defaultExpanded: string;
};

export const MAX_UNTITLED = 3;

export const COLLECTIONS: Collection[] = [
  {
    id: "from-claude",
    label: "Infinity 2.0",
    color: "#eab308",
    defaultActive: "claude-first",
    defaultExpanded: "claude",
    notebooks: [
      {
        id: "claude",
        label: "Claude API",
        notes: [
          { id: "claude-first", label: "my first API call", opensAs: "claude-first", time: "now" },
          { id: "claude-stream", label: "streaming completions", time: "1h" },
          { id: "claude-tools", label: "tool use round-trip", time: "3h" },
          { id: "claude-vision", label: "vision / image input", time: "2d" },
        ],
      },
      {
        id: "prompts",
        label: "Prompts",
        notes: [
          { id: "p-style", label: "house style preamble", time: "1d" },
          { id: "p-coder", label: "coder mode prompt", time: "2d" },
          { id: "p-eval", label: "eval rubric v2", time: "5d" },
        ],
      },
      {
        id: "side",
        label: "Side Projects",
        notes: [
          { id: "s-rook", label: "rook landing copy", time: "4h" },
          { id: "s-icons", label: "icon ideas", time: "3d" },
          { id: "s-loops", label: "interactive loops", time: "1w" },
        ],
      },
      {
        id: "ideas",
        label: "Ideas",
        notes: [
          { id: "i-1", label: "tiny mac apps", time: "2d" },
          { id: "i-2", label: "rss reader for newsletters", time: "6d" },
        ],
      },
    ],
  },
  {
    id: "work-notes",
    label: "Work Notes",
    color: "#a78bfa",
    defaultActive: "debug-fetch",
    defaultExpanded: "debug",
    notebooks: [
      {
        id: "debug",
        label: "Debugging",
        notes: [
          { id: "debug-fetch", label: "next.js fetch fails in prod", opensAs: "debug-fetch", time: "now" },
          { id: "debug-loop", label: "redirect loop on /login", time: "2h" },
          { id: "debug-stripe", label: "stripe webhook 401", time: "1d" },
          { id: "debug-state", label: "state not updating", time: "3d" },
        ],
      },
      {
        id: "git",
        label: "Git Recipes",
        notes: [
          { id: "git-undo", label: "undo last commit", opensAs: "git-undo", time: "5h" },
          { id: "git-rewrite", label: "rewrite a branch", time: "1d" },
          { id: "git-rebase", label: "rebase, simply", time: "2d" },
          { id: "git-stash", label: "stash like a pro", time: "4d" },
        ],
      },
      {
        id: "cli",
        label: "CLI Quick Refs",
        notes: [
          { id: "cli-kube", label: "kubectl quick ref", time: "2d" },
          { id: "cli-docker", label: "docker commands", time: "3d" },
          { id: "cli-aws", label: "aws cli quick ref", time: "1w" },
        ],
      },
      {
        id: "backend",
        label: "Backend / API",
        notes: [
          { id: "be-1", label: "auth flow notes", time: "4d" },
          { id: "be-2", label: "rate limit patterns", time: "1w" },
        ],
      },
    ],
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    color: "#93c5fd",
    defaultActive: "dsa-bsearch",
    defaultExpanded: "dsa",
    notebooks: [
      {
        id: "dsa",
        label: "DSA Practice",
        notes: [
          { id: "dsa-bsearch", label: "Binary Search", opensAs: "dsa-bsearch", time: "now" },
          { id: "dsa-twoptr", label: "Two Pointers", time: "1d" },
          { id: "dsa-bfs", label: "BFS / DFS", time: "2d" },
        ],
      },
      {
        id: "sd",
        label: "System Design",
        notes: [
          { id: "sd-1", label: "Scalability", time: "2d" },
          { id: "sd-2", label: "Availability", time: "3d" },
          { id: "sd-3", label: "Consistency", time: "5d" },
        ],
      },
      {
        id: "templates",
        label: "Templates",
        notes: [
          { id: "tpl-1", label: "behavioral STAR", time: "1w" },
          { id: "tpl-2", label: "intro / outro lines", time: "2w" },
        ],
      },
    ],
  },
];
