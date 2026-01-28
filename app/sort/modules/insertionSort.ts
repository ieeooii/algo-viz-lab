import type { SortStep } from "./types";

export function insertionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ type: "markSorted", index: 0 });

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      steps.push({ type: "compare", i: j - 1, j });
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        steps.push({ type: "swap", i: j - 1, j });
        j--;
      } else {
        break;
      }
    }

    steps.push({ type: "markSorted", index: i });
  }

  steps.push({ type: "done" });

  return steps;
}
