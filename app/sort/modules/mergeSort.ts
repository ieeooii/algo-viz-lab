import type { SortStep } from "./types";

export function mergeSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  function mergeSort(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      const leftIdx = left + i;
      const rightIdx = mid + 1 + j;

      steps.push({ type: "compare", i: leftIdx, j: rightIdx });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
        steps.push({ type: "swap", i: k, j: rightIdx });
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }

  mergeSort(0, arr.length - 1);

  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: "markSorted", index: i });
  }

  steps.push({ type: "done" });

  return steps;
}
