import type { SortStep } from "./types";

export function selectionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({ type: "compare", i: minIdx, j });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ type: "swap", i, j: minIdx });
    }

    steps.push({ type: "markSorted", index: i });
  }

  steps.push({ type: "markSorted", index: n - 1 });
  steps.push({ type: "done" });

  return steps;
}
