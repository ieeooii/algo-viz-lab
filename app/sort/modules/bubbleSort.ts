import type { SortStep } from "./types";

export function bubbleSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      steps.push({ type: "compare", i, j: i + 1 });
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        steps.push({ type: "swap", i, j: i + 1 });
      }
    }
    steps.push({ type: "markSorted", index: end });
  }
  steps.push({ type: "markSorted", index: 0 });
  steps.push({ type: "done" });

  return steps;
}
