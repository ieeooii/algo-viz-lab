import { clamp } from "./math";

export function makeRandomArray(length: number, maxValue: number) {
  const arr = Array.from({ length }, () => 1 + Math.floor(Math.random() * maxValue));
  // avoid all-equal visuals
  if (arr.every((v) => v === arr[0])) {
    arr[0] = clamp(arr[0] + 1, 1, maxValue);
  }
  return arr;
}
