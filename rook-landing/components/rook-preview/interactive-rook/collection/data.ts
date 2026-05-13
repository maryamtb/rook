export type NoteId =
  | "claude-first" | "debug-fetch" | "git-undo" | "dsa-bsearch" | "new-note";

export type CollectionId = "from-claude" | "work-notes" | "interview-prep";

export type Note = { id: string; label: string; opensAs?: NoteId; };
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
          { id: "claude-first", label: "my first API call", opensAs: "claude-first" },
          { id: "claude-stream", label: "streaming completions" },
          { id: "claude-tools", label: "tool use round-trip" },
          { id: "claude-vision", label: "vision / image input" },
        ],
      },
      {
        id: "prompts",
        label: "Prompts",
        notes: [
          { id: "p-style", label: "house style preamble" },
          { id: "p-coder", label: "coder mode prompt" },
          { id: "p-eval", label: "eval rubric v2" },
        ],
      },
      {
        id: "side",
        label: "Side Projects",
        notes: [
          { id: "s-rook", label: "rook landing copy" },
          { id: "s-icons", label: "icon ideas" },
          { id: "s-loops", label: "interactive loops" },
        ],
      },
      {
        id: "ideas",
        label: "Ideas",
        notes: [
          { id: "i-1", label: "tiny mac apps" },
          { id: "i-2", label: "rss reader for newsletters" },
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
          { id: "debug-fetch", label: "next.js fetch fails in prod", opensAs: "debug-fetch" },
          { id: "debug-loop", label: "redirect loop on /login" },
          { id: "debug-stripe", label: "stripe webhook 401" },
          { id: "debug-state", label: "state not updating" },
        ],
      },
      {
        id: "git",
        label: "Git Recipes",
        notes: [
          { id: "git-undo", label: "undo last commit", opensAs: "git-undo" },
          { id: "git-rewrite", label: "rewrite a branch" },
          { id: "git-rebase", label: "rebase, simply" },
          { id: "git-stash", label: "stash like a pro" },
        ],
      },
      {
        id: "cli",
        label: "CLI Quick Refs",
        notes: [
          { id: "cli-kube", label: "kubectl quick ref" },
          { id: "cli-docker", label: "docker commands" },
          { id: "cli-aws", label: "aws cli quick ref" },
        ],
      },
      {
        id: "backend",
        label: "Backend / API",
        notes: [
          { id: "be-1", label: "auth flow notes" },
          { id: "be-2", label: "rate limit patterns" },
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
          { id: "dsa-bsearch", label: "Binary Search", opensAs: "dsa-bsearch" },
          { id: "dsa-twoptr", label: "Two Pointers" },
          { id: "dsa-bfs", label: "BFS / DFS" },
        ],
      },
      {
        id: "sd",
        label: "System Design",
        notes: [
          { id: "sd-1", label: "Scalability" },
          { id: "sd-2", label: "Availability" },
          { id: "sd-3", label: "Consistency" },
        ],
      },
      {
        id: "templates",
        label: "Templates",
        notes: [
          { id: "tpl-1", label: "behavioral STAR" },
          { id: "tpl-2", label: "intro / outro lines" },
        ],
      },
    ],
  },
];
