import type { ReactNode } from "react";
import * as styles from "../../sort.css";
import type { Algorithm } from "../../modules/types";
import { useSortingVisualizerContext } from "./useSortingVisualizerContext";

type BaseProps = {
  children?: ReactNode;
};

export function Page({ children }: BaseProps) {
  return <div className={styles.page}>{children}</div>;
}

export function Container({ children }: BaseProps) {
  return <div className={styles.container}>{children}</div>;
}

export function Header({ children }: BaseProps) {
  return <header className={styles.header}>{children}</header>;
}

type TextProps = {
  children?: ReactNode;
};

export function Title({ children }: TextProps) {
  return (
    <h1 className={styles.title}>
      {children ?? "Algorithm Simulator · Sorting"}
    </h1>
  );
}

export function Subtitle({ children }: TextProps) {
  return (
    <p className={styles.subtitle}>
      {children ?? (
        <>
          버블 정렬을 단계별로 시각화합니다. 비교(compare)와 교환(swap)을
          애니메이션으로 확인하세요.
        </>
      )}
    </p>
  );
}

export function Controls() {
  const {
    algorithm,
    size,
    speed,
    isRunning,
    comparisons,
    swaps,
    delayMs,
    setAlgorithm,
    setSize,
    setSpeed,
    generate,
    start,
    pause,
  } = useSortingVisualizerContext();

  return (
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

      <button className={styles.button} onClick={generate} disabled={isRunning}>
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
  );
}

export function Panel({ children }: BaseProps) {
  return <section className={styles.panel}>{children}</section>;
}

export function Bars() {
  const { values, sortedSet, isActive, maxValue } = useSortingVisualizerContext();

  return (
    <div className={styles.barArea}>
      {values.map((v, idx) => {
        const heightPct = (v / maxValue) * 100;
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
  );
}

export function Hint({ children }: BaseProps) {
  return (
    <p className={styles.footerHint}>
      {children ?? (
        <>
          팁: Speed를 올리면 더 빠르게 진행되고, Pause로 멈춘 뒤 Start로 다시
          실행할 수 있어요. (현재는 버블 정렬만 포함)
        </>
      )}
    </p>
  );
}
