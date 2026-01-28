import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bubbleSortSteps } from "../../modules/bubbleSort";
import { selectionSortSteps } from "../../modules/selectionSort";
import { insertionSortSteps } from "../../modules/insertionSort";
import { mergeSortSteps } from "../../modules/mergeSort";
import { quickSortSteps } from "../../modules/quickSort";
import { heapSortSteps } from "../../modules/heapSort";
import type { Algorithm, SortStep } from "../../modules/types";
import { makeRandomArray } from "../../utils/randomArray";
import { clamp } from "../../utils/math";
import type { SortingVisualizerContextValue } from "./context";

export function useSortingVisualizerController(): SortingVisualizerContextValue {
  const [algorithm, setAlgorithmState] = useState<Algorithm>("bubble");
  const [size, setSizeState] = useState(48);
  const [speed, setSpeed] = useState(55); // 1..100 (higher = faster)

  const [values, setValues] = useState<number[]>(() => makeRandomArray(48, 100));
  const [activePair, setActivePair] = useState<[number, number] | null>(null);
  const [sortedSet, setSortedSet] = useState<Set<number>>(() => new Set());

  const [isRunning, setIsRunning] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const stepsRef = useRef<SortStep[]>([]);
  const stepIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const delayMs = useMemo(() => {
    // map 1..100 to 220..12ms
    const t = clamp(speed, 1, 100);
    return Math.round(220 - (t / 100) * 208);
  }, [speed]);

  const cancelLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const resetStats = useCallback(() => {
    setComparisons(0);
    setSwaps(0);
  }, []);

  const resetHighlights = useCallback(() => {
    setActivePair(null);
    setSortedSet(new Set());
  }, []);

  const buildSteps = useCallback(
    (current: number[]) => {
      switch (algorithm) {
        case "bubble":
          return bubbleSortSteps(current);
        case "selection":
          return selectionSortSteps(current);
        case "insertion":
          return insertionSortSteps(current);
        case "merge":
          return mergeSortSteps(current);
        case "quick":
          return quickSortSteps(current);
        case "heap":
          return heapSortSteps(current);
        default:
          return bubbleSortSteps(current);
      }
    },
    [algorithm],
  );

  const regenerate = useCallback(
    (nextSize: number) => {
      setIsRunning(false);
      cancelLoop();
      resetStats();
      resetHighlights();

      const next = makeRandomArray(nextSize, 100);
      setValues(next);
      stepsRef.current = [];
      stepIndexRef.current = 0;
    },
    [cancelLoop, resetHighlights, resetStats],
  );

  const generate = useCallback(() => {
    regenerate(size);
  }, [regenerate, size]);

  const setSize = useCallback(
    (nextSize: number) => {
      setSizeState(nextSize);
      regenerate(nextSize);
    },
    [regenerate],
  );

  const setAlgorithm = useCallback(
    (nextAlgorithm: Algorithm) => {
      setAlgorithmState(nextAlgorithm);
      regenerate(size);
    },
    [regenerate, size],
  );

  const start = useCallback(() => {
    if (isRunning) return;

    resetStats();
    resetHighlights();

    stepsRef.current = buildSteps(values);
    stepIndexRef.current = 0;
    lastTickRef.current = performance.now();
    setIsRunning(true);
  }, [buildSteps, isRunning, resetHighlights, resetStats, values]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stepOnce = useCallback(() => {
    const steps = stepsRef.current;
    const idx = stepIndexRef.current;

    if (!steps.length || idx >= steps.length) {
      setIsRunning(false);
      return;
    }

    const step = steps[idx];
    stepIndexRef.current = idx + 1;

    if (step.type === "compare") {
      setActivePair([step.i, step.j]);
      setComparisons((c) => c + 1);
      return;
    }

    if (step.type === "swap") {
      setValues((prev) => {
        const next = [...prev];
        [next[step.i], next[step.j]] = [next[step.j], next[step.i]];
        return next;
      });
      setSwaps((s) => s + 1);
      return;
    }

    if (step.type === "markSorted") {
      setSortedSet((prev) => {
        const next = new Set(prev);
        next.add(step.index);
        return next;
      });
      return;
    }

    if (step.type === "done") {
      setActivePair(null);
      setIsRunning(false);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      cancelLoop();
      return;
    }

    const loop = (now: number) => {
      const elapsed = now - lastTickRef.current;
      if (elapsed >= delayMs) {
        lastTickRef.current = now;
        stepOnce();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return cancelLoop;
  }, [cancelLoop, delayMs, isRunning, stepOnce]);

  const maxValue = useMemo(() => Math.max(...values, 1), [values]);

  const isActive = useCallback(
    (index: number) =>
      activePair ? index === activePair[0] || index === activePair[1] : false,
    [activePair],
  );

  return {
    algorithm,
    size,
    speed,
    values,
    activePair,
    sortedSet,
    isRunning,
    comparisons,
    swaps,
    delayMs,
    maxValue,
    setAlgorithm,
    setSize,
    setSpeed,
    generate,
    start,
    pause,
    isActive,
  };
}
