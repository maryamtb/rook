export type MockupVariant = "auth" | "dsa" | "aws" | "git" | "debug" | "claude";

export type VariantNote = { label: string; active?: boolean; time?: string; };
export type VariantNotebook = {
  label: string;
  count: number;
  expanded?: boolean;
  notes?: VariantNote[];
};
export type VariantData = {
  collection: string;
  active: VariantNotebook;
  secondary: VariantNotebook[];
};

const DEFAULT_SECONDARY: VariantNotebook[] = [
  { label: "Backend / API", count: 4 },
  { label: "Frontend", count: 2 },
  { label: "Utilities", count: 5 },
  { label: "TIL", count: 3 },
];

export const MOCKUP_VARIANTS: Record<MockupVariant, VariantData> = {
  auth: {
    collection: "work notes",
    active: {
      label: "CLI Quick Refs",
      count: 3,
      notes: [
        { label: "kubectl quick ref", active: true, time: "now" },
        { label: "Docker commands", time: "2d" },
        { label: "Git workflows", time: "4d" },
      ],
    },
    secondary: DEFAULT_SECONDARY,
  },
  aws: {
    collection: "work notes",
    active: {
      label: "CLI Quick Refs",
      count: 3,
      notes: [
        { label: "aws cli quick ref", active: true, time: "now" },
        { label: "kubectl quick ref", time: "2d" },
        { label: "Docker commands", time: "5d" },
      ],
    },
    secondary: DEFAULT_SECONDARY,
  },
  dsa: {
    collection: "interview prep",
    active: {
      label: "DSA Practice",
      count: 3,
      notes: [
        { label: "Binary Search", active: true, time: "now" },
        { label: "Two Pointers", time: "1d" },
        { label: "BFS / DFS", time: "2d" },
      ],
    },
    secondary: [
      {
        label: "System Design",
        count: 5,
        expanded: true,
        notes: [
          { label: "Scalability", time: "3d" },
          { label: "Availability", time: "4d" },
          { label: "Consistency", time: "1w" },
        ],
      },
      { label: "Patterns", count: 8 },
      { label: "Templates", count: 3 },
      { label: "Mock Interviews", count: 2 },
    ],
  },
  git: {
    collection: "work notes",
    active: {
      label: "Git Recipes",
      count: 4,
      notes: [
        { label: "undo last commit", active: true, time: "now" },
        { label: "rewrite a branch", time: "1d" },
        { label: "rebase, simply", time: "2d" },
        { label: "stash like a pro", time: "5d" },
      ],
    },
    secondary: [
      { label: "Shell tricks", count: 6 },
      { label: "Docker", count: 3 },
      { label: "Recipes", count: 5 },
      { label: "TIL", count: 9 },
    ],
  },
  debug: {
    collection: "side project",
    active: {
      label: "Debugging",
      count: 4,
      notes: [
        { label: "next.js fetch fails in prod", active: true, time: "now" },
        { label: "redirect loop on /login", time: "2h" },
        { label: "stripe webhook 401", time: "1d" },
        { label: "state not updating", time: "3d" },
      ],
    },
    secondary: [
      { label: "Domains", count: 4 },
      { label: "Deploys", count: 3 },
      { label: "Wishlist", count: 7 },
      { label: "Done", count: 12 },
    ],
  },
  claude: {
    collection: "Infinity 2.0",
    active: {
      label: "Claude API",
      count: 4,
      notes: [
        { label: "my first API call", active: true, time: "now" },
        { label: "streaming completions", time: "1h" },
        { label: "tool use round-trip", time: "3h" },
        { label: "vision / image input", time: "2d" },
      ],
    },
    secondary: [
      { label: "Prompts", count: 12 },
      { label: "Side Projects", count: 4 },
      { label: "To Investigate", count: 7 },
      { label: "TIL", count: 9 },
    ],
  },
};
