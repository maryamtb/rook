export type MockupVariant = "auth" | "dsa" | "aws" | "git" | "debug" | "claude";

export type VariantNote = { label: string; active?: boolean; };
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
        { label: "kubectl quick ref", active: true },
        { label: "Docker commands" },
        { label: "Git workflows" },
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
        { label: "aws cli quick ref", active: true },
        { label: "kubectl quick ref" },
        { label: "Docker commands" },
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
        { label: "Binary Search", active: true },
        { label: "Two Pointers" },
        { label: "BFS / DFS" },
      ],
    },
    secondary: [
      {
        label: "System Design",
        count: 5,
        expanded: true,
        notes: [
          { label: "Scalability" },
          { label: "Availability" },
          { label: "Consistency" },
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
        { label: "undo last commit", active: true },
        { label: "rewrite a branch" },
        { label: "rebase, simply" },
        { label: "stash like a pro" },
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
        { label: "next.js fetch fails in prod", active: true },
        { label: "redirect loop on /login" },
        { label: "stripe webhook 401" },
        { label: "state not updating" },
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
        { label: "my first API call", active: true },
        { label: "streaming completions" },
        { label: "tool use round-trip" },
        { label: "vision / image input" },
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
