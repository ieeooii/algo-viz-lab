import { createContext, useContext } from "react";
import type { SortingVisualizerContextValue } from "./context";

export const SortingVisualizerContext = createContext<SortingVisualizerContextValue | null>(
  null,
);

export function useSortingVisualizerContext() {
  const ctx = useContext(SortingVisualizerContext);
  if (!ctx) {
    throw new Error(
      "SortingVisualizer compound components must be used within <SortingVisualizer />",
    );
  }
  return ctx;
}
