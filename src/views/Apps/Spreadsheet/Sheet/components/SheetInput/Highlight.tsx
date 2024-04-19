import styled from "@emotion/styled";
import { Position } from "./types";

type ContainerProps = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const Container = styled.div(
  ({ top, left, width, height }: ContainerProps) => ({
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: `1px solid blue`,
    // transition: "top 200ms ease-in-out, left 200ms ease-in-out",
    zIndex: "5",
    pointerEvents: "none",
    backgroundColor: "rgba(0,0,255,0.1)",
  }),
);

type Props = {
  position: Position;
  multiSelect?: boolean;
};

const Highlight = ({ position }: Props): React.ReactNode => (
  <Container
    top={position.highlight.top}
    left={position.highlight.left}
    width={position.highlight.width}
    height={position.highlight.height}
  ></Container>
);

export default Highlight;
