import type { SortStep } from "./types";

export function heapSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      steps.push({ type: "compare", i: left, j: largest });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      steps.push({ type: "compare", i: right, j: largest });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      steps.push({ type: "swap", i: root, j: largest });
      heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({ type: "swap", i: 0, j: i });
    steps.push({ type: "markSorted", index: i });
    heapify(i, 0);
  }

  steps.push({ type: "markSorted", index: 0 });
  steps.push({ type: "done" });

  return steps;
}
