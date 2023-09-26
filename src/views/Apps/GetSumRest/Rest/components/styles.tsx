import styled from "@emotion/styled";

export const Color = styled.span(({ type }: { type: string }) => ({
  color: type,
}));

export const Blue = styled.span({
  color: "blue",
});

export const Red = styled.span({
  color: "red",
});

export const Green = styled.span({
  color: "green",
});

export const Purple = styled.span({
  color: "purple",
});

type IndentProps = {
  level: number;
  children: any;
};

export const Indent = ({ level, children }: IndentProps) => {
  if (children.props.children.length > 0)
    return (
      <div style={{ margin: 0, whiteSpace: "pre" }}>
        {"  ".repeat(level)}
        {children}
      </div>
    );
  return null;
};

export const Black = styled.span({
  color: "black",
});

type MarginProps = {
  depth: number;
  children: any;
};

export const Margin = ({ depth, children }: MarginProps) => (
  <span style={{ marginTop: 0, marginBottom: 0, whiteSpace: "pre-wrap" }}>
    {"  ".repeat(depth)}
    {children}
  </span>
);
