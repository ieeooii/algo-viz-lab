export type Algorithm = "bubble";

export type SortStep =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "markSorted"; index: number }
  | { type: "done" };
