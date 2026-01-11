"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as styles from "./sort.css";

type Algorithm = "bubble";

type SortStep =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "markSorted"; index: number }
  | { type: "done" };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function makeRandomArray(length: number, maxValue: number) {
  const arr = Array.from({ length }, () => 1 + Math.floor(Math.random() * maxValue));
  // avoid all-equal visuals
  if (arr.every((v) => v === arr[0])) {
    arr[0] = clamp(arr[0] + 1, 1, maxValue);
  }
  return arr;
}

function bubbleSortSteps(input: number[]): SortStep[] {
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

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [size, setSize] = useState(48);
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

  function resetStats() {
    setComparisons(0);
    setSwaps(0);
  }

  function resetHighlights() {
    setActivePair(null);
    setSortedSet(new Set());
  }

  function generate() {
    setIsRunning(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    resetStats();
    resetHighlights();

    const next = makeRandomArray(size, 100);
    setValues(next);
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }

  function buildSteps(current: number[]) {
    switch (algorithm) {
      case "bubble":
        return bubbleSortSteps(current);
      default:
        return bubbleSortSteps(current);
    }
  }

  function start() {
    if (isRunning) return;

    resetStats();
    resetHighlights();

    stepsRef.current = buildSteps(values);
    stepIndexRef.current = 0;
    lastTickRef.current = performance.now();
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function stepOnce() {
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
  }

  useEffect(() => {
    if (!isRunning) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
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

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, delayMs]);

  useEffect(() => {
    // if size changes, regenerate a fresh array
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, algorithm]);

  const max = useMemo(() => Math.max(...values, 1), [values]);

  const isActive = (index: number) =>
    activePair ? index === activePair[0] || index === activePair[1] : false;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Algorithm Simulator · Sorting</h1>
          <p className={styles.subtitle}>
            버블 정렬을 단계별로 시각화합니다. 비교(compare)와 교환(swap)을
            애니메이션으로 확인하세요.
          </p>

          <div className={styles.controls}>
            <select
              className={styles.select}
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
              disabled={isRunning}
              aria-label="algorithm"
            >
              <option value="bubble">Bubble sort</option>
            </select>

            <button
              className={styles.button}
              onClick={generate}
              disabled={isRunning}
            >
              Shuffle
            </button>

            {!isRunning ? (
              <button className={styles.primaryButton} onClick={start}>
                Start
              </button>
            ) : (
              <button className={styles.primaryButton} onClick={pause}>
                Pause
              </button>
            )}

            <div className={styles.sliderWrap}>
              <label htmlFor="speed">Speed</label>
              <input
                id="speed"
                className={styles.slider}
                type="range"
                min={1}
                max={100}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>

            <div className={styles.sliderWrap}>
              <label htmlFor="size">Size</label>
              <input
                id="size"
                className={styles.slider}
                type="range"
                min={16}
                max={96}
                value={size}
                disabled={isRunning}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>

            <div className={styles.stats}>
              <span>Comparisons: {comparisons}</span>
              <span>Swaps: {swaps}</span>
              <span>Delay: {delayMs}ms</span>
            </div>
          </div>
        </header>

        <section className={styles.panel}>
          <div className={styles.barArea}>
            {values.map((v, idx) => {
              const heightPct = (v / max) * 100;
              const className = [
                styles.bar,
                isActive(idx) ? styles.barActive : "",
                sortedSet.has(idx) ? styles.barSorted : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={idx}
                  className={className}
                  style={{ height: `${heightPct}%` }}
                  title={`${v}`}
                />
              );
            })}
          </div>

          <p className={styles.footerHint}>
            팁: Speed를 올리면 더 빠르게 진행되고, Pause로 멈춘 뒤 Start로
            다시 실행할 수 있어요. (현재는 버블 정렬만 포함)
          </p>
        </section>
      </div>
    </div>
  );
}
