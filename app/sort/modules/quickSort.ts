import type { SortStep } from "./types";

export function quickSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  function quickSort(low: number, high: number) {
    if (low >= high) {
      if (low === high) {
        steps.push({ type: "markSorted", index: low });
      }
      return;
    }

    const pivotIdx = partition(low, high);
    steps.push({ type: "markSorted", index: pivotIdx });

    quickSort(low, pivotIdx - 1);
    quickSort(pivotIdx + 1, high);
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ type: "compare", i: j, j: high });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({ type: "swap", i, j });
        }
      }
    }

    i++;
    if (i !== high) {
      [arr[i], arr[high]] = [arr[high], arr[i]];
      steps.push({ type: "swap", i, j: high });
    }

    return i;
  }

  quickSort(0, arr.length - 1);
  steps.push({ type: "done" });

  return steps;
}
