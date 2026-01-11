import type { Algorithm } from "../../modules/types";

export type SortingVisualizerContextValue = {
  algorithm: Algorithm;
  size: number;
  speed: number;
  values: number[];
  activePair: [number, number] | null;
  sortedSet: Set<number>;
  isRunning: boolean;
  comparisons: number;
  swaps: number;
  delayMs: number;
  maxValue: number;

  setAlgorithm: (algorithm: Algorithm) => void;
  setSize: (size: number) => void;
  setSpeed: (speed: number) => void;
  generate: () => void;
  start: () => void;
  pause: () => void;

  isActive: (index: number) => boolean;
};
