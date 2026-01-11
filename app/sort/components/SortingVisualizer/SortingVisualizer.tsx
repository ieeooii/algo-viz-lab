import type { ReactNode } from "react";
import { SortingVisualizerContext } from "./useSortingVisualizerContext";
import { useSortingVisualizerController } from "./useSortingVisualizerController";
import {
  Bars,
  Container,
  Controls,
  Header,
  Hint,
  Page,
  Panel,
  Subtitle,
  Title,
} from "./views";

type SortingVisualizerRootProps = {
  children?: ReactNode;
};

function SortingVisualizerRoot({ children }: SortingVisualizerRootProps) {
  const value = useSortingVisualizerController();

  return (
    <SortingVisualizerContext.Provider value={value}>
      {children ?? (
        <Page>
          <Container>
            <Header>
              <Title />
              <Subtitle />
              <Controls />
            </Header>

            <Panel>
              <Bars />
              <Hint />
            </Panel>
          </Container>
        </Page>
      )}
    </SortingVisualizerContext.Provider>
  );
}

type SortingVisualizerCompoundComponent = ((
  props: SortingVisualizerRootProps,
) => ReactNode) & {
  Page: typeof Page;
  Container: typeof Container;
  Header: typeof Header;
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Controls: typeof Controls;
  Panel: typeof Panel;
  Bars: typeof Bars;
  Hint: typeof Hint;
};

const SortingVisualizer = Object.assign(SortingVisualizerRoot, {
  Page,
  Container,
  Header,
  Title,
  Subtitle,
  Controls,
  Panel,
  Bars,
  Hint,
}) as SortingVisualizerCompoundComponent;

export default SortingVisualizer;
